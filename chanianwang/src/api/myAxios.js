import axios from 'axios'


export function myAxios(vc, options = {}) {
    // 请求方法
    options.method = options.method || 'GET'
    // 请求参数
    options.data = options.data || {}
    options.params = options.params || {}
    options.headers = options.headers || {} 
    // 提示加载
    let isloading = vc.$toast.loading({
        message: '加载中',
        forbidClick: true,
    })
    // 判断是否需要验证token
    if (options.headers.token) {
        // 再vux里获取token
        options.headers.token = vc.$store.state.user.token
        // token不存在， 跳转登录页
        if (!options.headers.token) {
            vc.$toast('您尚未登录，请登录')
            vc.$router.replace('/login')
        }
    }
    // 发送请求
    return new Promise((resolve, reject) => {
        axios(options).then(respone => {
            resolve(respone.data)
            isloading.clear()
        }).catch(error => {
            reject(error.message)
            isloading.clear()
        })
    })
}
