<template>
    <div class="recommend">
      <div class="card-title">
        <span>{{ cardTitle }}</span>
      </div>
      <div class="card-content">
        <!-- <slot :recommendList="recommendList"> </slot> -->
        <slot name="rectCard"></slot>
        <slot name="squareCard"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'RecommendCard',
  props: ['cardTitle'],
  data() {
    return {
      recommendList: [
        {
          id: 1,
          tag: '爆款推荐',
          name: '龙井1號铁罐250g',
          content: '鲜爽甘醇 口粮首选',
          price: '68.00',
          imgUrl: '/images/recommend1.jpeg',
        },
        {
          id: 2,
          tag: '销冠款',
          name: '龙井1號铁罐250g',
          content: '鲜爽甘醇 口粮首选',
          price: '168.00',
          imgUrl: '/images/recommend1.jpeg',
        },
        {
          id: 3,
          tag: '销冠款',
          name: '龙井1號铁罐250g',
          content: '鲜爽甘醇 口粮首选',
          price: '168.00',
          imgUrl: '/images/recommend1.jpeg',
        },
        {
          id: 4,
          tag: '销冠款',
          name: '龙井1號铁罐250g',
          content: '鲜爽甘醇 口粮首选',
          price: '168.00',
          imgUrl: '/images/recommend1.jpeg',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.recommend {
  margin-bottom: 0.1053rem;
  .card-title {
    padding: 0.2632rem 0;
    width: 100%;
    text-align: center;
    font-size: 0.4211rem;
    span {
      position: relative;
      &::after {
        content: '';
        display: block;
        position: absolute;
        right: -0.5rem;
        top: 50%;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #d4c0a7;
      }
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: -0.5rem;
        top: 50%;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #d4c0a7;
      }
    }
  }
  .card-content {
    padding: 0 0.2632rem;
    // rectangle card
    .rectCard {
      .van-card {
        background-color: #eeeeee;
        border-radius: 12px;
        .van-card__tag {
          top: 0;
          .van-tag--danger {
            padding: 0.0526rem 0.0526rem 0.0263rem 0.0526rem;
            background-color: #d4c0a7;
          }
        }
        .van-card__bottom {
          // position: absolute;
          // bottom: 0.1053rem;
          // right: 0.2632rem;
          .van-card__price {
            color: #b23a2f;
          }
        }
        .van-card__footer {
          position: absolute;
          bottom: 0.0789rem;
          right: 0.1316rem;
        }
      }
    }
    // square card
    .squareCard {
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