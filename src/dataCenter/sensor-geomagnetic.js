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
    const [head_buf, stream_buf, cmd_buf, length_buf, content_buf] = data_buf;

    if (5 !== data_buf.length || 0x48 !== head_buf) {
        console.log(`[${new Date()}][INFO][dataCenter][sensor-geomagnetic]: DATA TYPE ERROR ${JSON.stringify({deveui, payload, port})}`);
        return _;
    }

    const number = stream_buf;
    const dataType = 0x30 === cmd_buf? "上报车辆信息": "未知包";
    const data =  content_buf === 0x01? "有车": "无车";

    return Object.assign(_, {number, dataType, data});
};