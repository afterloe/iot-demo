/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const [
    {resolve},
    {Socket},
] = [
    require("path"),
    require("net"),
];

const {host, port, version, eui, key} = require(resolve("config", "index.json"));

const client = new Socket();
const nonce = 1234;
const challenge= "ABCDEF1234567890ABCDEF1234567890";

const buildMsgHeader = (len = 0) => {
    const beginBuf = Buffer.from("0A", "hex");
    const versionBuf = Buffer.from(version, "hex");
    len = len.toString(16);
    while (len.length < 4) {
        len = "0" + len;
    }
    const lenBuf = Buffer.from(len, "hex");
    return Buffer.concat([beginBuf, versionBuf, lenBuf]);
};

const packageMsg = (cmd = {}) => {
    const _cmd = JSON.stringify(cmd);
    const len = _cmd.length + 1;

    const headerBuf = buildMsgHeader(len);
    const contentBuf = Buffer.from(_cmd);
    return Buffer.concat([headerBuf, contentBuf, Buffer.alloc(1)]);
};

/**
 * 发送join 包
 *
 */
const sendJoin = () => {
    const join = {
        cmd: "join",
        cmdseq: 1,
        appeui: eui,
        appnonce: nonce,
        challenge
    };

    console.log(`[${new Date()}][INFO]: SEND MSG ${JSON.stringify(join)}`);
    client.write(packageMsg(join));
    console.log(`[${new Date()}][INFO]: SEND MSG END.`);
};

client.connect(port, host, () => {
    console.log(`[${new Date()}][INFO]: CONNECTED TO ${host}:${port}`);
    sendJoin();
});

client.on("data", data => {
    console.log(`[${new Date()}][INFO]: ${data}`);
});

client.on("close", () => {
    console.error(`[${new Date()}][ERROR]: CONNECTION DISCONNECT`);
});

client.on("drain", () => {
    console.log('Connection drain');
});

client.on("error", () => {
    console.log('Connection error');
});

client.on("lookup", () => {
    console.log('Connection lookup');
});

client.on("timeout", () => {
    console.log('Connection timeout');
});