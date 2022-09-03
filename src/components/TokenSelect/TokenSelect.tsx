/*
 * @Author: linzeguang
 * @Date: 2022-09-02 02:59:33
 * @LastEditTime: 2022-09-02 04:11:13
 * @LastEditors: linzeguang
 * @Description: 代币选择
 */
import React from 'react'

import { Token } from '@/constants'

interface Props {
  value: string
  tokens: Token[]
  loading?: boolean
  onSelect: (address: string) => void
}

const TokenSelect: React.FC<Props> = ({ value, tokens, loading, onSelect }) => {
  const token = tokens.find(({ address }) => address === value)

  if (loading) return <div>Loading...</div>

  if (!token) return <div>No Token Transfer</div>

  return (
    <div>
      <img src={token.icon} alt={token.name} width='20' height='20' />
      <span>{token.symbol}</span>

      {tokens.map((info, index) => (
        <button key={index} onClick={() => onSelect(info.address)}>
          <img src={info.icon} alt={info.name} width='20' height='20' />
          <span>{info.symbol}</span>{' '}
        </button>
      ))}
    </div>
  )
}

export default TokenSelect
