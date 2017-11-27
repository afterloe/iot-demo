/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const CMD = "heartbeat";
const CMD_CALLBACK = "heartbeat_ack";
const NEXT_SUCCESSOR = "nextSuccessor";

const _ = (_, next) => {

    const {cmd} = _ ;

    if (CMD !== cmd) {
        return NEXT_SUCCESSOR;
    }

    return {
        send: true,
        cmd: {
            cmd : CMD_CALLBACK,
        }
    };
};

module.exports = _ ;