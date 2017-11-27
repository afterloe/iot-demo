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

const {host, port} = require(resolve(__dirname, "config", "index.json"));
let lib;
const client = new Socket();

client.connect(port, host, () => {
    console.log(`[${new Date()}][INFO]: CONNECTED TO ${host}:${port}`);
    lib = require(resolve(__dirname, "lib"));
    lib.initLib(client);
    lib.send({cmd: "join", cmdseq: 1,});
});

client.on("data", data => {
    lib.receive(data);
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