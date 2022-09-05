/*
 * @Author: linzeguang
 * @Date: 2022-09-02 03:10:03
 * @LastEditTime: 2022-09-05 21:14:22
 * @LastEditors: linzeguang
 * @Description: 交易组件
 */
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateEffect } from 'ahooks'
import BigNumber from 'bignumber.js'
import { useComputed, useModel } from 'foca'
import { toWei } from 'web3-utils'

import { useBalance, useConfig, useToken, useTransfer } from '@/api/contract'
import { Token } from '@/constants'
import { BasicModel } from '@/models'
import { ConnectContext } from '@/provider'
import { useWeb3React } from '@web3-react/core'

import { Card } from '../Common'

import LimitError from './LimitError'
import LimitTips from './LimitTips'
import ReciveAddress from './ReciveAddress'
import { CenterWrapper, Convert, Fee, Input, Submit } from './styled'
import TransferControl from './TransferControl'

const Transfer: React.FC = () => {
  const { t } = useTranslation()
  const { account, isActive } = useWeb3React()
  const { onPresentConnect } = useContext(ConnectContext)
  const { bridgePair } = useModel(BasicModel)
  const { fromTokens } = useComputed(BasicModel.bridgeChain)
  const { tokens, fetch: fetchTokens, loading: tokenLoading } = useToken()
  const { config, fetch: fetchConfig } = useConfig()
  const { balance, fetch: fetchBalance, loading: balanceLoading } = useBalance()
  const { transfer, loading: transferLoading } = useTransfer()

  const [fromToken, setFromToken] = useState<Token>(fromTokens[0])
  const [toToken, setToToken] = useState<Token>()
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')

  const [fromChain, toChain] = bridgePair

  useEffect(() => {
    // 获取目标链token
    fetchTokens(fromToken.address)
    // 获取当前交易token限额费率配置
    fetchConfig(fromToken.address)
  }, [fetchBalance, fetchConfig, fetchTokens, fromToken, fromToken.address])

  useEffect(() => {
    // 获取当前链token balance
    fetchBalance(fromToken)
  }, [fetchBalance, fromToken])

  useUpdateEffect(() => {
    setToToken(tokens && tokens[0])
  }, [tokens])

  useUpdateEffect(() => {
    setFromToken(fromTokens[0])
  }, [fromTokens])

  const handleInput = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target
    setAmount(value)
  }, [])

  const fee = useMemo(() => {
    if (!config || !amount) return ''
    return new BigNumber(config.txFeeInMillion)
      .multipliedBy(amount)
      .plus(fromToken.fee || 0)
      .toString()
  }, [amount, config, fromToken.fee])

  const toAmount = useMemo(() => {
    if (!amount) return ''
    const _amount = new BigNumber(amount).minus(fee).toString()
    if (Number(_amount) < 0) return '0'
    return _amount
  }, [amount, fee])

  const overLimit = useMemo(() => {
    return (
      Number(amount) < Number(config?.minAmountPerTx) ||
      Number(amount) > Number(config?.maxAmountPerTx)
    )
  }, [amount, config?.maxAmountPerTx, config?.minAmountPerTx])

  const handleSubmit = useCallback(() => {
    if (!isActive) return onPresentConnect()

    if (!account || !amount || !toToken) return

    transfer(toWei(amount), address || account, toChain.chainId, fromToken, toToken)
  }, [
    account,
    address,
    amount,
    fromToken,
    isActive,
    onPresentConnect,
    toChain.chainId,
    toToken,
    transfer,
  ])

  return (
    <Card loading={transferLoading}>
      <TransferControl
        direction='From'
        chain={fromChain}
        tokens={fromTokens}
        token={fromToken}
        balance={balance}
        balanceLoading={balanceLoading}
        onChangeToken={(token) => setFromToken(token)}
        renderTips={() => config && <LimitTips config={config} token={fromToken} />}
      >
        <Input
          placeholder='0'
          min={config?.minAmountPerTx}
          max={config?.maxAmountPerTx}
          value={amount}
          onChange={handleInput}
        />
        {config && <LimitError amount={amount} config={config} />}
      </TransferControl>
      <CenterWrapper>
        <Convert />
        <Fee>
          {t('fee')} {fee || '--'}
        </Fee>
      </CenterWrapper>
      <TransferControl
        direction='To'
        chain={toChain}
        tokens={tokens}
        token={toToken}
        tokenLoading={tokenLoading}
        onChangeToken={(token) => setToToken(token)}
      >
        <Input placeholder='0' readOnly value={toAmount} />
        <ReciveAddress value={address} onChange={(ev) => setAddress(ev.target.value)} />
      </TransferControl>
      <Submit
        disabled={!isActive ? isActive : !amount || !toToken || overLimit || transferLoading}
        onClick={handleSubmit}
      >
        {t('start')}
      </Submit>
    </Card>
  )
}

export default Transfer
