<template>
      <header class="header">
        <div class="left">
          <slot name="left">
            <span class="iconfont icon-arrow-left-bold" @click="goHome"></span>
          </slot>
        </div>
        <div class="center">
          <slot name="center">
            <div class="search-main" @click="goSearch">
              <span class="iconfont icon-sousuo"></span>
              <span>搜您喜欢的...</span>
            </div>
          </slot>
        </div>
        <div class="right">
          <slot name="right">
            <span class="iconfont icon-31shouye" @click="goHome"></span>
          </slot>
        </div>
      </header>
</template>

<script>
export default {
  name: 'HeaderTop',
  methods: {
    goSearch() {
      this.$router.push('/search')
    },
    goHome() {
      this.$router.replace('/home')
    }
  },
}
</script>

<style lang="scss" scoped>
    .header {
      width: 100%;
      height: 1.2rem;
      background-color: #41b883;
      display: flex;
      justify-content: space-around;

      .left {
        margin: 0 0.1333rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .iconfont {
          color: #fff;
          font-size: 0.64rem;
        }
      }
      .center {
        flex: 1;
        margin: 0.2105rem 0.1316rem;
        color: #ccc;
        text-align: center;
        .search-main {
          display: flex;
          align-items: center;
          padding: 0 0.1316rem;
          background-color: #fff;
          border-radius: 12px;
          height: 100%;
          overflow: hidden;
          .iconfont {
            color: #9c9c9c;
            font-size: 0.4211rem;
          }
          span {
            margin-left: 0.1316rem;
            font-size: 0.3684rem;
            color: #ccc;
          }
          form {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 0.1316rem;
            width: 100%;
            input {
              flex: 1;
              // margin-left: 0.1316rem;
              font-size: 0.3947rem;
              width: 100%;
              color: #000;
            }
          }
        }
        .title {
          text-align: center;
          font-size: 0.4267rem;
          color: #fff;
        }
      }
      .right {
        margin: 0 0.1333rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .iconfont {
          font-size: 0.64rem;
          color: #fff;
        }
        .search-btn {
          font-size: 0.4211rem;
          color: #fff;
          font-weight: bold;
        }
      }
    }
</style>
