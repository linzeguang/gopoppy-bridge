/*
 * @Author: linzeguang
 * @Date: 2022-09-02 11:51:28
 * @LastEditTime: 2022-09-02 15:26:23
 * @LastEditors: linzeguang
 * @Description:
 */
import { theme as zewideTheme } from 'zewide'

import { Theme } from '@emotion/react'

const theme: Theme = {
  ...zewideTheme,
  colors: {
    ...zewideTheme.colors,
    modal: '#101114',
  },
  layout: {
    header: {
      backgroundColor: '#101114',
    },
  },
}

export default theme
