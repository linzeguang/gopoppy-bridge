/*
 * @Author: linzeguang
 * @Date: 2022-09-02 11:41:45
 * @LastEditTime: 2022-09-04 02:54:09
 * @LastEditors: linzeguang
 * @Description:
 */
import type { Colors, ZewideTheme } from 'zewide'

import '@emotion/react'

declare module '@emotion/react' {
  export interface CustomColors extends Colors {
    toast: string
    card: string
    border: string
    link: string
    claim: string
    error: string
    pending: string
    withdraw: string
    complete: string
  }

  export interface Theme extends ZewideTheme {
    colors: CustomColors
    layout: {
      header: {
        backgroundColor: string
      }
    }
  }
}
