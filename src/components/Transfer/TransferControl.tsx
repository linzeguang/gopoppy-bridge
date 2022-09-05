/*
 * @Author: linzeguang
 * @Date: 2022-09-04 14:00:00
 * @LastEditTime: 2022-09-05 21:16:10
 * @LastEditors: linzeguang
 * @Description: Transfer Control
 */
import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, FlexRow } from 'zewide'

import { BridgeChain, Token } from '@/constants'
import { useWeb3React } from '@web3-react/core'

import {
  ArrowDown,
  BalanceLoader,
  InjectValue,
  Selector,
  SFProTextMedium,
  TokenLoader,
} from '../Common'

import {
  Balance,
  ChainInfo,
  Direction,
  DirectionRow,
  Image,
  TokenButton,
  TokenControl,
  TokenSymbol,
} from './styled'

type TokenOption = Token & InjectValue

interface Props {
  direction: string
  chain: BridgeChain
  tokens: Token[]
  token?: Token
  tokenLoading?: boolean
  balance?: string
  balanceLoading?: boolean
  renderTips?: () => React.ReactNode
  onChangeToken: (token: Token) => void
}

const TransferControl: React.FC<PropsWithChildren<Props>> = (props) => {
  const {
    children,
    direction,
    chain,
    tokens,
    token,
    tokenLoading,
    balance,
    balanceLoading,
    renderTips,
    onChangeToken,
  } = props
  const { t } = useTranslation()
  const { isActive } = useWeb3React()
  const [visible, toggleVisible] = useState(false)

  const tokenOptions = useMemo<TokenOption[]>(
    () =>
      tokens.map((token) => ({
        ...token,
        value: token.address,
      })),
    [tokens],
  )

  const renderToken = useCallback(() => {
    if (tokenLoading) return <TokenLoader />
    if (token)
      return (
        <TokenButton>
          <Image src={token.icon} />
          <TokenSymbol>{token.symbol}</TokenSymbol>
          {tokenOptions.length > 1 && (
            <ArrowDown style={{ transform: `rotateX(${visible ? '180deg' : '0'} )` }} />
          )}
        </TokenButton>
      )
    return <TokenSymbol>{t('no_transfer_tokens_available')}</TokenSymbol>
  }, [t, token, tokenLoading, tokenOptions.length, visible])

  const renderBalance = useCallback(() => {
    if (!isActive) return null
    if (balance === undefined) return null
    if (balanceLoading) return <BalanceLoader />
    return (
      <Balance>
        {t('balance')} {balance}
      </Balance>
    )
  }, [balance, balanceLoading, isActive, t])

  return (
    <Box>
      <DirectionRow>
        <Direction>{direction}</Direction>
        <ChainInfo>
          <Image src={chain.chainLogo} />
          <SFProTextMedium>{chain.label}</SFProTextMedium>
        </ChainInfo>
      </DirectionRow>
      <TokenControl>
        <FlexRow alignItems='center' justifyContent='space-between'>
          <FlexRow alignItems='center' justifyContent='space-between' gridGap='6px'>
            <Selector<TokenOption>
              id={`token-select-${direction}`}
              title='Token Select'
              options={tokenOptions}
              selected={token && { ...token, value: token.address }}
              renderOption={(params) => (
                <>
                  <Image src={params.icon} />
                  <SFProTextMedium>{params.symbol}</SFProTextMedium>
                </>
              )}
              onSelect={({ value, ...rest }, callback) => {
                onChangeToken(rest)
                callback()
              }}
              onVisibleChange={toggleVisible}
            >
              {renderToken()}
            </Selector>
            {renderTips && renderTips()}
          </FlexRow>
          {renderBalance()}
        </FlexRow>
        {children}
      </TokenControl>
    </Box>
  )
}

export default TransferControl
