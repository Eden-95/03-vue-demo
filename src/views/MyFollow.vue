<template>
  <div class="my-follow">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="center">
          <p>{{ item.nickname }}</p>
          <p class="p1">{{ item.create_date | time }}</p>
        </div>
        <div class="right">
          <van-button
            type="primary"
            size="small"
            round
            @click="unfollow(item.id)"
            >取消关注</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getFollowlist()
  },
  methods: {
    async getFollowlist() {
      const res = await this.$axios.get('/user_follows')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async unfollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要取消关注吗？'
        })
      } catch {
        return this.$toast('取消操作')
      }
      // 发送请求，取消关注
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('取消关注成功')
        this.getFollowlist()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  height: 80px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  padding: 0 20px;
  .left {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    font-size: 18px;
    padding-left: 15px;
    .p1 {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
