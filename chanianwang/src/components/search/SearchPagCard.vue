<template>
  <div class="search-card">
    <div class="card-title">
      <slot name="cardTitle"></slot>
    </div>
    <div class="card-content">
      <slot name="cardContent"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPagCard',

}
</script>

<style lang="scss" scoped>
.search-card {
  margin: 0 0.5263rem 0.5263rem;
  padding-top: 0.2632rem;
  .card-title {
    .search-history,
    .search-hot,
    .search-recom {
      h2 {
        position: relative;
        margin-bottom: 0.3947rem;
        font-weight: 400;
        font-size: 0.4211rem;
        .iconfont {
          padding-right: 0.1316rem;
          color: #41b883;
        }
        span:last-child {
          position: absolute;
          right: 0.1316rem;
          font-size: 0.3684rem;
          color: #777777;
        }
      }
    }
    .search-recom {
      padding-top: 0.5263rem;
    }
  }
  .card-content {
    .keywords {
      display: flex;
      flex-wrap: wrap;
      li {
        margin: 0.2632rem;
        padding: 0.1579rem;
        border: 1px solid #dddddd;
        font-size: 0.3684rem;
        color: #999999;
      }
    }
    .tip {
      font-size: 0.4211rem;
      color: #ccc;
      text-align: center;
    }
    .shop-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .van-card {
        background-color: #eeeeee;
        border-radius: 12px;
        width: 4.3rem;
        margin: 0;
        margin-bottom: 0.2105rem;
        .van-card__header {
          display: flex;
          flex-direction: column;
          .van-card__thumb {
            margin: 0;
            width: 100%;
            height: 3.4211rem;
          }
          .van-card__content {
            min-height: 1.5789rem;
            .van-card__title {
              padding: 0.1316rem 0;
            }
            .van-card__price {
              color: #b23a2f;
            }
          }
        }
      }
      .van-card__footer {
        position: absolute;
        bottom: 0.0789rem;
        right: 0.1316rem;
      }
    }
  }
}
</style>