/*
 * @Author: linzeguang
 * @Date: 2022-09-02 01:58:40
 * @LastEditTime: 2022-09-02 02:10:14
 * @LastEditors: linzeguang
 * @Description: 跨链桥合约
 */
import { useComputed } from 'foca'

import { BRIDGEADDRESSES } from '../constant'
import { BridgeAbi } from '../constant/abi'
import { BasicModel } from '../models'

import useContract from './useContract'

export default function useBridgeContract() {
  const { fromChain } = useComputed(BasicModel.bridgeChain)

  return useContract(BRIDGEADDRESSES[fromChain.chainId], BridgeAbi)
}
