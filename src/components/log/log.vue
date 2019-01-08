<template>
  <div>
    <div class="view-header">{{appConfig['PROJECTNAME']}} > 日志管理</div>
    <div class="deal-list p20">
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <button class="btn btn-operating btn-add m20"
              style="margin-top: -3px"
              @click="search">
        <i class="el-icon-search"></i>
        搜索
      </button>
    </div>
    <div class="table-view">
      <table-view
        :tableData='tableData'
        :searched="searched"
        :tableKeys='key'
        :total='total'
        :checked="false"
        :btnPremiss='btnPurview'
        :currentPage="currentPage"
        @page-change="pageChange"
        :code="code"
        :loaded="loaded">
      </table-view>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import tableView from 'tableView'
  import $http from '$http'
  import {confirm, success, error} from 'prompt'
  import {dealWithDateFormat} from '@/assets/services/dealWithDateFormat'
  export default {
    name: 'log',
    data () {
      return {
        date: [],
        tableData: [],
        searched: true,
        currentPage: 1,
        total: 0,
        code: '',
        loaded: false
      }
    },
    computed: {
      ...mapState(['appConfig', 'btnPurview']),
      key () {
        let _self = this
        return {
          '时间': {
            key: 'createTime'
          },
          '操作账号': {
            key: 'userName'
          },
          '功能模块': {
            key: 'operationModule'
          },
          '操作类型': {
            key: 'operation'
          },
          '操作内容': {
            key: 'description'
          }
        }
      }
    },
    methods: {
      searchLog () {
        this.loaded = false
        this.searched = true
        let searchData = {
          startTime: dealWithDateFormat(this.date[0]),
          endTime: dealWithDateFormat(this.date[1]),
          pageNum: this.currentPage,
          pageSize: this.appConfig.PAGE.itemsPerPage
        }
        $http.post('getLogList', searchData).then(
          data => {
            this.tableData = data.details.list
            this.loaded = true
            this.searched = false
            this.total = data.details.totalPage
            this.code = `记录 ${data.details.totalPage} 条`
          }, errData => {
            this.loaded = true
            this.searched = false
            this.tableData = []
            error(errData.message)
          }
        )
      },
      search () {
        this.currentPage = 1
        this.searchLog()
      },
      pageChange (page) {
        this.currentPage = page
        this.searchLog()
      }
    },
    components: {
      tableView
    },
    beforeMount () {
      this.date = [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()]
      this.searchLog()
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
</style>
