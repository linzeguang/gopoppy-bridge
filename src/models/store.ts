/*
 * @Author: 林泽广
 * @Date: 2022-05-30 14:53:42
 * @LastEditTime: 2022-09-02 00:58:26
 * @LastEditors: linzeguang
 * @Description: 集成 foca.js 状态管理
 */

import { engines, Middleware, store } from 'foca'
import { createLogger } from 'redux-logger'

import { BasicModel } from './basic.model'

// 中间件
const middleware: Middleware[] = []

if (process.env.NODE_ENV !== 'production') {
  middleware.push(
    createLogger({
      collapsed: true,
      diff: true,
      duration: true,
      logErrors: true,
    }),
  )
}

// 初始化store
store.init({
  compose: 'redux-devtools',
  middleware,
  persist: [
    {
      key: `basic_${process.env.NODE_ENV}`,
      version: __BUILD_TIME__,
      engine: engines.localStorage, // 或 engines.sessionStorage
      models: [BasicModel],
    },
  ],
})

// 因为 store.ts 需要被入口文件引入，而 store.ts 又引入了部分 model（持久化需要这么做），所以如果相应的 model 做了修改操作时，会导致浏览器页面全量刷新而非热更新
if (module.hot) {
  module.hot.accept(() => {
    console.log('Hot updated: store')
  })
}
