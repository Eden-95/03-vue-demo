<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <!-- 引入vant表单 -->
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="账号"
        label="账号"
        placeholder="请填写账号"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写账号', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '用户名的长度是5-11位数字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          {
            pattern: /^\d{3,9}$/,
            message: '密码的长度是3-9位数字',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async login() {
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      // console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // 保存token
        // 跳转到个人中心
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style></style>
