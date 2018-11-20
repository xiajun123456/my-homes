/**
 * Created by xiajun on 2017/9/14.
 */
export default {
  ['INIT_USER'] (state, type) {
    state.user = type
  },
  ['SET_PATH'] (state, path) {
    state.path = path
  },
  ['ADD_SORT'] (state) {
    state.sortingNumber++
  },
  ['INIT_AUTHORITY'] (state, type) {
    state.btnPurview = type
  },
  ['INIT_PROJECT_NAME'] (state, type) {
    state.projectName = type
  },
  ['GET_IMG_AUTHORITY'] (state, type) {
    state.imgAuthor = type
  },
  ['INIT_APP_CONFIG'] (state, type) {
    state.appConfig = type
  },
  ['INIT_MENU_URL'] (state, type) {
    state.menuUrlObj = type
  },
  ['SET_PERMISSIONS_ID'] (state, type) {
    state.permissionsId = type
  }
}
