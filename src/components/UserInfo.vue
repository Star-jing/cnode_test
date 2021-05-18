<template>
  <div class="userInfo" v-if="!$route.path.includes('login')">
    <Panel>
      <template #header>
        <span v-if="userInfo">个人信息</span>
        <span v-else>网站信息</span>
      </template>
      <template #content>
        <div v-if="userInfo">
          <img :src="userInfo.avatar_url" alt="" class="userInfoImg" />
          <span>{{ userInfo.loginname }}</span>
          <p>“这个人很懒什么也没留下”</p>
        </div>

        <div v-else>
          <p>欢迎进入 WEB 前端论坛！</p>
          <span>
            您可以先
            <router-link to="/login" class="login">快来登录吧</router-link></span
          >
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";

export default {
  components: { Panel },
  
  computed: {
    // 刷新页面的时候 store 数据清空
    // 如何处理
    // 当第一次登录的时候可以直接将 userInfo 转化成 json 串存储到浏览器中
    // created(刷新的时候) 先看能不能取到 vuex 数据  不能的话直接去浏览器中取 并更新 store
    // 当点击退出按钮的时候清空 store 以及浏览器存储的数据
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style lang='less'>
.userInfo {
  width: 300px;
  .login {
    color: rgb(57, 202, 76);
    font-weight: 600;
    text-decoration: underline;
  }
  .userInfoImg {
    width: 48px;
    height: 48px;
    vertical-align: middle;
    margin-right: 15px;
  }
}
</style>