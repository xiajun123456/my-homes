<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :top="appConfig.DIALOGTOP"
      :width="appConfig.DIALOGWidth"
      center>
      <div class="mh600">
        <vue-form :state="formstate">
          <form-field-validate :messages="{required:'该项为必填项',pattern:'8-16位的数字、大小写字母、特殊字符，至少包含2类!'}"
                               :name="'password'"
                               :field-class="'w15'"
                               :after-risk="true"
                               :label="'新密码'">
            <input v-model="reset.password"
                   type="password"
                   class="el-input__inner"
                   name="password"
                   pattern="^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项','confirm-new-password':'2次密码输入不一致'}"
                               :name="'newPassword'"
                               :field-class="'w15'"
                               :after-risk="true"
                               :label="'重复新密码'">
            <input v-model="reset.newPassword"
                   type="password"
                   class="el-input__inner"
                   name="newPassword"
                   :confirm-new-password="reset.password"
                   required/>
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
</template>

<script>
  import {mapState} from 'vuex'
  import addressSelector from '@/assets/components/AddressSelector'
  import $http from '$http'
  import md5 from 'js-md5'
  import {success, error} from 'prompt'
  import formFieldValidate from '@/assets/components/FormFieldValidate'
  export default {
    name: 'resetPassword',
    data () {
      return {
        reset: {
          password: '',
          newPassword: ''
        },
        formstate: {},
        showDialog: false
      }
    },
    props: {
      dialogTitle: String,
      showDialogVisible: Boolean,
      enterprise: Object
    },
    watch: {
      showDialogVisible (newVal) {
        this.showDialog = newVal
      }
    },
    computed: {
      ...mapState(['appConfig'])
    },
    methods: {
      ok () {
        if (this.formstate.password.$invalid) {
          error('新密码输入错误或为空..')
          return
        }
        if (this.formstate.newPassword.$invalid) {
          error('2次密码输入不一致..')
          return
        }
        $http.post('resetPassword', {
          password: md5(this.reset.password),
          id: this.enterprise.enterpriseId
        }).then(data => {
          success(data.message)
          this.$emit('close-config')
          this.$emit('search')
        }, err => {
          error(err.message)
          this.$emit('search')
        })
      },
      close () {
        this.$emit('close-config')
      }
    },
    components: {
      addressSelector,
      formFieldValidate
    }
  }
</script>

<style lang="scss" type="text/scss" scope>
</style>
