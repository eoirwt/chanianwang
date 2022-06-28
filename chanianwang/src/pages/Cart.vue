<template>
  <div class="cart">
    <HeaderTop>
      <template v-slot:center>
        <div class="top-title">购物车</div>
      </template>
      <template v-slot:right>
        <div class="top-title" @click="changeNavStatus">
          {{ isNavStatus ? '编辑' : '完成' }}
        </div>
      </template>
    </HeaderTop>
    <section ref="wrapper">
      <div v-if="cartList.length">
        <div class="cart-title">
          <van-checkbox
            @click="changeAllChecked"
            :value="isAllChecked"
            checked-color="#41B883"
          ></van-checkbox>
          <span>商品清单</span>
        </div>
        <ul>
          <li v-for="(item, index) in cartList" :key="index">
            <div class="check">
              <van-checkbox
                @click="singleCheck(index)"
                :value="item.checked"
                checked-color="#41B883"
              ></van-checkbox>
            </div>
            <h2>
              <img :src="item.goods_imgUrl" />
            </h2>
            <div class="goods">
              <div class="goods-title">
                <div class="title">
                  {{ item.goods_name }}
                </div>
                <van-icon name="delete" @click="delGoodsFn(item.id)" />
              </div>
              <div class="goods-prices">¥{{ item.goods_price }}</div>
              <van-stepper
                v-model="item.goods_num"
                theme="round"
                integer
                button-size="22px"
                @change="changeNum($event, item.id)"
              />
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="blank">
        <van-icon name="bag-o" size="3rem" color="#DDDDDD" />
        <p>您的购物车空荡荡的，你可以</p>
        <br />
        <button @click="$router.replace('/home')">返回首页</button>
      </div>
    </section>
    <footer v-show="cartList.length">
      <div class="radio">
        <van-checkbox
          @click="changeAllChecked"
          :value="isAllChecked"
          checked-color="#41B883"
        ></van-checkbox>
      </div>
      <div class="total">
        <div v-if="isNavStatus">
          <div>
            共有
            <span class="total-active">{{ total.sum }}</span>
            件商品
          </div>
          <div>
            <span>总计：</span>
            <span class="total-active"
              >¥{{ total.price.toFixed(2) }} + 0茶币</span
            >
          </div>
        </div>
        <div v-else>
          <div>
            已选中
            <span class="total-active">{{ total.selNum }}</span>
            件商品
          </div>
        </div>
      </div>
      <div v-if="isNavStatus" @click="goOrder" class="order">去结算</div>
      <div v-else @click="delGoodsFn" class="order red">删除商品</div>
    </footer>
  </div>
</template>

