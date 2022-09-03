/*
 * @Author: linzeguang
 * @Date: 2022-09-02 11:41:45
 * @LastEditTime: 2022-09-03 21:55:15
 * @LastEditors: linzeguang
 * @Description:
 */
import type { Colors, ZewideTheme } from 'zewide'

import '@emotion/react'

interface CustomColors {
  toast: string
}

declare module '@emotion/react' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface Theme extends ZewideTheme {
    colors: Colors & CustomColors
    layout: {
      header: {
        backgroundColor: string
      }
    }
  }
}
