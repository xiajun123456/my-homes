<template>
  <div>
    <div class="view-header">{{appConfig.PROJECTNAME}} > OneNET产品管理</div>
    <div class="deal-list">
      <button class="btn btn-operating btn-add"
              v-if="btnPurview.addOnenetManage"
              @click="addOnenetProduct">
        <i class="el-icon-plus"></i>
        添加
      </button>
      <button class="btn btn-operating btn-delete m20"
              @click="deleteOnenetProduct"
              v-if="btnPurview.deleteOnenetManage">
        <i class="el-icon-delete"></i>
        删除
      </button>
    </div>
    <div class="search-list clear">
      <div class="clear pull-left">
        <div class="w220 pull-left">
          <el-select v-model="search.onenetId" placeholder="所属Onenet企业">
            <el-option
              v-for="item in companyAll"
              :key="item.id"
              :label="item.onenetName"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="clear pull-left m20">
        <div class="w20 pull-left">
          <el-select v-model="search.productStatus" placeholder="状态">
            <el-option :key="0" label="已停用" :value="0"></el-option>
            <el-option :key="1" label="正常" :value="1"></el-option>
          </el-select>
        </div>
      </div>
      <div class="clear pull-left m20">
        <span class="input-label pull-left">关键字:</span>
        <div class="w20 pull-left">
          <el-input type="text"
                    v-model="search.keyWord"
                    name="keyWorld"
                    clearable
                    placeholder="产品名称">
          </el-input>
        </div>
      </div>
      <button class="btn btn-operating btn-add pull-left m20"
              @click="searchImg">
        <i class="el-icon-search"></i>
        搜索
      </button>
    </div>
    <div class="table-view">
      <table-view
        :tableData='tableData'
        :tableKeys='key'
        :total='pageTotal'
        :checked="true"
        :btnPremiss='btnPurview'
        :currentPage="queryCondition.pageNum"
        @page-change="pageChange"
        @select-change="selectChange"
        :code="code"
        :loaded="loaded">
      </table-view>
    </div>
    <add-product
      :dialogTitle="dialogTitle"
      :showDialog="modalShow"
      :addData="addModalData"
      @showModalEvent="showEvent"
      @searchAllEvent="searchEvent">
    </add-product>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import addProduct from '@/components/OneNET/group/AddProductModal'
  import tableView from 'tableView'
  import $http from '$http'
  import {confirm, success, error} from 'prompt'

  export default {
    name: 'product',
    data () {
      return {
        search: {
          onenetId: '',
          productStatus: '',
          keyWord: ''
        },
        queryCondition: {
          pageNum: 1,
          pageSize: 10
        },
        pageTotal: 0,
        companyAll: [],
        showDialogVisible: false,
        loaded: false,
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
        btnPurview: {
          addOnenetManage: true,
          deleteOnenetManage: true,
          editOnenetManage: true
        }
      }
    },
    components: {
      tableView,
      addProduct
    },
    computed: {
      // ...mapState(['btnPurview', 'appConfig']),
      ...mapState(['appConfig']),
      key () {
        const _this = this
        return {
          '项目名称': {
            key: 'productName'
          },
          '所属OneNET': {
            key: 'OneNETName'
          },
          '接入协议': {
            key: 'onenetProtocol'
          },
          '设备数据协议': {
            key: 'deviceProtocolSign'
          },
          '状态': {
            key: 'status',
            type: 'enterpriseWorkStatus'
          },
          '添加时间': {
            key: 'createTime'
          },
          '操作': {
            controls: [
              {
                text () {
                  return '编辑'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: 'editOnenetManage',
                onClick (item) {
                  console.log('item', item)
                  _this.addModalData = Object.assign({}, item)
                  _this.dialogTitle = '修改onnet'
                  _this.modalShow = true
                }
              }, {
                text () {
                  return '停用'
                },
                class (item) {
                  return 'table-operating-btn-type1'
                },
                show: true,
                onClick (item) {
                  console.log(2, item)
                }
              }, {
                text () {
                  return '更新电表状态'
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
        console.log('成功！')
        this.searchAll()
      },
      deleteOnenetProduct () {
        console.log(this.delData.length, this.delData)
        if (this.delData.length > 0) {
          confirm('是否删除所选项目？', '删除项目').then(() => {
            $http.post('delOnenetProduct', {}).then((data) => {
              success(data.message)
            }).catch((err) => {
              error(err.message)
            })
          }).catch(() => {
            error('取消删除')
          })
        } else {
          error('请选择要删除的项目！')
        }
      },
      pageChange (data) {
        console.log('pageChange', data)
        this.queryCondition.pageNum = data
        this.searchAll()
      },
      searchAll () {
        this.loaded = false
        let searchData = Object.assign({}, this.search)
        searchData.queryCondition = this.queryCondition
        $http.post('searchOnenetProduct', searchData).then((data) => {
          console.log('sousou')
          this.tableData = data.details.list
          this.loaded = true
          this.changeVal = false
          this.pageTotal = data.details.totalCount
          this.code = String(data.details.totalCount) + '条记录'
        }).catch((err) => {
          console.log('err', err)
          this.loaded = true
        })
      },
      showEvent (data) {
        this.modalShow = data
      },
      searchEvent (data) {
        console.log('data', data)
        this.searchAll()
      },
      selectChange (data) {
        this.delData = data
      },
      addOnenetProduct () {
        this.addModalData = {}
        this.dialogTitle = '添加onnet'
        this.modalShow = true
      }
    },
    created () {
      $http.post('searchOnenetCompany').then((data) => {
        this.companyAll = data.detail.list
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

<style lang="scss" type="text/scss" scope>
</style>
