<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="comfirmModal"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :top="appConfig.DIALOGTOP"
      :width="appConfig.DIALOGWidth"
      @close="close"
      center>
      <div>
        <vue-form :state="formstate">
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~10位的汉字、数字、大小写字母!'}"
                               :name="'onenetName'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'项目名称'">
            <input v-model="edit.onenetName"
                   class="el-input__inner"
                   name="onenetName"
                   pattern="^[\u4e00-\u9fa5a-zA-Z0-9]{1,10}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'apiHost'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'域名'">
            <input v-model="edit.apiHost"
                   class="el-input__inner"
                   name="apiHost"
                   pattern="^[-!@#$%^&*()/:：,.，、|_。a-zA-Z0-9]{1,100}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{pattern:'1~100位的汉字、数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'onenetDescription'"
                               :field-class="'w20'"
                               :after-risk="false"
                               :label="'备注'">
            <input v-model="edit.onenetDescription"
                   type="text"
                   class="el-input__inner"
                   name="onenetDescription"
                   pattern="^[-!@#$%^&*():：,.，、|_。\u4e00-\u9fa5a-zA-Z0-9]{1,160}$"/>
          </form-field-validate>
        </vue-form>
      </div>
      <span slot="footer" class="dialog-footer">
         <button class="btn btn-operating btn-ok"
                 @click="ok">
          确定
        </button>
        <button class="btn btn-operating btn-cancel"
                @click="quit">
          取消
        </button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import $http from '$http'
  import formFieldValidate from '@/assets/components/FormFieldValidate'
  import {confirm, success, error} from 'prompt'

  const errMessage = {
    onenetName: '项目名称输入错误或为空..',
    apiHost: '域名输入错误或为空..',
    onenetDescription: '备注输入错误..'
  }
  export default {
    name: 'AddProjectModal',
    props: {
      dialogTitle: String,
      showDialog: Boolean,
      addData: Object,
      keyCode: Boolean
    },
    data () {
      return {
        formstate: {},
        edit: {},
        comfirmModal: false,
        hasData: false
      }
    },
    components: {
      formFieldValidate
    },
    computed: {
      ...mapState(['appConfig'])
    },
    watch: {
      showDialog (val, old) {
        this.comfirmModal = val
        this.edit = {}
      },
      addData (val, old) {
        console.log('val', val)
        this.edit = Object.assign({}, this.addData)
      }
    },
    methods: {
      ok () {
        for (let val of Object.keys(errMessage)) {
          if (this.formstate[val].$invalid) {
            error(errMessage[val])
            return
          }
        }
        if (this.formstate.$valid) {
          let editData = Object.assign({}, this.edit)
          if (JSON.stringify(this.addData) === '{}') {
            $http.post('addOnenetProject', editData).then((data) => {
              this.$emit('showModalEvent', false)
              success(data.message)
              this.$emit('searchAllEvent')
            }).catch((err) => {
              error(err.returnMsg)
            })
          } else {
            $http.post('updateOnnetProject', editData).then((data) => {
              this.$emit('showModalEvent', false)
              success(data.message)
              this.$emit('searchAllEvent')
            }).catch((err) => {
              error(err.returnMsg)
            })
          }
        }
      },
      quit () {
        this.$emit('showModalEvent', false)
      },
      close () {
        this.$emit('showModalEvent', false)
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scopedd>

</style>
