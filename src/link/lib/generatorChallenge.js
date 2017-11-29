/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const appnonce = 1234;
const challenge= "ABCDEF1234567890ABCDEF1234567890";

let appeui;

const init = config => {
    let {eui = ""} = config;
    appeui = eui;
};

const invoke = () => {
    return {appnonce, challenge, appeui};
};

const _ = {init, invoke};

module.exports = _ ;