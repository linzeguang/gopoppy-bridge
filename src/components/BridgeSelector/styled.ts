/*
 * @Author: linzeguang
 * @Date: 2022-09-03 14:41:12
 * @LastEditTime: 2022-09-03 16:10:24
 * @LastEditors: linzeguang
 * @Description:
 */
import { FlexRow, Grid } from 'zewide'

import { Icon } from '@/svgr'
import styled from '@emotion/styled'

import { Button } from '../Common'

export const BridgeButton = styled(Button)`
  justify-content: space-between;
`

export const Choose = styled(Icon.ChooseFilled)`
  width: 22px;
  height: 22px;
`

export const ArrowRight = styled(Icon.ArrowDownFilled)`
  width: 12px;
  height: 12px;
  fill: #fff;
  transition: all ${({ theme }) => theme.duration}s;
`

export const PairRow = styled(FlexRow)`
  position: relative;
  align-items: center;
  grid-gap: 8px;
  cursor: pointer;

  ${Choose} {
    position: absolute;
    right: 0;
  }
`

export const ChainInfo = styled(FlexRow)`
  align-items: center;
  grid-gap: 4px;
`

export const ChainLogo = styled.img`
  width: 20px;
  height: 20px;
`

export const PairWrapper = styled(Grid)`
  grid-gap: 15px;
  ${PairRow} {
    padding: 10px 0;
  }
`
