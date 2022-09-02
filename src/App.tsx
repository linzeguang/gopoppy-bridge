/*
 * @Author: linzeguang
 * @Date: 2022-09-01 13:39:44
 * @LastEditTime: 2022-09-02 11:46:55
 * @LastEditors: linzeguang
 * @Description: 页面入口
 */
import React from 'react'

import { useWeb3React } from '@web3-react/core'

import Transfer from './components/Transfer'
import { PAIRS } from './constants'
import { BasicModel } from './models'

const App: React.FC = () => {
  const { chainId } = useWeb3React()
  return (
    <React.Fragment>
      <div>chainId: {chainId}</div>
      {PAIRS.map(([fromChain, toChain]) => (
        <button
          style={{ background: 'red' }}
          key={`${fromChain.chainId}-${toChain.chainId}`}
          onClick={() => BasicModel.updateBridgePair([fromChain, toChain])}
        >
          {fromChain.label} - {toChain.label}
        </button>
      ))}
      <Transfer />
    </React.Fragment>
  )
}

export default App
