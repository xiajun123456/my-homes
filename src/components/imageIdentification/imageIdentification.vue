<template>
  <div>
    <div class="view-header">{{appConfig['PROJECTNAME']}} > 图像识别管理</div>
    <div class="deal-list p20">
      <button class="btn btn-operating btn-add"
              v-if="btnPurview.deleteIdentification"
              @click="addIdentification">
        <i class="el-icon-plus"></i>
        添加
      </button>
      <button class="btn btn-operating btn-delete m20"
              v-if="btnPurview.deleteIdentification"
              @click="deleteIdentification">
        <i class="el-icon-delete"></i>
        删除
      </button>
    </div>
    <div class="search-list clear p20">
      <div class="clear pull-left m20">
        <span class="input-label pull-left">关键字:</span>
        <div class="w220 pull-left">
          <el-input type="text"
                    v-model="keyWorld"
                    name="keyWorld"
                    clearable
                    placeholder="服务厂商名称">
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
    <!--modal-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="showDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :top="appConfig.DIALOGTOP"
      :width="appConfig.DIALOGWidth"
      center>
      <div>
        <vue-form :state="formstate">
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~16位的汉字、数字、大小写字母!'}"
                               :name="'projectName'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'项目名称'">
            <input v-model="edit.projectName"
                   class="el-input__inner"
                   name="projectName"
                   pattern="^[\u4e00-\u9fa5a-zA-Z0-9]{1,16}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'appID'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'应用ID'">
            <input v-model="edit.appID"
                   class="el-input__inner"
                   name="appID"
                   pattern="^[-!@#$%^&*(),.，、|_。a-zA-Z0-9]{1,100}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'secretKey'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'秘钥'">
            <input v-model="edit.secretKey"
                   class="el-input__inner"
                   name="secretKey"
                   pattern="^[-!@#$%^&*(),.，、|_。a-zA-Z0-9]{1,100}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!:/@#$%^&*(),.，、|_。等字符!'}"
                               :name="'serverURL'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'服务器地址'">
            <input v-model="edit.serverURL"
                   class="el-input__inner"
                   name="serverURL"
                   pattern="^[-!@#$%^&*(),.，、:/|_。a-zA-Z0-9]{1,100}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{pattern:'1~10位的汉字、数字、大小写字母!'}"
                               :name="'contacts'"
                               :field-class="'w20'"
                               :after-risk="false"
                               :label="'联系人'">
            <input v-model="edit.contacts"
                   class="el-input__inner"
                   name="contacts"
                   pattern="^[a-zA-Z0-9]{1,10}$"/>
          </form-field-validate>
          <form-field-validate :messages="{pattern:'请输入正确的电话!'}"
                               :name="'mobile'"
                               :field-class="'w20'"
                               :after-risk="false"
                               :label="'电话'">
            <input v-model="edit.mobile"
                   class="el-input__inner"
                   name="mobile"
                   pattern="^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$"/>
          </form-field-validate>
          <form-field-validate :messages="{pattern:'1~16位的汉字、数字、大小写字母!'}"
                               :name="'remarks'"
                               :field-class="'w20'"
                               :after-risk="false"
                               :label="'备注'">
            <input v-model="edit.remarks"
                   type="text"
                   class="el-input__inner"
                   name="remarks"
                   pattern="^[\u4e00-\u9fa5a-zA-Z0-9]{1,16}$"/>
          </form-field-validate>
        </vue-form>
      </div>
      <span slot="footer" class="dialog-footer">
         <button class="btn btn-operating btn-ok"
                 @click="ok">
          确定
        </button>
        <button class="btn btn-operating btn-cancel"
                @click="showDialogVisible = false">
          取消
        </button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import formFieldValidate from '@/assets/components/FormFieldValidate'
  import {mapState, mapMutations} from 'vuex'
  import tableView from 'tableView'
  import $http from '$http'
  import {confirm, success, error} from 'prompt'

  const errMessage = {
    vendorName: '服务厂商名称输入错误或为空..',
    appID: '应用ID输入错误或为空..',
    secretKey: '秘钥输入错误或为空..',
    serverURL: '服务器地址输入错误或为空..',
    contacts: '联系人输入错误..',
    mobile: '联系电话输入错误..',
    remarks: '备注输入错误..'
  }
  export default {
    name: 'imageIdentification',
    data () {
      return {
        keyWorld: '',
        tableData: [],
        searched: false,
        total: 0,
        currentPage: 1,
        code: '',
        loaded: false,
        dialogTitle: '',
        showDialogVisible: false,
        formstate: {},
        selectList: [],
        edit: {
          vendorName: '',
          appID: '',
          secretKey: '',
          serverURL: '',
          contacts: '',
          mobile: '',
          remarks: ''
        }
      }
    },
    computed: {
      ...mapState(['appConfig', 'btnPurview']),
      key () {
        let _self = this
        return {
          '服务厂商名称': {
            key: 'vendorName'
          },
          '应用ID': {
            key: 'appID'
          },
          '秘钥': {
            key: 'secretKey'
          },
          '服务器地址': {
            key: 'serverURL'
          },
          '添加时间': {
            key: 'createTime'
          },
          '操作': {
            controls: [
              {
                text () {
                  return '编辑'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: 'editIdentification',
                onClick (item) {
                  _self.edit = item
                  _self.dialogTitle = '编辑识别服务'
                  _self.showDialogVisible = true
                }
              },
              {
                text () {
                  return '详情'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: true,
                onClick (item) {
                }
              }
            ]
          }
        }
      }
    },
    methods: {
      addIdentification () {
        this.edit = {
          vendorName: '',
          appID: '',
          secretKey: '',
          serverURL: '',
          contacts: '',
          mobile: '',
          remarks: ''
        }
        this.dialogTitle = '添加识别服务'
        this.showDialogVisible = true
      },
      deleteIdentification () {
        if (!this.selectList.length) {
          error('删除列表不能为空!')
          return
        }
        confirm('确定要删除所选识别服务？').then(() => {
          $http.post('/image/deleteIdentification', {deleteList: this.selectList}).then(
            data => {
              success(data.message)
              this.search()
            },
            err => {
              error(err.message)
              this.search()
            }
          )
        })
      },
      ok () {
        for (let val of Object.keys(errMessage)) {
          if (this.formstate[val].$invalid) {
            error(errMessage[val])
            return
          }
        }
        if (this.formstate.$valid) {
          $http.post(this.dialogTitle === '添加识别服务' ? '/image/addIdentification' : '/image/editIdentification', this.edit).then(
            data => {
              success(data.message)
              this.showDialogVisible = false
              this.search()
            },
            err => {
              error(err.message)
            }
          )
        }
      },
      searchIdentification () {
        this.loaded = false
        this.searched = true
        let searchData = {
          currentPage: this.currentPage,
          keyWorld: this.keyWorld
        }
        $http.post('/image/getIdentification', searchData).then(
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
        this.currentPage = 1
        this.searchIdentification()
      },
      pageChange (page) {
        this.currentPage = page
        this.searchIdentification()
      },
      selectChange (list) {
        this.selectList = list
      }
    },
    components: {
      tableView,
      formFieldValidate
    },
    mounted () {
      this.searchIdentification()
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
</style>
