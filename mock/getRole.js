/**
 * Created by xiajun on 2018/5/16.
 */
module.exports = {
  url: '/rsms-operating-platform/role/getRoleListJsonByPage',
  status: '200',
  data: {
    resultCode: 1,
    "page": {
      "pageSize": 10,
      "currentPage": 1,
      "prePage": 0,
      "nextPage": 0,
      "totalPage": 1,
      "totalCount": 40
    },
    rows: [
      {
        id: 1,
        roleName: '管理员',
        createTime: '2017-07-30',
        type: 1
      },
      {
        id: 0,
        roleName: '稽核员',
        createTime: '2017-07-30'
      },
      {
        id: 15,
        roleName: 'test',
        createTime: '2017-07-30'
      },
      {
        id: 2,
        roleName: '施工员',
        createTime: '2017-07-31'
      }
    ],
    message: '查询成功'
  }
}
