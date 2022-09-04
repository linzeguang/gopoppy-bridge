/*
 * @Author: linzeguang
 * @Date: 2022-09-02 00:41:57
 * @LastEditTime: 2022-09-03 22:51:29
 * @LastEditors: linzeguang
 * @Description: Toast 自定义
 */
import React from 'react'
import { Toaster } from 'react-hot-toast'

import { useTheme } from '@emotion/react'

const ToastUpdater: React.FC = () => {
  const { colors } = useTheme()

  return (
    <Toaster
      toastOptions={{
        style: {
          borderRadius: '10px',
          background: colors.toast,
          color: colors.white,
        },
      }}
    />
  )
}

export default ToastUpdater
