/*
 * @Author: linzeguang
 * @Date: 2022-09-03 21:13:21
 * @LastEditTime: 2022-09-03 21:14:17
 * @LastEditors: linzeguang
 * @Description: 组件库配置
 */
import { Button as BaseButton, Modal } from 'zewide'

import styled from '@emotion/styled'

const Button = styled(BaseButton)`
  min-height: 36px;
  padding: 0 15px;
  font-size: 16px;
  background: linear-gradient(to left, #eccc81 0%, #dbb45c 50%, #ca9a34 100%);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.302);
  border-radius: 6px 6px 6px 6px;
  border: none;
`
Modal.defaultProps = {
  width: 'calc(100vw - 40px)',
}

export { Button, Modal }
