/*
 * @Author: linzeguang
 * @Date: 2022-09-03 18:50:21
 * @LastEditTime: 2022-09-03 21:17:44
 * @LastEditors: linzeguang
 * @Description:
 */
import React, { PropsWithChildren } from 'react'
import { useUpdateEffect } from 'ahooks'
import { FlexRow, Grid, Handler, ModalProps, useModal } from 'zewide'

import { Icon } from '@/svgr'
import styled from '@emotion/styled'

import { Modal } from './Uikit'

const OpitonRow = styled(FlexRow)`
  position: relative;
  align-items: center;
  grid-gap: 8px;
  cursor: pointer;
`

const Choose = styled(Icon.ChooseFilled)`
  position: absolute;
  right: 0;
  width: 22px;
  height: 22px;
`

export const OpitonWrapper = styled(Grid)`
  grid-gap: 15px;
  ${OpitonRow} {
    padding: 10px 0;
  }
`

export interface InjectValue {
  value: string
}

export interface SelectorProps<T extends InjectValue> extends ModalProps {
  selected: T
  options: T[]
  renderOption: (params: T) => React.ReactNode
  onSelect: (params: T, callback: Handler) => void
  onVisibleChange?: (visible: boolean) => void
}

export function Selector<T extends InjectValue>(props: PropsWithChildren<SelectorProps<T>>) {
  const { children, selected, options, renderOption, onSelect, onVisibleChange, ...rest } = props

  const [onPresent, onDismiss, visible] = useModal(
    <Modal {...rest}>
      <OpitonWrapper>
        {options.map((option, index) => (
          <OpitonRow key={index} onClick={() => onSelect(option, onDismiss)}>
            {renderOption(option)}
            {selected.value === option.value && <Choose />}
          </OpitonRow>
        ))}
      </OpitonWrapper>
    </Modal>,
  )

  useUpdateEffect(() => {
    onVisibleChange && onVisibleChange(visible)
  }, [visible])

  return (
    <React.Fragment>
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement, {
          onClick: onPresent,
        })}
    </React.Fragment>
  )
}
