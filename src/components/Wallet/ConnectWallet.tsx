/*
 * @Author: linzeguang
 * @Date: 2022-09-02 13:09:12
 * @LastEditTime: 2022-09-03 17:57:22
 * @LastEditors: linzeguang
 * @Description: 钱包连接
 */
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { encrypt } from 'zewide'

import { ConnectContext } from '@/provider'
import { Icon } from '@/svgr'
import { useWeb3React } from '@web3-react/core'

import { PingFangSCSemibold } from '../Common'

import { ConnectButton, ConnectorImage } from './styled'

const ConnectWallet: React.FC = () => {
  const { t } = useTranslation()
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
      <PingFangSCSemibold>{t('connect_wallet')}</PingFangSCSemibold>
    </ConnectButton>
  )
}

export default ConnectWallet
