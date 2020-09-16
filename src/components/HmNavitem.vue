<template>
  <div class="hm-navitem" @click="clickFn">
    <div class="left">
      <slot></slot>
    </div>
    <div class="center">
      <slot name="content"></slot>
    </div>
    <div class="right">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: String
  },
  methods: {
    clickFn() {
      if (this.to) {
        this.$router.push(this.to)
      }
      // 触发click事件
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.hm-navitem {
  display: flex;
  margin-left: 15px;
  border-bottom: 1px solid #ccc;
  height: 50px;
  align-items: center;
  padding: 10px 0;
  .left {
    font-size: 16px;
  }
  .center {
    flex: 1;
    font-size: 14px;
    text-align: right;
    color: #ccc;
  }
  .right {
    color: #ccc;
    padding: 0 10px;
  }
}
</style>
