/*
 * @Author: linzeguang
 * @Date: 2022-09-01 18:43:30
 * @LastEditTime: 2022-09-05 21:17:34
 * @LastEditors: linzeguang
 * @Description:
 */
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useComputed } from 'foca'
import { useLocalStorage } from 'zewide'

import { useWeb3React } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'

import { Chain, CONNECTOR, ConnectorInfo } from '../constants'
import { BasicModel } from '../models'

interface ConnectError extends Error {
  code: number
  message: string
  stack: string
}

export default function useAuth() {
  const { t } = useTranslation()
  const [, setSelectedConnector] = useLocalStorage<CONNECTOR | null>('selectedConnector', null)

  const { connector, chainId, isActive } = useWeb3React()
  const { fromChain } = useComputed(BasicModel.bridgeChain)
  const { label, chainLogo, ...params } = fromChain

  const connect = useCallback(
    async (connector: Connector, chain: Chain) => {
      try {
        if (connector instanceof MetaMask) {
          // MetaMask 钱包连接
          await connector.activate(chain)
        } else if (connector instanceof WalletConnect) {
          // WalletConnect 钱包连接
          await connector.activate(chain.chainId)
        } else {
          // 其他钱包
          await connector.activate(chain)
        }
        return true
      } catch (error) {
        // 错误处理
        if (error === 'rejected') {
          toast.error(t('user_rejected'))
          return false
        }

        const { message } = error as ConnectError
        toast.error(message)
        return false
      }
    },
    [t],
  )

  // 切换网络
  const switchChain = useCallback(
    async (chain: Chain) => {
      // 避免重复点击
      if (chainId === chain.chainId) return true

      // 发起请求
      const status = await connect(connector, chain)
      return status
    },
    [chainId, connect, connector],
  )

  // 连接钱包
  const login = useCallback(
    async (connection: ConnectorInfo) => {
      const { connector, type } = connection

      // 发起请求
      const connected = await connect(connector, params)
      if (connected) {
        setSelectedConnector(type)
      } else {
        !isActive && setSelectedConnector(null)
      }
      return connected
    },
    [connect, isActive, params, setSelectedConnector],
  )

  // 断开钱包
  const logout = useCallback(async () => {
    if (connector.deactivate) {
      await connector.deactivate()
    } else {
      await connector.resetState()
    }
    setSelectedConnector(null)
  }, [connector, setSelectedConnector])

  return { login, logout, switchChain }
}
