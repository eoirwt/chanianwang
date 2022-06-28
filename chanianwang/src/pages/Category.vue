<template>
  <div class="category">
    <HeaderTop></HeaderTop>
    <section>
      <div class="list-l" ref="left">
        <ul class="l-item">
          <li
            v-for="(item, index) in dataList"
            :key="index"
            @click="goScroll(index)"
            :class="{active:index==currentIndex}"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="list-r" ref="right">
        <ul>
          <li v-for="(item, index) in dataList" :key="index" class="shop-list">
            <div class="title">
              <span>{{ item.name }}</span>
            </div>
            <ul class="r-content">
              <li v-for="(item, index) in item.list" :key="index">
                <img v-lazy="item.imgUrl" alt="" />
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </li>
          <div class="addpendheight"></div>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderTop from '@/components/common/HeaderTop.vue'
import BScroll from 'better-scroll'
export default {
  name: 'Category',
  components: {
    HeaderTop,
  },
  data() {
    return {
      dataList: [], // dom 渲染数据
      rightBScroll: '', //右侧滑动BScroll
      rightAllHeight: [], //承载右侧每一块的高度值
      scrollY: '', //右侧滚动距离
    }
  },
  computed: {
    currentIndex(){
      return this.rightAllHeight.findIndex((e, i) => {
        return this.scrollY >= e && this.scrollY < this.rightAllHeight[i+1]
      })
    }
  },
  methods: {
    async getData() {
      // 请求数据
      await this.$myAxios(this,{
        url: '/api/goods/category',
      })
        .then((response) => {
          // 响应成功,保存返回数据
          this.dataList = response.data
        })
        .catch((error) => {
          this.$toast('网络出错' + error)
        })


      this.$nextTick(() => {
        // 给右则滑动区域增加一个底部空间
        let addpendheight = document.querySelector('.addpendheight')
        addpendheight.style.height =
          (this.$refs.right.offsetHeight -
          addpendheight.previousSibling.offsetHeight + 10 )+
          'px'

        // 左侧滑动
        new BScroll(this.$refs.left, {
          click: true,
          bounce: false
        })
        // 右侧滑动
        this.rightBScroll = new BScroll(this.$refs.right, {
          click: true,
          probeType: 3,
          bounce: false
        })
        // 获取右侧滑动距离
        this.rightBScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(pos.y)
        })

        // 获取并保存右侧每个模块高度值
        let height = 0
        this.rightAllHeight.push(height)
        // 转换成真实数组
        let lis = Array.from(this.$refs.right.firstChild.children)
        lis.forEach((e, i) => {
          if (i !== lis.length - 1) {
            height += e.offsetHeight
            this.rightAllHeight.push(height)
          }
        })
      })
    },
    goScroll(index) {
      this.rightBScroll.scrollTo(0, -this.rightAllHeight[index], 300)
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-direction: column;
  section {
    display: flex;
    flex: 1;
    background-color: #f5f5f5;
    overflow: hidden;
    .list-l {
      width: 2.4211rem;
      background-color: #fff;
      border-bottom: 0.0263rem solid #f3f3f3;
      overflow: hidden;
      .l-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        li {
          position: relative;
          width: 100%;
          height: 0.8rem;
          margin: 0.3947rem 0;
          line-height: 0.8rem;
          text-align: center;
          font-size: 0.373333rem;
          &.active {
            left: 0.0395rem;
            border-left: 3px solid #41b883;
            color: #41b883;
            background-color: #f5f5f5;
          }
        }
      }
    }
    .list-r {
      flex: 1;
      overflow: hidden;
      .shop-list {
        width: 100%;
        padding-bottom: 0.3158rem;
        text-align: center;
        .title {
          width: 100%;
          height: 1rem;
          margin-bottom: 0.3947rem;
          text-align: center;
          line-height: 1rem;
          span {
            position: relative;
            font-size: 0.4737rem;
            overflow: hidden;
            &::before {
              content: '';
              display: block;
              position: absolute;
              left: -0.65rem;
              top: 50%;
              margin-top: -0.01rem;
              width: 0.5rem;
              height: 0.0263rem;
              background-color: #d9d9d9;
            }
            &::after {
              content: '';
              display: block;
              position: absolute;
              right: -0.65rem;
              top: 50%;
              margin-top: -0.01rem;
              width: 0.5rem;
              height: 0.0263rem;
              background-color: #d9d9d9;
            }
          }
        }
        .r-content {
          display: flex;
          flex-wrap: wrap;
          li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 33.33%;
            padding: 0.25rem 0;
            img {
              width: 1.3158rem;
              height: 1.3158rem;
              border-radius: 50%;
            }
            span {
              font-size: 0.3684rem;
            }
          }
        }
      }
    }
  }
  .loadWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block {
      width: 120px;
      height: 120px;
      background-color: #fff;
    }
  }
}
</style>