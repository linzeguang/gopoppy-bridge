/*
 * @Author: linzeguang
 * @Date: 2022-09-02 13:09:12
 * @LastEditTime: 2022-09-03 00:15:56
 * @LastEditors: linzeguang
 * @Description: 钱包连接
 */
import React, { useContext } from 'react'
import { encrypt } from 'zewide'

import styled from '@emotion/styled'
import { useWeb3React } from '@web3-react/core'

import { ConnectContext } from '../provider'
import { Icon } from '../svgr'

import Button from './Button'
import { PingFangSCSemibold } from './Font'

const ConnectButton = styled(Button)`
  grid-gap: 8px;
  padding: 6px 12px;
  font-size: 16px;

  svg {
    width: 20px;
    height: 20px;
  }
`

const ConnectorImage = styled.img`
  width: 20px;
  height: 20px;
`

const ConnectWallet: React.FC = () => {
  const { isActive, account } = useWeb3React()
  const { onPresentConnect, onPresentInfo, connectedConnection } =
    useContext(ConnectContext)

  if (isActive && account) {
    return (
      <ConnectButton onClick={onPresentInfo}>
        {connectedConnection && (
          <ConnectorImage src={connectedConnection.icon} />
        )}
        <PingFangSCSemibold>{encrypt(account)}</PingFangSCSemibold>
      </ConnectButton>
    )
  }

  return (
    <ConnectButton onClick={onPresentConnect}>
      <Icon.Wallet />
      <PingFangSCSemibold>Connect Wallet</PingFangSCSemibold>
    </ConnectButton>
  )
}

export default ConnectWallet
