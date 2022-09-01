/*
 * @Author: linzeguang
 * @Date: 2022-09-01 13:58:48
 * @LastEditTime: 2022-09-02 01:07:52
 * @LastEditors: linzeguang
 * @Description: 打包配置
 */

const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const plugins =
  process.env.NODE_ENV === 'production'
    ? [
        // 添加打包变量，用于foca更新
        new webpack.DefinePlugin({ __BUILD_TIME__: Date.now() }),
        // 打包进度条
        new ProgressBarPlugin(),
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
      ]
    : [
        // 更新开发变量，用于foca更新
        new webpack.DefinePlugin({ __BUILD_TIME__: Date.now() }),
      ]

module.exports = function override(config) {
  // fix web3 start
  const fallback = config.resolve.fallback || {}
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
  })
  config.resolve.fallback = fallback
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ])
  config.ignoreWarnings = [/Failed to parse source map/]
  // fix web3 end

  config.plugins = config.plugins.concat(plugins)

  return config
}
