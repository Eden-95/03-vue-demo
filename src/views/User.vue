<template>
  <div class="user">
    <div class="header">
      <div class="avatar">
        <img src="../assets/avatar.jpg" alt />
      </div>
      <div class="title">
        <div class="name">
          <span class="iconfont iconxingbienan"></span>
          <span>章乐韵</span>
        </div>
        <div class="time">2020-20-20</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  padding: 20px;
  align-items: center;
  border-bottom: 3px solid #ccc;
  .avatar {
    width: 60px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .title {
    margin-left: 10px;
    flex: 1;
    .name {
      font-size: 16px;
      .iconfont {
        color: aqua;
        padding-right: 5px;
      }
    }
    .time {
      font-size: 14px;
      color: #999;
      margin-top: 5px;
    }
  }
  .right {
    .iconfont {
      font-size: 22px;
      color: #666;
    }
  }
}
</style>
