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
] = [
    require("path"),
];

const [
    generatorChallenge,  // 生成校验数字
    generatorHeader,    // 生成报文头部
    generatorPackage,   // 打包
    upPackage,          // 解包
] = [
    require(resolve(__dirname, "generatorChallenge")),
    require(resolve(__dirname, "generatorHeader")),
    require(resolve(__dirname, "generatorPackage")),
    require(resolve(__dirname, "upPackage")),
];

let client; // 发送对象

/**
 *  初始化工具包
 *
 * @param __client
 */
const initLib = __client => {
    client = __client;
};

/**
 * 发送 指令
 *
 * @param cmd 指令对象
 */
const send = (cmd = {}) => {
    const challenge = generatorChallenge();
    Object.assign(cmd, challenge);
    console.log(`[${new Date()}][INFO]: SEND MSG ${JSON.stringify(cmd)}`);
    const headerBuf = generatorHeader(cmd);
    if (!client) {
        throw new Error("lib didn't init.");
    }
    client.write(generatorPackage(cmd, headerBuf));
};

/**
 * 接受响应包
 *
 * @param data
 */
const unPackage = data => {
    if (!data) {
        return ;
    }

    data = upPackage(data);
    console.log(`[${new Date()}][INFO]: RECEIVE MSG ${JSON.stringify(data)}`);
    return data;
};

const _ = {initLib, send, unPackage};

module.exports = _ ;