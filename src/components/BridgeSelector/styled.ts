/*
 * @Author: linzeguang
 * @Date: 2022-09-03 14:41:12
 * @LastEditTime: 2022-09-03 20:50:16
 * @LastEditors: linzeguang
 * @Description:
 */
import { FlexRow } from 'zewide'

import { Icon } from '@/svgr'
import styled from '@emotion/styled'

import { Button } from '../Common'

export const BridgeButton = styled(Button)`
  width: 100%;
  height: 40px;
  justify-content: space-between;
`

export const ArrowRight = styled(Icon.ArrowDownFilled)`
  width: 12px;
  height: 12px;
  fill: #fff;
  transition: all ${({ theme }) => theme.duration}s;
`

export const ChainInfo = styled(FlexRow)`
  align-items: center;
  grid-gap: 4px;
`

export const ChainLogo = styled.img`
  width: 20px;
  height: 20px;
`
