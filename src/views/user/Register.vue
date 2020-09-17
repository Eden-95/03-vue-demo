<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <!-- 引入vant表单 -->
    <van-form @submit="register">
      <van-field
        v-model="username"
        name="账号"
        label="账号"
        placeholder="请填写账号"
        :rules="rules.username"
      />
      <van-field
        v-model="nickname"
        name="昵称"
        label="昵称"
        placeholder="请填写昵称"
        :rules="rules.nickname"
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
        <van-button block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <p class="tips">
      已有账号？去
      <router-link to="/login">登录</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      nickname: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '用户名的长度是5-11位数字',
            trigger: 'onChange'
          }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'onChange' },
          {
            pattern: /^[\u4e00-\u9fa5]{3,6}$/,
            message: '昵称的长度是3-6位汉字',
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
    async register() {
      const res = await this.$axios.post('/register', {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // 注册成功跳转到登陆页面
        this.$router.push({
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  padding: 10px 20px;
  font-size: 16px;
  text-align: right;
  a {
    color: red;
  }
}
</style>
