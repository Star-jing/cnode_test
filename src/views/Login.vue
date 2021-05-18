<template>
  <div class="loginin">
    <panel>
      <template #header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="#" style="cursor: pointer">登录</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </template>
      <template #content>
        <div style="margin-top: 15px">
          <span style="margin: auto 20px">Token</span
          ><el-input type="text" v-model.trim="token" class="login-input" />
        </div>
        <el-button @click="login" class="login-btn">登录</el-button></template
      >
    </panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
  data() {
    return {
      // ecf878d1-6052-476a-8262-824760c7872b 老师的
      // 我的 3bddeae3-4079-4bdf-b6c1-4281e95bc34a
      token: "",
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/accesstoken", {
          accesstoken: this.token,
        })
        .then((res) => {
          console.log(res);
          this.$router.push("/");
          const userInfo = res;
          // console.log(userInfo);
          this.$store.commit("getUserInfo", userInfo);
          // sessionStorage.set 不能存储对象，所以需要把对象先转换成字符串
          if (typeof userInfo === "object") {
            const user = JSON.stringify(userInfo);
            console.log(user);
            // 将用户信息存储在浏览器内
            sessionStorage.setItem("userInfo", user);
          }
          //   也需要将用户的 token 存储在浏览器中
          const userToken = this.token;
          this.$store.commit("getUserToken", userToken);
          sessionStorage.setItem("userToken",userToken)
        })
        .catch((err) => {
          //   console.log(err);
          //   alert('token 有误')
          this.$message({
            showClose: true,
            message: "错了哦，这是一个错误token",
            type: "error",
          });
        });
    },
  },
};
</script>

<style lang='less' scoped>
.loginin {
  margin: 0 auto;
  color: #000;
  .login-input {
    width: 300px;
    height: 40px;
  }
  .login-btn {
    display: block;
    margin: 20px 300px;
    width: 80px;
    height: 40px;
  }
}
</style>