import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home.vue'
import Category from '@/pages/Category.vue'
import Cart from '@/pages/Cart.vue'
import Profile from '@/pages/Profile.vue'
import Search from '@/pages/Search.vue'
import SearchDefPag from '@/pages/Search/SearchDefPag.vue'
import SearchShopList from '@/pages/Search/SearchShopList.vue'
import Detail from '@/pages/Detail.vue'
import Login from '@/pages/login/Login.vue'
import UserLogin from '@/pages/login/UserLogin.vue'
import Register from '@/pages/login/Register.vue'
import Recovery from '@/pages/Recovery/Recovery.vue'
import RegisterPwd from '@/pages/Recovery/RecoveryPwd.vue'
import RecoveryIndex from '@/pages/Recovery/RecoveryIndex.vue'
import MyAddress from '@/pages/MyAddress.vue'
import MyAddressIndex from '@/pages/MyAddress/MyAddressIndex.vue'
import AddressForm from '@/pages/MyAddress/AddressForm.vue'
import Order from '@/pages/Order.vue'

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {
                keepAlive: true,
                isShowTab: true
            },
        },
        {
            path: '/category',
            component: Category,
            meta: {
                keepAlive: true,
                isShowTab: true
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            meta: {
                keepAlive: false,
                isShowTab: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
                keepAlive: true,
                isShowTab: true
            }
        },
        {
            path: '/search',
            component: Search,
            children: [
                {
                    path: "",
                    name: 'searchDefPag',
                    component: SearchDefPag,
                    meta: {
                        keepAlive: true,
                        isShowTab: true
                    },
                },
                {
                    path: "list",
                    name: 'searchShopList',
                    component: SearchShopList,
                    meta: {
                        keepAlive: true,
                        isShowTab: true
                    },
                },

            ]
        },
        {
            path: '/detail',
            component: Detail,
            meta: {
                keepAlive: true,
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                keepAlive: false,
                isShowTab: false
            }
        },
        {
            path: '/userlogin',
            component: UserLogin,
            meta: {
                keepAlive: false,
                isShowTab: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                keepAlive: false,
                isShowTab: false
            }
        },
        {
            path: '/recovery',
            component: Recovery,
            children: [
                {
                    path: "",
                    name: 'recoveryIndex',
                    component: RecoveryIndex,
                    meta: {
                        keepAlive: false,
                        isShowTab: false
                    },
                },
                {
                    path: "pwd",
                    name: 'registerPwd',
                    component: RegisterPwd,
                    meta: {
                        keepAlive: false,
                        isShowTab: false
                    },
                },

            ]
        },
        {
            path: '/myaddress',
            component: MyAddress,
            children: [
                {
                    path: "",
                    name: 'myAddressIndex',
                    component: MyAddressIndex,
                    meta: {
                        keepAlive: false,
                        isShowTab: true
                    },
                },
                {
                    path: "address-form",
                    name: 'AddressForm',
                    component: AddressForm,
                    meta: {
                        keepAlive: false,
                        isShowTab: true
                    },
                },
            ]
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
            meta: {
                keepAlive: false,
                isShowTab: true
            }
        },
        {
            path: '/',
            redirect: '/home',
        },
    ],
    // base: process.env.BASE_URL,
})
//全局前置守卫
router.beforeEach((to, from, next) => {
    let routesNameArr = ['cart', 'myAddressIndex', 'order']
    let userInfo = JSON.parse(localStorage.getItem('257773926_UserInfo'))
    if (routesNameArr.indexOf(to.name) > -1) {
        if (!userInfo) {
            // 路由跳转
            router.replace('/login')
        }
    }
    next()
})
export default router
