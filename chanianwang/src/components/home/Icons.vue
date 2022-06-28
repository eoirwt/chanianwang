<template>
  <ul class="icons">
    <li v-for="(item, index) in iconsList" :key="index">
      <img :src="item.imgUrl" alt="" />
      <span>{{ item.title }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Icons',
  props: {
    iconsList: Array
  }
}
</script>

<style lang="scss" scoped>
.icons {
  display: flex;
  justify-content: space-around;
  padding: 0.4rem 0;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 1rem;
    height: 1rem;
  }
  span {
    padding: .1579rem 0;
    font-size: 0.426666rem;
  }
}
</style>