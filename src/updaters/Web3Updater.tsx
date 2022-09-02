/*
 * @Author: linzeguang
 * @Date: 2022-09-01 16:19:58
 * @LastEditTime: 2022-09-02 13:49:29
 * @LastEditors: linzeguang
 * @Description: web3 updater
 */
import React from 'react'
import toast from 'react-hot-toast'
import { useStorageState } from 'react-storage-hooks'
import { useMount } from 'ahooks'

import { useWeb3React } from '@web3-react/core'

import { CONNECTOR } from '../constants'

const Web3Updater: React.FC = () => {
  const { connector } = useWeb3React()
  const [selectedConnector] = useStorageState<CONNECTOR | null>(
    localStorage,
    'selectedConnector',
    null,
  )

  // 自动连接
  useMount(async () => {
    try {
      if (selectedConnector && connector.connectEagerly)
        await connector.connectEagerly()
    } catch (error) {
      toast.error('Failed to connect eagerly')
    }
  })

  return null
}

export default Web3Updater
