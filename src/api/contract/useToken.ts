/*
 * @Author: linzeguang
 * @Date: 2022-09-02 02:31:45
 * @LastEditTime: 2022-09-06 00:01:36
 * @LastEditors: linzeguang
 * @Description:
 */
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDebounceFn } from 'ahooks'
import { useComputed } from 'foca'

import { Token, TOKENS } from '../../constants'
import { BasicModel } from '../../models'

import { MetamaskError } from './types'
import useBridgeContract from './useBridgeContract'

export default function useToken() {
  const { getContractTo } = useBridgeContract()
  const { fromChain, toChain } = useComputed(BasicModel.bridgeChain)
  const [loading, toggleLoading] = useState(true)
  const [tokens, setTokens] = useState<{ [key: string]: Token[] }>({})

  const { run: fetch } = useDebounceFn(
    async (fromTokens: Token[]) => {
      toggleLoading(true)
      try {
        const toAddresses = await Promise.all(
          fromTokens.map((token) =>
            getContractTo(fromChain.chainId, token.address, toChain.chainId),
          ),
        )
        console.log('获取原链代币对应目标链对代币 => toAddresses:', toAddresses)
        fromTokens.map((token, index) =>
          setTokens((prev) => ({
            ...prev,
            [token.address]: Object.values(TOKENS[toChain.chainId]).filter((info) =>
              toAddresses[index].includes(info.address),
            ),
          })),
        )
      } catch (error) {
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

  return { tokens, loading, fetch }
}
