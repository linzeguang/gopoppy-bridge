/*
 * @Author: linzeguang
 * @Date: 2022-09-02 10:43:45
 * @LastEditTime: 2022-09-02 13:31:43
 * @LastEditors: linzeguang
 * @Description: layout header
 */
import React from 'react'
import { FlexRow } from 'zewide'

import styled from '@emotion/styled'

import { ConnectWallet, LogoText } from '../components'

const HeaderWrapper = styled(FlexRow)`
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.layout.header.backgroundColor};
`.withComponent('header')

const AppHeader: React.FC = () => {
  return (
    <HeaderWrapper height={[56]} p={['0 15px']}>
      <LogoText />
      <ConnectWallet />
    </HeaderWrapper>
  )
}

export default AppHeader
