<template>
  <div class="search">
    <div class="header-all">
      <div class="header-main">
        <HeaderTop>
          <template v-slot:left>
            <span class="iconfont icon-arrow-left-bold" @click="goBack"></span>
          </template>
          <template v-slot:center>
            <div class="search-main">
              <span class="iconfont icon-sousuo"></span>
              <form action="" onsubmit="return false">
                <input
                  type="search"
                  placeholder="请搜索 —> ‘茶’、‘绿茶’、‘红茶’.."
                  v-model="searchVal"
                  @keyup.enter="goShopList"
                  ref="myInput"
                />
              </form>
            </div>
          </template>
          <template v-slot:right>
            <span class="search-btn" @click="goShopList">搜索</span>
          </template>
        </HeaderTop>
      </div>
    </div>
    <!-- <router-view :key="key"></router-view> -->
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderTop from '@/components/common/HeaderTop.vue'

export default {
  components: {
    HeaderTop,
  },
  data() {
    return {
      searchVal: '',
      searchArr: [],
    }
  },
  computed: {
    key() {
      return this.$route.path + Math.random()
    },
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goShopList() {
      if (!this.searchVal.trim()) {
        return
      }
      //判断之前有没有搜索的本地存储
      if (!localStorage.getItem('searchHisList')) {
        //没有
        localStorage.setItem('searchHisList', '[]')
      } else {
        //之前有
        this.searchArr = JSON.parse(localStorage.getItem('searchHisList'))
      }
      //增加数据
      this.searchArr.unshift(this.searchVal)
      //ES6去重
      let newArr = new Set(this.searchArr)
      //给本地存储赋值
      localStorage.setItem('searchHisList', JSON.stringify(Array.from(newArr)))
      if (
        this.$route.fullPath !==
        encodeURI(`/search/list?searchVal=${this.searchVal}`)
      ) {
        this.$router.replace({
          name: 'searchShopList',
          query: {
            searchVal: this.searchVal,
          },
        })
      }
    },
    myTouchMove() {
      //  失去焦点
      this.$refs.myInput.blur()
    },
  },
  watch: {
    $route() {
      this.searchVal = this.$route.query.searchVal
    },
  },
  mounted() {
    // 键盘监听事件
    window.addEventListener('touchmove', this.myTouchMove, true)
  },
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  .header-all {
    width: 100%;
    height: 1.1842rem;
    .header-main {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
    }
  }
  & > section {
    flex: 1;
    background-color: #f5f5f5;
    overflow: hidden;
  }
}
</style>