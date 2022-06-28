<template>
  <section>
    <div class="logo">
      <h1>茶七网~</h1>
    </div>
    <div class="login-items">
      <div class="login-pwd">
        <input v-model="userPwd" type="text" placeholder="请设置新密码" />
      </div>

      <div class="login-btn" @click="submitPwd">确认</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RecoveryPwd',
  data() {
    return {
      userPwd: '',
      rules: {
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: '密码不能为空，并且要求6,12位',
        },
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
    async submitPwd() {
      if(!this.validate('userPwd')) return
      await this.$myAxios(this,{
          url: '/api/recovery',
          method: 'POST',
          data: {
              userTel: this.$route.params.userTel,
              userPwd: this.userPwd
          }
      }).then(res => {
          this.$toast(res.data.msg)
          this.$router.replace('/userlogin')
      })
    }
  },
  deactivated() {
    this.userPwd = ''
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