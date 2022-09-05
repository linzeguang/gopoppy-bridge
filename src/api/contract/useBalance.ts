/*
 * @Author: linzeguang
 * @Date: 2022-09-04 20:13:54
 * @LastEditTime: 2022-09-06 00:18:22
 * @LastEditors: linzeguang
 * @Description: 获取余额
 */
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDebounceFn } from 'ahooks'
import { fromWei } from 'web3-utils'
import { toThousand } from 'zewide'

import { Erc20Abi, getProviderOrSigner, Token } from '@/constants'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'

import { MetamaskError } from './types'

export default function useBalance() {
  const { provider, account } = useWeb3React()

  const [loading, toggleLoading] = useState(true)
  const [balance, setBalance] = useState('')

  const { run: fetch } = useDebounceFn(
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
          balance = await contract.balanceOf(account)
        }
        console.log('useBalance', token)
        setBalance(toThousand(fromWei(balance.toString())))
      } catch (error) {
        console.log('balance error', address, token)

        if (typeof error === 'string') {
          toast.error(error)
        } else {
          const txError = { ...(error as MetamaskError) }
          for (const key in txError) {
            console.log(`error: ${key}:`, txError[key as keyof MetamaskError])
          }
          // 错误处理
          toast.error(txError.data?.message || txError.message || txError.reason)
        }
      }

      toggleLoading(false)
    },
    { wait: 200 },
  )

  return { balance, fetch, loading }
}
