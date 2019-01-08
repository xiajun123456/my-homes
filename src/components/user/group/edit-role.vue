<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :top="appConfig.DIALOGTOP"
      @close="close"
      :width="appConfig.DIALOGMAXWidth"
      center>
      <div class="edit-role-container mh600">
        <p class="step">第一步：编辑角色信息</p>
        <div class="role-name">
          <vue-form :state="formstate">
            <form-field-validate
              :field-class="'w30'"
              :after-risk="true"
              :name="'roleName'"
              :messages="{required:'该项为必填项',pattern:'1~16位的汉字、数字、大小写字母!'}"
              :label="'角色名称'">
              <input type="text"
                     v-model="roleName"
                     name="roleName"
                     :disabled="dialogTitle === '查看角色'"
                     pattern="^[\u4e00-\u9fa5a-zA-Z0-9]{1,16}$"
                     class="el-input__inner" required>
            </form-field-validate>
          </vue-form>
        </div>
        <p class="step">第二步：选择功能权限</p>
        <div class="select-role">
          <div class="select-item"
               v-for="(val,key) in roleAuthorityList"
               :key="key">
            <p class="item-menu">
              <el-checkbox :label="val.menuName"
                           @change="menuSubChange(val.id,val.subMenu)"
                           :key="val.id"
                           :disabled="val.inheritStatus == 0 || dialogTitle === '查看角色'"
                           v-model="roleCheck[val.id]">
              </el-checkbox>
            </p>
            <div class="item-btn-authority clear"
                 v-if="val.subMenu">
              <div class="authority-item pull-left"
                   v-for="td in val.subMenu"
                   :key="td.id">
                <el-checkbox :label="td.menuName"
                             :key="td.id"
                             :disabled="td.inheritStatus == 0 || dialogTitle === '查看角色'"
                             @change="subChange(td.id,val.id)"
                             v-model="roleCheck[td.id]">
                </el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
         <button class="btn btn-operating btn-ok"
                 @click="ok">
          确定
        </button>
        <button class="btn btn-operating btn-cancel"
                @click="close">
          取消
        </button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import $http from '$http'
  import formFieldValidate from '@/assets/components/FormFieldValidate'
  import {confirm, success, error} from 'prompt'
  const errMessage = {
    roleName: '角色名称输入错误或为空..'
  }
  export default {
    name: 'editRole',
    data () {
      return {
        showDialog: false,
        roleCheck: {},
        roleAuthorityList: [],
        roleName: '',
        formstate: {}
      }
    },
    props: {
      showDialogVisible: Boolean,
      dialogTitle: String,
      selectRole: Object
    },
    watch: {
      showDialogVisible (newVal) {
        this.showDialog = newVal
        if (newVal) {
          this.getRoleAuthority()
          this.roleName = this.selectRole.roleName
        }
      }
    },
    computed: {
      ...mapState(['appConfig'])
    },
    methods: {
      getRoleAuthority () {
        let _self = this
        $http.post('get', {roleId: this.selectRole.id}).then(data => {
          data.rows.forEach(val => {
            _self.roleCheck[val.id] = val.selected === 1
            if (val.subMenu) {
              val.subMenu.forEach(val => {
                _self.roleCheck[val.id] = val.selected === 1
              })
            }
          })
          this.roleAuthorityList = data.rows
        })
      },
      menuSubChange (val, subMenu) {
        if (subMenu) {
          subMenu.forEach(subVal => {
            this.roleCheck[subVal.id] = this.roleCheck[val]
          })
        }
        this.roleCheck = Object.assign({}, this.roleCheck)
      },
      subChange (id1, id2) {
        if (this.roleCheck[id1]) {
          this.roleCheck[id2] = true
        }
        this.roleCheck = Object.assign({}, this.roleCheck)
      },
      ok () {
//        this.formstate._submit()
        for (let val of Object.keys(errMessage)) {
          if (this.formstate[val] && this.formstate[val].$invalid) {
            error(errMessage[val])
            return
          }
        }
        let roleList = []
        this.roleAuthorityList.forEach(val => {
          if (this.roleCheck[val.id]) {
            roleList.push({
              generalId: val.id,
              generalType: val.menuType,
              parentId: val.parentId
            })
          }
          if (val.subMenu) {
            val.subMenu.forEach(td => {
              if (this.roleCheck[td.id]) {
                roleList.push({
                  generalId: td.id,
                  generalType: td.menuType,
                  parentId: td.parentId
                })
              }
            })
          }
        })
        let url = this.dialogTitle === '添加角色' ? 'addRole' : 'editRole'
        let postData = {
          roleName: this.roleName,
          list: roleList
        }
        if (this.dialogTitle === '编辑角色') {
          postData.id = this.selectRole.id
        }
        $http.post(url, postData).then(data => {
          success(data.message)
          this.$emit('close')
          this.$emit('search')
        }, err => {
          error(err.message)
        })
      },
      close () {
        this.$emit('close')
      }
    },
    components: {
      formFieldValidate
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .edit-role-container {
    .role-name {
      padding-bottom: 25px;
      margin-top: 20px;
      width: 330px;
      label {
        color: #787F93;
      }
    }
    .select-item {
      .el-checkbox {
        color: #787F93;
      }
    }
    .item-menu {
      padding: 10px 15px;
    }
    .select-role {
      margin-bottom: 20px;
    }
  }
</style>
