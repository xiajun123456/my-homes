<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :top="appConfig.DIALOGTOP"
      :width="appConfig.DIALOGWidth"
      @close="close"
      center>
      <vue-form :state="formstate">
        <form-field-validate :messages="{required:'该项为必填项',pattern:'6~16位的数字、大小写字母!'}"
                             :name="'loginName'"
                             :field-class="'w15'"
                             :after-risk="true"
                             :label="'登录名'">
          <input v-model="edit.loginName"
                 class="el-input__inner"
                 name="loginName"
                 pattern="^[a-zA-Z0-9]{6,16}$" required/>
        </form-field-validate>
        <form-field-validate :messages="{required:'该项为必填项',pattern:'1到13位的汉字数字大写小写字母'}"
                             :name="'xname'"
                             :field-class="'w15'"
                             :after-risk="true"
                             :label="'姓名'">
          <input v-model="edit.xname"
                 class="el-input__inner"
                 name="xname"
                 pattern="[\u4e00-\u9fa5a-zA-Z0-9]{1,13}" required/>
        </form-field-validate>
        <form-field-validate :messages="{required:'该项为必填项',pattern:'1到13位的汉字数字大写小写字母'}"
                             :name="'roleId'"
                             :field-class="'w15'"
                             :after-risk="true"
                             :label="'角色'">
          <select v-model="edit.roleId"
                  class="select__inner"
                  name="roleId" required>
            <option value="">--请选择角色--</option>
            <option v-for="role in roleList"
                    :value="role.id"
                    :key="role.id">{{role.roleName}}
            </option>
          </select>
        </form-field-validate>
        <form-field-validate :messages="{required:'该项为必填项',pattern:'请输入正确的电话!'}"
                             :name="'mobile'"
                             :field-class="'w15'"
                             :after-risk="true"
                             :label="'电话'">
          <input v-model="edit.mobile"
                 class="el-input__inner"
                 name="mobile"
                 pattern="^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$" required/>
        </form-field-validate>
      </vue-form>
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
    loginName: '登陆名输入错误或为空..',
    xname: '姓名输入错误或为空..',
    roleId: '请选择角色!',
    mobile: '请输入正确的手机号码..'
  }
  export default {
    name: 'editUser',
    data () {
      return {
        edit: {
          xname: '',
          loginName: '',
          roleId: '',
          mobile: ''
        },
        formstate: {},
        showDialog: false,
        roleList: []
      }
    },
    props: {
      dialogTitle: String,
      editData: Object,
      showDialogVisible: Boolean
    },
    watch: {
      showDialogVisible (newVal) {
        this.showDialog = newVal
        if (newVal) {
          this.getRole()
          this.edit = this.editData
        }
      }
    },
    methods: {
      ok () {
//        this.formstate._submit()
        for (let val of Object.keys(errMessage)) {
          if (this.formstate[val].$invalid) {
            error(errMessage[val])
            return
          }
        }
        if (this.formstate.$valid) {
          $http.post(this.dialogTitle === '添加用户' ? 'addUser' : 'editUser', this.edit).then(
            data => {
              success(data.message)
              this.$emit('close')
              this.$emit('search')
            },
            err => {
              error(err.message)
            }
          )
        }
      },
      getRole () {
        $http.post('getAllRole', {}).then(
          data => {
            this.roleList = data.rows
          }
        )
      },
      close () {
        this.$emit('close')
      }
    },
    computed: {
      ...mapState(['appConfig'])
    },
    components: {
      formFieldValidate
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
</style>
