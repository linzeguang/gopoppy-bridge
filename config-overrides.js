/*
 * @Author: linzeguang
 * @Date: 2022-09-01 13:58:48
 * @LastEditTime: 2022-09-03 14:03:55
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
  addWebpackPlugin(new webpack.DefinePlugin({ __BUILD_TIME__: Date.now() })),
  // 注意是production环境启动该plugin
  process.env.NODE_ENV === 'production' &&
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
