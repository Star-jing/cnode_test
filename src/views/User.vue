<template>
  <div>
      <h2>用户详情</h2>
      <Panel>
          <template #header>
              <router-link to="/">主页/</router-link>
          </template>
      </Panel>
      <Panel>
          <template #header>
              <span>最近参与的话题</span>
          </template>
      </Panel>
      <Panel>
          <template #header>
              <span>最近参与的话题</span>
          </template>
      </Panel>
  </div>
</template>

<script>
import Panel from '../layout/Panel.vue'
export default {
  components: { Panel },

}
</script>

<style>

</style>