<template>
  <div class="hm-header">
    <div class="left" @click="back">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.hm-header {
  display: flex;
  height: 50px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  line-height: 50px;
  .left {
    width: 50px;
    font-size: 16px;
  }
  .center {
    flex: 1;
    font-size: 18px;
    font-weight: 700;
  }
  .right {
    width: 50px;
  }
}
</style>
