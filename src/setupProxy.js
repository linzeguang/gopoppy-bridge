/*
 * @Author: linzeguang
 * @Date: 2022-09-04 00:09:01
 * @LastEditTime: 2022-09-04 00:12:14
 * @LastEditors: linzeguang
 * @Description:
 */
/* eslint-disable no-undef */

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://api.gopoppy.co',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
    }),
  )
}
