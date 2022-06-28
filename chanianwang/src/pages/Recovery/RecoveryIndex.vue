<template>
  <section>
    <div class="logo">
      <h1>茶七网~</h1>
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

      <div class="login-btn" @click="goNext">下一步</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RecoveryIndex',
  data() {
    return {
      userTel: '',
      disabled: false,
      btnText: '获取短信验证码',
      code: '',
      userCode: '',
      rules: {
        userTel: {
          rule: /^1[2-9]\d{9}$/,
          msg: '手机号不能为空，并且是11位数字',
        },
        userCode: {
          rule: /^\d{4}$/,
          msg: '验证码不能为空，并且是4位数字',
        }
      },
    }
  },
  methods: {
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
      await this.$myAxios(this,{
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
          this.$toast('验证码发送失败，请稍后再试')
        }
      })
    },
    async goNext() {
      if(!this.validate('userTel')) return
      if(!this.validate('userCode')) return
      if(!(this.code == this.userCode)) {
        this.$toast('验证码错误')
        return
      }
      this.$myAxios(this,{
        url: '/api/selectUser',
        method: 'POST',
        data: {
          userTel: this.userTel,
        },
      }).then((res) => {
        if (!res.data.success) {
          this.$toast(res.data.msg)
          return
        }
        this.$router.replace({
          name: 'registerPwd',
          params: {
            userTel: this.userTel,
          },
        })
      })
    },
  },
  deactivated() {
    this.userTel = ''
    this.userCode = ''
  }
}
</script>

<style lang="scss" scoped>
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
</style>