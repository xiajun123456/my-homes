<template>
  <div>
    <div class="container-404">
      <p class="error">
        <a @click="goHome">返回首页</a>
      </p>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'none',
    computed: {
      ...mapState(['menuUrlObj'])
    },
    methods: {
      goHome () {
        this.$router.push({path: Object.keys(this.menuUrlObj)[0]})
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .container-404 {
    position: absolute;
    background: url(../../assets/images/404.png) no-repeat;
    background-size: 100% 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .error {
    position: absolute;
    width: 100px;
    height: 30px;
    border: 1px solid #216397;
    text-align: center;
    line-height: 30px;
    top: 70%;
    left: 42%;
    border-radius: 12px;
    cursor: pointer;
  }

  .error a {
    text-decoration: none;
    display: inline-block;
    color: #216397;
  }

  .error :hover {
    color: red;
  }

</style>
