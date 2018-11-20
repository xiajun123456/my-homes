<template>
  <div>
    <global-header></global-header>
    <side-menu></side-menu>
    <div class="content-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import globalHeader from '@/assets/components/GlobalHeader.vue'
  import sideMenu from '@/assets/components/SideMenu.vue'
  export default {
    name: 'entrance',
    components: {
      sideMenu,
      globalHeader
    }
  }
</script>

<style lang="scss" type="text/scss" scope>
  @import "../assets/style/_variables";

  .content-view {
    position: absolute;
    top: $headerHeight;
    left: $menuWidth;
    background: #F1F3F6;
    right: 0;
    bottom: 0;
    overflow: auto;
    padding: 10px 20px;
  }
</style>
