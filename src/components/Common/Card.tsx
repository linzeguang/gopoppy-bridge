/*
 * @Author: linzeguang
 * @Date: 2022-09-03 22:01:24
 * @LastEditTime: 2022-09-05 19:06:28
 * @LastEditors: linzeguang
 * @Description:
 */
import React, { PropsWithChildren } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Box, BoxProps, Overlay } from 'zewide'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'

import { CardSpinner } from './Loader'

const CardWrapper = styled(Box)`
  position: relative;
  padding: 20px;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: 0px 0px 5px 5px rgba(231, 199, 124, 0.1);
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.card};
  transition: all ${({ theme }) => theme.duration}s;
  overflow: hidden;

  :hover {
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0px 0px 5px 5px rgba(231, 204, 124, 0.2);
  }
`

const CardOverlay = styled(Overlay)`
  position: absolute;
  z-index: 1;
`

interface CardProps extends BoxProps {
  loading?: boolean
}

export const Card: React.FC<PropsWithChildren<CardProps>> = (props) => {
  const { children, loading } = props
  const { colors } = useTheme()

  return (
    <CardWrapper>
      <AnimatePresence>
        {loading && (
          <>
            <CardOverlay />
            <CardSpinner loading={Boolean(loading)} color={colors.primary} />
          </>
        )}
      </AnimatePresence>
      {children}
    </CardWrapper>
  )
}
