/*
 * @Author: linzeguang
 * @Date: 2022-09-01 16:19:58
 * @LastEditTime: 2022-09-03 14:58:52
 * @LastEditors: linzeguang
 * @Description: web3 updater
 */
import React from 'react'
import toast from 'react-hot-toast'
import { useMount } from 'ahooks'
import { useLocalStorage } from 'zewide'

import { useWeb3React } from '@web3-react/core'

import { CONNECTOR } from '../constants'

const Web3Updater: React.FC = () => {
  const { connector } = useWeb3React()
  const [selectedConnector] = useLocalStorage<CONNECTOR | null>('selectedConnector', null)

  // 自动连接
  useMount(async () => {
    try {
      if (selectedConnector && connector.connectEagerly) await connector.connectEagerly()
    } catch (error) {
      toast.error('Failed to connect eagerly')
    }
  })

  return null
}

export default Web3Updater
