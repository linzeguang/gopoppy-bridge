/*
 * @Author: linzeguang
 * @Date: 2022-09-02 10:46:37
 * @LastEditTime: 2022-09-03 15:04:25
 * @LastEditors: linzeguang
 * @Description:
 */

import { Box } from 'zewide'

import styled from '@emotion/styled'

const AppMain = styled(Box)``.withComponent('main')

AppMain.defaultProps = {
  p: ['15px'],
}

export default AppMain
