/*
 * @Author: linzeguang
 * @Date: 2022-09-02 10:46:37
 * @LastEditTime: 2022-09-02 11:56:31
 * @LastEditors: linzeguang
 * @Description:
 */

import { Box } from 'zewide'

import styled from '@emotion/styled'

const AppMain = styled(Box)``.withComponent('main')

AppMain.defaultProps = {
  p: ['0 15px'],
}

export default AppMain
