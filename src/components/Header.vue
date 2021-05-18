<template>
  <header>
    <div class="navbar">
      <div class="left">
        <span>前端论坛</span>
        <router-link class="logo" to="/"
          ><img src="../assets/logo.png" alt=""
        /></router-link>
      </div>
      <div class="right">
        <router-link class="info" to="/">首页</router-link>
        <router-link class="info" to="/getstart">新手入门</router-link>
        <router-link class="info" to="/api">API</router-link>
        <router-link class="info" to="/about">关于</router-link>
        <router-link class="info" to="/login">登录</router-link>
        <span class="signout">退出</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang='less' scoped>
@import url("../theme/style.less");
header {
  width: 100%;
  height: 50px;
  padding: 5px;
  background-color: #444;
  color: aliceblue;
  .navbar {
    margin: 0 50px;
    .left {
      float: left;
    }
    .right {
      float: right;
      right: 0;
    }
  }
  .logo {
    img {
      width: 45px;
      line-height: 50px;
      vertical-align: middle;
      margin-right: 20px;
    }
  }
  a.info {
    display: inline-block;
    font-size: 13px;
    color: #ccc;
    line-height: 20px;
    padding: 10px 15px;
  }
  span.signout {
    font-size: 13px;
    color: #ccc;
    line-height: 20px;
    padding: 10px 15px;
    cursor: pointer;
  }
}
</style>
