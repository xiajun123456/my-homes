/**
 * Created by xiajun on 2017/9/14.
 */
import $http from '$http'
import App from '@/main'
import {success} from 'prompt'

export default {
  async setAuthority ({commit, state}, products) {
    commit('ADD_SORT')
    commit('INIT_AUTHORITY', {})
    let purviewObj = {}
    let sort = state.sortingNumber
    await $http.post('getBtnPurview', {menuUrl: products.menuUrl}).then(
      data => {
        if (state.sortingNumber === sort) {
          data.rows.forEach((val, key) => {
            purviewObj[val.labelName] = val.id
          })
        }
        commit('INIT_AUTHORITY', purviewObj)
      }, err => {
        success(err.message || '服务器错误！')
      }
    )
  },
  async getImgAuthority ({commit}, url) {
    await $http.post('/img/getMenuListJsonByParentUrlOrParentId', url).then((data) => {
      let arr = {}
      data.rows.map((item) => {
        arr[item.labelName] = item.id
      })
      commit('GET_IMG_AUTHORITY', arr)
    }).catch((err) => {
      console.log('err', err)
    })
  }
}
