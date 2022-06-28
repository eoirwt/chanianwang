<template>
  <section ref="wrapper">
    <div>
      <!-- loading -->
      <SearchPagCard>
        <template v-slot:cardTitle>
          <div class="search-history">
            <h2>
              <i class="iconfont icon-lishi"></i>
              <span>历史搜索</span>
              <span v-show="searchArr.length" @click="deleteStorage">
                清空历史记录
              </span>
            </h2>
          </div>
        </template>
        <template v-slot:cardContent>
          <ul class="keywords" v-if="searchArr.length">
            <li
              v-for="(item, index) in searchArr"
              :key="index"
              @click="goShopList(item)"
            >
              {{ item }}
            </li>
          </ul>
          <div class="tip" v-else>暂无搜索记录...</div>
        </template>
      </SearchPagCard>
    </div>
  </section>
</template>

<script>
import SearchPagCard from '@/components/search/SearchPagCard.vue'
import BScroll from 'better-scroll'
import { Dialog } from 'vant'
export default {
  name: 'SearchDefPag',
  components: {
    SearchPagCard,
  },
  data() {
    return {
      searchArr: [],
    }
  },
  methods: {
    deleteStorage() {
      Dialog.confirm({
        title: '提示',
        message: '确认删除搜索历史吗？',
      })
        .then(() => {
          // on confirm
          //删除本地存储
          localStorage.removeItem('searchHisList')
          //清除数据
          this.searchArr = []
        })
        .catch(() => {
          // on cancel
          return
        })
    },
    goShopList(item) {
      this.$router.replace({
          name: 'searchShopList',
          query: {
            searchVal: item,
          },
        })
    }
  },
  created() {
    this.searchArr = JSON.parse(localStorage.getItem('searchHisList')) || []
  },
  mounted() {
    new BScroll(this.$refs.wrapper, {
      click: true,
      bounce: false,
    })
  },
}
</script>
