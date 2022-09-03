/*
 * @Author: linzeguang
 * @Date: 2022-09-02 13:06:09
 * @LastEditTime: 2022-09-03 14:47:28
 * @LastEditors: linzeguang
 * @Description:
 */
import { Button as BaseButton } from 'zewide'

import styled from '@emotion/styled'

export const Button = styled(BaseButton)`
  min-height: 36px;
  padding: 0 15px;
  font-size: 16px;
  background: linear-gradient(to left, #eccc81 0%, #dbb45c 47%, #ca9a34 100%);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.302);
  border-radius: 6px 6px 6px 6px;
  border: none;
`
