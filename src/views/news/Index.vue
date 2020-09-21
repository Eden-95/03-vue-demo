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
    <van-sticky>
      <div class="more" @click="$router.push('/manage')">
        <span class="iconfont iconlianjie"></span>
      </div>
    </van-sticky>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.id">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <hm-post :post="item" v-for="item in newsList" :key="item.id"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabList: [],
      newsList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      // 先判断缓存是否存在,
      // 存在
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabList = activeList
        // 发送请求获取第一个tab栏的数据
        this.getNewsList(this.tabList[0].id)
        return
      }
      // 不存在，发请求
      const res = await this.$axios.get('/category')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // console.log(this.tabList)
        // 发送请求获取第一个tab栏的数据
        this.getNewsList(this.tabList[0].id)
      }
    },
    async getNewsList(id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newsList = [...this.newsList, ...data]
        console.log(this.newsList)
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      setTimeout(() => {
        console.log('需要加载更多了')
        // 加载下一页的数据
        this.pageIndex++
        // 当前栏目
        this.getNewsList(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh() {
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getNewsList(this.tabList[this.active].id)
      }, 1000)
    }
  },
  watch: {
    active(value) {
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getNewsList(this.tabList[value].id)
      }, 1000)
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
/deep/ .van-tabs__wrap {
  width: 85%;
}
.more {
  width: 15%;
  height: 44px;
  position: absolute;
  right: 0;
  z-index: 999;
  background-color: #fff;
  text-align: center;
  line-height: 44px;
}
.more-sticky {
  /deep/ .van-sticky--fixed {
    z-index: 100;
  }
}
</style>
