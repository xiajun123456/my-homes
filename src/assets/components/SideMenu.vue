<template id="menu">
  <div class="side-menu-container">
    <div class="icon-img" style="height: 88px">
    </div>
    <ul>
      <li v-for="menu in user.menus"
          :key="menu.id">
        <div class="menu-item-title"
             :class="{active:activeUrl == menu.menuUrl && !menu.subMenu}"
             @click="active(menu)">
          <i :class="menu.menuIcon" class="item-icon"></i>
          {{menu.menuName}}
          <span v-if="!!menu.subMenu"
                :class="{'menu-down':activeTitle != menu.menuName,'menu-up':activeTitle == menu.menuName}">
          </span>
        </div>
        <el-collapse-transition>
          <ul v-if="activeTitle == menu.menuName">
            <li v-for="td in menu.subMenu"
                :key="td.id"
                class="drop-meun-item"
                :class="{active:activeUrl == td.menuUrl}"
                @click="jumpPage(td.menuUrl)">
              <i :class="td.menuIcon" class="item-icon"></i>
              <span>{{td.menuName}}</span>
            </li>
          </ul>
        </el-collapse-transition>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import storage from '../services/storageService.js'
  import {mapState, mapMutations} from 'vuex'
  import {stateFather} from '@/appConfig'
  export default {
    name: 'SideMenu',
    data () {
      return {
        activeTitle: '',
        activeUrl: '',
        menuList: {}
      }
    },
    methods: {
      ...mapMutations(['INIT_USER']),
      active (menu) {
        if (!menu.subMenu) {
          this.$router.push({path: menu.menuUrl})
          this.activeUrl = menu.menuUrl
          this.activeTitle = ''
          return
        }
        if (this.activeTitle === menu.menuName) {
          this.activeTitle = ''
        } else {
          this.activeTitle = menu.menuName
        }
      },
      jumpPage (url) {
        this.activeUrl = url
        this.$router.push({path: url})
      }
    },
    watch: {
      $route (to, from) {
        let path = this.$route.fullPath
        this.activeUrl = path
        this.activeTitle = stateFather[path] || ''
      }
    },
    computed: {
      ...mapState(['user']),
      menu () {
        return this.user.menus
      }
    },
    mounted () {
      let path = this.$route.fullPath
      this.activeUrl = path
      this.activeTitle = stateFather[path] || ''
    }
  }
</script>
<style lang="scss" type="text/scss" scopedd>
  @import "../style/_variables";
  .side-menu-container {
    transition: all 0.2s linear;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    .icon-img {
      border-bottom: 1px solid #293141;
      img {
        width: $menuWidth;
        height: $headerHeight;
        display: block;
      }
    }
    width: $menuWidth;
    font-size: $menuFontSize;
    background: $menuBgColor;
    .menu-item-title {
      padding-left: $paddingLeft;
      color: $menuFontColor;
      line-height: $menuiTemHeight;
      height: $menuiTemHeight;
      cursor: pointer;
      position: relative;
      span {
        position: absolute;
        right: 40px;
        top: 50%;
        margin-top: -8px;
        width: 16px;
        height: 16px;

      }
      .menu-down {
        background: url("../images/open.png") no-repeat;
      }
      .menu-up {
        background: url("../images/close.png") no-repeat;
      }
    }
    .drop-meun-item {
      padding-left: $itemPaddingLeft;
      color: $menuFontColor;
      line-height: $menuiTemHeight;
      height: $menuiTemHeight;
      cursor: pointer;
      position: relative;
      span {
        margin-right: 10px;
      }
    }
    .active {
      background: $activeBg;
      color: $activeColor;
      &:after{
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 5px;
        background:#F5CE44;
      }
    }
    .item-icon {
      margin-right: 10px;
      width: 22px;
      height: 22px;
      display: inline-block;
      position: relative;
      top: 5px;
      background:url("../images/menu-icon.png");
      background-position-y: -5px;
    }
    .user-icon {
      background-position-x: -34px;
    }
    .userList-icon {
      background-position-x: -67px;
    }
    .role-icon {
      background-position-x: -100px;
    }
    .enterprise-icon{
      background-position-x: -134px;
    }
    .image-identification-icon {
      background-position-x: -166px;
    }
    .OneNET-icon {
      background-position-x: -201px;
    }
    .product-icon {
      background-position-x: -233px;
    }
    .project-icon {
      background-position-x: -332px;
    }
    .upgrade-icon {
      background-position-x: -299px;
    }
    .log-icon {
      background-position-x: -330px;
    }
  }
</style>
