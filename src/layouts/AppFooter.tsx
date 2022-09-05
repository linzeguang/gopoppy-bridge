/*
 * @Author: linzeguang
 * @Date: 2022-09-03 17:00:34
 * @LastEditTime: 2022-09-05 22:50:25
 * @LastEditors: linzeguang
 * @Description: app 脚部
 */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Divider, FlexRow } from 'zewide'

import { Language, SFProTextMedium } from '@/components'
import styled from '@emotion/styled'

const Footers = styled(FlexRow)`
  grid-gap: 8px;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-top: 1px solid;
  border-image: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.colors.grey},
      transparent
    )
    1;
`

const Link = styled(FlexRow)`
  grid-gap: 6px;
  align-items: center;
`.withComponent('a')

const Image = styled.img`
  width: 20px;
  height: 20px;
`

const AppFooter: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Footers>
      <Link>
        <Image src='./images/telegram.svg' />
        <SFProTextMedium>{t('manual_service')}</SFProTextMedium>
      </Link>
      <Divider type='vertical' height='20px' />
      <Language />
    </Footers>
  )
}

export default AppFooter
