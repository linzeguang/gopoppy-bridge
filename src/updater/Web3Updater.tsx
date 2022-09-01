/*
 * @Author: linzeguang
 * @Date: 2022-09-01 16:19:58
 * @LastEditTime: 2022-09-01 19:29:01
 * @LastEditors: linzeguang
 * @Description: web3 updater
 */

import React, { useContext, useEffect } from 'react'
import { useUpdateEffect } from 'ahooks'

import { useWeb3React } from '@web3-react/core'

import { StoreContext } from '../widgets'

const Web3Updater: React.FC = () => {
  const { connector, chainId } = useWeb3React()
  const { fromChain } = useContext(StoreContext)

  // 自动连接
  useEffect(() => {
    connector.connectEagerly && connector.connectEagerly()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useUpdateEffect(() => {
    const { label, chainLogo, ...params } = fromChain
    chainId !== params.chainId && connector.activate(params)
  }, [chainId, connector, fromChain])

  return null
}

export default Web3Updater
