<template>
  <div class="app">
    <Header />
    <div class="main">
      <router-view class="left"></router-view>
      <!-- 右侧小信息模块 -->
      <UserInfo class="right" />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import UserInfo from "./components/UserInfo.vue";
import Getstart from "./views/Getstart.vue";

export default {
  name: "app",
  components: { Header, UserInfo, Getstart },
  created() {
    // 更新 store 数据
    // console.log('vue 组件渲染了');
    // 在渲染之前需要取到从浏览器的数据
    // 因为保存的是字符串 所以需要将结果在转换成 js 对象，然后将 store 内的数据更新
    let userinfo = sessionStorage.getItem("userInfo");
    userinfo = JSON.parse(userinfo);
    this.$store.commit("getUserInfo", userinfo);
    let userToken = sessionStorage.getItem("userToken");
    this.$store.commit("getUserToken", userToken);
  },
};
</script>
<style lang='less'>
// @import url("./theme/style.less");
.main {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    width: 65%;
    margin: 10px 50px;
  }
  .right {
    // width: 30%;
    margin-top: 10px;
    margin-right: 50px;
  }
}
</style>
