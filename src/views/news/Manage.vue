<template>
  <div class="manage">
    <hm-header>栏目管理</hm-header>
    <div class="content">
      <div class="active">
        <p>点击删除以下频道</p>
        <div class="list">
          <div
            class="item"
            v-for="item in activeList"
            :key="item.id"
            @click="delTab(item.id)"
          >{{item.name}}</div>
        </div>
      </div>
      <div class="deactive">
        <p>点击添加一下频道</p>
        <div class="list">
          <div
            class="item"
            v-for="item in deactiveList"
            :key="item.id"
            @click="addTab(item.id)"
          >{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeList: [],
      deactiveList: []
    }
  },
  async created() {
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
    if (activeList) {
      this.activeList = activeList
      this.deactiveList = deactiveList
      return
    }
    const res = await this.$axios.get('/category')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.activeList = data
      console.log(this.activeList)
    }
  },
  methods: {
    delTab(id) {
      //   激活栏目不少于4条
      if (this.activeList.length <= 4) return
      const index = this.activeList.findIndex((item) => item.id === id)
      //  往未激活栏目添加
      this.deactiveList.push(this.activeList[index])
      //  删除激活中的这个栏目
      this.activeList.splice(index, 1)
    },
    addTab(id) {
      const index = this.deactiveList.findIndex((item) => item.id === id)
      this.activeList.push(this.deactiveList[index])
      this.deactiveList.splice(index, 1)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler(value) {
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
  p {
    font-size: 14px;
    color: #666;
    margin: 10px 0;
  }
  .active,
  .deactive {
    margin-bottom: 20px;
    .list {
      overflow: hidden;
      .item {
        float: left;
        font-size: 16px;
        border: 1px dashed #ccc;
        text-align: center;
        width: 60px;
        height: 30px;
        margin: 5px 10px;
        line-height: 30px;
        background-color: #eee;
      }
    }
  }
}
</style>
