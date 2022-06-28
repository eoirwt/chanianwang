<template>
  <div class="screen-main">
    <ul class="screen">
      <li
        v-for="(item, index) in searchList.data"
        :key="index"
        @click="changeTab(index)"
      >
        <div :class="{ active: searchList.currentIndex == index }">
          {{ item.name }}
        </div>
        <div class="search-filter" v-if="index != 0">
          <i
            class="iconfont icon-sanjiao2"
            :class="{ active: item.status == 1 }"
          ></i>
          <i
            class="iconfont icon-sanjiao1"
            :class="{ active: item.status == 2 }"
          ></i>
        </div>
      </li>
    </ul>
    <section ref="wrapper">
      <div v-if="isShowList">
        <SearchPagCard>
          <template v-slot:cardContent>
            <div class="shop-list">
              <van-card
                v-for="(item, index) in shopList"
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
        </SearchPagCard>
      </div>
      <div class="noDataTip" v-else>
        <span class="iconfont icon-sad2"></span>
        <span>抱歉，未找到相关数据...</span>
      </div>
    </section>
  </div>
</template>

<script>
import SearchPagCard from '@/components/search/SearchPagCard.vue'
import BScroll from 'better-scroll'
export default {
  components: {
    SearchPagCard,
  },
  data() {
    return {
      isShowList: false,
      shopList: [],
      searchList: {
        currentIndex: 0,
        data: [
          /*
					status:0 都不亮
					status:1 上箭头亮
					status:2 下箭头亮
					*/
          { name: '综合', key: 'zh' },
          { name: '价格', status: 0, key: 'price' },
          { name: '销量', status: 0, key: 'num' },
        ],
      },
    }
  },
  computed: {
    orderBy() {
      let obj = this.searchList.data[this.searchList.currentIndex]
      let val = obj.status == '1' ? 'asc' : 'desc'
      return {
        [obj.key]: val,
      }
    },
  },
  watch: {
    $route() {
      if(this.$route.query.searchVal) {
        this.getData()
      }
    },
  },
  methods: {
    async getData() {
      await this.$myAxios(this, {
        url: '/api/goods/shopList',
        params: {
          keyword: this.$route.query.searchVal,
          ...this.orderBy,
        },
      })
        .then((response) => {
          this.isShowList = Boolean(response.data.length)
          this.shopList = response.data
        })
        .catch((error) => {
          this.$toast('网络出错,' + error)
        })
      new BScroll(this.$refs.wrapper, {
        click: true,
        bounce: false,
      })
    },
    changeTab(index) {
      this.searchList.currentIndex = index
      this.searchList.data.forEach((v, i) => {
        if (i !== index) {
          v.status = 0
        } else {
          v.status = v.status == 1 ? 2 : 1
        }
      })
      this.getData()
    },
    goDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          id,
        },
      })
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
.screen-main {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .screen {
    // height: 1.1842rem;
    display: flex;
    align-items: center;
    // justify-content: center;
    padding: 0.2632rem 0;
    font-size: 0.4211rem;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      & > div {
        padding: 0 0.0789rem;
      }
      .search-filter {
        display: flex;
        flex-direction: column;
        .iconfont {
          font-size: 0.3158rem;
        }
      }
    }
    li:nth-child(1),
    li:nth-child(2) {
      border-right: 1px solid #ccc;
    }
  }
  section {
    flex: 1;
    background-color: #f5f5f5;
    overflow: hidden;
    .noDataTip {
      padding-top: 0.5263rem;
      text-align: center;
      font-size: 0.4211rem;
      color: #ccc;
      .iconfont {
        font-size: 0.6316rem;
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
.active {
  color: #41b883;
}
</style>
