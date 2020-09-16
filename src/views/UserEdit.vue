<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
    <div class="touxiang">
      <img :src="$axios.defaults.baseURL + user.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <hm-navitem @click="showNickname">
      <template>昵称</template>
      <template #content>{{ user.nickname }}</template>
    </hm-navitem>
    <hm-navitem @click="showPassword">
      <template>密码</template>
      <template #content>******</template>
    </hm-navitem>
    <hm-navitem @click="showGender">
      <template>性别</template>
      <template #content>{{ user.gender === 1 ? '男' : '女' }}</template>
    </hm-navitem>
    <!-- 渲染dialog组件 -->
    <van-dialog
      v-model="isshownickname"
      title="修改昵称"
      show-cancel-button
      @confirm="updateNickname"
    >
      <van-field
        v-model="nickname"
        ref="nickname"
        placeholder="请输入用户名"
      ></van-field>
    </van-dialog>
    <van-dialog
      v-model="isshowpassword"
      title="修改密码"
      show-cancel-button
      @confirm="updatePassword"
    >
      <van-field
        v-model="password"
        ref="password"
        placeholder="请输入新密码"
      ></van-field>
    </van-dialog>
    <van-dialog
      v-model="isshowgender"
      title="修改性别"
      show-cancel-button
      @confirm="updateGender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!-- 裁剪的模态框 -->
    <div class="mask" v-show="isshowmask">
      <!-- 裁剪按钮 -->
      <van-button type="primary" class="crop" @click="crop">裁剪</van-button>
      <van-button type="danger" class="cancel" @click="isshowmask = false"
        >取消</van-button
      >
      <VueCropper
        ref="aa"
        :img="img"
        autoCrop
        autoCropWidth="100"
        autoCropHeight="100"
        fixed
      ></VueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      user: '',
      isshownickname: false,
      nickname: '',
      isshowpassword: false,
      password: '',
      isshowgender: false,
      gender: 1,
      // 是否显示裁剪框
      isshowmask: false,
      // 需要裁剪的图片
      img: ''
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
    },
    async showNickname() {
      // console.log('123')
      this.isshownickname = true
      this.nickname = this.user.nickname
      // 等待DOM更新
      await this.$nextTick()
      // 需要自动获取焦点
      this.$refs.nickname.focus()
    },
    async updateNickname() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, {
        nickname: this.nickname
      })
      if (res.data.statusCode === 200) {
        // 重新渲染
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    async showPassword() {
      // console.log('123')
      this.isshowpassword = true
      this.password = this.user.password
      // 等待DOM更新
      await this.$nextTick()
      // 需要自动获取焦点
      this.$refs.password.focus()
    },
    async updatePassword() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, {
        password: this.password
      })
      if (res.data.statusCode === 200) {
        // 重新渲染
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    showGender() {
      // console.log(123)
      this.isshowgender = true
      this.gender = this.user.gender
    },
    async updateGender() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, {
        gender: this.gender
      })
      if (res.data.statusCode === 200) {
        // 重新渲染
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    // 提供一个isImg的函数
    isImg(name) {
      if (
        name.endsWith('.gif') ||
        name.endsWith('.jpg') ||
        name.endsWith('.png') ||
        name.endsWith('.jpeg')
      ) {
        return true
      } else {
        return false
      }
    },
    async afterRead(file) {
      // console.log(file)
      // 校验图片的类型和大小，如果满足，才上传，如果不满足，给一个提示
      console.log(file.file)
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('请上传图片')
      }
      if (file.file.size >= 2000 * 1024) {
        return this.$toast.fail('上传图片太大')
      }
      // 显示裁剪框
      this.isshowmask = true
      // 设置裁剪的图片
      this.img = file.content
    },
    crop() {
      this.$refs.aa.getCropBlob(async blob => {
        // 创建一个空的fromData对象
        const fd = new FormData()
        // 给fromData对象添加上传的文件
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          // console.log(data.url)
          // 修改用户头像
          const userId = localStorage.getItem('userId')
          const res = await this.$axios.post(`/user_update/${userId}`, {
            head_img: data.url
          })
          if (res.data.statusCode === 200) {
            // 重新渲染
            this.getUserInfo()
            this.$toast.success('修改成功')
          }
        }
        // 隐藏裁剪框
        this.isshowmask = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.touxiang {
  padding: 40px 0;
  text-align: center;
  position: relative;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translate(-50%);
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
/deep/ .van-dialog__content {
  padding: 15px;
  .van-field {
    border: 1px solid #ccc;
  }
}
.mask {
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  .crop,
  .cancel {
    position: fixed;
    top: 0;
    z-index: 1;
  }
  .cancel {
    right: 0;
  }
}
</style>
