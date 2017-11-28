/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const cmd = {
    deveui: "004A77006E00003C",
    payload: "WgIhAiQBNQ",
    port: 2
};

const {deveui, payload, port} = cmd;
console.log(deveui, payload, port);

const data_buf = Buffer.from(payload, "base64");
console.log(data_buf);
console.log(data_buf.toString("hex"));

const [head_buf, dataType_buf, ver_buf, equipmentType_buf, voltage_buf, state_buf, angle_buf] = data_buf;

console.log(0x5a & head_buf); // 判断数据包是不是以 5a 开头
console.log(dataType_buf & 0x02); // 数据包类型
console.log("传感器版本: " + ver_buf.toString(2)); // 传感器版本
console.log("终端类型: " + equipmentType_buf & 0x02? "井盖终端": "错误设备"); // 传感器类型
console.log("电池电压: " + voltage_buf / 10 + "V"); // 电压
console.log((state_buf & 0x01) ? "打开": "正常"); // 井盖标签
console.log("倾斜角度: " + angle_buf + "°"); // 倾斜角度

console.log(3600 >> 8);
console.log(3600 % 256);

const _ = Buffer.from([3600 >> 8, 3600 % 256]);
console.log((_[0] << 8) + _[1]);
// console.log()


const manhole = require("../src/dataCenter/sensor-manhole");
const obj = manhole(deveui, payload, port);

console.dir(obj);

