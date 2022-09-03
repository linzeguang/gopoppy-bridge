/*
 * @Author: linzeguang
 * @Date: 2022-09-01 13:39:44
 * @LastEditTime: 2022-09-03 15:03:25
 * @LastEditors: linzeguang
 * @Description: 页面入口
 */
import React from 'react'
import { Grid } from 'zewide'

import { BridgeSelector, Transfer } from './components'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Grid gridGap='15px' gridTemplateColumns='70% 30%'>
        <BridgeSelector />
      </Grid>
      <Transfer />
    </React.Fragment>
  )
}

export default App
