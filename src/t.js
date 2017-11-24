"use strict";

const EventEmitter = require('events');
const net = require('net');
const crypto = require('crypto');

let HOST = '139.129.216.128';  // msp02.claaiot.com
let PORT = 30003;

let IS_CHALLENGE = false;
let APP_EUI = '';
if (IS_CHALLENGE) {
    APP_EUI = '2c26c50526000002';  // 需要计算Challenge
} else {
    APP_EUI = '2c26c50526000001';
}
const APP_KEY = '00112233445566778899aabbccddeeff';

const CAP_DEV_EUI = '004A77006E00003C';
const MANGET_DEV_EUI = '004A770066002C74';
const T_DEV_EUI = '004A7702110600DD';
const VER = '0102';

// console.log(JSON.stringify(crypto.getCiphers(), null, 2));

function numberToHex(num, length, fill = '0') {
    let numberHex = num.toString(16);
    let len = length || numberHex.length;

    while (numberHex.length < len) {
        numberHex = fill + numberHex;
    }

    return numberHex;
}


const LORA_OPT = {
    host: HOST,
    port: PORT,
    appEUI: APP_EUI,
    appKey: APP_KEY
};

class Lora extends EventEmitter {
    constructor(opt = {}) {
        super(opt);
        this.HOST = opt.host;
        this.PORT = opt.port;
        this.APP_EUI = opt.appEUI;

        this.cmdSeq = -1;
        this.MAX_CMD_SEQ = Math.pow(2, 32);

        const client = new net.Socket();
        this.client = client;

        const _this = this;

        client.on('connect', function () {
            console.log('CONNECTED TO: ' + HOST + ':' + PORT);

            let register = {
                "cmd": "join",
                "appeui": _this.APP_EUI,
                "appnonce": _this.getAppNonce(),
                "challenge": "ABCDEF1234567890ABCDEF1234567890"
            };
            // register.challenge = _this.challenge(register.appnonce);
            _this.send(_this.pack(register));
        });

        client.on('data', function (data) {
            _this.rec(data);
        });

        client.on('close', function () {
            console.log('Connection closed');
        });

        client.on('drain', function () {
            console.log('Connection drain');
        });

        client.on('drain', function () {
            console.log('Connection drain');
        });

        client.on('error', function () {
            console.log('Connection error');
        });

        client.on('lookup', function () {
            console.log('Connection lookup');
        });

        client.on('timeout', function () {
            console.log('Connection timeout');
        });

        this.on('heartbeat', function () {
            let ack = {
                "cmd": "heartbeat_ack",
            };
            _this.send(_this.pack(ack));
        });
    }

    connect() {
        this.client.connect(this.PORT, this.HOST);
    }

    close() {
        this.client.destroyed();
    }

    getCmdSeq() {
        this.cmdSeq = this.cmdSeq + 2;
        if (this.cmdSeq >= this.MAX_CMD_SEQ) {
            this.cmdSeq = 1;
        }
        return this.cmdSeq;
    }

    getAppNonce() {
        return 1234;
    }

    challenge(nonce) {
        let zeroBuf = Buffer.alloc(16);
        let euiBuf = Buffer.from(this.APP_EUI, 'hex');
        console.log(nonce);
        let nonceHex = nonce.toString(16);

        while (nonceHex.length < 8) {
            nonceHex = '0' + nonceHex;
        }
        let nonceBuf = Buffer.from(nonceHex, 'hex');

        let buf = Buffer.concat([euiBuf, nonceBuf, zeroBuf], 16);
        console.log(buf.toString('hex'));

        let cipher = crypto.createCipher('aes-128-cbc-hmac-sha1', APP_KEY);
        let encrypted = cipher.update(APP_KEY + '', 'utf8', 'hex');
        encrypted += cipher.final('hex');
        console.log(encrypted);

        return encrypted;
    }

    pack(msgJson, heartbeat = false) {
        if (!heartbeat) {
            msgJson.appeui = this.APP_EUI;
            msgJson.cmdseq = this.getCmdSeq();
        }

        let data = JSON.stringify(msgJson);
        let len = data.length + 1;

        let beginBuf = Buffer.from('0A', 'hex');
        let verBuf = Buffer.from(VER, 'hex');
        let lenBuf = Buffer.from(numberToHex(len, 4), 'hex');
        let dataBuf = Buffer.from(data);
        let endBuf = Buffer.alloc(1);

        return Buffer.concat([beginBuf, verBuf, lenBuf, dataBuf, endBuf]);
    }

    unpack(buf) {
        if (buf[0] !== 0x0A) {
            console.log('数据包不是已0A开头');
        }
        let len = (buf[3] << 8) + buf[4];
        let dataBuf = Buffer.alloc(len - 1);
        buf.copy(dataBuf, 0, 5, len + 5);

        let data;
        try {
            data = JSON.parse(dataBuf.toString());
        } catch (e) {
            console.error('unpack JSON.pares error...');
            console.error(e);
            return;
        }

        if (!data.cmd) {
            console.log('unpack not found cmd field');
            return;
        }

        this.emit(data.cmd, data);
    }

    send(buf) {
        console.log('\n******** SEND DATA ********');
        console.log(buf.toString());
        console.log(buf.toString('hex'));
        console.log('\n******** SEND DATA END ********\n');
        this.client.write(buf);
    }

    rec(buf) {
        console.log('\n******** REC DATA ********');
        console.log(buf.toString());
        console.log(buf.toString('hex'));
        console.log('\n******** REC DATA END ********\n');
        this.unpack(buf);
    }

    sendTo(devEUI, payload, confirm = true, port = 10) {
        let data = {
            "cmd": "sendto",
            "deveui": devEUI,
            "confirm": confirm,
            "payload": payload,
            "port": port
        };

        this.send(data);
    }
}

let lora = new Lora(LORA_OPT);
lora.connect();

lora.on('join_ack', console.log);