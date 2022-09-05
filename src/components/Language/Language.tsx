/*
 * @Author: linzeguang
 * @Date: 2022-09-03 18:07:44
 * @LastEditTime: 2022-09-05 22:32:07
 * @LastEditors: linzeguang
 * @Description: 语言切换
 */
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, FlexRow, useLocalStorage } from 'zewide'

import { Icon } from '@/svgr'
import styled from '@emotion/styled'

import { InjectValue, PingFangSCSemibold, Selector, SFProTextMedium } from '../Common'
import { Choose } from '../Common/Svgr'

const StyledButton = styled(Button)`
  grid-gap: 6px;

  svg {
    width: 20px;
    height: 20px;
  }

  .arrow {
    width: 12px;
    height: 12px;
    fill: #fff;
    transition: all ${({ theme }) => theme.duration}s;
  }
`
StyledButton.defaultProps = {
  variant: 'text',
  color: 'white',
}

export const LanguageRow = styled(FlexRow)`
  position: relative;
  align-items: center;
  grid-gap: 8px;
  cursor: pointer;

  ${Choose} {
    position: absolute;
    right: 0;
  }
`

interface Local extends InjectValue {
  icon: string
  label: string
  name: string
}

const Language: React.FC = () => {
  const { i18n, t } = useTranslation()
  const [visible, toggleVisible] = useState(false)
  const [, setSelectedLanguage] = useLocalStorage<string>('language', '')

  const config = useMemo<Local[]>(
    () => [
      {
        icon: '🇬🇧',
        label: 'EN',
        name: 'English',
        value: 'en',
      },
      {
        icon: '🇨🇳',
        label: '繁体中文',
        name: '繁体中文',
        value: 'tw',
      },
    ],
    [],
  )

  const selected = useMemo(
    () => config.find((info) => info.value === i18n.language) || config[0],
    [config, i18n.language],
  )

  return (
    <Selector<Local>
      id='language-select'
      title={t('language')}
      selected={selected}
      options={config}
      renderOption={(params) => (
        <LanguageRow>
          <PingFangSCSemibold>{params.icon}</PingFangSCSemibold>
          <PingFangSCSemibold>{params.name}</PingFangSCSemibold>
        </LanguageRow>
      )}
      onSelect={(params, callback) => {
        if (params.value === i18n.language) return
        i18n.changeLanguage(params.value)
        setSelectedLanguage(params.value)
        callback()
      }}
      onVisibleChange={toggleVisible}
    >
      <StyledButton>
        <SFProTextMedium>{selected?.icon}</SFProTextMedium>
        <SFProTextMedium>{selected?.label}</SFProTextMedium>
        <Icon.ArrowDownOutlined
          className='arrow'
          style={{ transform: `rotateX(${visible ? '180deg' : '0'} )` }}
        />
      </StyledButton>
    </Selector>
  )
}

export default Language
