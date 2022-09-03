/*
 * @Author: linzeguang
 * @Date: 2022-09-02 13:09:12
 * @LastEditTime: 2022-09-03 14:43:41
 * @LastEditors: linzeguang
 * @Description: 钱包连接
 */
import React, { useContext } from 'react'
import { encrypt } from 'zewide'

import { ConnectContext } from '@/provider'
import { Icon } from '@/svgr'
import { useWeb3React } from '@web3-react/core'

import { PingFangSCSemibold } from '../Common'

import { ConnectButton, ConnectorImage } from './styled'

const ConnectWallet: React.FC = () => {
  const { isActive, account } = useWeb3React()
  const { onPresentConnect, onPresentInfo, connectedConnection } = useContext(ConnectContext)

  if (isActive && account) {
    return (
      <ConnectButton onClick={onPresentInfo}>
        {connectedConnection && <ConnectorImage src={connectedConnection.icon} />}
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
