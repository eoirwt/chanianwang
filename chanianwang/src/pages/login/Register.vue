<template>
  <div class="login-main">
    <HeaderTop>
      <template slot="left">
        <span class="iconfont icon-arrow-left-bold" @click="goBack"></span
      ></template>
      <template slot="center">
        <div class="top-title">注 册</div>
      </template>
    </HeaderTop>
    <section>
      <div class="logo">
        <h1>茶廿网~</h1>
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
            v-model="userCode"
            type="text"
            placeholder="请输入短信验证码"
            pattern="[0-9]*"
          />
          <button ref="btn" @click="getCode" :disabled="disabled">
            {{ this.btnText }}
          </button>
        </div>

        <div class="login-code">
          <input v-model="userPwd" type="text" placeholder="请设置密码" />
        </div>

        <div class="login-btn" @click="register">注 册</div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderTop from '@/components/common/HeaderTop.vue'
import {mapMutations} from 'vuex'
export default {
  name: 'Register',
  components: {
    HeaderTop,
  },
  data() {
    return {
      userTel: '',
      userPwd: '',
      userCode: '',
      disabled: false,
      btnText: '获取短信验证码',
      code: '',
      rules: {
        userTel: {
          rule: /^1[2-9]\d{9}$/,
          msg: '手机号不能为空，并且是11位数字',
        },
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: '密码不能为空，并且要求6,12位',
        },
        userCode: {
          rule: /^\d{4}$/,
          msg:'验证码不能为空，并且要求4位数字'
        }
      },
    }
  },
  methods: {
    ...mapMutations('user', {uesr_login:'USER_LOGIN'}),
    goBack() {
      this.$router.back()
    },
    validate(key) {
      let flag = true
      if (!this.rules[key].rule.test(this[key])) {
        this.$toast(this.rules[key].msg)
        flag = false
      }
      return flag
    },
    async getCode() {
      // 验证手机号
      if (!this.validate('userTel')) return
      // 控制验证码按钮
      let second = 60
      this.disabled = true
      this.$refs.btn.style.backgroundColor = '#909399'
      this.btnText = '60 秒后重新获取'
      let timeout = setInterval(() => {
        second--
        if (second <= 0) {
          clearInterval(timeout)
          this.btnText = '获取短信验证码'
          this.disabled = false
          this.$refs.btn.style.backgroundColor = '#41b883'
        } else {
          this.btnText = `${second} 秒后重新获取`
        }
      }, 1000)
      // 请求服务端，向客户端发送短信验证码
      await this.$myAxios(this, {
        url: '/api/getCode',
        method: 'POST',
        data: {
          userTel: this.userTel,
        },
      }).then((response) => {
        if (response.data.success) {
          this.$toast('验证码已发送')
          this.code = response.data.data
        } else {
          this.$toast('验证码发送失败')
        }
      })
    },
    async register() {
      // 验证格式  
      if (!this.code) {
        this.$toast('请获取短信验证码')
        return
      }
      if (!this.validate('userTel')) return
      if (!this.validate('userCode')) return
      if (!this.validate('userPwd')) return
      if (!(this.code == this.userCode)) {
        this.$toast('验证码有误，请重新输入')
        return
      }
      // 请求注册接口
      await this.$myAxios(this,{
        url: '/api/register',
        method: 'POST',
        data: {
          userTel: this.userTel,
          userPwd: this.userPwd
        },
      }).then((response) => {
        if (!response.data.success) {
          // loading2.clear()
          this.$toast(response.data.msg)
          return
        } else {
          // 注册成功 页面跳转
          this.$toast(response.data.msg)
          this.uesr_login(response.data.data)
          this.$router.replace('/profile')
        }
      })
    },
  },
  deactivated() {
    this.userTel = ''
    this.code = ''
    this.userCode = ''
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
        display: flex;
        align-items: center;
        width: 100%;
        height: auto;
        box-sizing: border-box;
        margin-bottom: 0.4737rem;
        button {
          width: 100%;
          height: 1rem;
          border: none;
          font-size: 0.3947rem;
          color: #fff;
          background-color: #41b883;
          border-radius: 0.1579rem;
        }
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