/**
 * 模块请求路径
 * Created by xiajun on 2018/6/7.
 */
/*
 * 登陆
 * */
const loginPath = {
  login: '/user/login',
  loginOut: '/user/logout',
  getMenu: '/sysMenu/userMenus',
  getBtnPurview: '/role/getMenuListJsonByParentUrlOrParentId',
  getValidateKey: '/user/validateKey'
}
/*
 * 省市区县
 * */
const areaPath = {
  getProvince: '/area/getProvince',
  getAreas: '/area/getAreas',
  getCitys: '/area/getCitys'
}
/*
 * 用户管理
 * */
const userPath = {
  getUser: '/user/getUsers',
  addUser: '/user/addUser',
  editUser: '/user/editUser',
  deleteUser: '/user/deleteUsers',
  getRoleList: '/getRole',
  getAllRole: '/role/getListRoleByCompanyId'
}
/*
 * 角色管理
 * */
const rolePath = {
  getRole: '/role/getRoleListJsonByPage',
  addRole: '/role/add',
  get: '/role/get',
  deleteRole: '/role/delete',
  editRole: '/role/modify'
}
/*
 * 企业管理
 * */
const enterprisePath = {
  getEnterprise: '/ent/getbypage',
  configEnterprise: '/ent/setup',
  editEnterprise: '/ent/modify',
  getEnterpriseDetails: '/ent/get',
  startOrStopEnterprise: '/ent/modifyenablestatus',
  addEnterprise: '/ent/add',
  resetPassword: '/ent/modifyentadminpassword'
}
/*
 * onenet管理
 * */
const oneNETPath = {
  searchOnenetProject: '/onenet/query-onenets',
  hasOnenetProject: '/onenet/check-onenet-product',
  addOnenetProject: '/onenet/create-onenet',
  updateOnnetProject: '/onenet/modify-onenet',
  delOnnetProject: '/onenet/delete-onenet',
  searchOnenetProduct: '/onenet-product/query-onenet-products',
  addOnenetProduct: '/onenet/create-onenet-product',
  delOnenetProduct: '/onenetProduct/delete-onenet-product',
  updateOnnetProduct: '/onenetProduct/modify-onenet-product',
  stopOnnetProduct: '/onenetProduct/stop-onenet-product',
  updateDeviceProduct: '/onenetProduct/update-device-status',
  searchOnenetCompany: '/onenet/query-all-onenets'
}
/*
 * 固件升级
 * */
const upgradePath = {
  searchUpgrade: '/searchUpgrade'
}
/*
 * 组织结构图
 * */
const orgTreePath = {
  searchOrg: '/org/getOrgControl'
}
/*
 * 日志管理
 * */
const logPath = {
  getLogList: '/operationLog/queryOperationLogs'
}
/*
 * 输出
 * */
export default Object.assign({}, areaPath, loginPath, userPath, rolePath, enterprisePath, oneNETPath, upgradePath, logPath, orgTreePath)
