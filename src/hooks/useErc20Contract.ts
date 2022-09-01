/*
 * @Author: linzeguang
 * @Date: 2022-09-02 02:11:45
 * @LastEditTime: 2022-09-02 02:12:24
 * @LastEditors: linzeguang
 * @Description: ERC20代币合约
 */
import { Erc20Abi } from '../constant'

import useContract from './useContract'

export default function useErc20Contract(address: string) {
  return useContract(address, Erc20Abi)
}
