module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: '80',
        proxy: {
            '/api': {// 匹配所有以 '/api'开头的请求路径
                target: 'http://localhost:3000/',// 代理目标的基础路径
                changeOrigin: true, // 支持跨域
                pathRewrite: { '^/api': '/api' }
            },
        }
    },
    // 修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'chanianwang';
            return args;
        })
    },
}