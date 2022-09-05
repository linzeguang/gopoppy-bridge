/*
 * @Author: linzeguang
 * @Date: 2022-09-04 00:18:42
 * @LastEditTime: 2022-09-05 21:08:11
 * @LastEditors: linzeguang
 * @Description:
 */
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateEffect } from 'ahooks'
import dayjs from 'dayjs'
import { fromWei } from 'web3-utils'
import { encrypt, FlexRow } from 'zewide'

import { useClaim } from '@/api/contract'
import { StatusColor, StatusEnum, TXData } from '@/api/https'
import { BRIDGECHAINS, TOKENS } from '@/constants'
import { useTheme } from '@emotion/react'

import { Button } from '../Common'

import { Info, InfoGrid, InfoWrapper, Label, Link, TokenImage, TopInfo, Value } from './styled'

interface InfoProps {
  label: string
  accessorKey: keyof TXData
  value?: string
  renderValue?: React.ReactNode
}

const RecordItem: React.FC<
  TXData & {
    onCliam: (loading: boolean) => void
  }
> = (props) => {
  const {
    tx_hash,
    token,
    amount,
    chain_id,
    from_addr,
    in_time,
    out_time,
    to_address,
    to_chain_id,
    to_contract_address,
    status,
    signature,
    onCliam,
  } = props
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { loading, fetch: fetchClaim } = useClaim()

  const chainInfo = useMemo(() => BRIDGECHAINS[chain_id], [chain_id])
  const toChainInfo = useMemo(() => BRIDGECHAINS[to_chain_id], [to_chain_id])
  const tokenInfo = useMemo(
    () => Object.values(TOKENS[chain_id]).find((config) => config.address === token),
    [chain_id, token],
  )
  const infos = useMemo<InfoProps[]>(
    () => [
      {
        label: `${t('from')}(${chainInfo?.label})`,
        accessorKey: 'from_addr',
        value: encrypt(from_addr, 4, 4),
      },
      {
        label: t('token'),
        accessorKey: 'token',
        renderValue: (
          <FlexRow gridGap='4px'>
            {tokenInfo?.icon && <TokenImage src={tokenInfo.icon} />}
            <Value>{tokenInfo?.symbol || '--'}</Value>
          </FlexRow>
        ),
      },
      { label: t('amount'), accessorKey: 'amount', value: fromWei(amount).toString() },
      {
        label: `${t('to')}(${toChainInfo?.label})`,
        accessorKey: 'to_address',
        value: encrypt(to_address, 4, 4),
      },
    ],
    [
      t,
      chainInfo?.label,
      from_addr,
      tokenInfo?.icon,
      tokenInfo?.symbol,
      amount,
      toChainInfo?.label,
      to_address,
    ],
  )

  const handleClaim = useCallback(
    () =>
      fetchClaim(
        {
          signature: signature,
          fromChainId: chain_id,
          fromTokenContractAddress: token, //原链上的代币合约地址（若是主网币，地址为0x0000000000000000000000000000000000000000）
          fromTxId: tx_hash, //原链上的发送的跨链交易的交易hash值
          toTokenContractAddress: to_contract_address, //目标链上的代币合约地址（若是主网币，地址为0x0000000000000000000000000000000000000000）
          toAddress: to_address, // 目标链的接收钱包地址
          amount: amount, //能够提取的代币数量
        },
        to_chain_id,
      ),
    [
      amount,
      chain_id,
      fetchClaim,
      signature,
      to_address,
      to_chain_id,
      to_contract_address,
      token,
      tx_hash,
    ],
  )

  const renderStatus = useCallback(() => {
    // 判断当前链是否为可认领链
    const isClaim = status === StatusEnum.Claim && signature

    const statusText = (
      status === StatusEnum.Claim
        ? StatusEnum[signature ? StatusEnum.Withdraw : StatusEnum.Pending]
        : StatusEnum[status]
    ) as keyof typeof StatusColor
    const color = colors[StatusColor[statusText]]

    if (isClaim)
      return (
        <Info className='status'>
          <Button onClick={handleClaim}>{StatusEnum[status]}</Button>
        </Info>
      )

    return (
      <Info className='status'>
        <Label>{t('status')}</Label>
        <Value style={{ color }}>{statusText}</Value>
      </Info>
    )
  }, [colors, handleClaim, signature, status, t])

  useUpdateEffect(() => {
    onCliam(loading)
  }, [onCliam, loading])

  return (
    <InfoWrapper>
      <TopInfo>
        <Label>{dayjs(Number(out_time || in_time) * 1000).format('MM-DD HH:mm')}</Label>
        <Link href={`${chainInfo?.blockExplorerUrls?.[0]}tx/${tx_hash}`} target='_blank'>
          {encrypt(tx_hash, 8, 4)}
        </Link>
      </TopInfo>
      <InfoGrid>
        {infos.map(({ accessorKey, label, value, renderValue }) => (
          <Info key={accessorKey}>
            <Label>{label}</Label>
            {renderValue ? renderValue : <Value>{value || props[accessorKey]}</Value>}
          </Info>
        ))}
        {renderStatus()}
      </InfoGrid>
    </InfoWrapper>
  )
}

export default RecordItem
