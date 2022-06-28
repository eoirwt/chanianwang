<template>
  <div class="ad">
      <ul>
          <li
            v-for="(item, index) in adList"
            :key="index"
          >
              <img :src="item.imgUrl" alt=""/>
          </li>
      </ul>
      
  </div>
</template>

<script>
export default {
    props: {
        adList: Array
    }
}
</script>

<style lang="scss" scoped>
    .ad {
        width: 100%;
        // height: 7.8947rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>