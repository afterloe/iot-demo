/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const {resolve} = require("path");
// const sensor_manhole = require(resolve(__dirname, "sensor-manhole"));

const analysis = data => {
    const {deveui, payload, port} = data;
    console.log(deveui, payload, port);
    if ("004A77006E00003C" === deveui) {
        console.log(deveui, payload, port);

        const data_buf = Buffer.from(payload, "base64");
        console.log(data_buf);
        console.log(data_buf.toString("hex"));

        const [head_buf, dataType_buf, ver_buf, equipmentType_buf, voltage_buf, state_buf, angle_buf] = data_buf;

        console.log("头信息: " + head_buf && 0x5A); // 判断数据包是不是以 5a 开头
        console.log("数据包类型: " + dataType_buf && 0x02? "警报包": "数据包"); // 数据包类型
        console.log("传感器版本: " + ver_buf.toString(2)); // 传感器版本
        console.log("终端类型: " + equipmentType_buf && 0x02? "井盖终端": "错误设备"); // 传感器类型
        console.log("电池电压: " + voltage_buf / 10 + "V"); // 电压
        console.log("井盖状态: " + state_buf && 0x00? "正常": "井盖打开");
        console.log("倾斜角度: " + angle_buf + "°");
    }
};

const initAnalysisModule = () => {

};

const _ = {
    analysis
};

module.exports = _ ;