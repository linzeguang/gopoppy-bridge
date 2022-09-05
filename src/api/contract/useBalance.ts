/*
 * @Author: linzeguang
 * @Date: 2022-09-04 20:13:54
 * @LastEditTime: 2022-09-05 15:54:06
 * @LastEditors: linzeguang
 * @Description: 获取余额
 */
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { fromWei } from 'web3-utils'
import { toThousand } from 'zewide'

import { Erc20Abi, getProviderOrSigner, Token } from '@/constants'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'

import { MetamaskError } from './types'

export default function useBalance() {
  const { provider, account } = useWeb3React()

  const [loading, toggleLoading] = useState(false)
  const [balance, setBalance] = useState('')

  const fetch = useCallback(
    async (token?: Token) => {
      setBalance('')
      if (!provider || !account || !token) return

      toggleLoading(true)
      const { type, address } = token

      try {
        let balance: any
        if (type === 'main') {
          balance = await provider.getBalance(account)
        } else {
          const contract = new Contract(address, Erc20Abi, getProviderOrSigner(provider, account))
          console.log('useBalance contract', provider, contract)
          balance = await contract.balanceOf(account)
        }
        console.log('balance', balance, token)
        setBalance(toThousand(fromWei(balance.toString())))
      } catch (error) {
        console.log('useBalance error', error)

        if (typeof error === 'string') {
          return toast.error(error)
        }
        const txError = { ...(error as MetamaskError) }
        for (const key in txError) {
          console.log(`error: ${key}:`, txError[key as keyof MetamaskError])
        }
        // 错误处理
        toast.error(txError.reason)
      }

      toggleLoading(false)
    },
    [account, provider],
  )

  return { balance, fetch, loading }
}
