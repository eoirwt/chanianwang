//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

import user from '@/store/modules/user.js'
import cart from '@/store/modules/cart.js'
import address from '@/store/modules/address.js'
import order from '@/store/modules/order.js'

//创建并暴露store
export default new Vuex.Store({
    modules: {
        user,
        cart,
        address,
        order
    }
})