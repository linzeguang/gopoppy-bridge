/*
 * @Author: linzeguang
 * @Date: 2022-09-02 01:33:45
 * @LastEditTime: 2022-09-04 20:25:14
 * @LastEditors: linzeguang
 * @Description: 合约hooks
 */
import { useMemo } from 'react'
import { useComputed } from 'foca'

import { CHAINS, getProviderOrSigner } from '@/constants'
import { BasicModel } from '@/models'
import { Contract, ContractInterface } from '@ethersproject/contracts'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'

export default function useContract<T extends Contract = Contract>(
  address: string,
  contractInterface: ContractInterface,
) {
  const { provider, account } = useWeb3React()
  const { fromChain } = useComputed(BasicModel.bridgeChain)
  const { rpcUrls } = CHAINS[fromChain.chainId]

  return useMemo(
    () =>
      new Contract(
        address,
        contractInterface,
        getProviderOrSigner(provider || new StaticJsonRpcProvider(rpcUrls[0]), account),
      ),
    [account, address, contractInterface, provider, rpcUrls],
  ) as T
}
