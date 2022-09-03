/*
 * @Author: linzeguang
 * @Date: 2022-09-03 14:38:46
 * @LastEditTime: 2022-09-03 16:57:42
 * @LastEditors: linzeguang
 * @Description: 跨链桥选择器
 */
import React, { useMemo } from 'react'
import { useModel } from 'foca'
import { Modal, useModal } from 'zewide'

import { BridgeChain, PAIRS } from '@/constants'
import { useAuth } from '@/hooks'
import { BasicModel } from '@/models'
import { Icon } from '@/svgr'

import { PingFangSCSemibold } from '../Common'

import {
  ArrowRight,
  BridgeButton,
  ChainInfo,
  ChainLogo,
  Choose,
  PairRow,
  PairWrapper,
} from './styled'

const BridgePair: React.FC<{
  fromChain: BridgeChain
  toChain: BridgeChain
  selected?: boolean
  onClick?: () => void
}> = ({ fromChain, toChain, selected, onClick }) => {
  return (
    <PairRow onClick={() => onClick && onClick()}>
      <ChainInfo>
        <ChainLogo src={fromChain.chainLogo} />
        <PingFangSCSemibold>{fromChain.label}</PingFangSCSemibold>
      </ChainInfo>
      <Icon.ArrowRight width={20} height={20} />
      <ChainInfo>
        <ChainLogo src={toChain.chainLogo} />
        <PingFangSCSemibold>{toChain.label}</PingFangSCSemibold>
      </ChainInfo>
      {selected && <Choose />}
    </PairRow>
  )
}

const BridgeSelector: React.FC = () => {
  const { switchChain } = useAuth()
  const [fromChain, toChain] = useModel(BasicModel).bridgePair

  const selectedPair = useMemo(
    () => `${fromChain.chainId}-${toChain.chainId}`,
    [fromChain.chainId, toChain.chainId],
  )

  const [onPresentPair, onDismissPair, pairModal] = useModal(
    <Modal title='Bridge pair' width='calc(100vw - 30px)'>
      <PairWrapper>
        {PAIRS.map(([from, to]) => {
          const pair = `${from.chainId}-${to.chainId}`
          return (
            <BridgePair
              key={pair}
              fromChain={from}
              toChain={to}
              selected={selectedPair === pair}
              onClick={() => {
                const { label, chainLogo, ...chain } = from
                switchChain(chain).then((switched) => {
                  if (switched) {
                    BasicModel.updateBridgePair([from, to])
                    onDismissPair()
                  }
                })
              }}
            />
          )
        })}
      </PairWrapper>
    </Modal>,
  )

  return (
    <BridgeButton onClick={onPresentPair}>
      <BridgePair fromChain={fromChain} toChain={toChain} />
      <ArrowRight style={{ transform: `rotate(${pairModal ? '180deg' : '0'} )` }} />
    </BridgeButton>
  )
}

export default BridgeSelector
