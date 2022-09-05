/*
 * @Author: linzeguang
 * @Date: 2022-09-02 03:59:08
 * @LastEditTime: 2022-09-05 01:42:45
 * @LastEditors: linzeguang
 * @Description: 类型
 */
import BigNumber from 'bignumber.js'

export interface BridgeConfig {
  maxAmountPerTx: BigNumber
  minAmountPerTx: BigNumber
  transferAmount: BigNumber
  txFeeInMillion: BigNumber
}

export interface MetamaskError {
  reason: string
  code: string
  action: string
  message: string
  data: {
    code: string
    message: string
  }
  transaction: {
    data: string
    from: string
    gasLimit: BigNumber
    to: string
  }
}
