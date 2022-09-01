/*
 * @Author: linzeguang
 * @Date: 2022-09-01 14:26:07
 * @LastEditTime: 2022-09-01 14:32:19
 * @LastEditors: linzeguang
 * @Description:
 */
import { CHAIN } from "./chains";

interface Token {
  type: "main" | "token";
  address: string;
  name: string;
  symbol: string;
  icon: string;
}

export const TOKENS: Record<CHAIN, { [key: string]: Token }> = {
  [CHAIN.BSC]: {
    USDT: {
      type: "token",
      name: "USDT Token",
      symbol: "USDT",
      address: "0x55d398326f99059fF775485246999027B3197955",
      icon: "./images/token/USDT.png",
    },
    TTS: {
      type: "token",
      name: "TTS Token",
      symbol: "TTS",
      address: "0x56720D2369aeebf7C553f36B59D188E195b6B435",
      icon: "./images/token/TTS.png",
    },
    TTA: {
      type: "token",
      name: "TTS Token",
      symbol: "TTS",
      address: "0x6B32A0d5a654f0B3377f2037578A99A3D5a4e023",
      icon: "./images/token/TTA.png",
    },
  },
  [CHAIN.TTS]: {
    TTS: {
      type: "main",
      name: "TTS Coin",
      symbol: "TTS",
      address: "0x0000000000000000000000000000000000000000",
      icon: "./images/token/TTS.png",
    },
    USDT: {
      type: "token",
      name: "USDT Token",
      symbol: "USDT",
      address: "0xA1b3417CDa3b63a4293599347572ecDf940EC36C",
      icon: "./images/token/USDT.png",
    },
    TTST: {
      type: "token",
      name: "TTS Token",
      symbol: "TTS Token",
      address: "0x948F8f7f5779d702528FAACfA85eDeE15483179C",
      icon: "./images/token/TTS.png",
    },
    TTA: {
      type: "token",
      name: "TTA",
      symbol: "TTA",
      address: "0x718a7D83EFC3a59431d97dC8487EA60a4Ea1A1C3",
      icon: "./images/token/TTA.png",
    },
  },
};
