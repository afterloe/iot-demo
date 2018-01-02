/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

/**
 * 解包
 *
 * @param data
 * @returns {{}}
 */
const invoke = data => {
    const result = {};
    if (0x0A !== data[0]) {
        console.log(`[${new Date()}][ERROR][link][lib]: 数据包不是以0A开头`);
        return result;
    }

    const len = (data[3] << 8) + data[4];
    const dataBuf = Buffer.alloc(len - 1);
    data.copy(dataBuf, 0, 5, len + 5);

    try {
        data = JSON.parse(dataBuf.toString());
        Object.assign(result, data, {packageLength: len});
    } catch (exception) {
        console.log(`[${new Date()}][ERROR][link][lib]: ${exception.message}`);
    }

    return result;
};

const _ = {invoke};

module.exports = _;