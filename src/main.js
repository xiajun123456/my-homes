// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import StoreData from './store/index'
import Vuex from 'vuex'
import storage from 'Storage'
import VueForm from 'vue-form'
import {appConfig, formOptions} from 'appConfig'
import {getAllMenuUrl} from './assets/services/getAllMenuUrlService'
import {error} from 'prompt'
import './assets/services/filter'

Vue.config.productionTip = false
window.Promise = Promise
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueForm, formOptions)
const store = new Vuex.Store(StoreData)
store.commit('INIT_APP_CONFIG', appConfig)

router.beforeEach((to, from, next) => {
  let user = storage.get('user')
  if (user && !store.getters.getMenuUrlObj) {
    store.commit('INIT_MENU_URL', getAllMenuUrl(user.menus))
  }
  if (user) {
    if (JSON.stringify(user) !== JSON.stringify(store.getters.getUser)) {
      store.commit('INIT_USER', user)
    }
    if (to.path === '/login') {
      next({path: Object.keys(store.getters.getMenuUrlObj)[0]})
    } else {
      if (!store.getters.getMenuUrlObj[to.path]) {
        try {
          error('您没有这个页面的权限!')
        } catch (err) {
        }
        next({path: Object.keys(store.getters.getMenuUrlObj)[0]})
      } else {
        store.commit('SET_PERMISSIONS_ID', store.getters.getMenuUrlObj[to.path].menuId)
        store.dispatch('setAuthority', {
          menuUrl: to.path
        })
        next()
      }
    }
  } else {
    store.commit('INIT_USER', null)
    store.commit('INIT_MENU_URL', null)
    store.commit('SET_PERMISSIONS_ID', '')
    if (to.path === '/login') {
      next()
    } else {
      next({path: '/login'})
    }
  }
})

window.addEventListener('storage', function (e) {
  store.commit('INIT_USER', storage.get('user'))
})

export default new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
