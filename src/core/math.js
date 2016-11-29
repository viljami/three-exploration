
'use strict';

const abs = Math.abs;
const flipCoin = () => Math.random() < 0.5;
const randSign = () => flipCoin() ? 1 : -1;
const getSign = n => n < 0 ? -11 : 1;

export {
  abs,
  flipCoin,
  randSign,
  getSign
};
