/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

module.exports = data => {
    if (0x0A !== data[0]) {
        console.log('数据包不是已0A开头');
        return;
    }

    const len = (data[3] << 8) + data[4];
    const dataBuf = Buffer.alloc(len - 1);
    data.copy(dataBuf, 0, 5, len + 5);

    const result = {};

    try {
        data = JSON.parse(dataBuf.toString());
        Object.assign(result, data, {packageLength: len});
    } catch (exception) {
        console.log(`[${new Date()}][ERROR]: ${exception.message}`);
    }

    return result;
};