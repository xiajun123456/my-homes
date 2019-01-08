<template>
  <div>
    <div class="view-header">{{appConfig.PROJECTNAME}} > 用户管理 > 用户管理</div>
    <div class="deal-list p20">
      <button class="btn btn-operating btn-add"
              v-if="btnPurview.addUser"
              @click="addUser">
        <i class="el-icon-plus"></i>
        添加
      </button>
      <button class="btn btn-operating btn-delete m20"
              v-if="btnPurview.deleteUser"
              @click="deleteRole">
        <i class="el-icon-delete"></i>
        删除
      </button>
    </div>
    <div class="search-list clear p20">
      <div class="clear pull-left">
        <span class="input-label pull-left">关键字:</span>
        <div class="w220 pull-left">
          <el-input type="text"
                    v-model="keyword"
                    name="keyword"
                    clearable
                    placeholder="登陆账号/姓名">
          </el-input>
        </div>
      </div>
      <button class="btn btn-operating btn-add pull-left m20"
              @click="search">
        <i class="el-icon-search"></i>
        搜索
      </button>
    </div>
    <div class="table-view">
      <table-view
        :tableData='tableData'
        :searched="searched"
        :tableKeys='key'
        :total='total'
        :checked="true"
        :btnPremiss='btnPurview'
        :currentPage="currentPage"
        @page-change="pageChange"
        @select-change="selectChange"
        :code="code"
        :loaded="loaded">
      </table-view>
    </div>
    <edit-user
      :dialogTitle="dialogTitle"
      :editData="edit"
      :showDialogVisible="showDialogVisible"
      @search="searchUser"
      @close="close"></edit-user>
  </div>
</template>

<script>
  import tableView from 'tableView'
  import {mapState, mapMutations} from 'vuex'
  import $http from '$http'
  import {confirm, success, error} from 'prompt'
  import editUser from './group/edit-user'
  export default {
    name: 'role',
    data () {
      return {
        keyword: '',
        showDialogVisible: false,
        searched: false,
        loaded: false,
        currentPage: 1,
        total: 0,
        code: '',
        dialogTitle: '添加用户',
        checkList: [],
        roleList: [],
        edit: {
          xname: '',
          loginName: '',
          roleId: '',
          mobile: ''
        },
        tableData: []
      }
    },
    components: {
      tableView,
      editUser
    },
    computed: {
      ...mapState(['btnPurview', 'user', 'appConfig']),
      key () {
        let _self = this
        return {
          '登陆账号': {
            key: 'loginName'
          },
          '姓名': {
            key: 'xname'
          },
          '联系电话': {
            key: 'mobile'
          },
          '角色': {
            key: 'roleName'
          },
          '添加时间': {
            key: 'createTime'
          },
          '操作': {
            controls: [
              {
                text () {
                  return '重置密码'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: 'resetPassword',
                onClick (item) {
                  _self.resetPassword(item)
                }
              },
              {
                text () {
                  return '编辑'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: 'editUser',
                onClick (item) {
                  _self.dialogTitle = '编辑用户'
                  _self.edit = {
                    xname: item.xname,
                    loginName: item.loginName,
                    roleId: item.roleId,
                    mobile: item.mobile
                  }
                  _self.showDialogVisible = true
                }
              }
            ]
          }
        }
      }
    },
    methods: {
      searchUser () {
        if (this.searched) {
          return
        }
        this.loaded = false
        this.searched = true
        let searchData = {
          pageNum: this.currentPage,
          keyword: this.keyword,
          pageSize: this.appConfig.PAGE.itemsPerPage
        }
        $http.post('getUser', searchData).then(
          data => {
            this.tableData = data.rows
            this.loaded = true
            this.searched = false
            this.total = data.total
            this.code = `记录 ${data.total} 条`
          }, errData => {
            this.loaded = true
            this.searched = false
            this.tableData = []
          }
        )
      },
      search () {
        this.currentPage = 1
        this.searchUser()
      },
      addUser () {
        this.dialogTitle = '添加用户'
        this.edit = {
          xname: '',
          loginName: '',
          roleId: '',
          mobile: ''
        }
        this.showDialogVisible = true
      },
      resetPassword (item) {
        confirm(`是否重置${item.loginName}的密码?`).then(() => {
          console.log(item)
        }, () => {
        })
      },
      deleteRole () {
        if (!this.checkList.length) {
          error('请选择你想要删除的员工！')
          return
        }
        let deleteList = []
        this.checkList.forEach((val) => {
          if (val.userId !== this.user.userId) {
            deleteList.push(val.userId)
          }
        })
        if (deleteList.length !== this.checkList.length) {
          error('不能删除当前登录账号！')
          return
        }
        confirm('确定要删除所选员工？').then(() => {
          $http.post('deleteUser', {idList: deleteList}).then(
            data => {
              success(data.message)
              this.search()
            },
            err => {
              error(err.message)
              this.search()
            }
          )
        }, () => {
        })
      },
      pageChange (page) {
        this.currentPage = page
        this.searchUser()
      },
      selectChange (val) {
        this.checkList = val
      },
      close () {
        this.showDialogVisible = false
      }
    },
    beforeMount () {
      this.searchUser()
    }
  }
</script>

<style lang="scss" type="text/scss" scopedd>
</style>
