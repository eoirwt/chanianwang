<template>
  <div class="my-address">
    <HeaderTop>
      <template v-slot:left>
        <span class="iconfont icon-arrow-left-bold" @click="goback"></span>
      </template>
      <template v-slot:center>
        <div class="top-title">地址管理</div>
      </template>
    </HeaderTop>
    <section ref="wrapper">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import HeaderTop from '@/components/common/HeaderTop.vue'
import BScroll from 'better-scroll'
export default {
  name: 'MyAddress',
  data() {
    return {}
  },
  components: {
    HeaderTop,
  },
  methods: {
    goback() {
      this.$router.back()
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll(this.$refs.wrapper, {
          click: true,
          bounce: false,
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.my-address {
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
  }
}
</style>