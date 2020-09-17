<template>
  <div class="user">
    <div class="header" @click="$router.push('/user-edit')">
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + user.head_img" alt />
      </div>
      <div class="title">
        <div class="name">
          <span v-if="user.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{ user.nickname }}</span>
        </div>
        <div class="time">{{ user.create_date | time }}</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navitem to="/my-follow">
      <template>我的关注</template>
      <template #content>关注的用户</template>
    </hm-navitem>
    <hm-navitem to="/my-comment">
      <template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </hm-navitem>
    <hm-navitem to="/my-star">
      <template>我的收藏</template>
      <template #content>文章/视频</template>
    </hm-navitem>
    <hm-navitem to="/user-edit">设置</hm-navitem>
    <div class="bot">
      <van-button type="danger" block @click="logout">退出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  },
  async created() {
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    // console.log(res)
    // console.log(userId)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出吗？'
        })
      } catch {
        return this.$toast('取消退出')
      }
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login')
      this.$toast.success('退出成功')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  padding: 20px 10px;
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
        padding-right: 5px;
      }
      .iconxingbienan {
        color: aqua;
      }
      .iconxingbienv {
        color: pink;
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
      color: #ccc;
    }
  }
}
.bot {
  margin-top: 20px;
  padding: 0 10px;
}
</style>
