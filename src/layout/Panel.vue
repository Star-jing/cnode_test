<template>
  <div class="panel" :style={width:width}>
    <div class="header">
      <slot name="header" />
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
// 这是一个布局组件 panel
export default {
  props: {
    width: {
      type: [Number, String],
      default: "100%",
    },
  },
  computed: {
    formatWidth() {
      // 先判断 如果 width 是数字的话 就返回 width+px  在判断 width 能否准换成数字，不能转换就返回 nan 最后就是 直接返回 width
      return typeof width === "number"
        ? width + "px"
        : Number(width)
        ? width + "px"
        : width;
    },
  },
};
</script>

<style lang='less'>
.panel {
  // width: 100%;
  border-radius: 4px;
  background-color: #fff;
  margin-top: 10px;
  .header {
    padding: 10px;
    background-color: #f6f6f6;
    color: #51585c;
  }
  .content {
    padding: 10px;
    color: #778087;
  }
}
</style>