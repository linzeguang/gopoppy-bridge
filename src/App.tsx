/*
 * @Author: linzeguang
 * @Date: 2022-09-01 13:39:44
 * @LastEditTime: 2022-09-02 00:26:15
 * @LastEditors: linzeguang
 * @Description: 页面入口
 */
import React, { useContext } from 'react'
import toast from 'react-hot-toast'

import { useWeb3React } from '@web3-react/core'

import { CHAINS } from './constant/chain'
import { connections } from './constant'
import { PAIRS } from './constant'
import { useAuth } from './hooks'
import { StoreContext } from './widgets'

const App: React.FC = () => {
  const { chainId } = useWeb3React()
  const { fromChain, toChain, handlePair } = useContext(StoreContext)

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
            onClick={() => handlePair([from, to])}
          >
            {[from.label, to.label].join('-')}
          </button>
        ))}
      </div>
    </React.Fragment>
  )
}

export default App
