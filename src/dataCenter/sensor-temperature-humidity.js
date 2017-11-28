/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

module.exports = (deveui, payload, port) => {
    const [data_buf, _] = [Buffer.from(payload, "base64"), {}];
    console.log(data_buf);

    return _;
};