/*
 * @Author: linzeguang
 * @Date: 2022-09-05 16:27:57
 * @LastEditTime: 2022-09-05 19:41:29
 * @LastEditors: linzeguang
 * @Description:
 */
import React, { PropsWithChildren } from 'react'
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'
import { BeatLoader, ClockLoader } from 'react-spinners'

import styled from '@emotion/styled'

export const Loader: React.FC<PropsWithChildren<IContentLoaderProps>> = (props) => (
  <ContentLoader
    speed={2}
    viewBox={`0 0 ${props.width} ${props.height}`}
    backgroundColor='#666'
    foregroundColor='#999'
    {...props}
  />
)

export const BalanceLoader: React.FC = () => (
  <Loader width={80} height={16}>
    <rect rx='3' ry='3' width='80' height='16' />
  </Loader>
)

export const TokenLoader: React.FC = () => (
  <Loader width={100} height={20}>
    <rect rx='3' ry='3' width='80' height='20' />
  </Loader>
)

export const RecordLoader: React.FC = () => (
  <Loader width='100%' height={142}>
    <rect rx='12' ry='12' width='100%' height='142' />
  </Loader>
)

export const CardSpinner = styled(ClockLoader)`
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`
CardSpinner.defaultProps = {
  size: 36,
}

export const ListSpinner = styled(BeatLoader)``

ListSpinner.defaultProps = {
  size: 8,
}
