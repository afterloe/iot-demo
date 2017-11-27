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
    {host, port},
    {receiveMsg, registerModule},
    {analysis},
    {initLib, send, unPackage},
] = [
    require(resolve(__dirname, "config", "index.json")),
    require(resolve(__dirname, "cmdDisCenter")),
    require(resolve(__dirname, "dataCenter")),
    require(resolve(__dirname, "lib"))
];
const client = new Socket();

client.connect(port, host, () => {
    console.log(`[${new Date()}][INFO]: CONNECTED TO ${host}:${port}`);
    initLib(client);
    registerModule(resolve(__dirname, "config", "index.json"), {send, analysis});
    send({cmd: "join", cmdseq: 1,});
});

client.on("data", data => {
    receiveMsg(unPackage(data));
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

client.on("timeout", () => {
    console.log('Connection timeout');
});