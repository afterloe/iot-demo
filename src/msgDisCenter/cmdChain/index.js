/**
 * create by afterloe<lm6289511@gmail.com>
 *
 * version: 0.0.1
 * license: apache 2.0
 * createTime: 2017-11-24 13:40:33
 */
"use strict";

const NEXT_SUCCESSOR = "nextSuccessor";

module.exports = class CmdChain {

  constructor(fn) {
      if (!fn instanceof Function) {
          throw new Error("param type error: mast be a Function");
      }
      this.fn = fn;
      this.successor = null;
  }

  setNextSuccessor(successor) {
      this.successor = successor;
      return successor;
  }

  static nextSuccessor() {
      return NEXT_SUCCESSOR;
  }

  passRequest(...args) {
      const ret = this.fn.apply(this, args);
      if (NEXT_SUCCESSOR === ret) {
          return this.successor && this.successor.passRequest.apply(this.successor, args);
      }

      return ret;
  }

};