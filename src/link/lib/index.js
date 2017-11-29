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

/**
 *  初始化工具包
 *
 * @param config
 */
const initialization = (config) => {
    generatorChallenge.init(config);
    generatorHeader.init(config);
};

/**
 * 发送 指令
 *
 * @param cmd 指令对象
 */
const pack = (cmd = {}) => {
    const challenge = generatorChallenge.invoke();
    Object.assign(cmd, challenge);
    console.log(`[${new Date()}][INFO][link][lib]: PACK MSG. -> ${JSON.stringify(cmd)}`);
    const headerBuf = generatorHeader.invoke(cmd);
    return generatorPackage.invoke(cmd, headerBuf);
};

/**
 * 解包
 *
 * @param data
 */
const unPack = data => {
    if (!data) {
        return {};
    }
    data = upPackage.invoke(data);
    console.log(`[${new Date()}][INFO][link][lib]: UNPACK MSG. -> ${JSON.stringify(data)}`);
    return data;
};

const _ = {initialization, pack, unPack};

module.exports = _ ;