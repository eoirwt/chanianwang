<template>
  <div class="profile">
    <HeaderTop>
      <template v-slot:center>
        <div class="top-title">个人中心</div>
      </template>
    </HeaderTop>
    <section ref="wrapper">
      <div>
        <div class="nologin">
          <div v-if="loginStatus" class="user-info">
            <img :src="userInfo.imgUrl" />
            <span>{{ userInfo.nickName }}</span>
          </div>
          <button v-else @click="goLogin">登录/注册</button>
        </div>
        <div class="table-cell">
          <h2 class="cell-title">个人中心</h2>
          <van-cell-group inset>
            <van-cell
              @click="goMyAddress"
              icon="location-o"
              title="地址管理"
              is-link
            />
            <van-cell
              v-show="loginStatus"
              icon="warn-o"
              title="退出登录"
              is-link
              @click="loginOut"
            />
            <van-cell
              @click="nothingTip"
              icon="star-o"
              title="我的收藏"
              is-link
            />
          </van-cell-group>
          <h2 class="cell-title">优惠福利</h2>
          <van-cell-group inset>
            <van-cell
              @click="nothingTip"
              icon="coupon-o"
              title="优惠卷"
              is-link
            />
          </van-cell-group>
          <h2 class="cell-title">专属服务</h2>
          <van-cell-group inset>
            <van-cell
              @click="nothingTip"
              icon="smile-o"
              title="我的客服"
              is-link
            />
            <van-cell
              @click="nothingTip"
              icon="envelop-o"
              title="意见箱"
              is-link
            />
          </van-cell-group>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderTop from '@/components/common/HeaderTop.vue'
import { mapState, mapMutations } from 'vuex'
// import BScroll from 'better-scroll'
export default {
  name: 'Profile',
  components: {
    HeaderTop,
  },
  computed: {
    ...mapState('user', ['loginStatus', 'token', 'userInfo']),
  },
  methods: {
    ...mapMutations('user', { user_loginOut: 'USER_LOGINOUT' }),
    goLogin() {
      this.$router.push('/login')
    },
    loginOut() {
      this.$dialog
        .confirm({
          title: '确认退出吗?',
        })
        .then(() => {
          // on confirm
          this.user_loginOut()
          this.$toast('退出成功')
        })
        .catch(() => {
          // on cancel
        })
    },
    goMyAddress() {
      this.$router.push('/myaddress')
    },
    nothingTip() {
      this.$toast('敬请期待')
    },
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  div.top-title {
    color: #fff;
    font-size: 0.4rem;
    line-height: 0.76rem;
  }
  section {
    flex: 1;
    width: 100%;
    .nologin {
      width: 100%;
      height: 3.0263rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #41b883;
      button {
        padding: 0.1316rem 0.5263rem;
        border: none;
        background-color: #f7ab07;
        font-size: 0.3947rem;
        color: #fff;
        border-radius: 0.1316rem;
      }
      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 1.3158rem;
          height: 1.3158rem;
          border-radius: 50%;
        }
        span {
          padding-top: 0.1316rem;
          color: #fff;
          font-size: 0.3947rem;
        }
      }
    }
    .table-cell {
      .cell-title {
        padding: 0.4211rem;
        color: rgba(69, 90, 100, 0.6);
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
}
</style>