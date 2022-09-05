/*
 * @Author: linzeguang
 * @Date: 2022-09-05 00:13:11
 * @LastEditTime: 2022-09-05 21:12:57
 * @LastEditors: linzeguang
 * @Description:
 */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'

import { ArrowDown } from '../Common'

import { AddressLabel, AlertNativeAddress, Input } from './styled'

interface Props {
  value: string
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const ReciveAddress: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const [visible, toggleVisible] = useState(false)
  return (
    <AlertNativeAddress>
      <AddressLabel onClick={() => toggleVisible(!visible)}>
        <span>{t('alertnative_address')}</span>
        <ArrowDown style={{ transform: `rotateX(${visible ? '180deg' : '0'} )` }} />
      </AddressLabel>
      <AnimatePresence>
        {visible && (
          <Input
            type='text'
            placeholder={t('alertnative_address')}
            initial={{ height: 0, display: 'none' }}
            animate={{ height: 'auto', display: 'block' }}
            exit={{ height: 0, transitionEnd: { display: 'none' } }}
            {...props}
          />
        )}
      </AnimatePresence>
    </AlertNativeAddress>
  )
}

export default ReciveAddress
