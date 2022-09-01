/*
 * @Author: linzeguang
 * @Date: 2022-09-01 16:45:40
 * @LastEditTime: 2022-09-02 00:12:38
 * @LastEditors: linzeguang
 * @Description: 跨链桥交易链对
 */
import { CHAIN } from '../chain'

import { BridgeChain, BRIDGECHAINS } from './chain'

export type Pair = [BridgeChain, BridgeChain]

export const PAIRS: Array<Pair> = [
  [BRIDGECHAINS[CHAIN.TTS], BRIDGECHAINS[CHAIN.BSC]],
  [BRIDGECHAINS[CHAIN.BSC], BRIDGECHAINS[CHAIN.TTS]],
  [BRIDGECHAINS[CHAIN.TTS], BRIDGECHAINS[CHAIN.TTS]],
]
