module.exports = {
  url: '/rsms-operating-platform/org/getOrgControl',
  status: '200',
  message: '查询成功',
  data: {
    resultCode: 1,
    rows: [{
      resultCode: 1,
      orgId: '1',
      orgName: 'test1',
      parentId: null,
      parentName: null,
      children: [
        {
          orgId: '2',
          orgName: '测试11',
          parentId: '1',
          parentName: 'test2',
          children: null
        }, {
          orgId: '3',
          orgName: '测试22',
          parentId: '1',
          parentName: 'test3',
          children: [
            {
              orgId: '4',
              orgName: '测试11',
              parentId: '3',
              parentName: 'test1',
              children: null
            }, {
              orgId: '5',
              orgName: '测试11',
              parentId: '3',
              parentName: 'test1',
              children: null
            }
          ]
        }
      ]
    }],
    message: '查询成功'
  }
}
