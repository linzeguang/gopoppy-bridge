/*
 * @Author: linzeguang
 * @Date: 2022-09-01 16:26:36
 * @LastEditTime: 2022-09-01 18:56:51
 * @LastEditors: linzeguang
 * @Description: 全局数据存储
 */

import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react'

import { BridgeChain, Pair, PAIRS, Token, TOKENS } from '../constant'

interface StoreState {
  pair: Pair
  fromChain: BridgeChain
  toChain: BridgeChain
  fromTokens: Record<string, Token>
  handlePair: (newPair: Pair) => void
}

export const StoreContext = createContext<StoreState>({} as StoreState)

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [pair, updatePair] = useState<Pair>(PAIRS[0])

  const handlePair = useCallback((newPair: Pair) => {
    updatePair(newPair)
  }, [])

  const { fromChain, toChain, fromTokens } = useMemo(() => {
    const [fromChain, toChain] = pair

    const fromTokens = TOKENS[fromChain.chainId]

    return { fromChain, toChain, fromTokens }
  }, [pair])

  return (
    <StoreContext.Provider
      value={{
        pair,
        handlePair,
        fromChain,
        toChain,
        fromTokens,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
