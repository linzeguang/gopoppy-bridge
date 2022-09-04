/*
 * @Author: linzeguang
 * @Date: 2022-09-01 15:23:05
 * @LastEditTime: 2022-09-04 03:56:09
 * @LastEditors: linzeguang
 * @Description: 连接器配置
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

export interface ConnectorInfo extends Connection {
  name: string
  icon: string
}

export enum CONNECTOR {
  INJECTED = 'Injected',
  WALLETCONNECT = 'WalletConnect',
}

// Injected Connector
export const [injectedConnector, injectedHooks] = initializeConnector<MetaMask>(
  (actions) =>
    new MetaMask({
      actions,
      onError: console.warn,
    }),
)

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

export const connections: ConnectorInfo[] = [
  {
    connector: injectedConnector,
    hooks: injectedHooks,
    type: CONNECTOR.INJECTED,
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

export const connectors: [Connector, Web3ReactHooks][] = connections.map((info) => [
  info.connector,
  info.hooks,
])
