<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="content">
        <div class="center">
          <span class="iconfont iconsearch"></span>
          <span>热点时事</span>
        </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏 -->
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  align-items: center;
  background-color: #f00;
  color: #fff;
  .logo {
    width: 80px;
    text-align: center;
    .iconnew {
      font-size: 55px;
    }
  }
  .content {
    flex: 1;
    font-size: 14px;
    .center {
      flex: 1;
      height: 30px;
      background-color: rgba(250, 250, 250, 0.4);
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
      .iconsearch {
        font-size: 14px;
        margin-right: 5px;
      }
    }
  }
  .user {
    width: 80px;
    text-align: center;
    .iconwode {
      font-size: 20px;
    }
  }
}
</style>
