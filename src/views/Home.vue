<template>
  <div class="home">
    <Panel>
      <template #header>
        <div class="nav">
          <router-link to="/">全部</router-link>
          <router-link to="/good">精华</router-link>
          <router-link to="/share">分享</router-link>
          <router-link to="/ask">问答</router-link>
          <router-link to="/job">招聘</router-link>
          <router-link to="/dev">客户端测试</router-link>
        </div>
      </template>
      <template #content>
        <div v-if="posts.length">
          <div class="post-item" v-for="post in posts" :key="post.id">
            <router-link
              :to="{
                name: 'user',
                params: { loginname: post.author.loginname },
              }"
              ><img
                :src="post.author.avatar_url"
                alt=""
                :title="post.author.loginname"
                class="avatar"
            /></router-link>

            <span class="count"
              ><span title="回复数">{{ post.reply_count }}</span
              >/<span title="点击数">{{ post.visit_count }}</span></span
            >
            <span
              v-if="!tab || post.good || post.top"
              :class="post.good || post.top ? 'active-tab' : 'tab'"
              >{{ post | getPostChineseTab }}</span
            >
            <!-- 文章标题 -->
            <!-- to  的跳转可以写成 对象 -->
            <router-link
              :to="{ name: 'topic', params: { topicId: post.id } }"
              class="title"
              >{{ post.title }}</router-link
            >
            <!-- <span title="最后回复时间">{{post.last_reply_at}}</span> -->
          </div>
        </div>
        <!-- 点击分页器按钮的时候 要改变网址 比如 点击 分享的第三页 网址是 /share?page=3 -->
        <!-- 获取当前页面地址 -->
        <!-- <div>
          这是一个假的分页器<router-link :to="$route.path + '?page=1'"
            >1</router-link
          ><router-link :to="$route.path + '?page=2'">2</router-link
          ><button @click="pageClick(3)">3</button>
        </div> -->
        <!-- 分页器 -->
        <!-- 有一个小问题 就是 刷新以后 地址栏没有回到 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageTotal"
          :page-size="20"
          :current-page.sync="currentPage"
          @current-change="getPostsByPage(currentPage)"
        >
        </el-pagination>
      </template>
    </Panel>
  </div>
</template>
<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
  name: "Home",
  data() {
    return {
      posts: [],
      pageTotalList: [
        {
          tab: "good",
          total: 600,
        },
        {
          tab:'all',
          total: 680,
        },
        {
          tab: "ask",
          total: 250,
        },
        {
          tab: "share",
          total: 440,
        },
        {
          tab: "job",
          total: 280,
        },
        {
          tab: "dev",
          total: 480,
        },
      ],
      currentPage: 1,
    };
  },
  // 通过监听动态路由参数，获取对应的分类数据
  watch: {
    tab: {
      async handler(newValue) {
        // console.log(newValue);
        const queryTab = newValue ? `&tab=${newValue}` : "";
        const res = await this.$axios.get(
          `/topics?page=${this.currentPage}&limit=40${queryTab}`
        );
        this.posts = res.data;
        this.currentPage = 1
      },
      immediate: true,
    },
  },
  computed: {
    tab() {
      // console.log(this.$route);
      return this.$route.params.tab;
    },
    pageTotal(){
      const {pageTotalList,tab} =this
      const index = pageTotalList.findIndex(item=>item.tab === tab)
      if(tab){
        return pageTotalList[index].total
      }else{
        return 680
      }
    }
  },
  methods: {
    // 模拟分页器的函数
    // pageClick(page) {
    //   // console.log(this.$router);
    //   this.$router.push(this.$route.path + "?page=" + page);
    //   // console.log(res);
    // },
    // 通过页数获取文章内容
    async getPostsByPage(page) {
      const res = await this.$axios.get(`/topics?page=${page}&limit=40`);
      this.posts = res.data;
      this.$router.push(this.$route.path + "?page=" + page);
    },
  },
};
</script>
<style lang='less' scoped>
.nav {
  line-height: 20px;
  a {
    margin: 0 10px;
    font-size: 14px;
    color: #80bd01;
  }
}
.post-item:hover {
  background-color: #f6f6f6;
}
.post-item {
  display: flex;
  border-bottom: 1px solid rgb(226, 223, 223);
  height: 50px;
  padding: 10px;
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    vertical-align: middle;
  }
  .count {
    margin: 0 20px;
    line-height: 30px;
  }
  .title {
    width: 65%;
    // display: block;
    // 超出部分 显示 ...
    // 不能换行
    white-space: nowrap;
    overflow: hidden;
    // 隐藏部分使用三个 ...
    text-overflow: ellipsis;
    line-height: 30px;
    color: #333;
    font-size: 16px;
    padding-left: 5px;
  }
  .title:hover {
    text-decoration: underline;
  }
  .tab,
  .active-tab {
    height: 20px;
    border-radius: 2px;
    text-align: center;
    font-size: 12px;
    padding: 2px 4px;
    margin-top: 5px;
  }
  .tab {
    background-color: #e5e5e5;
    color: #999;
  }
  .active-tab {
    background-color: #80bd01;
    color: #fff;
  }
}
</style>
