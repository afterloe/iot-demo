/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const [pluginType, pluginName] = ["磁敏传感器", "Parking埋入式地磁车辆检测器"];

module.exports = (deveui, payload, port) => {
    const [data_buf, _] = [Buffer.from(payload, "base64"), {
        _time: new Date().toLocaleString(),
        sensor: {
            type: pluginType,
            name: pluginName,
            deveui
        }
    }];
    console.log(`[${new Date()}][INFO][dataCenter][sensor-geomagnetic]: RECEIVE BUFFER IS ${data_buf.toString("hex")}`);
    const [head_buf, stream_buf, cmd_buf, length_buf, content_buf] = data_buf;

    if (5 !== data_buf.length || 0x48 !== head_buf) {
        console.log(`[${new Date()}][INFO][dataCenter][sensor-geomagnetic]: DATA TYPE ERROR ${JSON.stringify({deveui, payload, port})}`);
        return Object.assign(_, {
            plugin: "unknow_buf",
            payload,
            port
        });
    }

    Object.assign(_, {
        packageStreamNum: stream_buf,
        dataType: 0x30 === cmd_buf? "上报车辆信息": "未知包",
        _success: true,
        info: {
            data: content_buf,
            type: content_buf === 0x01? "有车": "无车"
        }
    });

    return _;
};