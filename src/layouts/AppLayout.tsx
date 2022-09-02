/*
 * @Author: linzeguang
 * @Date: 2022-09-02 10:45:27
 * @LastEditTime: 2022-09-02 10:47:41
 * @LastEditors: linzeguang
 * @Description:
 */
import React, { PropsWithChildren } from 'react'

import AppHeader from './AppHeader'
import AppMain from './AppMain'

const AppLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <React.Fragment>
      <AppHeader />
      <AppMain {...props} />
    </React.Fragment>
  )
}

export default AppLayout
