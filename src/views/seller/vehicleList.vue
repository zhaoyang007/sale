<template>
  <div class="vehicle-list">
    <van-tabs type="card" class="tabs" :ellipsis="false" @click="tabClick">
      <van-tab title="全部"></van-tab>
      <van-tab title="已发车"></van-tab>
      <van-tab title="售卖中"></van-tab>
      <van-tab title="售完(欠款未收)"></van-tab>
      <van-tab title="完结"></van-tab>
    </van-tabs>
    <van-button type="info" size="small" class="frush" @click="getVehicleList">刷 新</van-button>
    <div class="list">
      <van-cell
        v-for="(item, index) in vehicleList"
        :key="index"
        :title="`${item.Carlience}-${item.FruitType}-${item.AllNums}件-${item.AllWeight}斤-${item.SupName}-${item.SupPhone}`">
        <template #label>
          <van-button type="info" size="mini" @click.stop="changeVehicleState(item.Id, item.CarState)" v-if="item.CarState !== 4">{{ item.CarStateStr }}</van-button>
          <van-button type="info" size="mini" @click.stop="toSellList(item.Id)">售卖信息</van-button>
          <van-button type="info" size="mini" @click.stop="toPayforList(item.Id)">赔付信息</van-button>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SalVehicleList',
  data () {
    return {
      vehicleListCopy: [],
      vehicleList: [],
      activeTab: 0,
      CarState: 0
    }
  },
  created () {
    this.getVehicleList()
  },
  methods: {
    // 获取车辆列表
    getVehicleList () {
      const params = {
        SaleId: this.$route.query.SaleId,
        CarState: this.CarState
      }
      this.axios.post('/SaleCar/Carlist', params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.vehicleListCopy = data.data || []
            this.vehicleList = [].concat(this.vehicleListCopy)
          } else {
            Toast({
              message: data.msg,
              position: 'top'
            })
          }
        }).catch(() => {
          Toast({
            message: '请求失败',
            position: 'top'
          })
        })
    },
    // tab切换
    tabClick (name) {
      this.CarState = name
      this.getVehicleList()
      // this.activeTab = name
      // name = name - 1
      // if (name < 0) {
      //   this.vehicleList = [].concat(this.vehicleListCopy)
      // } else {
      //   this.vehicleList = this.vehicleListCopy.filter(item => item.CarState === name)
      // }
    },
    // 修改车辆状态
    changeVehicleState (id, state) {
      const params = {
        CarId: id,
        State: state
      }
      this.axios.post('/SaleCar/ChangeState', params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.getVehicleList()
          } else {
            Toast({
              message: data.msg,
              position: 'top'
            })
          }
        }).catch(() => {
          Toast({
            message: '请求失败',
            position: 'top'
          })
        })
    },
    // 售卖信息
    toSellList (id) {
      this.$router.push({
        path: '/seller/sellList',
        query: {
          CarId: id,
          SaleId: this.$route.query.SaleId
        }
      })
    },
    // 赔付信息
    toPayforList (id) {
      this.$router.push({
        path: '/seller/payforList',
        query: {
          CarId: id,
          SaleId: this.$route.query.SaleId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.vehicle-list {
  .tabs {
    margin: 20px 0;
  }
  /deep/ .van-tabs__nav--complete {
    padding: 0;
  }
  /deep/ .van-tabs__wrap--scrollable .van-tab {
    padding: 0 10px;
  }
  .list {
    .van-cell__title {
      text-align: left;
    }
  }
  .frush {
    margin-bottom: 20px;
    padding: 0 30px;
  }
  .add-vehicle {
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 28px;
  }
}
</style>
