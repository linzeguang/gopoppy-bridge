/*
 * @Author: linzeguang
 * @Date: 2022-07-18 14:25:25
 * @LastEditTime: 2022-09-01 14:36:56
 * @LastEditors: linzeguang
 * @Description: 地址配置
 */

import { CHAIN } from "../chain/chains";

export const BRIDGEADDRESSES: Record<CHAIN, string> = {
  [CHAIN.BSC]: "0x98f23e97A6f9e9fEcA0E270bA905EeB1F96CfB0e",
  [CHAIN.TTS]: "0x3Aeaa614867D4F09346cbAfCf15953ddF191D147",
};
