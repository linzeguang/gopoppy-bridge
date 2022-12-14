/*
 * @Author: 林泽广
 * @Date: 2022-05-30 15:12:05
 * @LastEditTime: 2022-09-05 02:06:56
 * @LastEditors: linzeguang
 * @Description: axios 配置
 */

import axios from 'axios'
import { enhance } from 'foca-axios'

const instance = axios.create({
  timeout: 1000 * 10,
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://api.gopoppy.co/api',
})

export const http = enhance(instance)
