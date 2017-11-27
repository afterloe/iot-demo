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
] = [
    require(resolve(__dirname, "cmdChain")),
    require(resolve(__dirname, "joinAck")),
    require(resolve(__dirname, "heartBeat")),
];
let beginRequest, network;

const receiveMsg = _ => {
 // 职责链模式 -- 待实现
    const result = beginRequest.passRequest(_, CMDChain.next);
    try {
        const {send, cmd} = result;
        if (send) {
            network(cmd);
        }
    } catch (exception) {

    }
};

const defaultDisFun = cmd => {
    console.log(`[${new Date()}][INFO][cmdDisCenter]: receive unknow robo cmd. ${JSON.stringify(cmd)}`);
};

// 注册分析模块
const initModule = (config, cmdNetwork) => {
    if (cmdNetwork && cmdNetwork instanceof Function) {
        network = cmdNetwork;
    }
    beginRequest = new CMDChain(joinAck);
    beginRequest.setNextSuccessor(new CMDChain(heartBeat))
        .setNextSuccessor(new CMDChain(defaultDisFun));
};

const _ = {
    receiveMsg, registerModule: initModule
};

module.exports = _ ;