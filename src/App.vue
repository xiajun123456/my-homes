<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss" type="text/scss" scope>
  @import "./assets/style/main";

  #app {
    font-size: 14px;
  }
</style>
