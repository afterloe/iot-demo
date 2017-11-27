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
    updata,
] = [
    require(resolve(__dirname, "cmdChain")),
    require(resolve(__dirname, "joinAck")),
    require(resolve(__dirname, "heartBeat")),
    require(resolve(__dirname, "updata"))
];
let beginRequest, network, pluginAnalysis;

const receiveMsg = _ => {
    const result = beginRequest.passRequest(_, CMDChain.next);
    try {
        const {send, cmd, analysis} = result;
        if (send) {
            network(cmd);
        }
        if (analysis) {
            pluginAnalysis(cmd);
        }
    } catch (exception) {

    }
};

const defaultDisFun = cmd => {
    console.log(`[${new Date()}][INFO][cmdDisCenter]: receive unknow robo cmd. ${JSON.stringify(cmd)}`);
};

// LORA 命令解析模块
const initModule = (config, {send, analysis}) => {
    if (send && send instanceof Function) {
        network = send;
    }
    if (analysis && analysis instanceof Function) {
        pluginAnalysis = analysis;
    }
    beginRequest = new CMDChain(joinAck);
    beginRequest.setNextSuccessor(new CMDChain(heartBeat))
        .setNextSuccessor(new CMDChain(updata))
        .setNextSuccessor(new CMDChain(defaultDisFun));
};

const _ = {
    receiveMsg, registerModule: initModule
};

module.exports = _ ;