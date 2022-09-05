/*
 * @Author: linzeguang
 * @Date: 2022-09-04 20:24:33
 * @LastEditTime: 2022-09-04 20:24:56
 * @LastEditors: linzeguang
 * @Description: 方法
 */
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

export function getSigner(provider: JsonRpcProvider, account: string): JsonRpcSigner {
  return provider.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(
  provider: JsonRpcProvider,
  account?: string,
): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(provider, account) : provider
}
