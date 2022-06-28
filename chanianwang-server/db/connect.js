// 导入 MySQL模块
const mysql = require('mysql');
// 建立与 MySQL 数据库的连接
const db = mysql.createPool({
    host: 'localhost', // 数据库的 IP 地址
    user: 'root', // 登录数据库的账号
    password: 'admin123', // 登录数据库的密码
    database: 'chaqiwang' //指定要操作哪个数据库
})
module.exports = db