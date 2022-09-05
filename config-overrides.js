/*
 * @Author: linzeguang
 * @Date: 2022-09-01 13:58:48
 * @LastEditTime: 2022-09-06 02:01:27
 * @LastEditors: linzeguang
 * @Description: 打包配置
 */
const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
  addWebpackResolve,
  removeModuleScopePlugin,
  useBabelRc,
} = require('customize-cra')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

const addCommonsChunkPlugin = (config) => {
  if (isProd) {
    config.optimization.splitChunks = {
      chunks: 'all',
      name: 'vender',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minSize: 50000,
          minChunks: 1,
          chunks: 'initial',
          priority: 1, // 该配置项是设置处理的优先级，数值越大越优先处理，处理后优先级低的如果包含相同模块则不再处理
        },
        commons: {
          test: /[\\/]src[\\/]/,
          name: 'commons',
          minSize: 50000,
          minChunks: 2,
          chunks: 'initial',
          priority: -1,
          reuseExistingChunk: true, // 这个配置允许我们使用已经存在的代码块
        },
        web3: {
          name: 'web3', // 单独将 web3 工具打包
          priority: 20,
          test: /[\\/]node_modules[\\/](@ethersproject|@walletconnect|@web3-react|web3-utils)[\\/]/,
          chunks: 'all',
        },
        fa: {
          name: 'fa', // 单独将 foca 工具打包
          priority: 20,
          test: /[\\/]node_modules[\\/](foca|foca-axios|axios)[\\/]/,
          chunks: 'all',
        },
        reactLib: {
          name: 'react-lib', // 单独将 react 打包
          priority: 20,
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          chunks: 'all',
        },
      },
    }
    return config
  }
}

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  removeModuleScopePlugin(),
  // 打包进度条
  addWebpackPlugin(new ProgressBarPlugin()),
  // alias
  addWebpackAlias({
    // 加载模块的时候，可以使用“@”符号来进行简写啦~
    '@': path.resolve(__dirname, './src/'),
  }),
  // 用于foca更新
  addWebpackPlugin(
    new webpack.DefinePlugin({
      __BUILD_TIME__: Date.now(),
      __SERVER_URL__: 'http://api.gopoppy.co/api',
    }),
  ),
  addCommonsChunkPlugin,
  // 注意是production环境启动该plugin
  isProd &&
    addWebpackPlugin(
      new UglifyJsPlugin({
        // 开启打包缓存
        cache: true,
        // 开启多线程打包
        parallel: true,
        uglifyOptions: {
          // 删除警告
          warnings: false,
          // 压缩
          compress: {
            // 移除console
            drop_console: true,
            // 移除debugger
            drop_debugger: true,
          },
        },
      }),
    ),

  // fix web3
  (config) => {
    config.ignoreWarnings = [/Failed to parse source map/]
    return config
  },
  addWebpackResolve({
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify'),
      url: require.resolve('url'),
    },
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
  ),
)
