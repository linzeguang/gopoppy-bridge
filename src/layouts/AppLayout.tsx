/*
 * @Author: linzeguang
 * @Date: 2022-09-02 10:45:27
 * @LastEditTime: 2022-09-03 17:00:53
 * @LastEditors: linzeguang
 * @Description:
 */
import React, { PropsWithChildren } from 'react'

import AppFooter from './AppFooter'
import AppHeader from './AppHeader'
import AppMain from './AppMain'

const AppLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <React.Fragment>
      <AppHeader />
      <AppMain {...props} />
      <AppFooter />
    </React.Fragment>
  )
}

export default AppLayout
