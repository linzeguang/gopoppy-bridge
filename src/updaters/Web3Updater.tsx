/*
 * @Author: linzeguang
 * @Date: 2022-09-01 16:19:58
 * @LastEditTime: 2022-09-02 01:23:15
 * @LastEditors: linzeguang
 * @Description: web3 updater
 */
import React from 'react'
import toast from 'react-hot-toast'
import { useStorageState } from 'react-storage-hooks'
import { useMount, useUpdateEffect } from 'ahooks'
import { useComputed } from 'foca'

import { useWeb3React } from '@web3-react/core'

import { CONNECTOR } from '../constant'
import { BasicModel } from '../models'

const Web3Updater: React.FC = () => {
  const [selectedConnector] = useStorageState<CONNECTOR | null>(
    localStorage,
    'selectedConnector',
    null,
  )
  const { connector, chainId } = useWeb3React()
  const { fromChain } = useComputed(BasicModel.bridgeChain)

  // 自动连接
  useMount(async () => {
    try {
      if (selectedConnector && connector.connectEagerly)
        await connector.connectEagerly()
    } catch (error) {
      toast.error('Failed to connect eagerly')
    }
  })

  useUpdateEffect(() => {
    const { label, chainLogo, ...params } = fromChain
    chainId && chainId !== params.chainId && connector.activate(params)
  }, [chainId, connector, fromChain])

  return null
}

export default Web3Updater
