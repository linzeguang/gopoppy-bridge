/*
 * @Author: linzeguang
 * @Date: 2022-07-08 14:09:24
 * @LastEditTime: 2022-09-05 19:23:10
 * @LastEditors: linzeguang
 * @Description:
 */

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDebounceFn } from 'ahooks'

import { CHAIN, CHAINS, PAIRS } from '@/constants'
import { useAuth } from '@/hooks'
import { BasicModel } from '@/models'
import { useWeb3React } from '@web3-react/core'

import { useTxList } from '../https'

import { MetamaskError } from './types'
import useBridgeContract from './useBridgeContract'

interface ClaimParams {
  signature: string
  fromChainId: number
  fromTokenContractAddress: string //原链上的代币合约地址（若是主网币，地址为0x0000000000000000000000000000000000000000）
  fromTxId: string //原链上的发送的跨链交易的交易hash值
  toTokenContractAddress: string //目标链上的代币合约地址（若是主网币，地址为0x0000000000000000000000000000000000000000）
  toAddress: string // 目标链的接收钱包地址
  amount: string //能够提取的代币数量
}

export default function useClaim() {
  const { chainId } = useWeb3React()
  const { switchChain } = useAuth()
  const { claim } = useBridgeContract()
  const { fetch: fetchTxList } = useTxList()

  const [loading, toggleLoading] = useState(false)

  const { run: fetch } = useDebounceFn(
    async (params: ClaimParams, toChainId: CHAIN) => {
      console.log('claim token => params: ', params, claim)
      toggleLoading(true)

      let switchStatus: boolean = true
      if (chainId !== toChainId) {
        const bridgrPair = PAIRS.find((pair) => pair[0].chainId === toChainId)
        switchStatus = await switchChain(CHAINS[toChainId])
        switchStatus && bridgrPair && BasicModel.updateBridgePair(bridgrPair)
        return toggleLoading(false)
      }

      try {
        const tx = await claim(
          params.signature,
          params.fromChainId,
          params.fromTokenContractAddress,
          params.fromTxId,
          params.toTokenContractAddress,
          params.toAddress,
          params.amount,
        )
        await tx.wait()
        toast.success('Claim success')
        fetchTxList()
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

  return { fetch, loading }
}
