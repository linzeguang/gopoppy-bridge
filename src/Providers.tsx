/*
 * @Author: linzeguang
 * @Date: 2022-09-01 15:19:46
 * @LastEditTime: 2022-09-02 00:53:41
 * @LastEditors: linzeguang
 * @Description: 全局Provider
 */
import React, { PropsWithChildren } from 'react'
import { FocaProvider } from 'foca'

import { ThemeProvider } from '@emotion/react'
import { Web3ReactProvider } from '@web3-react/core'

import { connectors } from './constant/connection'
import { ToastUpdater, Web3Updater } from './updaters'

import './models/store'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <FocaProvider>
        <ThemeProvider theme={{}}>
          <ToastUpdater />
          <Web3Updater />
          <React.Fragment>{children}</React.Fragment>
        </ThemeProvider>
      </FocaProvider>
    </Web3ReactProvider>
  )
}

export default Providers
