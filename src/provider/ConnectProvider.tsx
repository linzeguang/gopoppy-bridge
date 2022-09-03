/*
 * @Author: linzeguang
 * @Date: 2022-09-02 13:49:47
 * @LastEditTime: 2022-09-03 15:00:21
 * @LastEditors: linzeguang
 * @Description: 钱包连接modal
 */
import React, { createContext, PropsWithChildren, useMemo } from 'react'
import { encrypt, FlexRow, Grid, Handler, Modal, useLocalStorage, useModal } from 'zewide'

import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import { useWeb3React } from '@web3-react/core'

import { Button, PingFangSCSemibold, SFProTextMedium, SFProTextRegular } from '../components'
import { BRIDGECHAINS, connections, CONNECTOR, ConnectorInfo } from '../constants'
import { useAuth } from '../hooks'

const ConnectButton = styled(Button)`
  height: 44px;
  justify-content: flex-start;
`

ConnectButton.defaultProps = {
  variant: 'text',
  textColor: 'white',
}

const WalletImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`

const InfoMain = styled(Grid)`
  ${SFProTextRegular} {
    color: ${({ theme }) => theme.colors.grey};
  }
  ${WalletImage} {
    width: 20px;
    height: 20px;
    margin-right: 0;
  }
  ${Button} {
    width: 120px;
    margin: 20px auto 0;
    justify-content: center;
  }
`

export interface ConnectState {
  connectedConnection?: ConnectorInfo

  onPresentConnect: Handler
  onDismissConnect: Handler
  connectModal: boolean

  onPresentInfo: Handler
  onDismissInfo: Handler
  infoModal: boolean
}

export const ConnectContext = createContext<ConnectState>({
  onPresentConnect: () => null,
  onDismissConnect: () => null,
  connectModal: false,
  onPresentInfo: () => null,
  onDismissInfo: () => null,
  infoModal: false,
})

const ConnectProvider: React.FC<PropsWithChildren> = (props) => {
  const { login, logout } = useAuth()
  const { account, chainId } = useWeb3React()
  const [selectedConnector] = useLocalStorage<CONNECTOR | null>('selectedConnector', null)

  const connectedConnection = useMemo(
    () => connections.find((connection) => connection.type === selectedConnector),
    [selectedConnector],
  )

  const chainInfo = useMemo(() => Object.values(BRIDGECHAINS).find((info) => info.chainId === chainId), [chainId])

  const connectedInfo = useMemo(
    () => [
      {
        label: 'Wallet',
        render: () => (
          <FlexRow alignItems='center' gridGap='4px'>
            <WalletImage src={connectedConnection?.icon} />
            <SFProTextMedium>{connectedConnection?.name}</SFProTextMedium>
          </FlexRow>
        ),
      },
      {
        label: 'Network',
        render: () => (
          <FlexRow alignItems='center' gridGap='4px'>
            <WalletImage src={chainInfo?.chainLogo} />
            <SFProTextMedium>
              {chainInfo?.label}({chainInfo?.chainId})
            </SFProTextMedium>
          </FlexRow>
        ),
      },
      {
        label: 'Account Address',
        value: account ? encrypt(account) : '--',
      },
    ],
    [
      account,
      chainInfo?.chainId,
      chainInfo?.chainLogo,
      chainInfo?.label,
      connectedConnection?.icon,
      connectedConnection?.name,
    ],
  )

  const [onPresentConnect, onDismissConnect, connectModal] = useModal(
    <Modal title='Connect Wallet' width='calc(100vw - 30px)'>
      <Grid gridGap='15px'>
        {connections.map((connection) => (
          <ConnectButton
            key={connection.name}
            onClick={() =>
              login(connection).then((connected) => {
                connected && onDismissConnect()
              })
            }
          >
            <WalletImage src={connection.icon} />
            <PingFangSCSemibold>{connection.name}</PingFangSCSemibold>
          </ConnectButton>
        ))}
      </Grid>
    </Modal>,
  )

  const [onPresentInfo, onDismissInfo, infoModal] = useModal(
    <Modal title='Wallet Info' width='calc(100vw - 30px)'>
      <InfoMain gridGap='10px'>
        {connectedInfo.map((info) => (
          <FlexRow key={info.label} alignItems='center' justifyContent='space-between'>
            <SFProTextRegular>{info.label}：</SFProTextRegular>
            {info.render ? info.render() : <SFProTextMedium>{info.value}</SFProTextMedium>}
          </FlexRow>
        ))}
        <Button onClick={() => logout().then(() => onDismissInfo())}>
          <PingFangSCSemibold>Disconnect</PingFangSCSemibold>
        </Button>
      </InfoMain>
    </Modal>,
  )

  return (
    <React.Fragment>
      <Global
        styles={css`
          .modal-close {
            fill: #fff;
          }
          .modal-title {
            color: #fff;
          }
        `}
      />
      <ConnectContext.Provider
        value={{
          connectedConnection,
          onPresentConnect,
          onDismissConnect,
          connectModal,
          onPresentInfo,
          onDismissInfo,
          infoModal,
        }}
        {...props}
      />
    </React.Fragment>
  )
}

export default ConnectProvider
