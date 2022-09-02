/*
 * @Author: linzeguang
 * @Date: 2022-09-02 02:11:45
 * @LastEditTime: 2022-09-02 02:29:12
 * @LastEditors: linzeguang
 * @Description: ERC20代币合约
 */

import { Erc20Abi } from '../../constants'
import { useContract } from '../../hooks'

export default function useErc20Contract(address: string) {
  return useContract(address, Erc20Abi)
}
