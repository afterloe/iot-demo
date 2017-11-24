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
    generatorChallenge,
    generatorHeader,
    generatorPackage,
] = [
    require(resolve(__dirname, "generatorChallenge")),
    require(resolve(__dirname, "generatorHeader")),
    require(resolve(__dirname, "generatorPackage"))
];

let client;

const initLib = __client => {
    client = __client;
};

const send = (__json = {}) => {
    const challenge = generatorChallenge();
    Object.assign(__json, challenge);
    console.log(`[${new Date()}][INFO]: SEND MSG ${JSON.stringify(__json)}`);
    const headerBuf = generatorHeader(__json);
    if (!client) {
        throw new Error("lib didn't init.");
    }
    client.write(generatorPackage(__json, headerBuf));
};

const _ = {initLib, send};

module.exports = _ ;