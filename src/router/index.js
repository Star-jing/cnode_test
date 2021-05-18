import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  // header 导航的路由匹配
  // 新手入门页面
  {
    path: '/getstart',
    component:()=>import('../views/Getstart.vue')
  },
  // api页面
  {
    path: '/api',
    component:()=>import('../views/Api.vue')
  },
  // 关于页
  {
    path:'/about',
    component:()=>import('../views/About.vue')
  },
  // 文章详情页
  {
    path: '/topic/:topicId',
    name:'topic',
    component:()=>import('../views/Topic.vue')
  },
  // 登录
  {
    path: '/login',
    component:()=>import('../views/Login.vue')
  },
  // 首页
  {
    path: '/',
    component: Home
  },
  // 首页导航的路由匹配
  {
    path: '/:tab',
    component: Home
  },
  
  // 用户详情 路由匹配
  {
    path: '/user/:loginname',
    name:'user',
    component:()=>import('../views/User.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  // 项目部署 要使用 hash模式
  mode:'hash',
  // 路由的基地址
  base: process.env.BASE_URL,
  routes
})

export default router
