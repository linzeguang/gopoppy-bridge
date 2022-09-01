/*
 * @Author: linzeguang
 * @Date: 2022-09-01 15:23:05
 * @LastEditTime: 2022-09-01 19:22:44
 * @LastEditors: linzeguang
 * @Description:
 */
import { initializeConnector, Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'

import { RPCURLS } from './chain'

export interface Connection {
  connector: Connector
  hooks: Web3ReactHooks
  type: CONNECTOR
}

export interface Wallet extends Connection {
  name: string
  icon: string
}

export enum CONNECTOR {
  METAMASK,
  WALLETCONNECT,
}

// Injected Connector
export const [injectedConnector, injectedHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions }))

// WalletConnect Connector
export const [walletConnectConnector, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: RPCURLS,
      },
    }),
)

export const wallets: Wallet[] = [
  {
    connector: injectedConnector,
    hooks: injectedHooks,
    type: CONNECTOR.METAMASK,
    name: 'TokenPocket',
    icon: './images/connection/TokenPocket.svg',
  },
  {
    connector: walletConnectConnector,
    hooks: walletConnectHooks,
    type: CONNECTOR.WALLETCONNECT,
    name: 'WalletConnect',
    icon: './images/connection/WalletConnect.svg',
  },
]

export const connectors: [Connector, Web3ReactHooks][] = wallets.map((info) => [info.connector, info.hooks])
