/**
 * Created by xiajun on 2018/5/24.
 */
module.exports = {
  url: '/rsms-operating-platform/role/get',
  status: '200',
  data: {
    resultCode: 1,
    roleName: 'test',
    rows: [{
      "inheritStatus": 1,
      "subMenu": [{
        "inheritStatus": 1,
        "roleId": 1,
        "menuName": "设备显示",
        "menuType": 4,
        "id": 101100,
        "sort": 1,
        "labelName": "deviceDisplay",
        "enableStatus": 1,
        "menuParentId": 101000,
        "parentId": 101000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "roleId": 1,
        "menuName": "今日能耗",
        "menuType": 4,
        "id": 101200,
        "sort": 2,
        "labelName": "meterEnergyConsumptionHome",
        "enableStatus": 1,
        "menuParentId": 101000,
        "parentId": 101000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "roleId": 1,
        "menuName": "抄表成功率",
        "menuType": 4,
        "id": 101300,
        "sort": 3,
        "labelName": "meterSuccessRate",
        "enableStatus": 1,
        "menuParentId": 101000,
        "parentId": 101000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "roleId": 1,
        "menuName": "在线率",
        "menuType": 4,
        "id": 101400,
        "sort": 4,
        "labelName": "onlineRate",
        "enableStatus": 1,
        "menuParentId": 101000,
        "parentId": 101000,
        "selected": 1
      }],
      "menuIcon": "nav-icon-dashboard",
      "roleId": 0,
      "menuName": "首页",
      "sort": 1,
      "parentId": 110,
      "menuUrl": "/dashboard",
      "menuType": 1,
      "id": 101000,
      "enableStatus": 1,
      "menuParentId": 110,
      "selected": 1
    }, {
      "inheritStatus": 1,
      "subMenu": [{
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "添加组织架构",
          "menuType": 4,
          "id": 102101,
          "sort": 1,
          "labelName": "addOrgTree",
          "enableStatus": 1,
          "menuParentId": 102100,
          "parentId": 102100,
          "selected": 1
        }, {
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "编辑组织架构",
          "menuType": 4,
          "id": 102102,
          "sort": 2,
          "labelName": "editOrgTree",
          "enableStatus": 1,
          "menuParentId": 102100,
          "parentId": 102100,
          "selected": 1
        }, {
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "删除组织架构",
          "menuType": 4,
          "id": 102103,
          "sort": 3,
          "labelName": "deleteOrgTree",
          "enableStatus": 1,
          "menuParentId": 102100,
          "parentId": 102100,
          "selected": 1
        }, {
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "重置密码",
          "menuType": 4,
          "id": 102104,
          "sort": 4,
          "labelName": "resetPassword",
          "enableStatus": 1,
          "menuParentId": 102100,
          "parentId": 102100,
          "selected": 1
        }, {
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "添加员工",
          "menuType": 4,
          "id": 102105,
          "sort": 5,
          "labelName": "addUser",
          "enableStatus": 1,
          "menuParentId": 102100,
          "parentId": 102100,
          "selected": 1
        }, {
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "编辑员工",
          "menuType": 4,
          "id": 102106,
          "sort": 6,
          "labelName": "editUser",
          "enableStatus": 1,
          "menuParentId": 102100,
          "parentId": 102100,
          "selected": 1
        }, {
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "删除员工",
          "menuType": 4,
          "id": 102107,
          "sort": 7,
          "labelName": "deleteUser",
          "enableStatus": 1,
          "menuParentId": 102100,
          "parentId": 102100,
          "selected": 1
        }],
        "menuIcon": "nav-icon-user-list",
        "roleId": 1,
        "menuName": "人员架构",
        "sort": 1,
        "parentId": 102000,
        "menuUrl": "/user/list",
        "menuType": 2,
        "id": 102100,
        "enableStatus": 1,
        "menuParentId": 102000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "添加角色",
          "menuType": 4,
          "id": 102201,
          "sort": 1,
          "labelName": "addRole",
          "enableStatus": 1,
          "menuParentId": 102200,
          "parentId": 102200,
          "selected": 1
        }, {
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "编辑角色",
          "menuType": 4,
          "id": 102202,
          "sort": 2,
          "labelName": "editRole",
          "enableStatus": 1,
          "menuParentId": 102200,
          "parentId": 102200,
          "selected": 1
        }, {
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "删除角色",
          "menuType": 4,
          "id": 102203,
          "sort": 3,
          "labelName": "deleteRole",
          "enableStatus": 1,
          "menuParentId": 102200,
          "parentId": 102200,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "查看角色",
          "menuType": 4,
          "id": 102204,
          "sort": 4,
          "labelName": "viewRole",
          "enableStatus": 1,
          "menuParentId": 102200,
          "parentId": 102200,
          "selected": 1
        }],
        "menuIcon": "nav-icon-user-role",
        "roleId": 1,
        "menuName": "角色管理",
        "sort": 2,
        "parentId": 102000,
        "menuUrl": "/user/role",
        "menuType": 2,
        "id": 102200,
        "enableStatus": 1,
        "menuParentId": 102000,
        "selected": 1
      }],
      "menuIcon": "nav-icon-user",
      "roleId": 1,
      "menuName": "人员管理",
      "sort": 2,
      "parentId": 110,
      "menuUrl": "/user",
      "menuType": 1,
      "id": 102000,
      "enableStatus": 1,
      "menuParentId": 110,
      "selected": 1
    }, {
      "inheritStatus": 1,
      "subMenu": [{
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "标记为已处理",
          "menuType": 4,
          "id": 103101,
          "sort": 1,
          "labelName": "dealAlarm",
          "enableStatus": 1,
          "menuParentId": 103100,
          "parentId": 103100,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "导出",
          "menuType": 4,
          "id": 103102,
          "sort": 2,
          "labelName": "exportAlarm",
          "enableStatus": 1,
          "menuParentId": 103100,
          "parentId": 103100,
          "selected": 1
        }],
        "menuIcon": "nav-icon-alarm-list",
        "roleId": 1,
        "menuName": "智能电表告警记录",
        "sort": 1,
        "parentId": 103000,
        "menuUrl": "/alarm/list/1001/",
        "menuType": 2,
        "id": 103100,
        "enableStatus": 1,
        "menuParentId": 103000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "导出",
          "menuType": 4,
          "id": 103301,
          "sort": 1,
          "labelName": "powerExport",
          "enableStatus": 1,
          "menuParentId": 103300,
          "parentId": 103300,
          "selected": 1
        }],
        "menuIcon": "nav-icon-alarm-power",
        "roleId": 1,
        "menuName": "停电记录",
        "sort": 5,
        "parentId": 103000,
        "menuUrl": "/alarm/power",
        "menuType": 2,
        "id": 103300,
        "labelName": "",
        "enableStatus": 1,
        "menuParentId": 103000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "标记为已处理",
          "menuType": 4,
          "id": 103401,
          "sort": 1,
          "labelName": "dealAlarm",
          "enableStatus": 1,
          "menuParentId": 103400,
          "parentId": 103400,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "导出",
          "menuType": 4,
          "id": 103402,
          "sort": 2,
          "labelName": "exportAlarm",
          "enableStatus": 1,
          "menuParentId": 103400,
          "parentId": 103400,
          "selected": 1
        }],
        "menuIcon": "nav-icon-alarm-picList",
        "roleId": 1,
        "menuName": "图像抄表告警记录",
        "sort": 4,
        "parentId": 103000,
        "menuUrl": "/alarm/picList/1001/",
        "menuType": 2,
        "id": 103400,
        "labelName": "",
        "enableStatus": 1,
        "menuParentId": 103000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "标记为已处理",
          "menuType": 4,
          "id": 103501,
          "sort": 1,
          "labelName": "dealAlarm",
          "enableStatus": 1,
          "menuParentId": 103500,
          "parentId": 103500,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "导出",
          "menuType": 4,
          "id": 103502,
          "sort": 2,
          "labelName": "exportAlarm",
          "enableStatus": 1,
          "menuParentId": 103500,
          "parentId": 103500,
          "selected": 1
        }],
        "menuIcon": "nav-icon-alarm-directList",
        "roleId": 1,
        "menuName": "直流模块告警记录",
        "sort": 3,
        "parentId": 103000,
        "menuUrl": "/alarm/directList/1001/",
        "menuType": 2,
        "id": 103500,
        "labelName": "",
        "enableStatus": 1,
        "menuParentId": 103000,
        "selected": 1
      }],
      "menuIcon": "nav-icon-alarm",
      "roleId": 1,
      "menuName": "告警管理",
      "sort": 4,
      "parentId": 100000,
      "menuUrl": "/alarm",
      "menuType": 1,
      "id": 103000,
      "enableStatus": 1,
      "menuParentId": 100000,
      "selected": 1
    }, {
      "inheritStatus": 1,
      "subMenu": [{
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "添加计量点类型",
          "menuType": 4,
          "id": 104101,
          "sort": 1,
          "labelName": "addResourceType",
          "enableStatus": 1,
          "menuParentId": 104100,
          "parentId": 104100,
          "selected": 1
        }, {
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "编辑计量点类型",
          "menuType": 4,
          "id": 104102,
          "sort": 2,
          "labelName": "editResourceType",
          "enableStatus": 1,
          "menuParentId": 104100,
          "parentId": 104100,
          "selected": 1
        }, {
          "inheritStatus": 0,
          "roleId": 1,
          "menuName": "删除计量点类型",
          "menuType": 4,
          "id": 104103,
          "sort": 3,
          "labelName": "deleteResourceType",
          "enableStatus": 1,
          "menuParentId": 104100,
          "parentId": 104100,
          "selected": 1
        }],
        "menuIcon": "nav-icon-resource-type",
        "roleId": 1,
        "menuName": "计量点类型",
        "sort": 1,
        "parentId": 104000,
        "menuUrl": "/resource/type",
        "menuType": 2,
        "id": 104100,
        "enableStatus": 1,
        "menuParentId": 104000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "添加计量点",
          "menuType": 4,
          "id": 104201,
          "sort": 1,
          "labelName": "addResource",
          "enableStatus": 1,
          "menuParentId": 104200,
          "parentId": 104200,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "编辑计量点",
          "menuType": 4,
          "id": 104202,
          "sort": 2,
          "labelName": "editResource",
          "enableStatus": 1,
          "menuParentId": 104200,
          "parentId": 104200,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "删除计量点",
          "menuType": 4,
          "id": 104203,
          "sort": 3,
          "labelName": "deleteResource",
          "enableStatus": 1,
          "menuParentId": 104200,
          "parentId": 104200,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "导出计量点",
          "menuType": 4,
          "id": 104204,
          "sort": 4,
          "labelName": "exportResource",
          "enableStatus": 1,
          "menuParentId": 104200,
          "parentId": 104200,
          "selected": 1
        }],
        "menuIcon": "nav-icon-resource-list",
        "roleId": 1,
        "menuName": "计量点列表",
        "sort": 2,
        "parentId": 104000,
        "menuUrl": "/resource/list",
        "menuType": 2,
        "id": 104200,
        "enableStatus": 1,
        "menuParentId": 104000,
        "selected": 1
      }],
      "menuIcon": "nav-icon-resource",
      "roleId": 1,
      "menuName": "计量点管理",
      "sort": 3,
      "parentId": 100000,
      "menuUrl": "/resource",
      "menuType": 1,
      "id": 104000,
      "enableStatus": 1,
      "menuParentId": 100000,
      "selected": 1
    }, {
      "inheritStatus": 1,
      "subMenu": [{
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "添加电表",
          "menuType": 4,
          "id": 105101,
          "sort": 1,
          "labelName": "addMeter",
          "enableStatus": 1,
          "menuParentId": 105100,
          "parentId": 105100,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "编辑电表",
          "menuType": 4,
          "id": 105102,
          "sort": 2,
          "labelName": "editMeter",
          "enableStatus": 1,
          "menuParentId": 105100,
          "parentId": 105100,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "启停用电表",
          "menuType": 4,
          "id": 105103,
          "sort": 3,
          "labelName": "startOrStopMeter",
          "enableStatus": 1,
          "menuParentId": 105100,
          "parentId": 105100,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "删除电表",
          "menuType": 4,
          "id": 105104,
          "sort": 4,
          "labelName": "deleteMeter",
          "enableStatus": 1,
          "menuParentId": 105100,
          "parentId": 105100,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "命令下发",
          "menuType": 4,
          "id": 105105,
          "sort": 5,
          "labelName": "order",
          "enableStatus": 1,
          "menuParentId": 105100,
          "parentId": 105100,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "导出电表",
          "menuType": 4,
          "id": 105106,
          "sort": 6,
          "labelName": "exportMeter",
          "enableStatus": 1,
          "menuParentId": 105100,
          "parentId": 105100,
          "selected": 1
        }],
        "menuIcon": "nav-icon-meter-intelligent",
        "roleId": 1,
        "menuName": "智能抄表",
        "sort": 1,
        "parentId": 105000,
        "menuUrl": "/meter/intelligent",
        "menuType": 2,
        "id": 105100,
        "labelName": "",
        "enableStatus": 1,
        "menuParentId": 105000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "添加电表",
          "menuType": 4,
          "id": 105201,
          "sort": 1,
          "labelName": "addMeter",
          "enableStatus": 1,
          "menuParentId": 105200,
          "parentId": 105200,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "编辑电表",
          "menuType": 4,
          "id": 105202,
          "sort": 2,
          "labelName": "editMeter",
          "enableStatus": 1,
          "menuParentId": 105200,
          "parentId": 105200,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "删除电表",
          "menuType": 4,
          "id": 105203,
          "sort": 3,
          "labelName": "deleteMeter",
          "enableStatus": 1,
          "menuParentId": 105200,
          "parentId": 105200,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "导出电表",
          "menuType": 4,
          "id": 105204,
          "sort": 4,
          "labelName": "exportMeter",
          "enableStatus": 1,
          "menuParentId": 105200,
          "parentId": 105200,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "导入电表",
          "menuType": 4,
          "id": 105205,
          "sort": 5,
          "labelName": "importMeter",
          "enableStatus": 1,
          "menuParentId": 105200,
          "parentId": 105200,
          "selected": 1
        }],
        "menuIcon": "nav-icon-meter-manul",
        "roleId": 1,
        "menuName": "手工抄表",
        "sort": 5,
        "parentId": 105000,
        "menuUrl": "/meter/manul",
        "menuType": 2,
        "id": 105200,
        "enableStatus": 1,
        "menuParentId": 105000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "添加电表",
          "menuType": 4,
          "id": 105301,
          "sort": 1,
          "labelName": "addMeter",
          "enableStatus": 1,
          "menuParentId": 105300,
          "parentId": 105300,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "命令下发",
          "menuType": 4,
          "id": 105302,
          "sort": 2,
          "labelName": "order",
          "enableStatus": 1,
          "menuParentId": 105300,
          "parentId": 105300,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "删除电表",
          "menuType": 4,
          "id": 105303,
          "sort": 3,
          "labelName": "deleteMeter",
          "enableStatus": 1,
          "menuParentId": 105300,
          "parentId": 105300,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "导出电表",
          "menuType": 4,
          "id": 105304,
          "sort": 4,
          "labelName": "exportMeter",
          "enableStatus": 1,
          "menuParentId": 105300,
          "parentId": 105300,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "编辑电表",
          "menuType": 4,
          "id": 105305,
          "sort": 5,
          "labelName": "editMeter",
          "enableStatus": 1,
          "menuParentId": 105300,
          "parentId": 105300,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "启停用电表",
          "menuType": 4,
          "id": 105306,
          "sort": 6,
          "labelName": "startOrStopMeter",
          "enableStatus": 1,
          "menuParentId": 105300,
          "parentId": 105300,
          "selected": 1
        }],
        "menuIcon": "nav-icon-meter-directMeter",
        "roleId": 1,
        "menuName": "直流计量模块",
        "sort": 3,
        "parentId": 105000,
        "menuUrl": "/meter/directMeter",
        "menuType": 2,
        "id": 105300,
        "labelName": "",
        "enableStatus": 1,
        "menuParentId": 105000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "添加电表",
          "menuType": 4,
          "id": 105401,
          "sort": 1,
          "labelName": "addMeter",
          "enableStatus": 1,
          "menuParentId": 105400,
          "parentId": 105400,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "删除电表",
          "menuType": 4,
          "id": 105402,
          "sort": 2,
          "labelName": "deleteMeter",
          "enableStatus": 1,
          "menuParentId": 105400,
          "parentId": 105400,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "导出电表",
          "menuType": 4,
          "id": 105403,
          "sort": 3,
          "labelName": "exportMeter",
          "enableStatus": 1,
          "menuParentId": 105400,
          "parentId": 105400,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "编辑电表",
          "menuType": 4,
          "id": 105404,
          "sort": 4,
          "labelName": "editMeter",
          "enableStatus": 1,
          "menuParentId": 105400,
          "parentId": 105400,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "启停用电表",
          "menuType": 4,
          "id": 105406,
          "sort": 6,
          "labelName": "startOrStopMeter",
          "enableStatus": 1,
          "menuParentId": 105400,
          "parentId": 105400,
          "selected": 1
        }],
        "menuIcon": "nav-icon-meter-image",
        "roleId": 1,
        "menuName": "图像抄表",
        "sort": 4,
        "parentId": 105000,
        "menuUrl": "/meter/image",
        "menuType": 2,
        "id": 105400,
        "labelName": "",
        "enableStatus": 1,
        "menuParentId": 105000,
        "selected": 1
      }],
      "menuIcon": "nav-icon-meter",
      "roleId": 1,
      "menuName": "抄表管理",
      "sort": 5,
      "parentId": 100000,
      "menuUrl": "/meter",
      "menuType": 1,
      "id": 105000,
      "labelName": "",
      "enableStatus": 1,
      "menuParentId": 100000,
      "selected": 1
    }, {
      "inheritStatus": 1,
      "subMenu": [{
        "inheritStatus": 1,
        "menuUrl": "/report/base",
        "menuIcon": "nav-icon-report-basal",
        "roleId": 1,
        "menuName": "基础报表",
        "menuType": 2,
        "id": 106100,
        "sort": 1,
        "enableStatus": 1,
        "menuParentId": 106000,
        "parentId": 106000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "menuUrl": "/report/consumption",
        "menuIcon": "nav-icon-report-consumption",
        "roleId": 1,
        "menuName": "能耗分布",
        "menuType": 2,
        "id": 106200,
        "sort": 2,
        "enableStatus": 1,
        "menuParentId": 106000,
        "parentId": 106000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "导出",
          "menuType": 4,
          "id": 106301,
          "sort": 1,
          "labelName": "exportDayFreeze",
          "enableStatus": 1,
          "menuParentId": 106300,
          "parentId": 106300,
          "selected": 1
        }],
        "menuIcon": "nav-icon-report-dayFreeze",
        "roleId": 1,
        "menuName": "日冻结报表",
        "sort": 3,
        "parentId": 106000,
        "menuUrl": "/report/dayFreeze",
        "menuType": 2,
        "id": 106300,
        "enableStatus": 1,
        "menuParentId": 106000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "导出",
          "menuType": 4,
          "id": 106401,
          "sort": 1,
          "labelName": "consumptionMonthExport",
          "enableStatus": 1,
          "menuParentId": 106400,
          "parentId": 106400,
          "selected": 1
        }],
        "menuIcon": "nav-icon-report-consumptionMonth",
        "roleId": 1,
        "menuName": "能耗统计报表",
        "sort": 4,
        "parentId": 106000,
        "menuUrl": "/report/consumptionMonth",
        "menuType": 2,
        "id": 106400,
        "enableStatus": 1,
        "menuParentId": 106000,
        "selected": 1
      }],
      "menuIcon": "nav-icon-report",
      "roleId": 1,
      "menuName": "数据报表",
      "sort": 6,
      "parentId": 100000,
      "menuUrl": "/report",
      "menuType": 1,
      "id": 106000,
      "enableStatus": 1,
      "menuParentId": 100000,
      "selected": 1
    }, {
      "inheritStatus": 1,
      "subMenu": [{
        "inheritStatus": 1,
        "menuUrl": "/system/userLog",
        "menuIcon": "nav-icon-system-userLog",
        "roleId": 1,
        "menuName": "用户日志",
        "menuType": 2,
        "id": 107100,
        "sort": 1,
        "enableStatus": 1,
        "menuParentId": 107000,
        "parentId": 107000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "menuUrl": "/system/equipLog",
        "menuIcon": "nav-icon-system-equipLog",
        "roleId": 1,
        "menuName": "设备日志",
        "menuType": 2,
        "id": 107200,
        "sort": 2,
        "enableStatus": 1,
        "menuParentId": 107000,
        "parentId": 107000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "subMenu": [{
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "添加",
          "menuType": 4,
          "id": 107301,
          "sort": 1,
          "labelName": "addSolidUpdate",
          "enableStatus": 1,
          "menuParentId": 107300,
          "parentId": 107300,
          "selected": 1
        }, {
          "inheritStatus": 1,
          "roleId": 1,
          "menuName": "重新升级",
          "menuType": 4,
          "id": 107302,
          "sort": 2,
          "labelName": "againSolidUpdate",
          "enableStatus": 1,
          "menuParentId": 107300,
          "parentId": 107300,
          "selected": 1
        }],
        "menuIcon": "nav-icon-system-solidUpdate",
        "roleId": 1,
        "menuName": "固件升级",
        "sort": 3,
        "parentId": 107000,
        "menuUrl": "/system/solidUpdate",
        "menuType": 2,
        "id": 107300,
        "enableStatus": 1,
        "menuParentId": 107000,
        "selected": 1
      }],
      "menuIcon": "nav-icon-system",
      "roleId": 1,
      "menuName": "系统管理",
      "sort": 7,
      "parentId": 100000,
      "menuUrl": "/system",
      "menuType": 1,
      "id": 107000,
      "enableStatus": 1,
      "menuParentId": 100000,
      "selected": 1
    }, {
      "inheritStatus": 1,
      "subMenu": [{
        "inheritStatus": 1,
        "menuUrl": "/personal/info",
        "menuIcon": "nav-icon-personal-info",
        "roleId": 0,
        "menuName": "个人资料",
        "menuType": 2,
        "id": 108100,
        "sort": 1,
        "enableStatus": 1,
        "menuParentId": 108000,
        "parentId": 108000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "menuUrl": "/personal/skin",
        "menuIcon": "nav-icon-personal-skin",
        "roleId": 0,
        "menuName": "界面风格",
        "menuType": 2,
        "id": 108300,
        "sort": 3,
        "enableStatus": 1,
        "menuParentId": 108000,
        "parentId": 108000,
        "selected": 1
      }],
      "menuIcon": "nav-icon-personal",
      "roleId": 0,
      "menuName": "个人中心",
      "sort": 8,
      "parentId": 100000,
      "menuUrl": "/personal",
      "menuType": 1,
      "id": 108000,
      "enableStatus": 1,
      "menuParentId": 100000,
      "selected": 1
    }, {
      "inheritStatus": 1,
      "subMenu": [{
        "inheritStatus": 1,
        "roleId": 0,
        "menuName": "平台登录",
        "menuType": 4,
        "id": 109100,
        "sort": 1,
        "labelName": "platLogin",
        "enableStatus": 1,
        "menuParentId": 109000,
        "parentId": 109000,
        "selected": 1
      }, {
        "inheritStatus": 1,
        "roleId": 1,
        "menuName": "APP登录",
        "menuType": 4,
        "id": 109200,
        "sort": 2,
        "labelName": "appLogin",
        "enableStatus": 1,
        "menuParentId": 109000,
        "parentId": 109000,
        "selected": 1
      }],
      "roleId": 0,
      "menuName": "登录",
      "menuType": 6,
      "id": 109000,
      "sort": 9,
      "enableStatus": 1,
      "menuParentId": 100000,
      "parentId": 100000,
      "selected": 1
    }],
    message: '编辑成功'
  }
}
