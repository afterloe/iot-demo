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
    const [head_buf, dataType_buf, ver_buf, equipmentType_buf, voltage_buf, state_buf, angle_buf] = data_buf;

    // 如果数据包不是以 5a 开头
    if (0x5a !== head_buf) {
        console.log(`[${new Date()}][INFO][dataCenter][sensor-manhole]: DATA TYPE ERROR ${JSON.stringify({deveui, payload, port})}`);
        return _;
    }

    const dataType = 0x02 === dataType_buf? "报警包": "心跳包";
    const ver = ver_buf.toString(2);
    const equipmentType = 0x02 === equipmentType_buf? "井盖终端": "错误设备";
    const voltage = voltage_buf / 10;
    const voltageUtil = "V";
    const state = (state_buf & 0x01) ? "打开": "正常";
    const angle = angle_buf;
    const angleUtil = "°";

    return Object.assign(_, {dataType, ver, equipmentType, voltage, voltageUtil, state, angle, angleUtil});
};