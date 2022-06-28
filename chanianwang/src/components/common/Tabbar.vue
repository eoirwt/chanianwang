<template>
  <footer class="tabbar">
    <a
      v-for="(item, index) in tabLists"
      :key="index"
      class="guide_item"
      :class="{ on: isCurrent(item.path) }"
      @click.stop="goto(item.path)"
    >
      <span class="item_icon">
        <i class="iconfont" :class="item.icon"></i>
      </span>
      <span>{{ item.text }}</span>
    </a>
  </footer>
</template>

<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      tabLists: [
        {
          text: '首页',
          path: '/home',
          icon: 'icon-shouye',
        },
        {
          text: '分类',
          path: '/category',
          icon: 'icon-fenlei',
        },
        {
          text: '购物车',
          path: '/cart',
          icon: 'icon-gouwuche1',
        },
        {
          text: '我的',
          path: '/profile',
          icon: 'icon-wode',
        },
      ],
    }
  },
  methods: {
    goto(path) {
      if (this.$route.path === path) return
      this.$router.replace(path)
    },
    isCurrent(path) {
      return this.$route.path === path
    },
  },
}
</script>

<style lang="scss" scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.4474rem;
  background-color: #fff;
  display: flex;

  .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    margin: 0.1333rem;
    color: #999;
    span {
      font-size: 0.32rem;
      margin-top: 0.0533rem;
      margin-bottom: 0.0533rem;
      .iconfont {
        font-size: 0.5867rem;
      }
    }
    &.on {
      color: #41b883;
    }
  }
}
</style>
