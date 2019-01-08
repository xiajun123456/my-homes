<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :top="appConfig.DIALOGTOP"
      :width="appConfig.DIALOGMAXWidth"
      @close="close"
      center>
      <div class="mh600">
        <vue-form :state="formstate">
          <p class="step">基本信息配置</p>
          <div class="base-config">
            <div class="system-name">
              <form-field-validate :messages="{required:'该项为必填项',pattern:'1~16位的汉字、数字、大小写字母!'}"
                                   :name="'systemName'"
                                   :field-class="'w30'"
                                   :after-risk="true"
                                   :label="'系统名称'">
                <input v-model="configData.systemName"
                       class="el-input__inner"
                       name="systemName"
                       placeholder="请输入系统名称"
                       pattern="^[\u4e00-\u9fa5a-zA-Z0-9]{1,16}$" required/>
              </form-field-validate>
              <form-field-validate :field-class="'w30'"
                                   :after-risk="true"
                                   :label="'系统logo'">
                <label>
                  <input type="file"
                         id="logoIcon"
                         @change="handlePictureCardPreview('logoIcon','systemLogo')"
                         style="display:none;">
                  <div class="avatar-uploader" v-if="!systemLogo">+</div>
                  <img :src="systemLogo"
                       class="icon-img"
                       v-else>
                </label>
              </form-field-validate>
            </div>
          </div>
          <div class="base-config m-b-55">
            <div class="system-name">
              <form-field-validate :messages="{required:'该项为必填项',pattern:'1~16位的汉字、数字、大小写字母!'}"
                                   :name="'appSign'"
                                   :field-class="'w30'"
                                   :after-risk="true"
                                   :label="'APP签名'">
                <input v-model="configData.appSign"
                       class="el-input__inner"
                       name="appSign"
                       placeholder="请输入APP签名"
                       pattern="^[\u4e00-\u9fa5a-zA-Z0-9]{1,16}$" required/>
              </form-field-validate>
              <form-field-validate :field-class="'w30'"
                                   :after-risk="true"
                                   :label="'系统logo'">
                <label>
                  <input type="file"
                         id="appLogo"
                         @change="handlePictureCardPreview('appLogo','appLogoUrl')"
                         style="display:none;">
                  <div class="avatar-uploader"
                       v-if="!appLogoUrl">+
                  </div>
                  <img :src="appLogoUrl"
                       v-else
                       class="icon-img">
                </label>
              </form-field-validate>
            </div>
          </div>
          <p class="step">电量数据上传配置</p>
          <div class="data-update-config-content">
            <form-field-validate
              :field-class="'w30'"
              :after-risk="true"
              :label="'推送接口'">
              <div class="radio-container">
                <label class="radio-type_label">
                  <input type="radio"
                         name="pushFtpInterfaceFlag"
                         v-model="pushFtpInterfaceFlag"
                         value="0">
                  <span class="radio-text">
                     <span class="radio-type-icon"></span>
                     开启
                  </span>
                </label>
                <label class="radio-type_label">
                  <input type="radio"
                         name="pushFtpInterfaceFlag"
                         v-model="pushFtpInterfaceFlag"
                         value="1">
                  <span class="radio-text">
                    <span class="radio-type-icon"></span>
                    关闭
                  </span>
                </label>
              </div>
            </form-field-validate>
            <div class="m-15">
              <form-field-validate
                :field-class="'w30'"
                :after-risk="true"
                :label="'服务器类型'">
                <div class="radio-container">
                  <label class="radio-type_label">
                    <input type="radio"
                           name="ftpType"
                           v-model="ftpType"
                           value="0">
                    <span class="radio-text">
                        <span class="radio-type-icon"></span>
                        FTP
                      </span>
                  </label>
                  <label class="radio-type_label">
                    <input type="radio"
                           name="ftpType"
                           v-model="ftpType"
                           value="1">
                    <span class="radio-text">
                        <span class="radio-type-icon"></span>
                        SFTP
                      </span>
                  </label>
                </div>
              </form-field-validate>
            </div>
            <div class="m-10 server-address">
              <form-field-validate
                :messages="{required:'该项为必填项',pattern:'请输入正确的地址!'}"
                :name="'ftpUrl'"
                :field-class="'w30'"
                :after-risk="true"
                :label="'FTP/SFTP地址'">
                <input v-model="configData.ftpUrl"
                       type="text"
                       class="el-input__inner"
                       placeholder="FTP/SFTP地址"
                       name="ftpUrl"
                       pattern="^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$"
                       required/>
              </form-field-validate>
              <validate tag="label">
                <input type="text"
                       v-model="configData.port"
                       placeholder="端口"
                       name="port"
                       pattern="^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$"
                       class="server-port_input el-input__inner" required/>
              </validate>
              <span class="port-err_span"
                    v-if="formstate.ftpUrl && formstate.ftpUrl.$valid && formstate.port.$invalid">请输入正确的端口号</span>
            </div>
            <form-field-validate :messages="{required:'该项为必填项',pattern:'请输入正确的路径!'}"
                                 :name="'path'"
                                 :field-class="'w30'"
                                 :after-risk="true"
                                 :label="'路径'">
              <input v-model="configData.path"
                     type="text"
                     class="el-input__inner"
                     placeholder="请输入路径"
                     name="path"
                     pattern="^[-!@#$%^&*(),.，、/\|_。\u4e00-\u9fa5a-zA-Z0-9]{1,100}$" required/>
            </form-field-validate>
            <form-field-validate :messages="{required:'该项为必填项',pattern:'6~16位的数字、大小写字母!'}"
                                 :name="'ftpUser'"
                                 :field-class="'w30'"
                                 :after-risk="true"
                                 :label="'用户名'">
              <input v-model="configData.ftpUser"
                     type="text"
                     class="el-input__inner"
                     placeholder="请输入用户名"
                     name="ftpUser"
                     pattern="^[a-zA-Z0-9]{6,16}$" required/>
            </form-field-validate>
            <form-field-validate :messages="{required:'该项为必填项',pattern:'6~16位的数字、大小写字母!'}"
                                 :name="'ftpPassword'"
                                 :field-class="'w30'"
                                 :after-risk="true"
                                 :label="'密码'">
              <input v-model="configData.ftpPassword"
                     type="password"
                     class="el-input__inner"
                     placeholder="请输入登陆密码"
                     name="ftpPassword"
                     pattern="^[a-zA-Z0-9]{6,16}$" required/>
            </form-field-validate>
          </div>
          <p class="step">功能配置</p>
          <div class="features-config">
            <div class="item-btn-authority m15 clear">
              <div class="authority-item pull-left">
                <el-checkbox label="智能抄表告警记录"
                             :key="10"
                             @change="subChange">
                </el-checkbox>
              </div>
              <div class="authority-item pull-left">
                <el-checkbox label="智能抄表告警记录"
                             :key="10"
                             @change="subChange">
                </el-checkbox>
              </div>
              <div class="authority-item pull-left">
                <el-checkbox label="智能抄表告警记录"
                             :key="10"
                             @change="subChange">
                </el-checkbox>
              </div>
              <div class="authority-item pull-left">
                <el-checkbox label="智能抄表告警记录"
                             :key="10"
                             @change="subChange">
                </el-checkbox>
              </div>
              <div class="authority-item pull-left">
                <el-checkbox label="智能抄表告警记录"
                             :key="10"
                             @change="subChange">
                </el-checkbox>
              </div>
            </div>
          </div>
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
  import {mapState, mapMutations} from 'vuex'
  import $http from '$http'
  import {confirm, success, error} from 'prompt'
  import formFieldValidate from '@/assets/components/FormFieldValidate'
  const errMessage = {
    systemName: '系统名称输入错误或为空..',
    ftpUrl: 'FTP/SFTP地址输入错误或为空..',
    port: '端口输入错误或为空..',
    path: '路径输入错误或为空..',
    ftpPassword: '密码输入错误或为空..',
    ftpUser: '用户名输入错误或为空..'
  }
  export default {
    name: 'configEnterprise',
    data () {
      return {
        configData: {
          systemName: '',
          appSign: '',
          pushFtpInterfaceFlag: 0,
          ftpType: 0,
          port: '',
          ftpUrl: '',
          path: '',
          ftpPassword: '',
          ftpUser: ''
        },
        pushFtpInterfaceFlag: 0,
        ftpType: 0,
        systemLogo: '',
        appLogoUrl: '',
        formstate: {},
        showDialog: false
      }
    },
    props: {
      dialogTitle: String,
      data: Number,
      showDialogVisible: Boolean
    },
    watch: {
      showDialogVisible (newVal, oldVal) {
        this.showDialog = newVal
        if (!newVal) {
          return
        }
        this.systemLogo = ''
        this.appLogoUrl = ''
        this.getEnterpriseDetails()
        this.configData = Object.assign({}, this.data)
        if (document.getElementById('logoIcon') && document.getElementById('logoIcon').value) {
          document.getElementById('logoIcon').value = ''
        }
        if (document.getElementById('appLogo') && document.getElementById('appLogo').value) {
          document.getElementById('appLogo').value = ''
        }
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
        $http.post('configEnterprise', this.configData).then(data => {
          success(data.message)
          this.$emit('close-config')
          this.$emit('search')
        }, err => {
          error(err.message)
        })
      },
      getEnterpriseDetails () {
        $http.post('getEnterpriseDetails', {id: this.data}).then(
          data => {
            this.configData = {
              systemName: data.systemName,
              appSign: data.appSign,
              pushFtpInterfaceFlag: data.pushFtpInterfaceFlag,
              ftpType: data.ftpType,
              port: data.port,
              ftpUrl: data.ftpUrl,
              path: data.path,
              ftpPassword: data.ftpPassword || 'ABCD1234',
              ftpUser: data.ftpUser
            }
            this.systemLogo = data.systemLogo
            this.appLogoUrl = data.appLogoUrl
          }, err => {
            error(err.message)
            this.$emit('close-config')
            this.$emit('search')
          }
        )
      },
      handlePictureCardPreview (id, urlName, pathName) {
        let file = document.getElementById(id).files[0]
        if (file.size / 1024 / 1024 > 1) {
          error('上传图片不能超过1M!')
          return
        }
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
          this[urlName] = e.target.result
        }
        let formData = new FormData()
        formData.append('upload', file)
        console.log(formData.get('upload'))
      },
      appLogoPreview () {
        this.appLogo = document.getElementById('logoIcon').value
        let formData = new FormData()
        formData.append('upload', document.getElementById('logoIcon').files[0])
        console.log(formData.get('upload'))
      },
      beforeAvatarUpload (file) {
        console.log(file)
      },
      subChange () {
      },
      close (e) {
        this.$emit('close-config')
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
  .icon-img {
    width: 251px;
    height: 70px;
  }
</style>
