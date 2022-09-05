/*
 * @Author: linzeguang
 * @Date: 2022-09-03 14:38:46
 * @LastEditTime: 2022-09-04 20:04:43
 * @LastEditors: linzeguang
 * @Description: 跨链桥选择器
 */
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useModel } from 'foca'
import { FlexRow, Handler } from 'zewide'

import { Pair, PAIRS } from '@/constants'
import { useAuth } from '@/hooks'
import { BasicModel } from '@/models'
import { Icon } from '@/svgr'
import { useWeb3React } from '@web3-react/core'

import { ArrowDown, PingFangSCSemibold, Selector } from '../Common'

import { BridgeButton, ChainInfo, ChainLogo } from './styled'

const BridgePair: React.FC<{
  pair: Pair
}> = ({ pair }) => {
  const [fromChain, toChain] = pair
  return (
    <FlexRow gridGap='8px'>
      <ChainInfo>
        <ChainLogo src={fromChain.chainLogo} />
        <PingFangSCSemibold>{fromChain.label}</PingFangSCSemibold>
      </ChainInfo>
      <Icon.ArrowRight width={20} height={20} />
      <ChainInfo>
        <ChainLogo src={toChain.chainLogo} />
        <PingFangSCSemibold>{toChain.label}</PingFangSCSemibold>
      </ChainInfo>
    </FlexRow>
  )
}

interface PairOption {
  pair: Pair
  value: string
}

const BridgeSelector: React.FC = () => {
  const { t } = useTranslation()
  const { isActive, chainId } = useWeb3React()
  const { switchChain } = useAuth()
  const { bridgePair } = useModel(BasicModel)
  const [visible, toggleVisible] = useState(false)

  const pairOptions = useMemo<PairOption[]>(
    () => PAIRS.map((pair) => ({ pair, value: `${pair[0].chainId}-${pair[1].chainId}` })),
    [],
  )

  const selectedPair = useMemo<PairOption>(
    () => ({
      pair: bridgePair,
      value: `${bridgePair[0].chainId}-${bridgePair[1].chainId}`,
    }),
    [bridgePair],
  )

  const handlePair = useCallback(
    async (option: PairOption, callback: Handler) => {
      const { pair, value } = option
      const { label, chainLogo, ...chain } = pair[0]

      if (value === selectedPair.value) return

      if (isActive) {
        const switched = await switchChain(chain)
        if (chainId === pair[0].chainId || switched) {
          BasicModel.updateBridgePair(pair)
          callback()
        }
      } else {
        BasicModel.updateBridgePair(pair)
        callback()
      }
    },
    [chainId, isActive, selectedPair.value, switchChain],
  )

  return (
    <Selector<PairOption>
      id='bridge-select'
      title={t('bridge_direction')}
      selected={selectedPair}
      options={pairOptions}
      renderOption={({ pair }) => <BridgePair pair={pair} />}
      onSelect={handlePair}
      onVisibleChange={toggleVisible}
    >
      <BridgeButton>
        <BridgePair pair={bridgePair} />
        <ArrowDown style={{ transform: `rotateX(${visible ? '180deg' : '0'} )` }} />
      </BridgeButton>
    </Selector>
  )
}

export default BridgeSelector
