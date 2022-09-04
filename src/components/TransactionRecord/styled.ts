/*
 * @Author: linzeguang
 * @Date: 2022-09-03 22:14:27
 * @LastEditTime: 2022-09-04 03:15:08
 * @LastEditors: linzeguang
 * @Description:
 */
import { FlexColumn, FlexRow, Grid } from 'zewide'

import styled from '@emotion/styled'

import { PingFangSCSemibold, SFProTextMedium, SFProTextRegular } from '../Common'

export const Title = styled(PingFangSCSemibold)`
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, ${({ theme }) => theme.colors.grey}, transparent) 1;
`

export const Main = styled(Grid)`
  grid-gap: 20px;
  max-height: 50vh;
  margin: 0 -20px;
  padding: 0 20px;
  overflow: scroll;
`

export const InfoWrapper = styled(Grid)`
  grid-gap: 10px;
  padding: 20px;
  background-color: #2a2a2d;
  border-radius: 12px;
`

export const TopInfo = styled(FlexRow)`
  justify-content: space-between;
`

export const Info = styled(FlexColumn)`
  grid-gap: 6px;
`

export const InfoGrid = styled(Grid)`
  grid-gap: 8px 6px;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;

  ${Info} {
    :nth-of-type(3n - 1) {
      align-items: center;
    }
    :nth-of-type(3n) {
      align-items: flex-end;
    }
    &.status {
      align-items: flex-end;
      grid-column: 3;
      grid-row: 2;
    }
  }
`

export const Label = styled(SFProTextRegular)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey};
`
export const Link = styled(SFProTextRegular)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.link};
`.withComponent('a')

export const Value = styled(SFProTextMedium)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
`

export const TokenImage = styled.img`
  width: 14px;
  height: 14px;
`
