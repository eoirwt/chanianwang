<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#41B883">
      <van-swipe-item v-for="item in swiperList" :key="item.id">
        <img v-lazy="item.imgUrl" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  components: {},
  props: {
    swiperList: Array
  }
}
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  height: 4.7368rem;
  img {
    width: 100%;
    height: 4.7368rem;
  }
}
</style>