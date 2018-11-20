/**
 * Created by xiajun on 2017/9/14.
 */
export default {
  getUser: state => {
    return state.user
  },
  getMenuUrlObj: state => {
    return state.menuUrlObj || false
  }
}
