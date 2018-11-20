<template>
  <div>
    <div class="view-header">{{appConfig['PROJECTNAME']}} > 企业管理</div>
    <div class="deal-list p20">
      <button class="btn btn-operating btn-add"
              v-if="btnPurview.addEnterprise"
              @click="addEnterprise">
        <i class="el-icon-plus"></i>
        添加
      </button>
    </div>
    <div class="search-list clear p20">
      <div class="pull-left">
        <el-select v-model="enableStatus"
                   placeholder='状态'
                   clearable>
          <el-option value="1"
                     label="启用">
          </el-option>
          <el-option value="0"
                     label="停用">
          </el-option>
        </el-select>
      </div>
      <div class="clear pull-left m20">
        <span class="input-label pull-left">关键字:</span>
        <div class="w220 pull-left">
          <el-input type="text"
                    v-model="keyword"
                    name="keyword"
                    clearable
                    placeholder="企业名称/账号/联系人">
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
        :checked="false"
        :btnPremiss='btnPurview'
        :currentPage="currentPage"
        @page-change="pageChange"
        :code="code"
        :loaded="loaded">
      </table-view>
    </div>
    <!--添加编辑-->
    <edit-enterprise
      :showDialogVisible="editDialog"
      :dialogTitle="dialogTitle"
      :editData="edit"
      @search="searchEnterprise"
      @close-edit="closeDialog">
    </edit-enterprise>
    <!--配置企业-->
    <config-enterprise
      :showDialogVisible="config"
      :dialogTitle="dialogTitle"
      :data="enterpriseId"
      @search="searchEnterprise"
      @close-config="closeDialog">
    </config-enterprise>
    <!--修改密码-->
    <reset-password
      :showDialogVisible="resetPassword"
      :dialogTitle="dialogTitle"
      :enterprise=enterprise
      @search="searchEnterprise"
      @close-config="closeDialog">
    </reset-password>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import tableView from 'tableView'
  import $http from '$http'
  import {confirm, success, error} from 'prompt'
  import editEnterprise from './group/edit-enterprise'
  import configEnterprise from './group/config-enterprise'
  import resetPassword from './group/reset-password'

  export default {
    name: 'enterprise',
    data () {
      return {
        enableStatus: '',
        keyword: '',
        tableData: [],
        searched: false,
        currentPage: 1,
        total: 0,
        code: '',
        loaded: false,
        dialogTitle: '',
        showDialogVisible: false,
        editDialog: false,
        resetPassword: false,
        enterprise: {},
        config: false,
        enterpriseId: 0,
        edit: {
          enterpriseName: '',
          loginName: '',
          password: '',
          contactPerson: '',
          contactNumber: '',
          area: {},
          address: '',
          memo: ''
        }
      }
    },
    computed: {
      ...mapState(['appConfig', 'btnPurview']),
      key () {
        let _self = this
        return {
          '企业名称': {
            key: 'enterpriseName'
          },
          '登陆账号': {
            key: 'loginName'
          },
          '联系人': {
            key: 'contactPerson'
          },
          '联系电话': {
            key: 'contactNumber'
          },
          '添加时间': {
            key: 'createTime'
          },
          '状态': {
            key: 'enableStatus',
            type: 'enterpriseWorkStatus'
          },
          '操作': {
            controls: [
              {
                text () {
                  return '修改密码'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: 'amendPassword',
                onClick (item) {
                  _self.dialogTitle = '修改密码'
                  _self.resetPassword = true
                  _self.editDialog = false
                  _self.showDialogVisible = true
                  _self.config = false
                  _self.enterprise = item
                }
              },
              {
                text () {
                  return '编辑'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: 'editEnterprise',
                onClick (item) {
                  _self.showDialogVisible = true
                  _self.dialogTitle = '编辑企业'
                  _self.editDialog = true
                  _self.resetPassword = false
                  _self.edit = item
                }
              },
              {
                text (item) {
                  return item && Number(item.enableStatus) === 1 ? '停用' : '启用'
                },
                class (item) {
                  return item && Number(item.enableStatus) === 1 ? 'disabled' : 'en-abel'
                },
                show: 'startOrStopEnterprise',
                onClick (item) {
                  _self.startOrStopEnterprise(item)
                }
              },
              {
                text (item) {
                  return '配置'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: 'configEnterprise',
                onClick (item) {
                  _self.showDialogVisible = true
                  _self.dialogTitle = '配置企业'
                  _self.editDialog = false
                  _self.resetPassword = false
                  _self.config = true
                  _self.enterpriseId = item.id
                }
              }
            ]
          }
        }
      }
    },
    methods: {
      addEnterprise () {
        this.showDialogVisible = true
        this.dialogTitle = '添加企业'
        this.editDialog = true
        this.resetPassword = false
        this.config = false
        this.edit = {
          enterpriseName: '',
          loginName: '',
          passWorld: '',
          contactPerson: '',
          contactNumber: '',
          area: {},
          address: '',
          memo: ''
        }
      },
      startOrStopEnterprise (item) {
        let text = Number(item.enableStatus) === 1 ? `停用后该企业所有电表将停用且下属所有账号将无法登陆,是否继续？` : `确定启用${item.enterpriseName}?`
        confirm(text).then(() => {
          $http.post('startOrStopEnterprise', {id: item.id}).then(
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
      closeDialog () {
        this.editDialog = false
        this.resetPassword = false
        this.config = false
      },
      searchEnterprise () {
        this.loaded = false
        this.searched = true
        let searchData = {
          pageNum: this.currentPage,
          keyword: this.keyword,
          enableStatus: this.enableStatus,
          pageSize: this.appConfig.PAGE.itemsPerPage
        }
        $http.post('getEnterprise', searchData).then(
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
            error(errData.message)
          }
        )
      },
      search () {
        this.searchEnterprise()
      },
      pageChange (page) {
        this.currentPage = page
        this.searchEnterprise()
      }
    },
    components: {
      tableView,
      editEnterprise,
      configEnterprise,
      resetPassword
    },
    beforeMount () {
      this.searchEnterprise()
    }
  }
</script>

<style lang="scss" type="text/scss" scope>
  .base-config {
    padding: 20px 0 15px;
    .system-name {
      width: 370px;
      margin-left: -10px;
    }
    .avatar-uploader {
      width: 251px;
      height: 70px;
      background: #E8E8E8;
      font-size: 40px;
      color: #838383;
      text-align: center;
      line-height: 70px;
    }
  }

  .data-update-config-content {
    width: 400px;
    padding: 15px 0 25px;
    .radio-container {
      margin-top: -3px;
    }
    .server-address {
      position: relative;
      .server-port_input {
        position: absolute;
        width: 80px;
        right: -80px;
        top: 0;
      }
      .port-err_span {
        color: #f00;
        bottom: 3px;
        position: absolute;
        left: 120px;
      }
    }
  }

  .features-config {
    padding: 15px 0;
  }
</style>
