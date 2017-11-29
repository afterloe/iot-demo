/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

module.exports = (deveui, payload, port) => {
    console.log(deveui, payload, port);
    const [data_buf, _] = [Buffer.from(payload, "base64"), {}];
    console.log(data_buf);

    const [head_buf, dataType_buf, ver_buf, equipmentType_buf, voltage_buf, state_buf, angle_buf] = data_buf;

    console.log((head_buf & 0x2) ? "周期数据包": "非周期数据包");

    return _;
};