<script>
import HeaderTop from '@/components/common/HeaderTop.vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import BScroll from 'better-scroll'
export default {
  name: 'Cart',
  data() {
    return {
      isNavStatus: true,
    }
  },
  components: {
    HeaderTop,
  },
  computed: {
    ...mapState('cart', ['cartList', 'selectList']),
    ...mapGetters('cart', ['isAllChecked', 'total']),
    // 获取选中的商品数组
    selGoodsList() {
      // return this.selectList.map((id) => {
      //   return this.cartList.find((v) => v.id == id)
      // })
      return this.cartList.filter((element) => {
        let index = this.selectList.indexOf(element.id)
        return index >= 0
      })
    },

  },
  methods: {
    ...mapActions('cart', ['changeAllChecked', 'delGoodsFn']),
    ...mapMutations('cart', {
      initCartList: 'INIT_CARTLIST',
      singleCheck: 'SINGKE_CHECK',
    }),
    ...mapMutations('order', { initOrderList: 'INIT_ORDERLIST' }),
    async getData() {
      await this.$myAxios(this, {
        url: '/api/selectCart',
        method: 'POST',
        headers: {
          token: true,
        },
      }).then((res) => {
        if (res.success) {
          let cartList = res.cartList
          cartList.forEach((element) => {
            element['checked'] = true
          })
          this.initCartList(res.cartList)
        } else {
          this.initCartList(res.cartList)
          this.$toast(res.msg)
        }
      })
      this.$nextTick(() => {
        new BScroll(this.$refs.wrapper, {
          click: true,
          bounce: false,
        })
      })
    },
    changeNavStatus() {
      this.isNavStatus = !this.isNavStatus
    },
    changeNum(value, id) {
      let data = {
        id,
        value,
      }
      this.$store.commit('cart/UPDATE_CARTLIST_ITEN_NUM', data)
      this.$myAxios(this, {
        url: '/api/updateNum',
        method: 'POST',
        data: {
          id,
          num: value,
        },
      })
    },
    //去结算
    async goOrder() {
      if (!this.selectList.length) {
        this.$toast('请至少选择一件商品')
        return
      }

      // 获取选中的商品数组
      // let newCartList = this.cartList.filter((element) => {
      //   let index = this.selectList.indexOf(element.id)
      //   return index >= 0
      // })
      // 发送请求，获取 后端生成的订单号
      await this.$myAxios(this, {
        url: '/api/addOrder',
        method: 'POST',
        data: {
          arr: this.selGoodsList,
        },
        headers: {
          token: true,
        },
      }).then((res) => {
        if (!res.data.success) {
          this.$toast('结算失败!')
          return
        }
        // 存储订单号
        this.initOrderList(res.data.data)
        // 路由跳转
        this.$router.push({
          name: 'order',
          query: {
            detail: JSON.stringify(this.selectList),
            goodsList: JSON.stringify(this.selGoodsList),
          },
        })
      })
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
.cart {
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
    .cart-title {
      display: flex;
      padding: 0.5263rem;
      padding-bottom: 0.1316rem;
      span {
        padding: 0 0.3947rem;
        font-size: 0.4737rem;
        line-height: 20px;
      }
    }
    ul {
      display: flex;
      flex-direction: column;
      li {
        margin: 0.2105rem 0;
        padding: 0.1579rem 0.5263rem;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        background-color: #fff;
        border-radius: 6px;
        .check {
          padding-right: 0.3684rem;
        }
        img {
          width: 1.9474rem;
          height: 1.9474rem;
        }
        .goods {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-left: 0.3684rem;
          font-size: 0.3421rem;
          .goods-title {
            display: flex;
            justify-content: space-between;
            .title {
              width: 5.2632rem;
              display: -webkit-box;
              line-height: 0.3947rem;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .van-icon {
              font-size: 0.5263rem;
              color: #b0352f;
            }
          }
        }
        .goods-prices {
          padding: 0.08rem 0;
          color: #b0352f;
        }
        ::v-deep .van-stepper {
          text-align: right;
          .van-stepper__minus {
            color: #41b883;
            border: 1px solid #41b883;
          }
          .van-stepper__plus {
            background-color: #41b883;
          }
        }
      }
    }
    .blank {
      transform: translateY(2.6316rem);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        padding-top: 0.2632rem;
        font-size: 0.3684rem;
        color: #9e9e9e;
      }
      button {
        display: block;
        padding: 0.2632rem;
        border: none;
        background-color: #41b883;
        color: #fff;
        font-size: 0.4737rem;
        border-radius: 0.1579rem;
      }
    }
  }
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.3158rem;
    border-bottom: 1px solid #efefef;
    .radio {
      padding: 0 0.3947rem;
    }
    .total {
      flex: 1;
      font-size: 0.3421rem;
      div:nth-child(2) {
        padding-top: 0.1053rem;
      }
      .total-active {
        color: #b0352f;
      }
    }
    .order {
      width: 3.1579rem;
      margin-right: 0.1316rem;
      line-height: 1.0526rem;
      color: #fff;
      text-align: center;
      font-size: 0.4211rem;
      background-color: #41b883;
      border-radius: 0.1579rem;
    }
    .order.red {
      background-color: #b0352f;
    }
  }
}
</style>