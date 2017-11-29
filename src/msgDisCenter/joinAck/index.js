/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const CMD = "join_ack";
const NEXT_SUCCESSOR = "nextSuccessor";

const _ = _ => {
    const {cmd} = _;

    if (CMD !== cmd) {
        return NEXT_SUCCESSOR;
    }

    const {cmdseq, code, msg} = _;

    if (200 !== code) {
        console.error(`[${new Date()}][ERROR][msgDisCenter][${CMD}]: JOIN FAILED ON ${cmdseq} - ${msg}`);
    }

    console.log(`[${new Date()}][INFO][msgDisCenter][${CMD}]: JOIN SUCCESS ON ${cmdseq} - ${msg}`);
};

module.exports = _ ;