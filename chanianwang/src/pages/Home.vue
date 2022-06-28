<template>
  <div class="home">
    <div class="header-all">
      <div class="header-main">
        <HeaderTop>
          <template v-slot:left>
            <h1 class="logo"></h1>
          </template>
          <template v-slot:center> </template>
          <template v-slot:right>
            <span class="iconfont icon-kefu"></span>
          </template>
        </HeaderTop>
        <nav>
          <ly-tabs
            v-model="tabsValue"
            activeColor="#41b883"
            @change="handleTabsChange"
          >
            <ly-tab-item
              v-for="(item, index) in tabsItems"
              :key="index"
              :title="item.label"
              :name="item.id"
            />
          </ly-tabs>
        </nav>
      </div>
    </div>

    <section ref="wrapper">
      <div>
        <div v-for="(item, index) in newData" :key="index">
          <Swiper
            v-if="item.type === 'swiperList'"
            :swiperList="item.data"
          ></Swiper>

          <Icons
            v-if="item.type === 'iconsList'"
            :iconsList="item.data"
          ></Icons>

          <Ad v-if="item.type === 'adList'" :adList="item.data"></Ad>

          <RecommendCard
            cardTitle="爆款推荐"
            v-if="item.type === 'recommendList'"
          >
            <template v-slot:rectCard>
              <div class="rectCard">
                <van-card
                  v-for="(item, index) in item.data"
                  :key="index"
                  :price="item.price"
                  :tag="item.tag"
                  :desc="item.content"
                  :title="item.name"
                  :thumb="item.imgUrl"
                  :lazy-load="true"
                  @click="goDetail(item.id)"
                >
                  <template #footer>
                    <van-button
                      color="#41B883"
                      size="small"
                      round
                      icon="shopping-cart-o"
                    ></van-button>
                  </template>
                </van-card>
              </div>
            </template>
          </RecommendCard>

          <RecommendCard cardTitle="猜你喜欢" v-if="item.type === 'likeList'">
            <template v-slot:squareCard>
              <div class="squareCard">
                <van-card
                  v-for="(item, index) in item.data"
                  :key="index"
                  :price="item.price"
                  :title="item.name"
                  :thumb="item.imgUrl"
                  :lazy-load="true"
                  @click="goDetail(item.id)"
                >
                  <template #footer>
                    <van-button
                      color="#41B883"
                      size="small"
                      round
                      icon="shopping-cart-o"
                    ></van-button>
                  </template>
                </van-card>
              </div>
            </template>
          </RecommendCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderTop from '@/components/common/HeaderTop.vue'
import { LyTabs, LyTabItem } from 'ly-tab'
import Swiper from '@/components/home/Swiper.vue'
import Icons from '@/components/home/Icons.vue'
import RecommendCard from '@/components/home/RecommendCard.vue'
import Ad from '@/components/home/Ad.vue'
import BScroll from 'better-scroll'
export default {
  name: 'Home',
  components: {
    HeaderTop,
    RecommendCard,
    Swiper,
    Icons,
    Ad,
    LyTabs,
    LyTabItem,
  },
  data() {
    return {
      tabsValue: 0,
      tabsItems: [],
      newData: [],
    }
  },
  methods: {
    handleTabsChange(value) {
      this.getData(value)
    },
    async getData(tab = 0) {
      await this.$myAxios(this,{
        url: `/api/index_list/${tab}/data/1`,
      })
        .then((response) => {
          let res = response.data
          if (res.tabsItems) {
            this.tabsItems = Object.freeze(res.tabsItems)
          }
          this.newData = Object.freeze(res.data)
        })
        .catch((error) => {
          this.$toast('网络出错,' + error)
        })

      this.$nextTick(() => {
        new BScroll(this.$refs.wrapper, {
          click: true,
          bounce: false,
        })
      })
    },
    goDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          id,
        }
      })
    }
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  .header-all {
    width: 100%;
    height: 2.2895rem;
    .header-main {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
    }
  }
  section {
    flex: 1;
    background-color: #f5f5f5;
    overflow: hidden;
  }
}

.logo {
  width: 1.8667rem;
  height: 100%;
  background-image: url('/images/logo.png');
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center left;
  background-size: contain;
}
::v-deep .ly-tabs {
  border: none;
  .ly-tab-item {
    padding: 0.3684rem;
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
</style>