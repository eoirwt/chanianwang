<template>
  <div class="login-main">
    <HeaderTop>
      <template slot="left">
        <span class="iconfont icon-arrow-left-bold" @click="goBack"></span
      ></template>
      <template slot="center">
        <div class="top-title">登录</div>
      </template>
    </HeaderTop>
    <section>
      <div class="logo">
        <h1>Login茶廿网~</h1>
      </div>
      <div class="login-items">
        <div class="login-tel">
          <input
            v-model="userTel"
            type="text"
            placeholder="请输入手机号"
            pattern="[0-9]*"
          />
        </div>

        <div class="login-code">
          <input
            v-model="userPwd"
            type="text"
            placeholder="请输入密码"
          />
        </div>

        <div class="login-btn" @click="login">登 录</div>
        <div class="login-tab">
          <span @click="goLogin">短信登录</span>
          <span @click="goRecovery">忘记密码</span>
          <span @click="goRegister">快速注册</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderTop from '@/components/common/HeaderTop.vue'
import {mapMutations} from 'vuex'
export default {
  name: 'UserLogin',
  components: {
    HeaderTop,
  },
  data() {
    return {
      userTel: '15016711375',
      userPwd: '123456',
      rules: {
        userTel: {
          rule: /^1[2-9]\d{9}$/,
          msg: '手机号不能为空，并且是11位数字',
        },
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: '密码不能为空，并且要求6,12位',
        },
      },
    }
  },
  methods: {
    ...mapMutations('user',{user_login:'USER_LOGIN', init_user:'INIT_USER'}),
    goBack() {
      this.$router.replace('/home')
    },
    goLogin() {
      this.$router.replace('/login')
    },
    goRegister() {
      this.$router.replace('/register')
    },
    goRecovery() {
      this.$router.replace('/recovery')
    },
    validate(key) {
      let flag = true
      if (!this.rules[key].rule.test(this[key])) {
        flag = false
        //提示错误
        this.$toast(this.rules[key].msg)
      }
      return flag
    },
    async login() {
      // 验证
      if (!this.validate('userTel')) return
      if (!this.validate('userPwd')) return
      // 加载提示
      // const isloading = this.$toast.loading({
      //   message: '加载中...',
      //   forbidClick: true,
      // })
      // 验证通过 发送请求
      await this.$myAxios(this,{
        url: '/api/login',
        method: 'POST',
        data: {
          userTel: this.userTel,
          userPwd: this.userPwd,
        },
      }).then((response) => {
        // 请求成功，接收数据
        // console.log(response)
        // 关闭加载提示
        // setTimeout(() => {
        //   isloading.clear()
        // }, 500)
        // 登录失败
        if(!response.data.success) {
          // 提示
          this.$toast({
            message: response.data.msg,
            icon: 'cross'
          })
          return
        }
        // 登录成功 -> 跳转页面, 存储用户信息
        this.$toast('登录成功')
        this.user_login(response.data.data)
        this.$router.replace('/profile')
      })
    },
  },
  deactivated() {
    this.userPwd = ''
  }
}
</script>

<style lang="scss" scoped>
.login-main {
  display: flex;
  flex-direction: column;
  .top-title {
    color: #fff;
    font-size: 0.4rem;
    line-height: 0.8rem;
  }
  section {
    flex: 1;
    background-color: #f5f5f5;
    .logo {
      margin-top: 1.1842rem;
      display: flex;
      justify-content: center;
      h1 {
        font-size: 0.5789rem;
        font-family: YouYuan;
        color: #41b883;
        font-weight: 600;
      }
    }
    .login-items {
      padding: 0.5263rem 1.1842rem;
      input {
        width: 100%;
        height: 1rem;
        padding: 0 0.2632rem;
        background-color: #fff;
        font-size: 0.3947rem;
        border-radius: 0.1579rem;
        box-sizing: border-box;
      }
      .login-tel {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        margin-bottom: 0.4737rem;
      }
      .login-code {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        margin-bottom: 0.4737rem;
      }
      .login-btn {
        width: 100%;
        height: 1rem;
        margin: 0.5263rem 0;
        background-color: #41b883;
        border-radius: 0.1579rem;
        line-height: 1rem;
        text-align: center;
        color: #fff;
        font-size: 0.3947rem;
      }
      .login-tab {
        margin: 0.5263rem 0;
        display: flex;
        justify-content: space-between;
        font-size: 0.3684rem;
      }
    }
  }
}
</style>