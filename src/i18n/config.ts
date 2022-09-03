/*
 * @Author: linzeguang
 * @Date: 2022-09-03 17:47:06
 * @LastEditTime: 2022-09-03 18:00:54
 * @LastEditors: linzeguang
 * @Description: 国际化配置
 */
import { initReactI18next } from 'react-i18next'
import i18n, { Resource } from 'i18next'

import EN from './locale/en.json'
import ZH from './locale/zh.json'

export const resources: Resource = {
  en: { translation: EN },
  zh: { translation: ZH },
}

i18n.use(initReactI18next).init({
  lng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
})
