<template>
  <div class="my-comment">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="客官，臣妾拼命也加载不出来~"
          :immediate-check="false"
          @load="onload"
        >
          <div class="item" v-for="item in commentList" :key="item.id">
            <div class="time">
              {{ item.create_date | time('YYYY-MM-DD HH:mm') }}
            </div>
            <div class="comment" v-if="item.parent">
              <div class="name">回复：{{ item.parent.user.nickname }}</div>
              <div class="comment-content">{{ item.parent.content }}</div>
            </div>
            <div class="content">{{ item.content }}</div>
            <div class="origin">
              <span class="one-txt-cut">原文：{{ item.post.title }}</span>
              <span class="iconfont iconjiantou1"></span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // this.commentList = data
        this.commentList = [...this.commentList, ...data]
        console.log(this.commentList)
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
        this.refreshing = false
      }
    },
    onload() {
      setTimeout(() => {
        // console.log('需要加载更多了')
        this.pageIndex++
        this.getCommentList()
      }, 1000)
    },
    onRefresh() {
      setTimeout(() => {
        console.log('下拉刷新中')
        // 下拉刷新清除原来数据
        this.commentList = []
        // 防止之前已经没有数据了
        this.finished = false
        // 防止多加载一次
        this.loading = true
        // 重新加载第一页
        this.pageIndex = 1
        this.getCommentList()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  background-color: #eee;
  .time {
    font-size: 12px;
    color: #666;
    padding: 10px 0;
  }
  .comment {
    background-color: #ddd;
    padding: 10px;
    .name {
      color: #666;
      font-size: 12px;
    }
    .comment-content {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
    }
  }
  .content {
    margin: 10px 0;
    font-size: 16px;
  }
  .origin {
    font-size: 14px;
    color: #666;
    display: flex;
    justify-content: space-between;
  }
}
</style>
