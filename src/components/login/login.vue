<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="login-title">
        <h3>TEST</h3>
      </div>
      <div class="login-form-container">
        <form role="form" name="loginForm">
          <div class="form-group">
            <label class="form-label-s">
              用户账号:
            </label>
            <el-input type="text"
                      v-model="loginName"
                      name="loginName"
                      placeholder="请输入登录名"
                      required>
            </el-input>
          </div>
          <div class="form-group" style="margin-top:15px">
            <label class="form-label-s">
              输入密码:
            </label>
            <el-input type="password"
                      name="password"
                      v-model="password"
                      placeholder="请输入密码"
                      required>
            </el-input>
          </div>
          <div class="form-group verification-code" style="margin-top:15px">
            <label class="form-label-s">
              验证码:
            </label>
            <div class="code-container clear">
              <div class="code-input pull-left">
                <el-input type="code"
                          name="validateCode"
                          v-model="validateCode"
                          placeholder="请输入验证码"
                          required>
                </el-input>
              </div>
              <img class="pull-left" :src="appConfig.URL+'/user/validateCode?validateKey='+validateKey" alt="">
              <span class="pull-left change-code"
                    @click="changeCode">换一批</span>
            </div>
          </div>
          <el-button @click="login"
                     type="primary"
                     class="btn-login"
                     :disabled="!loginName || !password || validateCode.length !== 4">
            {{loginText}}
          </el-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import storage from 'Storage'
  import {mapState, mapMutations} from 'vuex'
  import $http from '$http'
  import {error} from 'prompt'
  import md5 from 'js-md5'
  import {getAllMenuUrl} from '@/assets/services/getAllMenuUrlService'

  export default {
    data () {
      return {
        loginName: '',
        password: '',
        validateCode: '',
        loginText: '登陆',
        validateKey: ''
      }
    },
    computed: {
      ...mapState(['appConfig'])
    },
    methods: {
      ...mapMutations(['INIT_USER', 'INIT_MENU_URL']),
      getValidateKey () {
        this.validateKey = new Date().getTime()
      },
      changeCode () {
        this.getValidateKey()
      },
      async login () {
        if (!this.loginName || !this.password) {
          return
        }
        this.loginText = '登录中...'
        let user = null
        await $http.post('login', {
          loginName: this.loginName,
          password: md5(this.password),
          validateCode: this.validateCode
        }).then(data => {
          user = data
          storage.set('user', user)
        }, err => {
          error(err.message)
          this.loginText = '登录'
          this.getValidateKey()
        })
        await $http.post('getMenu', {}).then(data => {
            user.menus = data.data
            let menuUrlObj = getAllMenuUrl(user.menus)
            this.INIT_USER(user)
            storage.set('user', user)
            this.INIT_MENU_URL(menuUrlObj)
            this.$router.push({path: Object.keys(menuUrlObj)[0]})
            this.loginText = '登录'
          },
          err => {
            error(err.message)
            this.loginText = '登录'
            this.getValidateKey()
          }
        )
      }
    },
    beforeMount () {
      let _this = this
      this.getValidateKey()
      document.onkeyup = function (event) {
        let e = event || window.event
        let keyCode = e.keyCode || e.which
        if (keyCode === 13) {
          _this.login()
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scope>
  .login-container {
    width: 520px;
    position: absolute;
    top: 15%;
    left: 50%;
    margin-left: -250px;
    background: #EFF3F6;
    border-top-left-radius: 13px;
    border-top-right-radius: 13px;
    margin-bottom: 50px;
    .login-title {
      h3 {
        text-align: center;
        background: #007FCC;
        line-height: 95px;
        padding: 0;
        margin: 0;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        color: #fff;
        font-size: 24px;
        font-weight: normal;
      }

    }
    .login-form-container {
      padding: 30px 60px 60px;
      .form-label-s {
        font-size: 17px;
        font-weight: normal;
        color: #2D3037;
        display: inline-block;
        margin-bottom: 7px;
      }
      .form-controls {
        height: 45px;
        border-color: #C5CACE;
        color: #2F2F3C;
      }
      .btn-login {
        height: 50px;
        margin-top: 40px;
        width: 100%;
      }
      .login-log {
        text-align: center;
        position: relative;
        margin-top: 50px;
        .line-left {
          width: 130px;
          height: 1px;
          background: #CACED1;
          position: absolute;
          top: 50%;
          left: 0;
        }
        .line-right {
          width: 130px;
          height: 1px;
          background: #CACED1;
          position: absolute;
          top: 50%;
          right: 0;
        }
      }
    }
    .code-container {
      .code-input {
        width: 150px;
      }
      img {
        height: 43px;
        width: 170px;
        margin: 1px 15px;
      }
      .change-code {
        line-height: 45px;
        text-decoration: underline;
        color: #1883CE;
        cursor: pointer;
        font-size: 16px;
      }
    }
  }

  .login-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("../../assets/images/pic_back.png");
    overflow-y: auto;
  }
</style>
