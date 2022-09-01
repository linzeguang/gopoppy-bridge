/*
 * @Author: linzeguang
 * @Date: 2022-09-01 15:19:46
 * @LastEditTime: 2022-09-01 16:44:49
 * @LastEditors: linzeguang
 * @Description: 全局Provider
 */

import React, { PropsWithChildren } from 'react'

import { Web3ReactProvider } from '@web3-react/core'

import { connectors } from './constant/connection'
import { Web3Updater } from './updater'
import { StoreProvider } from './widgets'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <StoreProvider>
        <Web3Updater />
        {children}
      </StoreProvider>
    </Web3ReactProvider>
  )
}

export default Providers
