/*
 * @Author: linzeguang
 * @Date: 2022-09-05 01:14:03
 * @LastEditTime: 2022-09-05 15:45:41
 * @LastEditors: linzeguang
 * @Description: 交易hooks
 */
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { fromWei, toWei } from 'web3-utils'

import { BRIDGEADDRESSES, CHAIN, Erc20Abi, getProviderOrSigner, Token } from '@/constants'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'

import { MetamaskError } from './types'
import useBridgeContract from './useBridgeContract'

export default function useTransfer() {
  const { provider, account, chainId } = useWeb3React()
  const { receiveEther, erc20Transfer } = useBridgeContract()
  const bridgeAddress = BRIDGEADDRESSES[chainId as CHAIN]

  const transfer = useCallback(
    async (
      amount: string,
      toAddress: string | undefined,
      toChainId: CHAIN,
      fromToken: Token,
      toToken: Token,
    ) => {
      if (!provider || !account) return
      let tx: any
      try {
        if (fromToken.type === 'main') {
          console.log('接收当前主链的主网币', toAddress, toChainId, toToken.address, amount)
          tx = await receiveEther(toAddress, toChainId, toToken.address, { value: amount })
        } else {
          const contract = new Contract(
            fromToken.address,
            Erc20Abi,
            getProviderOrSigner(provider, account),
          )

          // 检测合约可操作余额，不足则approve
          const allowance = await contract.allowance(account, bridgeAddress)
          if (Number(fromWei(allowance.toString())) < 10000) {
            const approve = await contract.approve(bridgeAddress, toWei('10000000'))
            await approve.wait()
          }

          console.log(
            '接收当前主链的erc20代币',
            fromToken.address,
            amount,
            toAddress,
            toChainId,
            toToken.address,
          )
          tx = await erc20Transfer(fromToken.address, amount, toAddress, toChainId, toToken.address)
        }
        await tx.wait()
        toast.success('Transfer success')
      } catch (error) {
        if (typeof error === 'string') {
          return toast.error(error)
        }
        const txError = { ...(error as MetamaskError) }
        for (const key in txError) {
          console.log(`error: ${key}:`, txError[key as keyof MetamaskError])
        }
        // 错误处理
        toast.error(txError.data?.message || txError.message || txError.reason)
      }
    },
    [account, bridgeAddress, erc20Transfer, provider, receiveEther],
  )

  return { transfer }
}
