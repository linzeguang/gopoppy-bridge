/*
 * @Author: 林泽广
 * @Date: 2022-06-07 16:07:39
 * @LastEditTime: 2022-09-02 13:31:54
 * @LastEditors: linzeguang
 * @Description: Logo + 文字
 */

import { FlexRow } from 'zewide'

import styled from '@emotion/styled'

import { Logo } from '../svgr'

import { PingFangSCSemibold } from './Font'

const Text = styled(PingFangSCSemibold)`
  margin-left: 8px;
  font-size: 18px;
  color: #fff;
`

const BridgeIcon = styled(Logo.Bridge)`
  width: 32px;
  height: 32px;
`

const LogoText: React.FC = () => {
  return (
    <FlexRow alignItems='center'>
      <BridgeIcon />
      <Text>GoPoppy</Text>
    </FlexRow>
  )
}

export default LogoText
