/*
 * @Author: linzeguang
 * @Date: 2022-09-01 18:43:30
 * @LastEditTime: 2022-09-01 19:24:26
 * @LastEditors: linzeguang
 * @Description:
 */
import { useCallback, useContext } from 'react'

import { useWeb3React } from '@web3-react/core'

import { Chain, Wallet } from '../constant'
import { StoreContext } from '../widgets'

interface ConnectError extends Error {
  code: number
  message: string
  stack: string
}

export default function useAuth() {
  const { connector, chainId } = useWeb3React()
  const { fromChain } = useContext(StoreContext)
  const { label, chainLogo, ...params } = fromChain

  const onError = useCallback((error: ConnectError, type: 'login' | 'toggle') => {
    const errorMessage = type === 'login' ? 'Wallet connection error:' : 'Failed to switch network:'
    console.warn(`${errorMessage} ${error.message}`)
  }, [])

  const toggle = useCallback(
    async (chain: Chain) => {
      // 避免重复点击
      if (chainId === chain.chainId) return
      try {
        await connector.activate(chain)
      } catch (error) {
        onError(error as ConnectError, 'toggle')
      }
    },
    [chainId, connector, onError],
  )

  const login = useCallback(
    async (wallet: Wallet) => {
      // 避免重复点击
      if (chainId === params.chainId) return
      try {
        await wallet.connector.activate(params)
      } catch (error) {
        onError(error as ConnectError, 'login')
      }
    },
    [chainId, onError, params],
  )

  const logout = useCallback(() => {
    if (connector.deactivate) {
      connector.deactivate()
    } else {
      connector.resetState()
    }
  }, [connector])

  return { login, logout, toggle }
}
