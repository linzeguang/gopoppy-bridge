/*
 * @Author: linzeguang
 * @Date: 2022-09-01 13:39:44
 * @LastEditTime: 2022-09-01 16:13:10
 * @LastEditors: linzeguang
 * @Description: 程序入口
 */
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import Providers from './Providers'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
