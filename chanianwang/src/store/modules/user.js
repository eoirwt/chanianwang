export default {
    namespaced: true,
    state: {
        loginStatus: false,
        token: null,
        userInfo: {}
    },
    getters: {

    },
    actions: {

    },
    mutations: {
        // 设置
        USER_LOGIN(state, data) {
            state.loginStatus = true
            state.token = data.token
            state.userInfo = data
            // 持久化存储
            localStorage.setItem('257773926_UserInfo', JSON.stringify(data))
        },
        // 读取
        INIT_USER(state) {
            const userinfo = JSON.parse(localStorage.getItem('257773926_UserInfo'))
            if (userinfo) {
                state.loginStatus = true
                state.token = userinfo.token
                state.userInfo = userinfo
            }
        },
        // 退出登录
        USER_LOGINOUT(state) {
            state.loginStatus = false
            state.token = null
            state.userInfo = {}
            localStorage.removeItem('257773926_UserInfo')
        }

    }
}