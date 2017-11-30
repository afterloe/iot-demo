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

const [
    {initialization, pack, unPack},
] = [
    require(resolve(__dirname, "lib"))
];

let client;

const receiveList = [];

const register = fn => {
    if (!fn instanceof Function) {
        throw new Error("param type error: mast be a Function");
    }

    receiveList.push(fn);
};

const send = cmd => {
    if (!cmd) {
        throw new Error("can't send null!");
    }
    cmd = pack(cmd);
    console.log(`[${new Date()}][INFO][link]: SEND REMOTE MSG.`);
    return client.write(cmd);
};

const connection = config => new Promise((solve, reject) => {

    if(!config) {
        throw new Error("can't find any config about this socket!.");
    }

    client = new Socket();
    const {host, port} = config;

    client.connect(port, host, () => {
        console.log(`[${new Date()}][INFO][link]: CONNECTED TO ${host}:${port}`);
        initialization(config);
        solve();
    });

    client.on("data", data => {
        data = unPack(data);
        console.log(`[${new Date()}][INFO][link]: RECEIVE REMOTE MSG.`);
        receiveList.map(fn => {
            fn.apply(null, [data]);
        });
    });

    client.on("close", () => {
        console.error(`[${new Date()}][INFO][link]: CONNECTION DISCONNECT`);
    });

    client.on("drain", () => {
        console.log(`[${new Date()}][INFO][link]: DRAIN`);
    });

    client.on("error", err => {
        console.error(`[${new Date()}][ERROR][link]: CONNECTION FIND ERROR BY ${err}`);
        reject(err);
    });

    client.on("timeout", () => {
        console.error(`[${new Date()}][ERROR][link]: CONNECTION TIMEOUT`);
    });
});

const _ = {
    connection, register, send
};

module.exports = _;