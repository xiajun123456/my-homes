<template>
  <div>
    <div class="view-header">{{appConfig.PROJECTNAME}} > 用户管理 >角色管理</div>
    <div class="deal-list p20">
      <button class="btn btn-operating btn-add"
              @click="addRole">
        <i class="el-icon-plus"></i>
        添加
      </button>
      <button class="btn btn-operating btn-delete m20"
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
                    placeholder="角色名称">
          </el-input>
        </div>
      </div>
      <button class="btn btn-operating btn-add pull-left m20"
              @click="search">
        <i class="el-icon-search"></i>
        搜索
      </button>
    </div>
    <!--table-->
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
    <edit-role
      :dialogTitle="dialogTitle"
      :selectRole="selectRole"
      :showDialogVisible="showDialogVisible"
      @close="close">
    </edit-role>
  </div>
</template>

<script>
  import tableView from 'tableView'
  import {mapState, mapMutations} from 'vuex'
  import $http from '$http'
  import {confirm, success, error} from 'prompt'
  import {appConfig} from 'appConfig'
  import editRole from './group/edit-role'
  export default {
    name: 'role',
    data () {
      return {
        keyword: '',
        showDialogVisible: false,
        searched: true,
        loaded: true,
        currentPage: 1,
        total: 0,
        formstate: {},
        code: '',
        dialogTitle: '添加角色',
        checkList: [],
        tableData: [],
        selectRole: {}
      }
    },
    components: {
      tableView,
      editRole
    },
    computed: {
      ...mapState(['btnPurview', 'appConfig']),
      key () {
        let _self = this
        return {
          '角色名称': {
            key: 'roleName'
          },
          '添加时间': {
            key: 'createTime'
          },
          '添加人': {
            key: 'createTime'
          },
          '操作': {
            controls: [
              {
                text (item) {
                  return '编辑'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: 'editRole',
                onClick (item) {
                  _self.dialogTitle = '编辑角色'
                  _self.showDialogVisible = true
                  _self.selectRole = item
                }
              },
              {
                text (item) {
                  return '查看'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: 'seeRole',
                onClick (item) {
                  _self.dialogTitle = '查看角色'
                  _self.showDialogVisible = true
                  _self.selectRole = item
                }
              }
            ]
          }
        }
      }
    },
    methods: {
      searchRole () {
        this.loaded = false
        this.searched = true
        let searchData = {
          pageNum: this.currentPage,
          keyword: this.keyword,
          pageSize: this.appConfig.PAGE.itemsPerPage
        }
        $http.post('getRole', searchData).then(
          data => {
            this.tableData = data.rows
            this.loaded = true
            this.searched = false
            this.total = data.page.totalCount
            this.code = `记录 ${data.page.totalCount} 条`
          }, errData => {
            this.loaded = true
            this.searched = false
            this.tableData = []
          }
        )
      },
      search () {
        this.currentPage = 1
        this.searchRole()
      },
      addRole () {
        this.dialogTitle = '添加角色'
        this.showDialogVisible = true
        this.selectRole = {}
      },
      deleteRole () {
        if (!this.checkList.length) {
          error('请选择你想要删除的角色！')
          return
        }
        let deleteList = this.checkList.map(val => {
          return {
            id: val.id
          }
        })
        confirm('此操作将永久删除该文件, 是否继续?').then(() => {
          $http.post('deleteRole', {row: deleteList}).then(
            data => {
              this.search()
              success(data.message)
            }, errData => {
              this.search()
              error(errData.message)
            }
          )
        }).catch(() => {
        })
      },
      pageChange (page) {
        this.currentPage = page
        this.searchRole()
      },
      selectChange (val) {
        this.checkList = val
      },
      close () {
        this.showDialogVisible = false
      }
    },
    beforeMount () {
      this.searchRole()
    }
  }
</script>

<style lang="scss" type="text/scss" scopedd>
</style>
