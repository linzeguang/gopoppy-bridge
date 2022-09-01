/*
 * @Author: linzeguang
 * @Date: 2022-09-01 17:00:42
 * @LastEditTime: 2022-09-01 17:35:06
 * @LastEditors: linzeguang
 * @Description:
 */

import { CHAIN, Chain, CHAINS } from '../chain'

export interface BridgeChain extends Chain {
  label: string
  chainLogo: string
}

export const BRIDGECHAINS: Record<CHAIN, BridgeChain> = {
  [CHAIN.BSC]: {
    ...CHAINS[CHAIN.BSC],
    label: 'BSC',
    chainLogo: './images/bridge/BSC.png',
  },
  [CHAIN.TTS]: {
    ...CHAINS[CHAIN.TTS],
    label: 'TChain',
    chainLogo: './images/bridge/TTS.png',
  },
}
