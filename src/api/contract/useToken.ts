/*
 * @Author: linzeguang
 * @Date: 2022-09-02 02:31:45
 * @LastEditTime: 2022-09-02 10:35:26
 * @LastEditors: linzeguang
 * @Description:
 */
import { useMemo, useState } from 'react'
import { useDebounceFn } from 'ahooks'
import { useComputed } from 'foca'

import { TOKENS } from '../../constants'
import { BasicModel } from '../../models'

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
        const toAddresses = await getContractTo(
          fromChain.chainId,
          address,
          toChain.chainId,
        )
        setAddresses(toAddresses)
      } catch (error) {
        // 错误处理
      }
      toggleLoading(false)
    },
    { wait: 200 },
  )

  const tokens = useMemo(
    () =>
      Object.values(TOKENS[toChain.chainId]).filter((info) =>
        addresses.includes(info.address),
      ),
    [addresses, toChain.chainId],
  )

  return { addresses, tokens, loading, fetch }
}
