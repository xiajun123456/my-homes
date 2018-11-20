<template>
  <div>
    <div class="view-header">{{appConfig.PROJECTNAME}} > OneNET项目管理</div>
    <div class="deal-list">
      <button class="btn btn-operating btn-add"
              v-if="btnPurview.addOnenetManage"
              @click="addOnenetManage">
        <i class="el-icon-plus"></i>
        添加
      </button>
      <button class="btn btn-operating btn-delete m20"
              @click="deleteOnenetManage"
              v-if="btnPurview.deleteOnenetManage">
        <i class="el-icon-delete"></i>
        删除
      </button>
    </div>
    <div class="search-list clear">
      <div class="clear pull-left">
        <span class="input-label pull-left">关键字:</span>
        <div class="w220 pull-left">
          <el-input type="text"
                    v-model="search.keyWorld"
                    name="keyWorld"
                    clearable
                    placeholder="项目名称">
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
    <add-project
      :dialogTitle="dialogTitle"
      :showDialog="modalShow"
      :addData="addModalData"
      @showModalEvent="showEvent"
      @searchAllEvent="searchEvent">
    </add-project>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import tableView from 'tableView'
  import addProject from '@/components/OneNET/group/AddProjectModal'
  import $http from '$http'
  import {confirm, success, error} from 'prompt'

  export default {
    name: 'project',
    data () {
      return {
        search: {
          keyWorld: ''
        },
        queryCondition: {
          pageNum: 1,
          pageSize: 10
        },
        pageTotal: 0,
        showDialogVisible: false,
        loaded: false,
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
        btnPurview: {
          addOnenetManage: true,
          deleteOnenetManage: true,
          editOnenetManage: true
        }
      }
    },
    components: {
      tableView,
      addProject
    },
    computed: {
      // ...mapState(['btnPurview', 'appConfig']),
      ...mapState(['appConfig']),
      key () {
        const _this = this
        return {
          '项目名称': {
            key: 'onenetName'
          },
          '域名': {
            key: 'apiHost'
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
                  _this.addModalData = {
                    onenetName: item.onenetName,
                    apiHost: item.apiHost,
                    id: item.id
                  }
                  _this.dialogTitle = '修改onnet'
                  _this.modalShow = true
                }
              }, {
                text () {
                  return '详情'
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
          console.log('成功！')
          this.searchAll()
        }
      },
      addOnenetManage () {
        this.dialogTitle = '添加onnet'
        this.modalShow = true
      },
      deleteOnenetManage () {
        console.log(this.delData.length, this.delData)
        let onenetIds = []
        let onenetNames = []
        this.delData.map((item) => {
          onenetIds.push(item.id)
          onenetNames.push(item.onenetName)
        })
        if (this.delData.length > 0) {
          this.delFuc(onenetIds, onenetNames)
        } else {
          error('请选择要删除的项目！')
        }
      },
      pageChange (data) {
        this.queryCondition.pageNum = data
        this.searchAll()
      },
      selectChange (data) {
        this.delData = data
      },
      searchAll () {
        let searchData = Object.assign({}, this.search)
        searchData.queryCondition = this.queryCondition
        $http.post('searchOnenetProject', searchData).then((data) => {
          this.tableData = data.details.list
          this.loaded = true
          this.changeVal = false
          this.pageTotal = data.details.totalCount
          this.code = String(data.details.totalCount) + '条记录'
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
      delFuc (ids, names) {
        let _ids = {onenetIds: ids.join(',')}
        let _names = {
          onenetIds: ids.join(','),
          onenetNames: names.join(',')
        }
        $http.post('hasOnenetProject', _ids).then(() => {
          confirm('是否删除所选项目？', '删除项目').then(() => {
            $http.post('delOnnetProject', _names).then((data) => {
              success(data.message)
            }).catch((err) => {
              error(err.returnMsg)
            })
          }).catch(() => {
            error('取消删除')
          })
        }).catch((err) => {
          error(err.returnMsg)
        })
      }
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
