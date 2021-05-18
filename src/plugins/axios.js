import axios from 'axios'
import Vue from 'vue'
// 基地址
axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
// 响应拦截
axios.interceptors.response.use(res =>{
    return res.data
})

// 将 axios 全局声明
Vue.prototype.$axios = axios

// 导出 axios
export default axios