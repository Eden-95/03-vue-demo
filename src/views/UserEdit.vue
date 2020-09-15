<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
    <div class="touxiang">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="" />
    </div>
    <hm-navitem>
      <template>昵称</template>
      <template #content>{{ user.nickname }}</template>
    </hm-navitem>
    <hm-navitem>
      <template>密码</template>
      <template #content>******</template>
    </hm-navitem>
    <hm-navitem>
      <template>性别</template>
      <template #content>{{ user.gender === 1 ? '男' : '女' }}</template>
    </hm-navitem>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.touxiang {
  width: 100px;
  height: 100px;
  margin: 40px auto;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
