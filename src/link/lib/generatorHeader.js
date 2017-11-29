/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

let versionBuf;

const init = config => {
    let {version = "0102"} = config;
    versionBuf = Buffer.from(version, "hex");
};

const invoke = json => {
    const beginBuf = Buffer.from("0A", "hex");
    let len = (JSON.stringify(json).length + 1 ).toString(16);
    while (len.length < 4) {
        len = "0" + len;
    }
    const lenBuf = Buffer.from(len, "hex");
    return Buffer.concat([beginBuf, versionBuf, lenBuf]);
};

const _ = {init, invoke};

module.exports = _;