/*
 * @Author: linzeguang
 * @Date: 2022-09-02 03:59:08
 * @LastEditTime: 2022-09-02 03:59:14
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
