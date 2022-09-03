/*
 * @Author: linzeguang
 * @Date: 2022-09-03 14:31:52
 * @LastEditTime: 2022-09-03 14:40:39
 * @LastEditors: linzeguang
 * @Description: 选择器
 */
import React, { PropsWithChildren } from 'react'

export interface SelectorProps {}

export const Selector: React.FC<PropsWithChildren<PropsWithChildren>> = (props) => {
  const { children } = props
  return <React.Fragment>{children}</React.Fragment>
}
