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
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~16位的汉字、数字、大小写字母!'}"
                               :name="'productName'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'产品名称'">
            <input v-model="edit.productName"
                   class="el-input__inner"
                   name="productName"
                   pattern="^[\u4e00-\u9fa5a-zA-Z0-9]{1,16}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项'}"
                               :name="'onenetName'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'所属OneNET'">
            <el-select class="select_width" v-model="edit.onenetId" name="onenetName" placeholder="请选择" required>
              <el-option
                v-for="item in companyAll"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'productId'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'产品ID'">
            <input v-model="edit.productId"
                   class="el-input__inner"
                   name="productId"
                   pattern="^[-!@#$%^&*():：,.，、|_。a-zA-Z0-9]{1,100}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'briefDesc'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'产品简介'">
            <input v-model="edit.briefDesc"
                   class="el-input__inner"
                   name="briefDesc"
                   pattern="^[-!@#$%^&*():：,.，、|_。a-zA-Z0-9]{1,100}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'onenetUserId'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'用户ID'">
            <input v-model="edit.onenetUserId"
                   class="el-input__inner"
                   name="onenetUserId"
                   pattern="^[-!@#$%^&*():：,.，、|_。a-zA-Z0-9]{1,100}$" required/>
          </form-field-validate>
          <form-field-validate
            :field-class="'w30'"
            :after-risk="true"
            :label="'接入协议'">
            <div class="radio-container">
              <label class="radio-type_label">
                <input type="radio"
                       name="onenetProtocol"
                       v-model="edit.onenetProtocol"
                       value="1">
                <span class="radio-text">
                     <span class="radio-type-icon"></span>
                     公有协议
                  </span>
              </label>
              <label class="radio-type_label">
                <input type="radio"
                       name="onenetProtocol"
                       v-model="edit.onenetProtocol"
                       value="2">
                <span class="radio-text">
                    <span class="radio-type-icon"></span>
                    私有协议
                  </span>
              </label>
            </div>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'publicApiKey'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'APIkey'"
                               v-if="edit.onenetProtocol === '1'">
            <input v-model="edit.publicApiKey"
                   class="el-input__inner"
                   name="publicApiKey"
                   pattern="^[-!@#$%^&*():：,.，、|_。a-zA-Z0-9]{1,100}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'privateSecret'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'接口秘钥'"
                               v-if="edit.onenetProtocol === '2'">
            <input v-model="edit.privateSecret"
                   class="el-input__inner"
                   name="privateSecret"
                   pattern="^[-!@#$%^&*():：,.，、|_。a-zA-Z0-9]{1,100}$" required/>
          </form-field-validate>
          <form-field-validate
            :field-class="'w30'"
            :after-risk="true"
            :label="'是否加密'">
            <div class="radio-container">
              <label class="radio-type_label">
                <input type="radio"
                       name="encryptedSign"
                       v-model="edit.encryptedSign"
                       value="1">
                <span class="radio-text">
                     <span class="radio-type-icon"></span>
                     是
                  </span>
              </label>
              <label class="radio-type_label">
                <input type="radio"
                       name="encryptedSign"
                       v-model="edit.encryptedSign"
                       value="0">
                <span class="radio-text">
                    <span class="radio-type-icon"></span>
                    否
                  </span>
              </label>
            </div>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'encodingAesKey'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'AESkey'"
                               v-if="edit.encryptedSign === '1'">
            <input v-model="edit.encodingAesKey"
                   class="el-input__inner"
                   name="encodingAesKey"
                   pattern="^[-!@#$%^&*():：,.，、|_。a-zA-Z0-9]{1,100}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'pushDataSavePath'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'日志保存路径'">
            <input v-model="edit.pushDataSavePath"
                   class="el-input__inner"
                   name="pushDataSavePath"
                   pattern="^[-!@#$%^&*():：,.，、|_。a-zA-Z0-9]{1,100}$" required/>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'deviceProtocolSign'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'设备数据协议'">
            <el-select v-model="edit.deviceProtocolSign" name="deviceProtocolSign" placeholder="状态" class="select_width" required>
              <el-option :key="0" label="智能电表原始的私有协议" :value="0"></el-option>
              <el-option :key="1" label="智能电表原始的公有协议" :value="1"></el-option>
              <el-option :key="2" label="智能电表集团规范的协议" :value="2"></el-option>
              <el-option :key="3" label="图像抄表北京云拍使用的协议" :value="3"></el-option>
              <el-option :key="4" label="图像抄表集团规范的协议" :value="4"></el-option>
              <el-option :key="5" label="直流计量模块集团规范协议" :value="5"></el-option>
            </el-select>
          </form-field-validate>
          <form-field-validate :messages="{required:'该项为必填项',pattern:'1~100位的数字、大小写字母、可包含-!@#$%^&*(),.，、|_。等字符!'}"
                               :name="'imgIdentify'"
                               :field-class="'w20'"
                               :after-risk="true"
                               :label="'图像识别服务'">
            <el-select v-model="edit.imgIdentify" name="imgIdentify" placeholder="状态" class="select_width" required>
              <el-option :key="1" label="智能电表原始的私有协议" :value="1"></el-option>
              <el-option :key="2" label="智能电表原始的公有协议" :value="2"></el-option>
            </el-select>
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
    productName: '产品名称输入错误或为空..',
    productId: '产品id输入错误或为空..',
    briefDesc: '产品简介输入错误或为空..',
    publicApiKey: 'APIkey输入错误或为空..',
    encodingAesKey: 'AESkey输入错误或为空',
    pushDataSavePath: '日志路径输入错误或为空..'
  }
  export default {
    name: 'AddUpgradeModal',
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
        check: {
          publicProtocol: '0',
          isEncrypt: '0'
        },
        comfirmModal: false,
        hasData: false,
        companyAll: []
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
      },
      addData (val, old) {
        console.log('val', val)
        this.edit = Object.assign({}, this.addData)
        this.getCompany()
      }
    },
    mounted () {
    },
    methods: {
      ok () {
        for (let val of Object.keys(errMessage)) {
          if (this.formstate[val].$invalid) {
            error(errMessage[val])
            return
          }
        }
        if (!this.edit.onenetCompany) {
          error('所属Onenet输入错误或为空..')
          return
        }
        if (!this.edit.deviceProtocol) {
          error('设备数据协议输入错误或为空..')
          return
        }
        if (!this.edit.imgIdentify) {
          error('图像识别服务输入错误或为空..')
          return
        }
        if (this.formstate.$valid) {
          if (JSON.stringify(this.addData) === '{}') {
            $http.post('addOnenetProduct').then((data) => {
              console.log(data.message)
              this.$emit('showModalEvent', false)
              success('添加成功')
              this.$emit('searchAllEvent')
            }).catch((err) => {
              error(err.message)
            })
          } else {
            $http.post('updateOnnetProduct').then((data) => {
              console.log(data.message)
              this.$emit('showModalEvent', false)
              success('编辑成功')
              this.$emit('searchAllEvent')
            }).catch((err) => {
              error(err.message)
            })
          }
        }
      },
      quit () {
        this.$emit('showModalEvent', false)
      },
      close () {
        this.$emit('showModalEvent', false)
      },
      getCompany () {
        $http.post('searchOnenetCompany', {}).then((data) => {
          this.companyAll = data.rows
        }).catch((err) => {
          error(err.message)
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scopedd>
  /*.select_width {*/
    /*width: 100% !important*/
  /*}*/
</style>
