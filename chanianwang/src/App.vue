<template>
  <div id="app">
    <keep-alive>
      <!-- 缓存路由 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不缓存路由 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div v-if="$route.meta.isShowTab" class="jackup-bottom"></div>
    <Tabber v-if="$route.meta.isShowTab"></Tabber>
  </div>
</template>

<script>
import Tabber from '@/components/common/Tabbar.vue'
import {mapMutations} from 'vuex'
export default {
  name: 'App',
  components: {
    Tabber,
  },
  methods: {
    ...mapMutations('user', {init_user:'INIT_USER'})
  },
  created() {
    this.init_user()
  }
}
</script>
<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin-bottom: 1.5789rem;
  .home,
  .category,
  .cart,
  .profile,
  .search,
  .detail, 
  .login-main,
  .recovery,
  .my-address,
  .order {
    flex: 1;
    overflow: hidden;
  }
  .jackup-bottom {
    width: 100%;
    height: 1.4474rem;
    background-color: #f5f5f5;
  }
}
</style>
