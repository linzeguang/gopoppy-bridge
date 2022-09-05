/*
 * @Author: linzeguang
 * @Date: 2022-09-03 17:47:06
 * @LastEditTime: 2022-09-05 22:49:51
 * @LastEditors: linzeguang
 * @Description: 国际化配置
 */
import { initReactI18next } from 'react-i18next'
import i18n, { Resource } from 'i18next'

import EN from './locale/en.json'
import tw from './locale/tw.json'

export const resources: Resource = {
  en: { translation: EN },
  tw: { translation: tw },
}

i18n.use(initReactI18next).init({
  lng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
})
