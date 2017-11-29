/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const {resolve} = require("path");
const [
    CMDChain,
    joinAck,
    heartBeat,
    upData,
] = [
    require(resolve(__dirname, "cmdChain")),
    require(resolve(__dirname, "joinAck")),
    require(resolve(__dirname, "heartBeat")),
    require(resolve(__dirname, "upData"))
];

let beginRequest;

const receiveMsg = _ => beginRequest.passRequest(_, CMDChain.next);

const defaultDisFun = cmd => {
    console.log(`[${new Date()}][INFO][msgDisCenter]: receive unknow lora cmd. ${JSON.stringify(cmd)}`);
};

// LORA 命令解析模块
const initModule = (config) => {
    beginRequest = new CMDChain(joinAck);
    beginRequest.setNextSuccessor(new CMDChain(heartBeat))
        .setNextSuccessor(new CMDChain(upData))
        .setNextSuccessor(new CMDChain(defaultDisFun));
};

const _ = {
    receiveMsg, registerModule: initModule
};

module.exports = _ ;