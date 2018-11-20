<template>
  <div>
    <el-select v-model="province"
               placeholder='选择省份'
               clearable>
      <el-option
        v-for="provinces in provinceList"
        :key='provinces.id'
        :value="provinces.id"
        :label="provinces.name">
      </el-option>
    </el-select>
    <el-select v-model="city"
               v-if='province'
               placeholder='选择城市'
               clearable>
      <el-option
        v-for="citys in cityList"
        :key='citys.id'
        :value="citys.id"
        :label="citys.name">
      </el-option>
    </el-select>
    <el-select v-model="area"
               v-if='city && province'
               placeholder='选择区县'
               clearable>
      <el-option
        v-for="areas in areaList"
        :key='areas.id'
        :value="areas.id"
        :label="areas.name">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import $http from '$http'
  import {loopData, loadDistrict} from '@/assets/services/addressSelectorService'
  export default {
    name: 'AddressSelector',
    data () {
      return {
        province: '',
        provinceList: null,
        city: '',
        cityList: null,
        area: '',
        areaList: null,
        beforeData: {}
      }
    },
    computed: {
      areas () {
        let area = {
          provinceCode: this.province,
          cityCode: this.city,
          areaCode: this.area
        }
        return area
      }
    },
    watch: {
      province () {
        this.$emit('input', this.areas)
        this.handleProvinceChange()
      },
      city () {
        this.$emit('input', this.areas)
        this.handleCityChange()
      },
      area () {
        this.$emit('input', this.areas)
      }
    },
    props: {
      value: {
        type: Object
      }
    },
    methods: {
      handleProvinceChange (a, b) {
        this.city = ''
        this.area = ''
        this.cityList = []
        this.areaList = []
        if (!this.province) {
          return
        }
        $http.post('getCitys', {parent: this.province}).then(data => {
          this.cityList = data.rows
          if (this.beforeData.city) {
//            this.city = loadDistrict(data.rows, this.beforeData.city)
            this.city = this.beforeData.city
            this.beforeData.city = ''
          }
        })
      },
      handleCityChange () {
        this.area = ''
        this.areaList = []
        if (!this.city) {
          return
        }
        $http.post('getAreas', {parent: this.city}).then(data => {
          this.areaList = data.rows
          if (this.beforeData.area) {
//            this.area = loadDistrict(data.rows, this.beforeData.area)
            this.area = this.beforeData.area
            this.beforeData.area = ''
          }
        })
      },
      setProvince () {
        let _self = this
        if (_self.value) {
          _self.beforeData = Object.assign({}, {
            province: _self.value.provinceCode || '',
            city: _self.value.cityCode || '',
            area: _self.value.areaCode || ''
          })
        }
        $http.post('getProvince', {}).then(data => {
          _self.provinceList = data.rows
          if (_self.beforeData.province) {
            _self.province = _self.beforeData.province
          }
        })
      }
    },
    mounted () {
      this.setProvince()
    }
  }
</script>
<style lang="scss" type="text/scss" scope>
  .el-select {
    width: 160px;
  }
</style>
