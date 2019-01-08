/**
 * Created by xiajun on 2018/5/7.
 */
export const appConfig = {
  URL: '../rsms-operating-platform',
  EXPORTMAXNUM: 50000,
  searchExpirationTime: 3000,
  operationalExpirationTime: 5000,
  PROJECTNAME: 'TEST',
  PAGE: {
    itemsPerPage: 10
  },
  DIALOGWidth: '580px',
  DIALOGTOP: '8vh',
  DIALOGMAXWidth: '720px'
}
/*
 * 状态码
 * */
export const responseResultCode = {
  successCode: 1,
  successDataCode: 100,
  errorCode: '',
  tokenErrorCode: '-201'
}
export const stateFather = {
  '/entrance/userList': '用户管理',
  '/entrance/role': '用户管理',
  '/entrance/product': 'OneNET管理',
  '/entrance/project': 'OneNET管理'
}
export const promptConfig = {
  showClose: true,
  center: false,
  duration: 3000,
  dangerouslyUseHTMLString: false
}
export const typeMap = {
  roleName: {
    0: '管理员',
    1: '稽核员'
  },
  enterpriseWorkStatus: {
    1: '正常',
    0: '已停用'
  }
}
/*
 * vue-form自定义验证规则
 * */
export const formOptions = {
  validators: {
    'confirm-new-password': function (value, attrValue, vnode) {
      return value === attrValue
    }
  }
}
