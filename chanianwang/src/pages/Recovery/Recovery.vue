<template>
  <div class="recovery">
    <HeaderTop>
      <template slot="left">
        <span class="iconfont icon-arrow-left-bold" @click="goBack"></span
      ></template>
      <template slot="center">
        <div class="top-title">找回密码</div>
      </template>
    </HeaderTop>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderTop from '@/components/common/HeaderTop.vue'
export default {
  name: 'Recovery',
  components: {
    HeaderTop,
  },
  methods: {
    goBack() {
      this.$router.back()
    },
  },
}
</script>

<style lang="scss" scoped>
.recovery {
  display: flex;
  flex-direction: column;
  .top-title {
    color: #fff;
    font-size: 0.4rem;
    line-height: 0.8rem;
  }

}
</style>