<template>
  <div>
    <div v-if="showDialog">
      <el-dialog
        :title="dialogTitle"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :top="appConfig.DIALOGTOP"
        :width="appConfig.DIALOGWidth"
        @close="close"
        center>
        <div class="mh600">
          <vue-form :state="formstate">
            <form-field-validate :messages="{required:'该项为必填项',pattern:'1~16位的汉字、数字、大小写字母!'}"
                                 :name="'enterpriseName'"
                                 :field-class="'w15'"
                                 :after-risk="true"
                                 :label="'企业名称'">
              <input v-model="edit.enterpriseName"
                     class="el-input__inner"
                     name="enterpriseName"
                     pattern="^[\u4e00-\u9fa5a-zA-Z0-9]{1,16}$" required/>
            </form-field-validate>
            <form-field-validate :messages="{required:'该项为必填项',pattern:'6~16位的数字、大小写字母!'}"
                                 :name="'loginName'"
                                 :field-class="'w15'"
                                 :after-risk="true"
                                 :label="'登录名'">
              <input v-model="edit.loginName"
                     class="el-input__inner"
                     type="text"
                     name="loginName"
                     pattern="^[a-zA-Z0-9]{6,16}$" required/>
            </form-field-validate>
            <form-field-validate :messages="{required:'该项为必填项',pattern:'8-16位的数字、大小写字母、特殊字符，至少包含2类!'}"
                                 :name="'password'"
                                 v-if="dialogTitle === '添加企业'"
                                 type="text"
                                 :field-class="'w15'"
                                 :after-risk="true"
                                 :label="'登录密码'">
              <input v-model="edit.password"
                     type="password"
                     class="el-input__inner"
                     name="password"
                     pattern="^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$" required/>
            </form-field-validate>
            <form-field-validate :messages="{required:'该项为必填项',pattern:'1~10位的汉字、数字、大小写字母!'}"
                                 :name="'contactPerson'"
                                 :field-class="'w15'"
                                 :after-risk="true"
                                 :label="'联系人'">
              <input v-model="edit.contactPerson"
                     type="text"
                     class="el-input__inner"
                     name="contactPerson"
                     pattern="^[\u4e00-\u9fa5a-zA-Z0-9]{1,10}$" required/>
            </form-field-validate>
            <form-field-validate :messages="{required:'该项为必填项',pattern:'请输入11位手机号码！'}"
                                 :name="'contactNumber'"
                                 :field-class="'w15'"
                                 :after-risk="true"
                                 :label="'联系电话'">
              <input v-model="edit.contactNumber"
                     type="text"
                     class="el-input__inner"
                     name="contactNumber"
                     pattern="^1[3456789]\d{9}$" required/>
            </form-field-validate>
            <form-field-validate
              :field-class="'w15'"
              :after-risk="true"
              :label="'企业地址'">
              <address-selector v-model="area"
                                name="area"></address-selector>
            </form-field-validate>
            <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的汉字、数字、大小写字母、特殊字符!'}"
                                 :name="'address'"
                                 :field-class="'w15'"
                                 :after-risk="true"
                                 :label="'详细地址'">
              <input v-model="edit.address"
                     type="text"
                     class="el-input__inner"
                     name="address"
                     pattern="^[\u4e00-\u9fa5a-zA-Z0-9]{1,100}$" required/>
            </form-field-validate>
            <form-field-validate :messages="{pattern:'1~16位的汉字、数字、大小写字母!'}"
                                 :name="'memo'"
                                 :field-class="'w15'"
                                 :after-risk="true"
                                 :label="'备注'">
              <input v-model="edit.memo"
                     type="text"
                     class="el-input__inner"
                     name="memo"
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
              @click="close">
      取消
      </button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import addressSelector from '@/assets/components/AddressSelector'
  import $http from '$http'
  import {confirm, success, error} from 'prompt'
  import formFieldValidate from '@/assets/components/FormFieldValidate'
  const errMessage = {
    enterpriseName: '企业名称输入错误或为空..',
    loginName: '登陆名输入错误或为空..',
    password: '密码输入错误或为空..',
    contactPerson: '联系人输入错误或为空..',
    contactNumber: '请输入正确的手机号码..',
    address: '详细地址输入错误或为空..',
    memo: '备注输入错误..'
  }
  export default {
    name: 'editEnterprise',
    data () {
      return {
        edit: {
          enterpriseName: '',
          loginName: '',
          password: '',
          contactPerson: '',
          contactNumber: '',
          area: {},
          address: '',
          memo: ''
        },
        area: {},
        formstate: {},
        showDialog: false
      }
    },
    props: {
      dialogTitle: String,
      editData: Object,
      showDialogVisible: Boolean
    },
    computed: {
      ...mapState(['appConfig'])
    },
    watch: {
      showDialogVisible (newVal, oldVal) {
        this.showDialog = newVal
        if (!newVal) {
          return
        }
        if (this.dialogTitle === '编辑企业') {
          this.edit = Object.assign({}, this.editData)
          this.area = {
            provinceCode: this.editData.provinceCode,
            cityCode: this.editData.cityCode,
            areaCode: this.editData.areaCode
          }
        } else {
          this.area = {
            provinceCode: '',
            cityCode: '',
            area: ''
          }
          this.edit = {
            enterpriseName: '',
            loginName: '',
            password: '',
            contactPerson: '',
            contactNumber: '',
            address: '',
            memo: ''
          }
        }
      }
    },
    methods: {
      ok () {
//        this.formstate._submit()
        for (let val of Object.keys(errMessage)) {
          if (this.formstate[val] && this.formstate[val].$invalid) {
            error(errMessage[val])
            return
          }
        }
        if (!this.area.areaCode) {
          error('请选择企业所在地址')
          return
        }
        let key = this.dialogTitle === '添加企业' ? 'addEnterprise' : 'editEnterprise'
        $http.post(key, this.edit).then(data => {
          success(data.message)
          this.$emit('close-edit')
          this.$emit('search')
        }, err => {
          error(err.message)
          this.$emit('search')
        })
      },
      close (e) {
        this.$emit('close-edit')
      }
    },
    components: {
      addressSelector,
      formFieldValidate
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
</style>
