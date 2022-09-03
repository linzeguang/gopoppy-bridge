/*
 * @Author: linzeguang
 * @Date: 2022-09-02 10:43:45
 * @LastEditTime: 2022-09-03 17:18:32
 * @LastEditors: linzeguang
 * @Description: layout header
 */
import React from 'react'
import { FlexRow } from 'zewide'

import styled from '@emotion/styled'

import { ConnectWallet, LogoText } from '../components'

const Headers = styled(FlexRow)`
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.layout.header.backgroundColor};
`.withComponent('header')

const AppHeader: React.FC = () => {
  return (
    <Headers>
      <LogoText />
      <ConnectWallet />
    </Headers>
  )
}

export default AppHeader
