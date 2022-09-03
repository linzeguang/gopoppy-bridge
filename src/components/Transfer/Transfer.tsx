/*
 * @Author: linzeguang
 * @Date: 2022-09-02 03:10:03
 * @LastEditTime: 2022-09-03 14:19:57
 * @LastEditors: linzeguang
 * @Description: 交易组件
 */
import React, { useEffect, useState } from 'react'
import { useUpdateEffect } from 'ahooks'
import { useComputed } from 'foca'

import { BridgeConfig, useConfig, useToken } from '@/api/contract'
import { BasicModel } from '@/models'

import { TokenSelect } from '../TokenSelect'

const Transfer: React.FC = () => {
  const { fromTokens } = useComputed(BasicModel.bridgeChain)
  const { tokens, fetch: fetchTokens, loading } = useToken()
  const { config, fetch: fetchConfig } = useConfig()
  const [fromAddress, setFromAddress] = useState<string>(fromTokens[0].address)
  const [toAddress, setToAddress] = useState<string>('')

  useEffect(() => {
    // 获取目标链token
    fetchTokens(fromAddress)
    // 获取当前交易token限额费率配置
    fetchConfig(fromAddress)
  }, [fetchConfig, fetchTokens, fromAddress])

  useUpdateEffect(() => {
    setToAddress(tokens[0] ? tokens[0].address : '')
  }, [tokens])

  useUpdateEffect(() => {
    setFromAddress(fromTokens[0].address)
  }, [fromTokens])

  return (
    <div>
      <span>from:</span>
      <TokenSelect
        value={fromAddress}
        tokens={fromTokens}
        onSelect={setFromAddress}
      />
      <span>to:</span>
      <TokenSelect
        value={toAddress}
        tokens={tokens}
        onSelect={setToAddress}
        loading={loading}
      />
      {config &&
        Object.keys(config).map((key) => (
          <div key={key}>
            {key} :{config[key as keyof BridgeConfig]}
          </div>
        ))}
    </div>
  )
}

export default Transfer
