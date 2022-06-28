const jwt = require('jsonwebtoken')
const user = {
    queryUserTel(options) {
        const str = `select * from users_list where tel='${options.userTel}'`
        return str
    },
    queryUserPwd(options) {
        const str = `select * from users_list where tel='${options.userTel}' and pwd='${options.userPwd}'`
        return str
    },
    insertUser(options) {
        // 设置默认密码
        options.userPwd = options.userPwd || '666666'
        // 根据 userTel设置token
        const secretKey = 'hello World ^_^' // 密钥
        const token = jwt.sign({ userTel: options.userTel }, secretKey)
        const str = `insert into users_list (tel, pwd, imgUrl, nickName, token) values ('${options.userTel}', '${options.userPwd}', '/images/user.jpg', '小廿', '${token}')`
        return str
    }
}
module.exports = user