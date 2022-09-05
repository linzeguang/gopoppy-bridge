/*
 * @Author: linzeguang
 * @Date: 2022-09-03 21:59:18
 * @LastEditTime: 2022-09-05 19:47:44
 * @LastEditors: linzeguang
 * @Description: 交易记录
 */
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateEffect } from 'ahooks'

import { useTxList } from '@/api/https'
import { Icon } from '@/svgr'
import { useTheme } from '@emotion/react'
import { useWeb3React } from '@web3-react/core'

import { Card, ListSpinner, SFProTextMedium, SFProTextRegular } from '../Common'

import RecordItem from './RecordItem'
import { Main, NoDataRow, Title } from './styled'

const TransactionRecord: React.FC = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const { isActive } = useWeb3React()
  const { loading: txListLoading, txList, fetch: fetchTxList } = useTxList()

  const [loading, toggleLoading] = useState(false)

  useUpdateEffect(() => {
    isActive && fetchTxList()
  }, [isActive])

  const renderList = useCallback(() => {
    if (!txList.length && txListLoading)
      return (
        <NoDataRow justifyContent='center'>
          <ListSpinner color={colors.primary} />
        </NoDataRow>
      )
    else if (!txList.length)
      return (
        <NoDataRow>
          <Icon.NoData />
          <SFProTextRegular>No Data</SFProTextRegular>
        </NoDataRow>
      )
    else
      return (
        <>
          {txList.map((item) => (
            <RecordItem key={item.Id} {...item} onCliam={toggleLoading} />
          ))}
        </>
      )
  }, [colors.primary, txList, txListLoading])

  if (!isActive) return null

  return (
    <Card loading={loading}>
      <Title>
        <SFProTextMedium>{t('transaction_record')}</SFProTextMedium>
      </Title>
      <Main>{renderList()}</Main>
    </Card>
  )
}

export default TransactionRecord
