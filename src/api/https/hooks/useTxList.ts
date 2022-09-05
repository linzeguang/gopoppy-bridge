/*
 * @Author: linzeguang
 * @Date: 2022-09-03 22:37:01
 * @LastEditTime: 2022-09-05 19:52:28
 * @LastEditors: linzeguang
 * @Description: 获取交易列表
 */

import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useInterval } from 'ahooks'

import { useWeb3React } from '@web3-react/core'

import { http } from '../service'
import { Response, TXData } from '../types'

export default function useTxList() {
  const { account } = useWeb3React()
  const [loading, toggleLoading] = useState(false)
  const [errorsCount, setErrorsCount] = useState(0)
  const [txList, updateTxList] = useState<TXData[]>([])

  const fetch = useCallback(async () => {
    if (!account) return
    if (!txList.length) toggleLoading(true)

    try {
      const res = await http.post<Response<TXData[]>>('/web/bridge/txList', {
        wallet: account,
      })
      if (!res || res.code !== 200 || !res.data) throw res
      updateTxList(res.data)
      setErrorsCount(0)
    } catch (error) {
      if (errorsCount >= 5) {
        toast.error((error as any).message)
        toggleLoading(false)
        return
      } else {
        setErrorsCount(errorsCount + 1)
      }
    }
    setTimeout(() => {
      fetch()
    }, 5000)
    toggleLoading(false)
  }, [account, errorsCount, txList.length])

  return { loading, txList, fetch }
}
