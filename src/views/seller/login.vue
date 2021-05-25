<template>
  <div class="login">
    <van-form>
      <van-field
        v-model="userName"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="passWord"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @click="login">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'SalLogin',
  data () {
    return {
      userName: '',
      passWord: ''
    }
  },
  methods: {
    login () {
      const params = {
        userName: this.userName,
        passWord: this.passWord
      }
      this.axios.get('/User/Login', { params })
        .then(res => {
          const data = res.data
          if (data.code === 0) {
            this.$router.push({
              path: '/seller/vehicleList',
              query: {
                SaleId: data.SaleId
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
