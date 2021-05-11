import Vue from 'vue'
import VueRouter from 'vue-router'
import SellerLogin from '../views/seller/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/seller/login'
  },
  // 销售商
  {
    path: '/seller/login',
    name: 'SellerLogin',
    component: SellerLogin
  },
  {
    path: '/seller/vehicleList',
    name: 'sellerVehicleList',
    component: () => import(/* webpackChunkName: "sellerVehicleList" */ '../views/seller/vehicleList.vue')
  },
  {
    path: '/seller/sellList',
    name: 'sellerSellList',
    component: () => import(/* webpackChunkName: "sellerSellList" */ '../views/seller/sellList.vue')
  },
  {
    path: '/seller/sellDetail',
    name: 'sellerSellDetail',
    component: () => import(/* webpackChunkName: "sellerSellDetail" */ '../views/seller/sellDetail.vue')
  },
  {
    path: '/seller/payforList',
    name: 'sellerPayforList',
    component: () => import(/* webpackChunkName: "sellerPayforList" */ '../views/seller/payforList.vue')
  },
  {
    path: '/seller/payforDetail',
    name: 'sellerPayforDetail',
    component: () => import(/* webpackChunkName: "sellerPayforDetail" */ '../views/seller/payforDetail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
