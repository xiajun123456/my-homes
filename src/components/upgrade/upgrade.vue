<template>
  <div>
    <div class="view-header">{{appConfig.PROJECTNAME}} > 固件升级</div>
    <div class="deal-list">
      <button class="btn btn-operating btn-add"
              v-if="btnPurview.addOnenetManage"
              @click="addOnenetProduct">
        <i class="el-icon-plus"></i>
        添加
      </button>
    </div>
    <div class="search-list clear">
      <div class="clear pull-left mt5">
        <div class="w20 pull-left">
          <el-select v-model="onenetCompany" placeholder="所属Onenet企业">
            <el-option
              v-for="item in companyAll"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="clear pull-left mt5 m20">
        <div class="w20 pull-left">
          <org-tree
            :treeData="treeData"
            v-model="treeData.orgId"
            @get-org-event="getOrgEvent">
          </org-tree>
        </div>
      </div>
      <div class="clear pull-left m20 mt5">
        <div class="w20 pull-left">
          <el-select v-model="deviceType" placeholder="电表类型">
            <el-option :key="1" label="智能电表" :value="1"></el-option>
            <el-option :key="2" label="直流计量模块" :value="2"></el-option>
          </el-select>
        </div>
      </div>
      <div class="clear pull-left m20 mt5">
        <el-date-picker
          v-model="pickTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="clear pull-left m20 mt5">
        <span class="input-label pull-left">关键字:</span>
        <div class="w20 pull-left">
          <el-input type="text"
                    v-model="keyWorld"
                    name="keyWorld"
                    clearable
                    placeholder="项目名称">
          </el-input>
        </div>
      </div>
      <button class="btn btn-operating btn-add pull-left m20 mt5"
              @click="searchImg">
        <i class="el-icon-search"></i>
        搜索
      </button>
    </div>
    <div class="table-view">
      <table-view
        :tableData='tableData'
        :tableKeys='key'
        :total='total'
        :checked="true"
        :btnPremiss='btnPurview'
        :currentPage="currentPage"
        @page-change="pageChange"
        @select-change="selectChange"
        :code="code"
        :loaded="loaded">
      </table-view>
    </div>
    <add-upgrade
      :dialogTitle="dialogTitle"
      :showDialog="modalShow"
      :addData="addModalData"
      @showModalEvent="showEvent"
      @searchAllEvent="searchEvent">
    </add-upgrade>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import addUpgrade from '@/components/upgrade/group/AddUpgradeModal'
  import tableView from 'tableView'
  import $http from '$http'
  import {confirm, success, error} from 'prompt'
  import orgTree from 'orgTree'

  export default {
    name: 'product',
    data () {
      return {
        deviceType: '',
        onenetCompany: '',
        companyAll: [],
        keyWorld: '',
        showDialogVisible: false,
        loaded: false,
        currentPage: 1,
        total: 0,
        formstate: {},
        code: '记录 5 条',
        edit: {
          userName: '李磊',
          loginName: 'aaaa'
        },
        tableData: [],
        modalShow: false,
        addModalData: {},
        dialogTitle: '',
        delData: [],
        pickTime: '',
        treeData: {
          orgId: '1',
          orgName: '中移物联网'
        }
      }
    },
    components: {
      tableView,
      addUpgrade,
      orgTree
    },
    computed: {
      ...mapState(['btnPurview', 'appConfig']),
      key () {
        const _this = this
        return {
          '编码': {
            key: 'id'
          },
          '所属OneNET': {
            key: 'OneNETName'
          },
          '电表类型': {
            key: 'deviceType'
          },
          '目标版本': {
            key: 'targetProtocol'
          },
          '升级时间': {
            key: 'upgradeTime'
          },
          '升级设备总数': {
            key: 'upgradeDeviceNum'
          },
          '升级成功数': {
            key: 'upgradeDone'
          },
          '未升级成功数': {
            controls: [
              {
                text (item) {
                  if (item) {
                    return item.upgradeNone
                  }
                },
                class (item) {
                  return 'none-underline'
                },
                show: true,
                onClick (item) {
                  console.log(2, item)
                }
              }, {
                text () {
                  return '重新升级'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: true,
                onClick (item) {
                  console.log(2, item)
                }
              }
            ]
          },
          '操作': {
            controls: [
              {
                text () {
                  return '导出EXCEL'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: true,
                onClick (item) {
                  console.log(2, item)
                }
              }
            ]
          }
        }
      }
    },
    methods: {
      ...mapActions(['getImgAuthority']),
      searchImg () {
        if (this.changeVal) {
          this.searchAll()
        }
      },
      pageChange (data) {
        this.searchAll()
      },
      searchAll () {
        $http.post('searchUpgrade').then((data) => {
          this.tableData = data.rows
          this.loaded = true
          this.changeVal = false
          this.total = data.total
        }).catch((err) => {
          console.log('err', err)
        })
      },
      showEvent (data) {
        this.modalShow = data
      },
      searchEvent (data) {
        this.searchAll()
      },
      selectChange (data) {
        this.delData = data
      },
      addOnenetProduct () {
        this.addModalData = {}
        this.dialogTitle = '添加onnet'
        this.modalShow = true
      },
      getOrgEvent (data) {
        this.treeData = Object.assign({}, data)
      }
    },
    created () {
      $http.post('searchOnenetCompany').then((data) => {
        this.companyAll = data.rows
      }).catch((err) => {
        error(err.message)
      })
    },
    mounted () {
      this.searchAll()
    },
    watch: {
      keyWorld (val, old) {
        console.log('new old', val, old)
        this.changeVal = true
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .mt5{
    margin-top: 5px;
  }
</style>
