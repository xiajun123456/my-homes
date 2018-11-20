/**
 * Created by xiajun on 2018/6/25.
 */
import Vue from 'vue'
import {typeMap} from 'appConfig'
Vue.filter('typeMapFilter', (val, type) => {
  if (typeMap[type].hasOwnProperty(val)) {
    return typeMap[type][val]
  }
  return ''
})
