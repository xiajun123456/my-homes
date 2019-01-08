<template>
  <div class="orgTreeBranch">
    <ul>
      <li v-for="item in dataRows" :key="item.orgId" class="orgItem">
        <div class="itemInfor">
          <div
            v-if="item['children']"
            class="imgDiv"
            @click="openClick">
            <img v-if="isOpen" src="@/assets/images/close_bg.png">
            <img src="@/assets/images/open_bg.png" v-else>
          </div>
          <div class="imgDiv" v-else></div>
          <span
            class="orgName"
            v-bind:class="item.orgId == orgIds?'selectClass':''"
            @click="choseOrg(item)">{{item.orgName}}</span>
        </div>
        <el-collapse-transition>
          <div v-if="isOpen" class="orgItemLeft">
            <org-branch
              :orgIds="orgIds"
              :dataRows="item['children']"
              @chose-org-event="choseEvent">
            </org-branch>
          </div>
        </el-collapse-transition>
      </li>
    </ul>
  </div>
</template>

<script>
  import orgBranch from '@/assets/components/OrgTreeBranch'

  export default {
    name: 'orgBranch',
    data () {
      return {
        isOpen: false,
        selectId: ''
      }
    },
    props: {
      dataRows: Array,
      orgIds: String
    },
    components: {
      orgBranch
    },
    methods: {
      openClick () {
        this.isOpen = !this.isOpen
      },
      choseOrg (name) {
        this.$emit('chose-org-event', name)
      },
      choseEvent (data) {
        this.$emit('chose-org-event', data)
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .orgTreeBranch {
    ul {
      margin: 0 15px;
      .orgItem {
        position: relative;
        .imgDiv {
          display: inline-block;
          padding-top: 3px;
          margin-right: 3px;
        }
        .orgName {
          vertical-align: 2px;
          cursor: pointer;
          &:hover {
            color: indianred;
          }
        }
        .selectClass {
          color: red
        }
        .orgItemLeft {
          .orgItem :before {
            content: '';
            position: absolute;
            top: 12px;
            left: -9px;
            width: 11px;
            height: 1px;
            border-top: 1px dashed #979797;
          }
          .orgItem :after {
            content: "";
            display: block;
            position: absolute;
            top: -7px;
            width: 1px;
            left: -9px;
            height: 20px;
            border-left: 1px dashed #979797;
          }
        }
      }
    }
  }
</style>
