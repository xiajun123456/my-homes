<template>
  <div class="mainOrg">
    <div class="orgInput">
      <el-input
        class="orgInput"
        size="small"
        placeholder="请选择组织架构"
        v-model="treeOrg.orgName"
        :readonly="true"
        @focus="inputClick">
      </el-input>
      <span
        class="arrow-input"
        @click="arrowClick">
      <i v-bind:class="{'el-icon-arrow-down':iconBottom, 'el-icon-arrow-up':iconTop}"></i>
      </span>
    </div>
    <div class="downItem">
      <el-collapse-transition>
        <div class="orgDown" v-if="iconTop">
          <org-branch
            :orgIds="treeOrg.orgId"
            :dataRows="orgData"
            @chose-org-event="choseEvent">
          </org-branch>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
  import orgBranch from '@/assets/components/OrgTreeBranch'
  import $http from '$http'
  import {confirm, success, error} from 'prompt'

  export default {
    name: 'orgTreeControl',
    data () {
      return {
        iconBottom: true,
        iconTop: false,
        orgData: null,
        treeOrg: {}
      }
    },
    props: {
      treeData: Object
    },
    components: {
      orgBranch
    },
    methods: {
      arrowClick () {
        this.iconBottom = !this.iconBottom
        this.iconTop = !this.iconTop
      },
      inputClick () {
        this.iconBottom = !this.iconBottom
        this.iconTop = !this.iconTop
      },
      choseEvent (data) {
        this.treeOrg = data
        this.iconBottom = true
        this.iconTop = false
        this.$emit('get-org-event', data)
      }
    },
    created () {
      $http.post('searchOrg').then((data) => {
        this.orgData = data.rows
      }).catch((err) => {
        error(err.message)
      })
    },
    mounted () {
      this.treeOrg = Object.assign({}, this.treeData)
    }
  }
</script>

<style lang="scss" type="text/scss" scope>
  .mainOrg {
    position: relative;
    .orgInput {
      width: 180px;
      position: relative;
      .el-input__inner {
        background-color: white;
        cursor: pointer;
      }
      .arrow-input {
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
        padding: 5px 8px;
        cursor: pointer;
      }
    }
    .downItem {
      .orgDown {
        position: absolute;
        z-index: 10;
        width: 200px;
        height: 200px;
        border: 1px solid #dcdfe6;
        border-radius: 3px;
        margin-top: 1px;
        padding-top: 4px;
        overflow: auto;
        background-color: white;
      }
    }
  }
</style>
