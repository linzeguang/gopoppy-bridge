/*
 * @Author: linzeguang
 * @Date: 2022-07-20 10:17:49
 * @LastEditTime: 2022-09-04 03:02:53
 * @LastEditors: linzeguang
 * @Description:
 */

import { CHAIN } from '@/constants'

export enum StatusEnum {
  Invalid = 1,
  Pending = 2,
  Claim = 3,
  Withdraw = 4,
  Complete = 5,
}
export enum StatusColor {
  Invalid = 'error',
  Pending = 'pending',
  Withdraw = 'withdraw',
  Claim = 'claim',
  Complete = 'complete',
}

export interface TXData {
  Id: number
  amount: string
  chain_id: CHAIN
  from_addr: string
  signature: string
  status: StatusEnum
  to_chain_id: CHAIN
  to_address: string
  to_contract_address: string
  token: string
  tx_hash: string
  check: number
  in_time: string
  out_time: string
  out_tx_hash: string
  string_for_sign: string
}

export interface Response<T> {
  code: number
  data: T
  message: string
  status: boolean
}

export interface IList<T> {
  page: number
  total: number
  list: T[]
}
