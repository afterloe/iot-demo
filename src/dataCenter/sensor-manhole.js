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
    console.log(`[${new Date()}][INFO][dataCenter][sensor-manhole]: RECEIVE BUFFER IS ${data_buf.toString("hex")}`);
    const [head_buf, dataType_buf, ver_buf, equipmentType_buf, voltage_buf, state_buf, angle_buf] = data_buf;

    // 如果数据包不是以 5a 开头
    if (0x5a !== head_buf || 7 !== data_buf.length) {
        console.log(`[${new Date()}][INFO][dataCenter][sensor-manhole]: DATA TYPE ERROR ${JSON.stringify({deveui, payload, port})}`);
        return _;
    }

    Object.assign(_, {
        type: 0x02 === dataType_buf? "报警包": "心跳包",
        ver: ver_buf.toString(2),
        equipmentType: 0x02 === equipmentType_buf? "井盖终端": "未知设备",
        voltage: {
            data: voltage_buf / 10,
            util: "V"
        },
        _success: true,
        _time: new Date().toLocaleString(),
        sensor: {
            type: "陀螺仪传感器",
            name: "LoRaWan井盖终端",
            deveui
        },
        status: (state_buf & 0x01) ? "打开": "正常",
        angle: {
            data: angle_buf,
            util: "°"
        }
    });

    return _;
};