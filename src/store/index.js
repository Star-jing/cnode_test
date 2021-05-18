import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: null,
    //  用户的 token
    userToken: null,
  },
  mutations: {
    // 获取用户信息
    getUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
      // // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
      // localStorage.setItem('userInfo', userInfo)
    },
    getUserToken: (state, userToken) => {
      state.userToken = userToken
    }
  },
  actions: {
  },
  modules: {
  }
})
