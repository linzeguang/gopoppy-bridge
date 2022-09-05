/*
 * @Author: linzeguang
 * @Date: 2022-09-02 02:31:45
 * @LastEditTime: 2022-09-04 22:29:32
 * @LastEditors: linzeguang
 * @Description:
 */
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useDebounceFn } from 'ahooks'
import { useComputed } from 'foca'

import { TOKENS } from '../../constants'
import { BasicModel } from '../../models'

import { MetamaskError } from './types'
import useBridgeContract from './useBridgeContract'

export default function useToken() {
  const { getContractTo } = useBridgeContract()
  const { fromChain, toChain } = useComputed(BasicModel.bridgeChain)
  const [loading, toggleLoading] = useState(true)
  const [addresses, setAddresses] = useState<string[]>([])

  const { run: fetch } = useDebounceFn(
    async (address: string) => {
      toggleLoading(true)
      try {
        console.log('获取原链代币对应目标链对代币 => address:', address)
        const toAddresses = await getContractTo(fromChain.chainId, address, toChain.chainId)
        console.log('获取原链代币对应目标链对代币 => toAddresses:', toAddresses)
        setAddresses(toAddresses)
      } catch (error) {
        // 错误处理
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
    { wait: 200 },
  )

  const tokens = useMemo(
    () => Object.values(TOKENS[toChain.chainId]).filter((info) => addresses.includes(info.address)),
    [addresses, toChain.chainId],
  )

  return { addresses, tokens, loading, fetch }
}
