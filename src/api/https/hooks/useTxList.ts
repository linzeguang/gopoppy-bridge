/*
 * @Author: linzeguang
 * @Date: 2022-09-03 22:37:01
 * @LastEditTime: 2022-09-04 03:54:44
 * @LastEditors: linzeguang
 * @Description: 获取交易列表
 */

import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { useWeb3React } from '@web3-react/core'

import { http } from '../service'
import { Response, TXData } from '../types'

export default function useTxList() {
  const { account } = useWeb3React()
  const [errorsCount, updateErrorsCount] = useState(0)
  const [txList, updateTxList] = useState<TXData[]>([])

  const fetch = useCallback(async () => {
    if (!account) return
    try {
      const res = await http.post<Response<TXData[]>>('/web/bridge/txList', {
        wallet: account,
      })
      if (!res || res.code !== 200 || !res.data) throw res
      updateTxList(res.data)
      updateErrorsCount(0)
    } catch (error) {
      if (errorsCount >= 5) {
        toast.error((error as any).message)
      } else updateErrorsCount(errorsCount + 1)
    }
  }, [account, errorsCount])

  return { txList, fetch }
}
