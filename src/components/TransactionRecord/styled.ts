/*
 * @Author: linzeguang
 * @Date: 2022-09-03 22:14:27
 * @LastEditTime: 2022-09-05 19:40:06
 * @LastEditors: linzeguang
 * @Description:
 */
import { FlexColumn, FlexRow, Grid } from 'zewide'

import styled from '@emotion/styled'

import { SFProTextMedium, SFProTextRegular } from '../Common'

export const Title = styled(FlexRow)`
  margin-bottom: 20px;
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, ${({ theme }) => theme.colors.grey}, transparent) 1;

  ${SFProTextMedium} {
    position: relative;
    padding-bottom: 15px;
    font-size: 20px;

    ::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 4px 4px 0 0;
    }
  }
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

export const NoDataRow = styled(FlexColumn)`
  margin: 20px 0;
  align-items: center;

  svg {
    width: 36px;
    height: 36px;
  }

  ${SFProTextRegular} {
    margin-top: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.grey};
  }
`
