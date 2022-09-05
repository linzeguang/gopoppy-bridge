/*
 * @Author: linzeguang
 * @Date: 2022-09-04 13:55:17
 * @LastEditTime: 2022-09-05 01:08:21
 * @LastEditors: linzeguang
 * @Description: Transfer styled components
 */
import { motion } from 'framer-motion'
import { Box, Button, FlexColumn, FlexRow, Grid } from 'zewide'

import { Icon } from '@/svgr'
import styled from '@emotion/styled'

import {
  ArrowDown,
  Button as SubmitButton,
  DINAlternateBold,
  SFProTextMedium,
  SFProTextRegular,
} from '../Common'

export const Direction = styled(SFProTextRegular)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey};
`

export const DirectionRow = styled(FlexRow)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

export const ChainInfo = styled(FlexRow)`
  align-items: center;
  grid-gap: 6px;

  ${SFProTextMedium} {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.white};
  }
`

export const Image = styled.img`
  width: 20px;
  height: 20px;
`

export const TokenControl = styled(Box)`
  padding: 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.input};
`

export const TokenButton = styled(Button)`
  grid-gap: 4px;
`

TokenButton.defaultProps = {
  variant: 'text',
  color: 'white',
}

export const Balance = styled(SFProTextRegular)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey};
`

export const CenterWrapper = styled(FlexColumn)`
  grid-gap: 6px;
  align-items: center;
  margin: 30px auto;
`

export const Convert = styled(Icon.Convert)`
  display: block;
  width: 36px;
  height: 36px;
`

export const Fee = styled(SFProTextRegular)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.error};
`

export const Input = styled(DINAlternateBold)`
  margin-top: 15px;
  width: 100%;
  font-size: 26px;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.white};

  ::placeholder {
    color: ${({ theme }) => theme.colors.grey};
  }
`.withComponent(motion.input)
Input.defaultProps = {
  type: 'number',
}

export const Tips = styled(Icon.Tips)`
  width: 20px;
  height: 20px;
`

export const AlertNativeAddress = styled(FlexColumn)`
  align-items: flex-end;

  ${Input} {
    margin-top: 0;
    font-size: 18px;
    font-family: SFProText-Regular, SFProText;
    text-align: right;
  }
`

export const AddressLabel = styled(SFProTextRegular)`
  margin: 10px 0 4px;
  grid-gap: 6px;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};

  ${ArrowDown} {
    fill: ${({ theme }) => theme.colors.primary};
  }
`.withComponent(FlexRow)

export const InfoMain = styled(Grid)`
  ${SFProTextRegular} {
    color: ${({ theme }) => theme.colors.grey};
  }
`

export const Submit = styled(SubmitButton)`
  margin: 30px auto 10px;
  width: 140px;
  height: 48px;
  font-size: 18px;
  font-weight: bold;

  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const ErrorText = styled(Fee)`
  transform: translateY(4px);
  font-size: 14px;
  overflow: hidden;
`
