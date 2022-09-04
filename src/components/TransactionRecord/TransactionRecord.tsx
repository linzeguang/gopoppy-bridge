/*
 * @Author: linzeguang
 * @Date: 2022-09-03 21:59:18
 * @LastEditTime: 2022-09-04 04:01:33
 * @LastEditors: linzeguang
 * @Description: 交易记录
 */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateEffect } from 'ahooks'

import { useTxList } from '@/api/https'
import { useWeb3React } from '@web3-react/core'

import { Card } from '../Common'

import RecordItem from './RecordItem'
import { Main, Title } from './styled'

const TransactionRecord: React.FC = () => {
  const { t } = useTranslation()
  const { isActive } = useWeb3React()
  const { txList, fetch: fetchTxList } = useTxList()

  useUpdateEffect(() => {
    isActive && fetchTxList()
  }, [isActive])

  return (
    <Card>
      <Title>{t('transaction_record')}</Title>
      <Main>
        {txList.map((item) => (
          <RecordItem key={item.Id} {...item} />
        ))}
      </Main>
    </Card>
  )
}

export default TransactionRecord
