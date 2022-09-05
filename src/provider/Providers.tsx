/*
 * @Author: linzeguang
 * @Date: 2022-09-01 15:19:46
 * @LastEditTime: 2022-09-05 22:49:46
 * @LastEditors: linzeguang
 * @Description: 全局Provider
 */
import React, { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { useMount } from 'ahooks'
import { FocaProvider } from 'foca'
import { MotionConfig } from 'framer-motion'
import { ModalProvider, useLocalStorage } from 'zewide'

import { ThemeProvider } from '@emotion/react'
import { Web3ReactProvider } from '@web3-react/core'

import { connectors } from '../constants'
import { AppLayout } from '../layouts'
import theme from '../theme'
import { ToastUpdater, Web3Updater } from '../updaters'

import ConnectProvider from './ConnectProvider'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation()
  const [language] = useLocalStorage<string>('language', '')

  useMount(() => {
    language && i18n.changeLanguage(language)
  })

  return (
    <Web3ReactProvider connectors={connectors}>
      <FocaProvider>
        <ThemeProvider theme={theme}>
          <MotionConfig>
            <ToastUpdater />
            <ModalProvider>
              <ConnectProvider>
                <Web3Updater />
                <AppLayout>{children}</AppLayout>
              </ConnectProvider>
            </ModalProvider>
          </MotionConfig>
        </ThemeProvider>
      </FocaProvider>
    </Web3ReactProvider>
  )
}

export default Providers
