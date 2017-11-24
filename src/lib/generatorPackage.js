/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

module.exports = (cmd = {}, headerBuf = Buffer.from("")) => {
    const contentBuf = Buffer.from(JSON.stringify(cmd));
    const buf = Buffer.concat([headerBuf, contentBuf, Buffer.alloc(1)]);
    // console.log(`[${new Date()}][INFO]: SEND ${buf.toString("hex")}`);
    return buf;
};