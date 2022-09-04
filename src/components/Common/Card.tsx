/*
 * @Author: linzeguang
 * @Date: 2022-09-03 22:01:24
 * @LastEditTime: 2022-09-03 22:11:35
 * @LastEditors: linzeguang
 * @Description:
 */
import React, { PropsWithChildren } from 'react'
import { Box, BoxProps } from 'zewide'

import styled from '@emotion/styled'

const CardWrapper = styled(Box)`
  padding: 20px;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: 0px 0px 5px 5px rgba(231, 199, 124, 0.1);
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.card};
  transition: all ${({ theme }) => theme.duration}s;

  :hover {
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0px 0px 5px 5px rgba(231, 204, 124, 0.2);
  }
`

interface CardProps extends BoxProps {}

export const Card: React.FC<PropsWithChildren<CardProps>> = (props) => {
  const { children } = props
  return <CardWrapper>{children}</CardWrapper>
}
