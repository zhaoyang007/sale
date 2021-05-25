<template>
  <div class="payfor-detail">
    <van-form>
      <van-field v-model="formData.PayOutMoney" type="number" required label="赔付金额" placeholder="请输入" />
      <van-field v-model="formData.PayOutReason" required label="赔付原因" placeholder="请输入" />
      <van-field v-model="formData.Customer" label="客户" placeholder="请输入" />
    </van-form>
    <div style="margin-top: 100px;">
      <van-button type="info" class="save" @click="editPayfor">保存</van-button>
      <van-button class="back" @click="goBack">返 回</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SalPayforDetail',
  data () {
    return {
      formData: {
        PayOutMoney: '',
        PayOutReason: '',
        Customer: ''
      }
    }
  },
  created () {
    const payforInfo = this.$route.query.payforInfo
    if (payforInfo) {
      this.formData = payforInfo
    }
  },
  methods: {
    editPayfor () {
      const params = {
        CarId: this.$route.query.CarId,
        SaleId: this.$route.query.SaleId,
        ...this.formData
      }
      this.axios.post('/SaleCar/AddPayOut', params)
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.$router.push({
              path: '/seller/payforList',
              query: {
                CarId: this.$route.query.CarId
              }
            })
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
        path: '/seller/payforList',
        query: {
          CarId: this.$route.query.CarId,
          SaleId: this.$route.query.SaleId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.payfor-detail {
  .van-button {
    height: 38px;
  }
  .save {
    padding: 0 30px;
    margin-right: 20px;
  }
  .back {
    padding: 0 30px;
  }
}
</style>
