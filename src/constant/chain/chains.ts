/*
 * @Author: linzeguang
 * @Date: 2022-09-01 14:14:15
 * @LastEditTime: 2022-09-01 14:43:31
 * @LastEditors: linzeguang
 * @Description:
 */

import { AddEthereumChainParameter } from '@web3-react/types'

export enum CHAIN {
  BSC = 56,
  TTS = 17451,
}

export const CHAINS: Record<CHAIN, AddEthereumChainParameter> = {
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