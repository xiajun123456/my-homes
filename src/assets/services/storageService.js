import store from 'store'

export default {
  set (key, data) {
    store.set(key, data)
  },
  get (key) {
    return store.get(key)
  },
  remove (key) {
    store.remove(key)
  }
}
