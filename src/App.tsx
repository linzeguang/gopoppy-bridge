/*
 * @Author: linzeguang
 * @Date: 2022-09-01 13:39:44
 * @LastEditTime: 2022-09-02 01:23:21
 * @LastEditors: linzeguang
 * @Description: 页面入口
 */
import React from 'react'
import toast from 'react-hot-toast'
import { useComputed } from 'foca'

import { useWeb3React } from '@web3-react/core'

import { CHAINS } from './constant/chain'
import { connections } from './constant'
import { PAIRS } from './constant'
import { useAuth } from './hooks'
import { BasicModel } from './models'

const App: React.FC = () => {
  const { chainId } = useWeb3React()
  const { fromChain, toChain } = useComputed(BasicModel.bridgeChain)

  const { login, logout, switchChain } = useAuth()

  return (
    <React.Fragment>
      <button onClick={() => toast('test')}>toast</button>
      <div>
        {connections.map((connection) => (
          <button key={connection.name} onClick={() => login(connection)}>
            {connection.name}
          </button>
        ))}
      </div>
      <div>
        chainId: {chainId}
        <button onClick={logout}>disconnect</button>
      </div>
      <div>
        {Object.values(CHAINS).map((chain) => (
          <button key={chain.chainId} onClick={() => switchChain(chain)}>
            {chain.chainName}
          </button>
        ))}
      </div>
      <div>
        {fromChain.label} - {toChain.label}
      </div>
      <div>
        {PAIRS.map(([from, to]) => (
          <button
            key={[from.chainId, to.chainId].join('-')}
            onClick={() => BasicModel.updateBridgePair([from, to])}
          >
            {[from.label, to.label].join('-')}
          </button>
        ))}
      </div>
    </React.Fragment>
  )
}

export default App
