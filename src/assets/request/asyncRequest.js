import axios from 'axios'
import storage from 'Storage'
import {appConfig, responseResultCode} from '../../appConfig'
import App from '../../main.js'
import requestPath from './requestPath'

axios.defaults.timeout = 50000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use((config) => {
  if (storage.get('user')) {
    config.headers['Token'] = storage.get('user').token
  }
  if (App.$store.state.permissionsId) {
    config.headers['Current-Menu-Id'] = App.$store.state.permissionsId
  }
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use((res) => {
  if (res.data.resultCode === Number(responseResultCode.successCode) || res.data.resultCode === Number(responseResultCode.successDataCode)) {
    return Promise.resolve(res.data)
  } else if (res.data.resultCode === Number(responseResultCode.tokenErrorCode)) {
    storage.remove('user')
    App._router.push({path: '/login'})
    return
  }
  return Promise.reject(res.data)
}, (error) => {
  if (error.response.status === 401) {
    storage.remove('user')
    App._router.push({path: '/login'})
  }
  return Promise.reject(error.response.data && error.response.data.message ? error.response.data : {message: '服务器错误！请稍后再试...'})
})

function fetch (key, params) {
  let url = appConfig.URL + requestPath[key]
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  post: fetch
}
