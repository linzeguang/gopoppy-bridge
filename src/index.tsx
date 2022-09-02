/*
 * @Author: linzeguang
 * @Date: 2022-09-01 13:39:44
 * @LastEditTime: 2022-09-02 13:48:35
 * @LastEditors: linzeguang
 * @Description: 程序入口
 */
import React from 'react'
import ReactDOM from 'react-dom/client'

import { css, Global } from '@emotion/react'

import App from './App'
import { Providers } from './provider'
import reportWebVitals from './reportWebVitals'

import './models/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.Fragment>
    <Global
      styles={css`
        .walletconnect-modal__footer {
          max-width: 100%;
          flex-wrap: wrap;
        }
      `}
    />
    <Providers>
      <App />
    </Providers>
  </React.Fragment>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
