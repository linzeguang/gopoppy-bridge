/*
 * @Author: linzeguang
 * @Date: 2022-09-02 03:23:46
 * @LastEditTime: 2022-09-02 10:35:48
 * @LastEditors: linzeguang
 * @Description:
 */

import { useState } from 'react'
import { useDebounceFn } from 'ahooks'
import BigNumber from 'bignumber.js'
import { useComputed } from 'foca'
import { fromWei } from 'web3-utils'

import { BasicModel } from '../../models'

import { BridgeConfig } from './types'
import useBridgeContract from './useBridgeContract'

export default function useConfig() {
  const { getContract } = useBridgeContract()
  const { fromChain } = useComputed(BasicModel.bridgeChain)
  const [config, setConfig] = useState<Record<keyof BridgeConfig, string>>()

  const { run: fetch } = useDebounceFn(
    async (address: string) => {
      try {
        console.log('获取原链合约Transfer配置 => address:', address)

        const { maxAmountPerTx, minAmountPerTx, transferAmount, txFeeInMillion } =
          await getContract(fromChain.chainId, address)
        setConfig({
          maxAmountPerTx: fromWei(maxAmountPerTx.toString()),
          minAmountPerTx: fromWei(minAmountPerTx.toString()),
          transferAmount: fromWei(transferAmount.toString()),
          txFeeInMillion: new BigNumber(txFeeInMillion.toString()).dividedBy(1000000).toString(),
        })
      } catch (error) {
        // 错误处理
      }
    },
    { wait: 200 },
  )

  return { config, fetch }
}
