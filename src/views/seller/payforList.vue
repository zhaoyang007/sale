<template>
  <div class="payfor-list">
    <div class="title">
      赔付金额：{{ payforMoney }}
    </div>
    <van-button type="info" size="small" @click="toPayforDetail" style="margin-bottom: 20px;">添加赔付信息</van-button>
    <van-button size="small" class="back" @click="goBack">返 回</van-button>
    <van-cell
      center
      v-for="(item, index) in payforList"
      :key="index"
      :title="`赔付金额：${item.PayOutMoney}元  赔付原因：${item.PayOutReason}`"
      :label="`${item.PayOutTimeStr} - 客户：${item.Customer}`">
      <template>
        <van-button type="info" size="mini" @click.stop="deletePayfor(item.Id)">删除</van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SalPayforList',
  data () {
    return {
      payforMoney: 0,
      SaleId: 0,
      payforList: []
    }
  },
  created () {
    this.getPayforList()
  },
  methods: {
    getPayforList () {
      const params = {
        CarId: this.$route.query.CarId
      }
      this.axios.get('/SaleCar/PayOutList', { params })
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.payforMoney = data.PayOutMoney
            this.SaleId = data.SaleId
            this.payforList = data.data || []
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
    toPayforDetail () {
      this.$router.push({
        path: '/seller/payforDetail',
        query: {
          CarId: this.$route.query.CarId,
          SaleId: this.$route.query.SaleId
        }
      })
    },
    deletePayfor (id) {
      const params = {
        id
      }
      this.axios.get('/SaleCar/DeletePayOut', { params })
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.getPayforList()
          }
          Toast({
            message: data.msg,
            position: 'top'
          })
        }).catch(() => {
          Toast({
            message: '请求失败',
            position: 'top'
          })
        })
    },
    // 返回
    goBack () {
      this.$router.push({
        path: '/seller/vehicleList',
        query: {
          SaleId: this.$route.query.SaleId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.payfor-list {
  .title {
    padding: 30px;
  }
}
.van-cell__title {
  text-align: left;
}
.van-cell__value {
  flex: 0 0 40px;
}
.back {
  padding: 0 30px;
  margin-left: 20px;
}
</style>
