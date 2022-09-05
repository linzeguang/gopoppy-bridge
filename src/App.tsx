/*
 * @Author: linzeguang
 * @Date: 2022-09-01 13:39:44
 * @LastEditTime: 2022-09-04 13:54:55
 * @LastEditors: linzeguang
 * @Description: 页面入口
 */
import React from 'react'
import { Grid } from 'zewide'

import { BridgeSelector, TransactionRecord, Transfer } from './components'

const App: React.FC = () => {
  return (
    <Grid gridGap={20}>
      <BridgeSelector />
      <Transfer />
      <TransactionRecord />
    </Grid>
  )
}

export default App
