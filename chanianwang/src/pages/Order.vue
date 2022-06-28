<template>
  <div class="order">
    <HeaderTop>
      <template v-slot:left>
        <span class="iconfont icon-arrow-left-bold" @click="goBack"></span>
      </template>
      <template v-slot:center>
        <div class="top-title">提交订单</div>
      </template>
    </HeaderTop>
    <section ref="wrapper">
      <div>
        <div class="address">
          <h3 class="address-title">收货信息：</h3>
          <div class="address-content">
            <div v-if="addressObj" class="address-info">
              <div>
                <span>{{ addressObj.name }}</span>
                <span>{{ addressObj.tel }}</span>
              </div>
              <div>
                <span>{{ addressObj.province }}</span>
                <span>{{ addressObj.city }}</span>
                <span>{{ addressObj.county }}</span>
                <span>{{ addressObj.addressDetail }}</span>
              </div>
            </div>
            <div v-else class="no-address-tip">还没有收货地址，快去添加吧!</div>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="payment">
          <div class="payment-title">支付方式：</div>
          <van-radio-group v-model="radioPayment" checked-color="#41b883">
            <van-radio name="ali" icon-size="20px"
              ><van-icon name="alipay" color="#00AAEF" />支付宝支付</van-radio
            >
            <van-radio name="wx" icon-size="20px"
              ><van-icon name="wechat-pay" color="#3CB035" />微信支付</van-radio
            >
          </van-radio-group>
        </div>
        <div class="goods">
          <ul>
            <li v-for="(item, index) in goodsList" :key="index">
              <div>
                <img :src="item.goods_imgUrl" />
              </div>
              <div class="goods-content">
                <h4>{{ item.goods_name }}</h4>
                <div class="goods-total">
                  <span class="good-price">¥{{ item.goods_price }}</span>
                  <span class="good-nums">x{{ item.goods_num }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <footer>
      <van-submit-bar
        :price="allGoodsPrice"
        button-text="提交订单"
        button-color="#41b883"
        @submit="onSubmit"
      >
        <template #default>
          共<span style="padding: 0 3px; color: #ee0a24">{{
            total.num
          }}</span
          >件
        </template>
      </van-submit-bar>
    </footer>
  </div>
</template>

<script>
import HeaderTop from '@/components/common/HeaderTop.vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import BScroll from 'better-scroll'
export default {
  name: 'Order',
  data() {
    return {
      radioPayment: 'ali',
      addressObj: {},
      SelgoodsItemArr: [],
      goodsList: [],
      total: {
        price: 0,
        num: 0,
      },
    }
  },
  components: {
    HeaderTop,
  },
  computed: {
    ...mapState('order', ['order_id']),
    ...mapGetters('address', ['defaultAddress']),

    allGoodsPrice() {
      let price = this.total.price
      let newPrice = ''
      for (let i in price) {
        let num = parseInt(price[i])
        if (!isNaN(num)) {
          newPrice += price[i]
        }
      }
      return parseInt(newPrice)
    },
  },
  methods: {
    ...mapMutations('address', { initAddressList: 'INIT_ADDRESSlIST' }),
    async getData() {
      //选中的商品id号
      this.SelgoodsItemArr = this.$route.query.detail
      this.SelgoodsItemArr = JSON.parse(this.SelgoodsItemArr)

      this.goodsList = this.$route.query.goodsList
      this.goodsList = JSON.parse(this.goodsList)
      // 查询收货地址
      await this.$myAxios(this, {
        url: '/api/selectAddress',
        method: 'POST',
        headers: {
          token: true,
        },
      }).then((res) => {
        this.initAddressList(res.data)
        // 是否有默认收货地址
        if (this.defaultAddress.length) {
          this.addressObj = this.defaultAddress[0]
        } else {
          this.addressObj = res.data[0]
        }
      })
      // 查询订单
      await this.$myAxios(this, {
        url: '/api/selectOrder',
        method: 'POST',
        headers: {
          token: true,
        },
        data: {
          orderId: this.order_id,
        },
      }).then((res) => {
        this.initAddressList(res.data.data)

        this.total = {
          price: res.data.data[0].goods_price,
          num: res.data.data[0].goods_num,
        }
      })
      this.$nextTick(() => {
        new BScroll(this.$refs.wrapper, {
          click: true,
          bounce: false,
        })
      })
    },
    async onSubmit() {
      this.$toast.success('提交成功');
      this.$myAxios(this, {
        url: '/api/deleteCart',
        method: 'POST',
        data: {
          idArr: this.SelgoodsItemArr
        }
      }).then(() => {
        this.$router.replace('/cart')
      })
    },
    goBack() {
      this.$router.back()
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
.order {
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
    overflow: hidden;
    .address {
      .address-title {
        padding: 0.3947rem;
        font-size: 0.4211rem;
      }
      .address-content {
        padding: 0.2632rem 0.1316rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        .address-info {
          flex: 1;
          font-size: 0.4211rem;
          padding: 0 0.2105rem;
          div {
            max-width: 7.3684rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            span {
              padding-right: 0.1316rem;
            }
          }
          :nth-child(1) {
            margin-bottom: 0.3947rem;
          }
        }
        .no-address-tip {
          padding: .1579rem;
          font-size: .4211rem;
          color: #ccc;
        }
        .van-icon {
          width: 0.6316rem;
          height: 0.6316rem;
          line-height: 0.6316rem;
          text-align: center;
          color: #9697a5;
          font-size: 0.4737rem;
        }
      }
    }
    .payment {
      padding: 0.16rem 0.4rem;
      margin-top: 0.4rem;
      font-size: 0.4737rem;
      background-color: #ffffff;
      .payment-title {
        font-size: 0.4211rem;
        padding: 0.2632rem 0;
      }
      .van-radio-group {
        padding: 0.16rem 0;
        .van-radio {
          justify-content: space-between;
          padding: 0.266666rem 0;
          border-bottom: 0.0263rem solid #f7f7f7;
        }
      }
    }
    .goods {
      padding: 0.16rem 0.4rem;
      margin-top: 0.4rem;
      font-size: 0.426666rem;
      background-color: #ffffff;
      ul {
        width: 100%;
        li {
          display: flex;
          width: 100%;
          padding: 0.1579rem 0;
          border-bottom: 0.0263rem solid #f5f5f5;
          img {
            width: 1.8421rem;
            height: 1.8421rem;
            border: 0.0263rem solid #f5f5f5;
          }
          .goods-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 0.4rem;
            h4 {
              max-width: 6.5789rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 0.4211rem;
            }
            .goods-total {
              padding-bottom: 0.1316rem;
              display: flex;
              justify-content: space-between;
              .good-price {
                color: #a52e28;
              }
              .good-nums {
                font-size: 0.3947rem;
                color: #9697a5;
              }
            }
          }
        }
      }
    }
  }
}
::v-deep .van-submit-bar {
  position: static;
  border-bottom: 1px solid #f7f7f7;
}
</style>