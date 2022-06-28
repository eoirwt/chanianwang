<template>
  <div class="detail">
    <header>
      <div class="header-returns" v-show="isShow">
        <i class="iconfont icon-arrow-left-bold" @click="goBack"></i>
        <i class="iconfont icon-31shouye" @click="goHome"></i>
      </div>
      <div class="header-bar" v-show="!isShow" :style="styleOption">
        <i class="iconfont icon-arrow-left-bold" @click="goBack"></i>
        <div class="tab-items">
          <span>商品详情</span>
          <span>商品评论</span>
        </div>
        <i class="iconfont icon-31shouye" @click="goHome"></i>
      </div>
    </header>
    <section ref="wrapper">
      <div>
        <div class="swiper-main">
          <van-swipe
            class="my-swipe"
            indicator-color="white"
            @change="onChange"
          >
            <van-swipe-item v-for="(item, index) in swiperList" :key="index">
              <img v-lazy="item.imgUrl" />
            </van-swipe-item>
            <template #indicator>
              <div class="custom-indicator">
                {{ current + 1 }}/{{ swiperList.length }}
              </div>
            </template>
          </van-swipe>
        </div>
        <div class="goods-name">
          <h1>{{ goods.name }}</h1>
          <div>{{ goods.content }}</div>
        </div>
        <div class="goods-price">
          <div class="oprice">
            <span>¥</span>
            <b>{{ goods.price }}</b>
          </div>
          <div class="pprice">
            <span>价格:</span>
            <del>¥{{ goods.oldprice }}</del>
          </div>
        </div>
        <div class="goods-detail">
          <div class="hd">
            <van-icon name="weapp-nav" color="#41B883" />
            <b>商品详情</b>
          </div>
          <div class="good-imgs">
            <img
              v-for="(item, index) in swiperList"
              :key="index"
              v-lazy="item.imgUrl"
              @load="gotoLoad"
            />
          </div>
        </div>
      </div>
    </section>
    <footer>
      <ul>
        <li>
          <i class="iconfont icon-kefu1"></i>
          <span>客服</span>
        </li>
        <li>
          <i class="iconfont icon-maijiagouwuche"></i>
          <span>购物车</span>
        </li>
        <li>
          <i class="iconfont icon-shoucang"></i>
          <span>收藏</span>
        </li>
        <li @click="addCart">加入购物车</li>
        <li>立即购买</li>
      </ul>
    </footer>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Detail',
  data() {
    return {
      id: 0,
      current: 0,
      swiperList: [
        {
          imgUrl: './images/d-swiper1.jpeg',
        },
        {
          imgUrl: './images/d-swiper2.jpeg',
        },
        {
          imgUrl: './images/d-swiper3.jpeg',
        },
        {
          imgUrl: './images/d-swiper4.jpeg',
        },
      ],
      isShow: true,
      styleOption: {
        opacity: 0,
      },
      goods: {},
      BetterScroll: '',
    }
  },
  methods: {
    async getData() {
      let resData = {
        imgUrl: '',
      }
      await this.$myAxios(this,{
        url: '/api/goods/id',
        params: {
          id: this.id,
        },
      })
        .then((response) => {
          resData.imgUrl = response.data.imgUrl
          this.goods = response.data
        })
        .catch((error) => {
          this.$toast('Detail: '+error)
        })
      this.swiperList.unshift(resData)
    },
    onChange(index) {
      this.current = index
    },
    goBack() {
      this.$router.back()
    },
    goHome() {
      this.$router.replace('/home')
    },
    gotoLoad() {
      this.BetterScroll && this.BetterScroll.refresh()
    },
    async addCart() {
      await this.$myAxios(this, {
        url: '/api/addCart',
        method: 'POST',
        data: {
          goodId: this.id
        },
        headers: {
          token: true
        }
      }).then(res => {
        if(res.success) {
          this.$toast.success(res.msg)
        }else {
          this.$toast.fail(res.msg)
        }
      })
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getData()
  },
  mounted() {
    this.$nextTick(() => {
      this.BetterScroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        bounce: false,
        click: true,
      })
      this.BetterScroll.on('scroll', (pos) => {
        let posY = Math.abs(pos.y)
        let opacity = posY / 180
        opacity = opacity > 1 ? 1 : opacity
        this.styleOption.opacity = opacity
        if (posY >= 45) {
          this.isShow = false
        } else {
          this.isShow = true
        }
      })
    })
  },
  activated() {
    if (this.id != this.$route.query.id) {
      this.id = this.$route.query.id
      this.swiperList.splice(0, 1)
      this.getData()
    }
  },
  deactivated() {
    this.current = 0
  },
}
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 520;
    width: 100%;
    height: 1.2rem;
    color: #fff;
    .header-returns {
      width: 100%;
      height: 100%;
      padding: 0 0.1842rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .iconfont {
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
    .header-bar {
      width: 100%;
      height: 100%;
      padding: 0 0.1842rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      background-color: #41b883;
      .iconfont {
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
      }
      .tab-items {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 0.3684rem;
        span {
          padding: 0 0.3947rem;
        }
      }
    }
  }
  section {
    flex: 1;
    background-color: #f5f5f5;
    overflow: hidden;
    .my-swipe {
      .van-swipe-item {
        position: relative;
        height: 9.8684rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .custom-indicator {
        position: absolute;
        right: 0.1316rem;
        bottom: 0.1316rem;
        padding: 0.0526rem 0.1316rem;
        border-radius: 0.0526rem;
        font-size: 0.3684rem;
        color: #fff;
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .goods-name {
      padding: 0.2632rem;
      position: relative;
      background-color: #fff;
      border-bottom: 1px solid #e3e5e9;
      h1 {
        font-size: 0.4737rem;
        color: #232326;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.4;
      }
      div {
        padding-top: 0.13rem;
        font-size: 0.3684rem;
        color: #999;
        line-height: 0.5263rem;
      }
    }
    .goods-price {
      padding: 0 0.2632rem 0.2632rem;
      background-color: #fff;
      .oprice {
        padding-top: 0.2632rem;
        color: #d22531;
        span {
          font-size: 0.32rem;
        }
      }
      .pprice {
        padding-top: 0.1316rem;
        color: #999999;
        font-size: 0.373333rem;
      }
    }
    .goods-detail {
      // margin: 0.2632rem 0 0.5263rem;
      margin-top: 0.2632rem;
      padding: 0.2632rem;
      background-color: #fff;
      .hd {
        display: flex;
        align-items: center;
        b {
          padding-left: 0.1316rem;
          font-size: 0.3947rem;
          font-weight: 700;
        }
      }
      .good-imgs {
        padding-top: 0.2632rem;
        img {
          width: 100%;
        }
      }
    }
  }
  footer {
    width: 100%;
    height: 1.4474rem;
    background-color: #fff;
    overflow: hidden;
    ul {
      width: 100%;
      height: 100%;
      padding: 0.1842rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 0.3158rem;
      box-sizing: border-box;
      li {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #999999;
        .iconfont {
          font-size: 0.5263rem;
          padding-bottom: 0.0789rem;
          font-weight: 600;
        }
        &:nth-child(-n + 3) {
          flex: 2;
        }
        &:nth-child(4) {
          flex: 3;
          color: #fff;
          background-color: #39946d;
          border-radius: 0.48rem 0 0 0.48rem;
          font-size: 0.3684rem;
        }
        &:nth-child(5) {
          flex: 3;
          color: #fff;
          background-color: #41b883;
          border-radius: 0 0.48rem 0.48rem 0;
          font-size: 0.3684rem;
        }
      }
    }
  }
  .loadWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block {
      width: 120px;
      height: 120px;
      background-color: #fff;
    }
  }
}
</style>