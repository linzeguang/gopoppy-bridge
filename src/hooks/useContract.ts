/*
 * @Author: linzeguang
 * @Date: 2022-09-02 01:33:45
 * @LastEditTime: 2022-09-04 04:12:57
 * @LastEditors: linzeguang
 * @Description: 合约hooks
 */
import { useMemo } from 'react'
import { useComputed } from 'foca'

import { Contract, ContractInterface } from '@ethersproject/contracts'
import { JsonRpcProvider, JsonRpcSigner, StaticJsonRpcProvider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'

import { CHAINS } from '../constants'
import { BasicModel } from '../models'

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

function getSigner(provider: JsonRpcProvider, account: string): JsonRpcSigner {
  return provider.getSigner(account).connectUnchecked()
}

function getProviderOrSigner(
  provider: JsonRpcProvider,
  account?: string,
): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(provider, account) : provider
}
