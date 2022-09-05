/*
 * @Author: linzeguang
 * @Date: 2022-09-05 00:26:37
 * @LastEditTime: 2022-09-05 21:11:19
 * @LastEditors: linzeguang
 * @Description:
 */
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import BigNumber from 'bignumber.js'
import { FlexRow, Modal, useModal } from 'zewide'

import { BridgeConfig } from '@/api/contract'
import { Token } from '@/constants'

import { SFProTextMedium, SFProTextRegular } from '../Common'

import { InfoMain, Tips } from './styled'

const LimitTips: React.FC<{
  config: Record<keyof BridgeConfig, string>
  token: Token
}> = ({ config, token }) => {
  const { t } = useTranslation()
  const { maxAmountPerTx, minAmountPerTx, txFeeInMillion } = config
  const { fee, symbol } = token

  const fees = useMemo(
    () =>
      `${new BigNumber(txFeeInMillion).multipliedBy(100).toString()}%` +
      (fee ? ` + ${fee} ${symbol}` : ''),
    [fee, symbol, txFeeInMillion],
  )

  const [onPresentInfo] = useModal(
    <Modal title='Transaction limit'>
      <InfoMain gridGap='10px'>
        <FlexRow alignItems='center' justifyContent='space-between'>
          <SFProTextRegular>{t('max_per_tx')}</SFProTextRegular>
          <SFProTextMedium>{maxAmountPerTx}</SFProTextMedium>
        </FlexRow>
        <FlexRow alignItems='center' justifyContent='space-between'>
          <SFProTextRegular>{t('min_per_tx')}</SFProTextRegular>
          <SFProTextMedium>{minAmountPerTx}</SFProTextMedium>
        </FlexRow>
        <FlexRow alignItems='center' justifyContent='space-between'>
          <SFProTextRegular>{t('fees')}</SFProTextRegular>
          <SFProTextMedium>{fees}</SFProTextMedium>
        </FlexRow>
      </InfoMain>
    </Modal>,
  )

  return <Tips onClick={onPresentInfo} />
}

export default LimitTips
