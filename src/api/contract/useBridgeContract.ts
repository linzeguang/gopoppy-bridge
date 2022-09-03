/*
 * @Author: linzeguang
 * @Date: 2022-09-02 01:58:40
 * @LastEditTime: 2022-09-02 03:59:41
 * @LastEditors: linzeguang
 * @Description: 跨链桥合约
 */
import { useComputed } from 'foca'

import { Contract, ContractFunction } from '@ethersproject/contracts'

import { BridgeAbi, BRIDGEADDRESSES } from '../../constants'
import { useContract } from '../../hooks'
import { BasicModel } from '../../models'

import { BridgeConfig } from './types'

interface BridgeContract extends Contract {
  claim: ContractFunction
  receiveEther: ContractFunction
  getContract: ContractFunction<BridgeConfig>
  getContractTo: ContractFunction<string[]>
  erc20Transfer: ContractFunction
}

export default function useBridgeContract() {
  const { fromChain } = useComputed(BasicModel.bridgeChain)

  return useContract<BridgeContract>(BRIDGEADDRESSES[fromChain.chainId], BridgeAbi)
}
