module.exports = {
  url: '/rsms-operating-platform/sysMenu/userMenus',
  data: {
    resultCode: 1,
    message: 'token已过期!',
    data: [
      {
        menuName: '用户管理',
        menuIcon: 'user-icon',
        menuUrl: '/user',
        id: 2,
        subMenu: [
          {
            menuName: '用户管理',
            menuIcon: 'userList-icon',
            menuUrl: '/entrance/userList',
            id: 20
          },
          {
            menuName: '角色管理',
            menuIcon: 'role-icon',
            menuUrl: '/entrance/role',
            id: 21
          }
        ]
      },
      {
        menuName: '企业管理',
        menuIcon: 'enterprise-icon',
        menuUrl: '/entrance/enterprise',
        id: 3
      },
      {
        menuName: '图像识别管理',
        menuIcon: 'image-identification-icon',
        menuUrl: '/entrance/imageIdentification',
        id: 4
      },
      {
        menuName: 'OneNET管理',
        menuIcon: 'OneNET-icon',
        menuUrl: '/entrance/OneNET',
        id: 5,
        subMenu: [
          {
            menuName: 'OneNET产品管理',
            menuIcon: 'product-icon',
            menuUrl: '/entrance/product',
            id: 51
          },
          {
            menuName: 'OneNET项目管理',
            menuIcon: 'project-icon',
            menuUrl: '/entrance/project',
            id: 52
          }
        ]
      },
      {
        menuName: '固件升级',
        menuIcon: 'upgrade-icon',
        menuUrl: '/entrance/upgrade',
        id: 6
      },
      {
        menuName: '日志记录',
        menuIcon: 'log-icon',
        menuUrl: '/entrance/log',
        id: 7
      }
    ]
  }
}
