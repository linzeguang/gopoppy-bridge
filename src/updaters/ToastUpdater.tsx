/*
 * @Author: linzeguang
 * @Date: 2022-09-02 00:41:57
 * @LastEditTime: 2022-09-02 01:23:52
 * @LastEditors: linzeguang
 * @Description: Toast 自定义
 */
import React from 'react'
import { Toaster } from 'react-hot-toast'

const ToastUpdater: React.FC = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }}
    />
  )
}

export default ToastUpdater
