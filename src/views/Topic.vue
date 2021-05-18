<template>
  <div class="topic">
    <panel>
      <template #header>
        <h3>{{ topic.title }}</h3>
      </template>
      <template #content>
        <div v-html="topic.content"></div>
      </template>
    </panel>
    <panel>
      <template #header>
        <span>评论</span>
      </template>
      <template #content>
        <div>
          <div v-for="comment in topic.replies" :key="comment.id">
            <img :src="comment.author.avatar_url" alt="" />
            <span>{{ comment.author.loginname }}</span>
            <span v-html="comment.content"></span>
            <div>
              <button
                :class="{ 'up-active': comment.is_uped }"
                @click="upClick(comment.id)"
              >
                点赞{{ comment.ups.length }}
              </button>
              <button v-if="isLogin">回复</button>
            </div>
            <div v-show="comment.id === reply_id">
              <textarea name="" ></textarea>
            </div>
            <hr />
          </div>
        </div>
        <br />
        <br />
        <div>
          <textarea v-model.trim="text"></textarea>
          <button @click="submit">回复</button>
        </div>
      </template>
    </panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
// 文章详情页 用户登录与不登录展示不同的内容
// vuex 里面有可能存储了登录状态  但是这个登录状态必须刷新的时候也会自动更新
// 如果 vuex 内更新登录状态，需要发请求的话，在该组件中不一定能获取到最新的登录状态
// 取 token 前提是 登录的时候将 token 存储到了浏览器
export default {
  name: "Topic",
  components: { Panel },
  data() {
    return {
      topic: [],
      // 评论内容
      text: "",
      // 回复评论的 id
      reply_id: "",
      // 回复评论的内容
      reply_text: "",
    };
  },
  computed: {
    isLogin() {
      return true;
    },
  },
  // 获取文章数据
  async created() {
    // console.log(this.$route.params.topicId);
    const { topicId } = this.$route.params;
    const token = true;
    const url = token
      ? `/topic/${topicId}?aceesstoken= 3bddeae3-4079-4bdf-b6c1-4281e95bc34a`
      : `/topic/${topicId}`;
    const res = await this.$axios.get(url);
    // console.log(res.data);
    this.topic = res.data;
    console.log(this.topic);
  },

  methods: {
    //  专门请求文章数据函数
    getTopic() {},
    // 点赞和取消点赞
    async upClick(id) {
      // console.log(id);
      // 点赞之前要判断 登没登陆
      // 还要判断是不是自己评论 评论的作者 loginname 是不是自己
      if (true) {
        const res = await this.$axios.post(`/reply/${id}/ups`, {
          accesstoken: "3bddeae3-4079-4bdf-b6c1-4281e95bc34a",
        });
        console.log(res);
        // 如何更新页面 点赞变色 个数加一
        // 方案一  根据请求的结果 up or down 去更新对应评论的 is_uped 以及 ups ，更新 ups 需要用户的 id '515005e9604b3d512109bb17'
        // 方案二 重新请求一遍 得看实际情况 需要网络请求
        const userId = "515005e9604b3d512109bb17";
        const currentComment = this.topic.replies.find(
          (item) => item.id === id
        );
        currentComment.is_uped = res.action === "up" ? true : false;
        res.action === "up"
          ? currentComment.ups.push(userId)
          : currentComment.ups.pop();
      }
    },
    //  文章的回复
    async submit() {
      const { text } = this;
      if (text) {
        // 执行添加评论操作  post /topic/:topic_id/replies 新建评论
        const res = await this.$axios.post(`/topic/${this.topic.id}/replies`, {
          accesstoken: "3bddeae3-4079-4bdf-b6c1-4281e95bc34a",
          content: text,
        });
        // 如何更新页面
        // 1.根据后台 id 和 text 做假的评论对象 更新 topic
        // 2.重新请求
        const newComment = {
          id: res.reply_id,
          is_uped: false,
          ups: [],
          content: `<p>${text}</p>`,
          author: {
            avatar_url:
              "https://avatars.githubusercontent.com/u/79734762?v=4&s=120",
            loginname: "Star-jing",
          },
        };
        this.topic.replies.push(newComment);
        this.text = "";
      }
    },
  },
};
</script>

<style>
.markdown-text p img {
  width: 100%;
}
.content img {
  width: 30px;
  /* height: 30px; */
}
.up-active {
  color: red;
}
</style>