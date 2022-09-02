/*
 * @Author: linzeguang
 * @Date: 2022-07-18 14:42:03
 * @LastEditTime: 2022-09-02 13:44:26
 * @LastEditors: linzeguang
 * @Description: 基建model
 */
import { defineModel } from 'foca'

import { BRIDGECHAINS, CHAIN, Pair, TOKENS } from '../constants'

export interface BasicState {
  bridgePair: Pair
}

const initialState: BasicState = {
  bridgePair: [BRIDGECHAINS[CHAIN.TTS], BRIDGECHAINS[CHAIN.BSC]], // 默认跨链桥链 TTS => BSC
}

export const BasicModel = defineModel('basic', {
  initialState,
  actions: {
    updateBridgePair(state, pair: BasicState['bridgePair']) {
      state.bridgePair = pair
    },
  },
  computed: {
    bridgeChain() {
      const { bridgePair } = this.state
      const [fromChain, toChain] = bridgePair

      const fromTokens = Object.values(TOKENS[fromChain.chainId])

      return {
        fromChain, // 主链
        toChain, // 目标链
        fromTokens, // 主链代币
      }
    },
  },
})
