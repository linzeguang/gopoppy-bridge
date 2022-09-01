/*
 * @Author: linzeguang
 * @Date: 2022-09-02 01:33:45
 * @LastEditTime: 2022-09-02 02:20:09
 * @LastEditors: linzeguang
 * @Description: 合约hooks
 */
import { useMemo } from 'react'
import { useComputed } from 'foca'

import { Contract, ContractInterface } from '@ethersproject/contracts'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'

import { CHAINS } from '../constant'
import { BasicModel } from '../models'

export default function useContract(
  address: string,
  contractInterface: ContractInterface,
) {
  const { provider } = useWeb3React()
  const { fromChain } = useComputed(BasicModel.bridgeChain)
  const { rpcUrls } = CHAINS[fromChain.chainId]

  return useMemo(
    () =>
      new Contract(
        address,
        contractInterface,
        provider || new StaticJsonRpcProvider(rpcUrls[0]),
      ),
    [address, contractInterface, provider, rpcUrls],
  )
}
