/*
 * @Author: linzeguang
 * @Date: 2022-09-02 11:51:28
 * @LastEditTime: 2022-09-04 04:05:50
 * @LastEditors: linzeguang
 * @Description:
 */
import { theme as zewideTheme } from 'zewide'

import { Theme } from '@emotion/react'

const theme: Theme = {
  ...zewideTheme,
  colors: {
    ...zewideTheme.colors,
    toast: '#101114',
    card: '#1B1B1E',
    border: '#e7cc7c',
    modal: '#101114',
    link: '#F8BC00',
    claim: '#F8BC00',
    error: '#FF1D43',
    pending: '#F8BC00',
    withdraw: '#fff',
    complete: '#24BD08',
  },
  layout: {
    header: {
      backgroundColor: '#101114',
    },
  },
}

export default theme
