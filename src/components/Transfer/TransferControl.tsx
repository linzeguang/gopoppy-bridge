/*
 * @Author: linzeguang
 * @Date: 2022-09-04 14:00:00
 * @LastEditTime: 2022-09-04 23:46:07
 * @LastEditors: linzeguang
 * @Description: Transfer Control
 */
import React, { PropsWithChildren, useMemo, useState } from 'react'
import { Box, FlexRow } from 'zewide'

import { BridgeChain, Token } from '@/constants'

import { ArrowDown, InjectValue, Selector, SFProTextMedium } from '../Common'

import {
  Balance,
  ChainInfo,
  Direction,
  DirectionRow,
  Image,
  TokenButton,
  TokenControl,
} from './styled'

type TokenOption = Token & InjectValue

interface Props {
  direction: string
  chain: BridgeChain
  tokens: Token[]
  token?: Token
  balance?: string
  renderTips?: () => React.ReactNode
  onChangeToken: (token: Token) => void
}

const TransferControl: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children, direction, chain, tokens, token, balance, renderTips, onChangeToken } = props
  const [visible, toggleVisible] = useState(false)

  const tokenOptions = useMemo<TokenOption[]>(
    () =>
      tokens.map((token) => ({
        ...token,
        value: token.address,
      })),
    [tokens],
  )

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
              <TokenButton>
                <Image src={token?.icon} />
                <SFProTextMedium>{token?.symbol}</SFProTextMedium>
                <ArrowDown style={{ transform: `rotateX(${visible ? '180deg' : '0'} )` }} />
              </TokenButton>
            </Selector>
            {renderTips && renderTips()}
          </FlexRow>
          {balance && <Balance>Balance: {balance}</Balance>}
        </FlexRow>
        {children}
      </TokenControl>
    </Box>
  )
}

export default TransferControl
