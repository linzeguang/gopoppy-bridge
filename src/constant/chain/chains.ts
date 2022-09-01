/*
 * @Author: linzeguang
 * @Date: 2022-09-01 14:14:15
 * @LastEditTime: 2022-09-01 17:34:26
 * @LastEditors: linzeguang
 * @Description:
 */

import { AddEthereumChainParameter } from '@web3-react/types'

export interface Chain extends AddEthereumChainParameter {
  chainId: CHAIN
}

export enum CHAIN {
  BSC = 56,
  TTS = 17451,
}

export const CHAINS: Record<CHAIN, Chain> = {
  [CHAIN.BSC]: {
    chainId: CHAIN.BSC,
    chainName: 'BNB Smart Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [CHAIN.TTS]: {
    chainId: CHAIN.TTS,
    chainName: 'The Third Space Chain',
    nativeCurrency: {
      name: 'TTS Coin',
      symbol: 'TTS',
      decimals: 18,
    },
    rpcUrls: [
      'https://seed1.thethirdspacechain.com',
      'https://seed2.thethirdspacechain.com',
      'https://seed3.thethirdspacechain.com',
    ],
    blockExplorerUrls: ['https://block.thethirdspacechain.com/'],
  },
}

export const RPCURLS = Object.values(CHAINS).map((info) => info.rpcUrls)
