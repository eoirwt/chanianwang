var express = require('express');
var router = express.Router();
var db = require('../db/connect')
var user = require('../db/userSql')
var QcloudSms = require("qcloudsms_js");
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const req = require('express/lib/request');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//首页推荐的数据
router.get('/api/index_list/0/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      tabsItems: [
        { id: 0, label: '推荐' },
        { id: 1, label: '铁观音' },
        { id: 2, label: '大红袍' },
        { id: 3, label: '金骏眉' },
        { id: 4, label: '普洱' },
        { id: 5, label: '花茶' },
        { id: 6, label: '其他' },
      ],
      data: [
        //这是swiper
        {
          id: 0,
          type: 'swiperList',
          data: [
            { id: 0, imgUrl: './images/swiper1.jpeg' },
            { id: 1, imgUrl: './images/swiper2.jpeg' },
            { id: 3, imgUrl: './images/swiper3.jpeg' }
          ]
        },
        //这是icons
        {
          id: 1,
          type: 'iconsList',
          data: [
            {
              id: 1,
              title: '自饮茶',
              imgUrl: './images/icons1.png'
            },
            {
              id: 2,
              title: '茶具',
              imgUrl: './images/icons2.png'
            },
            {
              id: 3,
              title: '茶礼盒',
              imgUrl: './images/icons3.png'
            },
            {
              id: 4,
              title: '领福利',
              imgUrl: './images/icons4.png'
            },
            {
              id: 5,
              title: '官方验证',
              imgUrl: './images/icons5.png'
            }
          ]
        },
        //爆款推荐
        {
          id: 2,
          type: 'recommendList',
          data: [
            {
              id: 5,
              tag: '爆款推荐',
              name: '龙井1號铁罐250g',
              content: '鲜爽甘醇，口粮首选',
              price: '68.66',
              imgUrl: './images/recommend1.jpeg'
            },
            {
              id: 6,
              tag: '销冠款',
              name: '四大红茶组合特级茶叶礼盒装455g',
              content: '四大红茶组合，好喝不单调',
              price: '99.66',
              imgUrl: './images/recommend2.jpeg'
            },
            {
              id: 7,
              tag: '销冠款',
              name: '新茶安溪铁观音春茶礼盒500g送礼袋',
              content: '臻品质，敢保证，珍稀原料核心产区兰花香清高悠长清醇鲜爽正味传统工艺',
              price: '218.22',
              imgUrl: './images/recommend3.jpeg'
            },
            {
              id: 8,
              tag: '爆款推荐',
              name: '新茶武夷正山红茶小种蜜香耐泡型礼盒装125g',
              content: '福茗源，金骏眉红茶，茶叶首件28元买2送1',
              price: '166.99',
              imgUrl: './images/recommend4.jpeg'
            },

          ]
        },
        //猜你喜欢
        {
          id: 3,
          type: 'likeList',
          data: [
            {
              id: 1,
              imgUrl: './images/like1.jpeg',
              name: '福茗源 茶叶 碧螺春绿茶 首件28元拍2罐',
              price: '299.46'
            },
            {
              id: 2,
              imgUrl: './images/like2.jpeg',
              name: '新茶茶叶红茶正山小种叶礼盒装浓香型600g',
              price: '61.83'
            },
            {
              id: 3,
              imgUrl: './images/like3.jpeg',
              name: '茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装',
              price: '136.62'
            },
            {
              id: 4,
              imgUrl: './images/like4.jpeg',
              name: '福茗源 龙井茶 2022新茶浓香型礼盒装250g',
              price: '125.99'
            },
          ]
        }

      ]
    }
  })
});

//首页铁观音的数据
router.get('/api/index_list/1/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      data: [
        {
          id: 1,
          type: 'adList',
          data: [
            {
              id: 1,
              imgUrl: './images/ad1.jpeg'
            },
          ]
        },
        //爆款推荐
        {
          id: 2,
          type: 'recommendList',
          data: [
            {
              id: 5,
              tag: '爆款推荐',
              name: '龙井1號铁罐250g',
              content: '鲜爽甘醇，口粮首选',
              price: '68.66',
              imgUrl: './images/recommend1.jpeg'
            },
            {
              id: 6,
              tag: '销冠款',
              name: '四大红茶组合特级茶叶礼盒装455g',
              content: '四大红茶组合，好喝不单调',
              price: '99.66',
              imgUrl: './images/recommend2.jpeg'
            },
          ]
        },
        //猜你喜欢
        {
          id: 3,
          type: 'likeList',
          data: [
            {
              id: 1,
              imgUrl: './images/like1.jpeg',
              name: '福茗源 茶叶 碧螺春绿茶 首件28元拍2罐',
              price: '299.45'
            },
            {
              id: 2,
              imgUrl: './images/like2.jpeg',
              name: '新茶茶叶红茶正山小种叶礼盒装浓香型600g',
              price: '61.83'
            },
          ]
        }
      ]
    }
  })
})

//首页大红袍的数据
router.get('/api/index_list/2/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      data: [
        {
          id: 1,
          type: 'adList',
          data: [
            {
              id: 1,
              imgUrl: './images/ad2.jpeg'
            },
          ]
        },
        //爆款推荐
        {
          id: 2,
          type: 'recommendList',
          data: [
            {
              id: 8,
              tag: '爆款推荐',
              name: '新茶武夷正山红茶小种蜜香耐泡型礼盒装125g',
              content: '福茗源，金骏眉红茶，茶叶首件28元买2送1',
              price: '166.99',
              imgUrl: './images/recommend4.jpeg'
            },
            {
              id: 6,
              tag: '销冠款',
              name: '四大红茶组合特级茶叶礼盒装455g',
              content: '四大红茶组合，好喝不单调',
              price: '99.66',
              imgUrl: './images/recommend2.jpeg'
            },
          ]
        },
        //猜你喜欢
        {
          id: 3,
          type: 'likeList',
          data: [
            {
              id: 3,
              imgUrl: './images/like3.jpeg',
              name: '茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装',
              price: '136.62'
            },
            {
              id: 1,
              imgUrl: './images/like1.jpeg',
              name: '福茗源 茶叶 碧螺春绿茶 首件28元拍2罐',
              price: '299.45'
            },
          ]
        }
      ]
    }
  })
})

//首页金骏眉的数据
router.get('/api/index_list/3/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      data: [
        {
          id: 1,
          type: 'adList',
          data: [
            {
              id: 1,
              imgUrl: './images/ad3.jpeg'
            },
          ]
        },
        //爆款推荐
        {
          id: 2,
          type: 'recommendList',
          data: [
            {
              id: 6,
              tag: '销冠款',
              name: '四大红茶组合特级茶叶礼盒装455g',
              content: '四大红茶组合，好喝不单调',
              price: '99.66',
              imgUrl: './images/recommend2.jpeg'
            },
            {
              id: 5,
              tag: '爆款推荐',
              name: '龙井1號铁罐250g',
              content: '鲜爽甘醇，口粮首选',
              price: '68.66',
              imgUrl: './images/recommend1.jpeg'
            },
          ]
        },
        //猜你喜欢
        {
          id: 3,
          type: 'likeList',
          data: [
            {
              id: 4,
              imgUrl: './images/like4.jpeg',
              name: '福茗源 龙井茶 2022新茶浓香型礼盒装250g',
              price: '125.99'
            },
            {
              id: 3,
              imgUrl: './images/like3.jpeg',
              name: '茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装',
              price: '136.62'
            },
          ]
        }
      ]
    }
  })
})

//首页普洱的数据
router.get('/api/index_list/4/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      data: [
        {
          id: 1,
          type: 'adList',
          data: [
            {
              id: 1,
              imgUrl: './images/ad4.jpeg'
            },
          ]
        },
        //爆款推荐
        {
          id: 2,
          type: 'recommendList',
          data: [
            {
              id: 8,
              tag: '爆款推荐',
              name: '新茶武夷正山红茶小种蜜香耐泡型礼盒装125g',
              content: '福茗源，金骏眉红茶，茶叶首件28元买2送1',
              price: '166.99',
              imgUrl: './images/recommend4.jpeg'
            },
            {
              id: 5,
              tag: '爆款推荐',
              name: '龙井1號铁罐250g',
              content: '鲜爽甘醇，口粮首选',
              price: '68.66',
              imgUrl: './images/recommend1.jpeg'
            },
          ]
        },
        //猜你喜欢
        {
          id: 3,
          type: 'likeList',
          data: [
            {
              id: 3,
              imgUrl: './images/like3.jpeg',
              name: '茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装',
              price: '136.62'
            },
            {
              id: 2,
              imgUrl: './images/like2.jpeg',
              name: '新茶茶叶红茶正山小种叶礼盒装浓香型600g',
              price: '61.83'
            },
          ]
        }
      ]
    }
  })
})

//首页花茶的数据
router.get('/api/index_list/5/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      data: [
        {
          id: 1,
          type: 'adList',
          data: [
            {
              id: 1,
              imgUrl: './images/ad5.jpeg'
            },
          ]
        },
        //爆款推荐
        {
          id: 2,
          type: 'recommendList',
          data: [
            {
              id: 7,
              tag: '销冠款',
              name: '新茶安溪铁观音春茶礼盒500g送礼袋',
              content: '臻品质，敢保证，珍稀原料核心产区兰花香清高悠长清醇鲜爽正味传统工艺',
              price: '218.22',
              imgUrl: './images/recommend3.jpeg'
            },
            {
              id: 6,
              tag: '销冠款',
              name: '四大红茶组合特级茶叶礼盒装455g',
              content: '四大红茶组合，好喝不单调',
              price: '99.66',
              imgUrl: './images/recommend2.jpeg'
            },
          ]
        },
        //猜你喜欢
        {
          id: 3,
          type: 'likeList',
          data: [
            {
              id: 1,
              imgUrl: './images/like1.jpeg',
              name: '福茗源 茶叶 碧螺春绿茶 首件28元拍2罐',
              price: '299.45'
            },
            {
              id: 4,
              imgUrl: './images/like4.jpeg',
              name: '福茗源 龙井茶 2022新茶浓香型礼盒装250g',
              price: '125.99'
            },
          ]
        }
      ]
    }
  })
})

//首页其他的数据
router.get('/api/index_list/6/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      data: [
        //这是icons
        {
          id: 1,
          type: 'iconsList',
          data: [
            {
              id: 1,
              title: '自饮茶',
              imgUrl: './images/icons1.png'
            },
            {
              id: 2,
              title: '茶具',
              imgUrl: './images/icons2.png'
            },
            {
              id: 3,
              title: '茶礼盒',
              imgUrl: './images/icons3.png'
            },
            {
              id: 4,
              title: '领福利',
              imgUrl: './images/icons4.png'
            },
            {
              id: 5,
              title: '官方验证',
              imgUrl: './images/icons5.png'
            }
          ]
        },
        //猜你喜欢
        {
          id: 3,
          type: 'likeList',
          data: [
            {
              id: 1,
              imgUrl: './images/like1.jpeg',
              name: '福茗源 茶叶 碧螺春绿茶 首件28元拍2罐',
              price: '299.45'
            },
            {
              id: 2,
              imgUrl: './images/like2.jpeg',
              name: '新茶茶叶红茶正山小种叶礼盒装浓香型600g',
              price: '61.83'
            },
            {
              id: 3,
              imgUrl: './images/like3.jpeg',
              name: '茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装',
              price: '136.62'
            },
            {
              id: 4,
              imgUrl: './images/like4.jpeg',
              name: '福茗源 龙井茶 2022新茶浓香型礼盒装250g',
              price: '125.99'
            },
          ]
        }
      ]
    }
  })
})


//查询商品数据接口
router.get('/api/goods/shopList', function (req, res, next) {
  let [searchName, orderName] = Object.keys(req.query)
  let [name, order] = Object.values(req.query)
  db.query('select * from goods_list where name like "%' + name + '%" order by ' + orderName + ' ' + order + '', function (error, results) {
    if (error) console.log(error.message)
    res.send({
      code: 0,
      data: results
    })
  })
})

// 分类页面数据接口
router.get('/api/goods/category', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      {
        id: 0,
        name: '推荐',
        list: [
          {
            id: 0,
            name: '铁观音',
            imgUrl: './images/cate1.jpeg'
          },
          {
            id: 1,
            name: '大红袍',
            imgUrl: './images/cate2.jpeg'
          },
          {
            id: 2,
            name: '金骏每',
            imgUrl: './images/cate3.jpeg'
          },
          {
            id: 3,
            name: '普尔',
            imgUrl: './images/cate4.jpeg'
          },
          {
            id: 4,
            name: '花茶',
            imgUrl: './images/cate5.jpeg'
          },
          {
            id: 5,
            name: '其他',
            imgUrl: './images/cate6.jpeg'
          },
        ]
      },
      {
        id: 1,
        name: '铁观音',
        list: [
          {
            id: 0,
            name: '传奇会',
            imgUrl: './images/cate1.jpeg'
          },
          {
            id: 1,
            name: '袍宗师',
            imgUrl: './images/cate2.jpeg'
          },
          {
            id: 2,
            name: '天桐岩',
            imgUrl: './images/cate3.jpeg'
          },
          {
            id: 3,
            name: '维润叶',
            imgUrl: './images/cate4.jpeg'
          },
          {
            id: 4,
            name: '安溪铁',
            imgUrl: './images/cate5.jpeg'
          },
          {
            id: 5,
            name: '华祥苑',
            imgUrl: './images/cate6.jpeg'
          },
        ]
      },
      {
        id: 2,
        name: '大红袍',
        list: [
          {
            id: 0,
            name: '肉桂茶',
            imgUrl: './images/cate1.jpeg'
          },
          {
            id: 1,
            name: '八马茶',
            imgUrl: './images/cate2.jpeg'
          },
          {
            id: 2,
            name: '闽茶府',
            imgUrl: './images/cate3.jpeg'
          },
          {
            id: 3,
            name: '七春叶',
            imgUrl: './images/cate4.jpeg'
          },
          {
            id: 4,
            name: '八马茶',
            imgUrl: './images/cate5.jpeg'
          },
          {
            id: 5,
            name: '武夷星',
            imgUrl: './images/cate6.jpeg'
          },
        ]
      },
      {
        id: 3,
        name: '金骏眉',
        list: [
          {
            id: 0,
            name: '润虎叶',
            imgUrl: './images/cate1.jpeg'
          },
          {
            id: 1,
            name: '宗金骏',
            imgUrl: './images/cate2.jpeg'
          },
          {
            id: 2,
            name: '特威茶',
            imgUrl: './images/cate3.jpeg'
          },
          {
            id: 3,
            name: '正山金',
            imgUrl: './images/cate4.jpeg'
          },
          {
            id: 4,
            name: '福鼎香',
            imgUrl: './images/cate5.jpeg'
          },
          {
            id: 5,
            name: '英九叶',
            imgUrl: './images/cate6.jpeg'
          },
        ]
      },
      {
        id: 4,
        name: '普尔',
        list: [
          {
            id: 0,
            name: '七彩云',
            imgUrl: './images/cate1.jpeg'
          },
          {
            id: 1,
            name: '帝泊洱',
            imgUrl: './images/cate2.jpeg'
          },
          {
            id: 2,
            name: '冰岛古',
            imgUrl: './images/cate3.jpeg'
          },
          {
            id: 3,
            name: '大益叶',
            imgUrl: './images/cate4.jpeg'
          },
          {
            id: 4,
            name: '凿成云',
            imgUrl: './images/cate5.jpeg'
          },
          {
            id: 5,
            name: '朗山普',
            imgUrl: './images/cate6.jpeg'
          },
        ]
      },
      {
        id: 5,
        name: '花茶',
        list: [
          {
            id: 0,
            name: '决明子',
            imgUrl: './images/cate1.jpeg'
          },
          {
            id: 1,
            name: '五宝叶',
            imgUrl: './images/cate2.jpeg'
          },
          {
            id: 2,
            name: '忆江南',
            imgUrl: './images/cate3.jpeg'
          },
          {
            id: 3,
            name: '茶里蜜',
            imgUrl: './images/cate4.jpeg'
          },
          {
            id: 4,
            name: '薄荷茶',
            imgUrl: './images/cate5.jpeg'
          },
          {
            id: 5,
            name: '苑意莉',
            imgUrl: './images/cate6.jpeg'
          },
        ]
      },
      {
        id: 6,
        name: '其他',
        list: [
          {
            id: 0,
            name: '茶具配件',
            imgUrl: './images/cate7.jpeg'
          },
          {
            id: 1,
            name: '整套茶具',
            imgUrl: './images/cate8.jpeg'
          },
        ]
      },
    ]
  })
})

// 查询商品id数据接口
router.get('/api/goods/id', function (req, res, next) {
  let id = req.query.id
  db.query(`select * from goods_list where id=${id}`, function (error, result) {
    if (error) throw error
    res.json({
      code: 0,
      data: result[0]
    })
  })
})

// 密码登录接口
router.post('/api/login', function (req, res, next) {

  db.query(user.queryUserTel(req.body), function (error, results) {
    if (results.length > 0) {
      db.query(user.queryUserPwd(req.body), function (error, results) {
        if (results.length > 0) {
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '登录成功',
              data: results[0]
            }

          })
        } else {
          res.send({
            code: 302,
            data: {
              success: false,
              msg: '登录失败，密码有误'
            }
          })
        }
      })
    } else {
      res.send({
        code: 301,
        data: {
          success: false,
          msg: '手机号不存在'
        }
      })
    }
  })

})

// 发送短信验证码接口
router.post('/api/getCode', function (req, res, next) {
  let userTel = req.body.userTel
  // 短信应用SDK AppID
  var appid = 1400187558;  // SDK AppID是1400开头

  // 短信应用SDK AppKey
  var appkey = "dc9dc3391896235ddc2325685047edc7";

  // 需要发送短信的手机号码
  var phoneNumbers = [userTel];

  // 短信模板ID，需要在短信应用中申请
  var templateId = 285590;  // NOTE: 这里的模板ID`285590`只是一个真实的模板ID, 需要在短信控制台中申请

  // 签名
  var smsSign = "三人行慕课";  // NOTE: 请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

  // 实例化QcloudSms
  var qcloudsms = QcloudSms(appid, appkey);

  var ssender = qcloudsms.SmsSingleSender();
  //这个变量：params 就是往手机上，发送的短信
  var params = [Math.floor(Math.random() * (9999 - 1000)) + 1000];
  ssender.sendWithParam(86, phoneNumbers[0], templateId,
    params, smsSign, "", "", callback);  // 签名参数不能为空串

  // 设置请求回调处理, 需要自定义相应处理回调
  function callback(err, ress, resData) {
    if (err) {
      res.send({
        code: 301,
        data: {
          success: false,
          data: '短信验证码获取失败, 短信sdk服务过期'
        }
      })
      console.log("err: ", err);
    } else {
      res.send({
        code: 200,
        data: {
          success: true,
          data: ress.req.body.params[0]
        }
      })
    }
  }

})

// 增加一个用户接口
router.post('/api/addUser', function (req, res, next) {
  db.query(user.queryUserTel(req.body), function (error, results) {
    if (error) throw error
    if (results.length > 0) {
      res.send({
        code: 200,
        data: {
          success: true,
          msg: '登录成功',
          data: results[0]
        }
      })
    } else {
      db.query(user.insertUser(req.body), function (error, results) {
        if (error) console.log(error.message)
        db.query(user.queryUserTel(req.body), function (e, r) {
          if (e) console.log(e.message)
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '登录成功',
              data: r[0]
            }
          })
        })
      })

    }
  })
})

// 新增用户注册接口
router.post('/api/register', function (req, res, next) {
  db.query(user.queryUserTel(req.body), function (error, results) {
    if (error) throw error
    if (results.length > 0) {
      res.send({
        code: 200,
        data: {
          success: false,
          msg: '用户已存在，无需注册',
          data: results[0]
        }
      })
    } else {
      db.query(user.insertUser(req.body), function (error, results) {
        db.query(user.queryUserTel(req.body), function (e, r) {
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '注册成功',
              data: r[0]
            }
          })
        })
      })

    }
  })
})

// 查询用户是否存在
router.post('/api/selectUser', function (req, res, next) {
  let params = {
    userTel: req.body.userTel
  }
  db.query(user.queryUserTel(params), function (error, results) {
    if (results.length > 0) {
      res.send({
        code: 200,
        data: {
          success: true
        }
      })
    } else {
      res.send({
        code: 300,
        data: {
          success: false,
          msg: '手机号不存在'
        }
      })
    }
  })
})

// 修改密码接口
router.post('/api/recovery', function (req, res, next) {
  let params = {
    userTel: req.body.userTel,
    userPwd: req.body.userPwd
  }
  db.query(user.queryUserTel(params), function (error, results) {
    let id = results[0].id
    db.query(`update users_list set pwd='${params.userPwd}' where id=${id}`, function (error, results) {
      res.send({
        code: 0,
        data: {
          success: true,
          msg: '修改成功'
        }
      })
    })
  })
})

// 加入购物车接口
router.post('/api/addCart', function (req, res, next) {
  // 获取到商品id
  const goodId = req.body.goodId
  const token = req.headers.token
  const tokenObj = jwt.decode(token)
  db.query(user.queryUserTel(tokenObj), function (error, results) {
    if (error) console.log(error)
    // 获取到用户id
    let uId = results[0].id
    // 查询该用户购物车中是否已经存在该商品
    db.query(`select * from goods_cart where goods_id=${goodId} and uid=${uId}`, function (error, results) {
      if (error) console.log(error)
      // 商品已添加，无需存入
      if (results.length > 0) {
        res.send({
          code: 201,
          success: false,
          msg: '该商品已存在购物车中'
        })
        // 商品未添加
      } else {
        // 查询商品信息
        db.query(`select * from goods_list where id=${goodId}`, function (error, results) {
          if (error) console.log(error)
          let goodInfo = {
            ...results[0]
          }
          // 向用户购物车中插入新商品
          db.query(`insert into goods_cart (uid, goods_id, goods_name, goods_price, goods_imgUrl) value ('${uId}', '${goodId}', '${goodInfo.name}', '${goodInfo.price}', '${goodInfo.imgUrl}')`, function (error, results) {
            if (error) console.log(error)
            res.send({
              code: 200,
              success: true,
              msg: '添加成功'
            })
          })
        })
      }
    })
  })
})

// 查询购物车接口
router.post('/api/selectCart', function (req, res, next) {
  const token = req.headers.token
  const tokenObj = jwt.decode(token)
  db.query(user.queryUserTel(tokenObj), function (error, results) {
    if (error) console.log(error)
    
    let uId = results[0].id
    db.query(`select * from goods_cart where uid=${uId}`, function (error, results) {
      if (error) console.log(error)
      if (results.length > 0) {
        res.send({
          code: 200,
          success: true,
          cartList: results
        })
      } else {
        res.send({
          code: 301,
          success: false,
          cartList: results,
          msg: '购物车没有商品'
        })
      }

    })
  })
})
// 删除购物车数据
router.post('/api/deleteCart', function (req, res, next) {
  let idArr = req.body.idArr
  idArr.forEach(element => {
    db.query(`delete from goods_cart where id=${element}`, function (error, results) {
      if (error) console.log(error)
    })
  });
  res.send({
    code: 200,
    success: true,
    msg: '删除成功!'
  })
})

// 修改购物车商品数量
router.post('/api/updateNum', function (req, res, next) {
  let params = {
    ...req.body
  }
  db.query(`select * from goods_cart where id=${params.id}`, function (error, results) {
    if (error) console.log(error)
    let num = results[0].goods_num
    db.query(`update goods_cart set goods_num = replace(goods_num,${num},${params.num}) where id = ${params.id}`, function (error, results) {
      if (error) console.log(error)
      res.send({
        code: 200,
        success: true
      })
    })
  })
})

// 新增收货地址
router.post('/api/addAddress', function (req, res, next) {
  // 识别用户
  const token = req.headers.token
  const tokenObj = jwt.decode(token)
  // 获取参数
  const data = req.body
  data.isDefault = data.isDefault ? 1 : 0
  const [name, tel, province, city, county, addressDetail, isDefault, areaCode] = [data.name, data.tel, data.province, data.city, data.county, data.addressDetail, data.isDefault, data.areaCode]
  // 获取用户 id
  db.query(user.queryUserTel(tokenObj), function (error, results) {
    if (error) console.log(error)
    let uId = results[0].id
    // 判断新地址是否位默认地址
    if (isDefault != 1) {
      // 不是默认地址，直接插入数据
      db.query(`insert into address_list (uId, name, tel, province, city, county, addressDetail, isDefault, areaCode) values ('${uId}', '${name}', '${tel}', '${province}', '${city}', '${county}', '${addressDetail}', '${isDefault}', '${areaCode}')`, function (error, results) {
        if (error) console.log(error)
        res.send({
          code: 200,
          success: true,
          msg: '添加成功!'
        })
      })
    } else {
      // 是默认地址, 查询表中的默认地址 id
      db.query(`select * from address_list where uId='${uId}' and isDefault=1`, function (error, results) {
        if (error) console.log(error)
        // 判断表中是否存在用户的默认地址
        if (results.length == 0) {
          // 非默认地址 ,直接插入新地址
          db.query(`insert into address_list (uId, name, tel, province, city, county, addressDetail, isDefault, areaCode) values ('${uId}', '${name}', '${tel}', '${province}', '${city}', '${county}', '${addressDetail}', '${isDefault}', '${areaCode}')`, function (error, results) {
            if (error) console.log(error)
            res.send({
              code: 200,
              success: true,
              msg: '添加成功!'
            })
          })
        } else {
          // 有默认地址，获取默认地址id
          let addressId = results[0].id
          // 更改 地址 默认状态
          db.query(`update address_list set isDefault = replace(isDefault,'1','0') where id = ${addressId}`, function () {
            // 插入新地址
            db.query(`insert into address_list (uId, name, tel, province, city, county, addressDetail, isDefault, areaCode) values ('${uId}', '${name}', '${tel}', '${province}', '${city}', '${county}', '${addressDetail}', '${isDefault}', '${areaCode}')`, function (error, results) {
              if (error) console.log(error)
              res.send({
                code: 200,
                success: true,
                msg: '添加成功!'
              })
            })
          })


        }

      })
    }
  })
})

// 查询收获地址
router.post('/api/selectAddress', function (req, res, next) {

  const token = req.headers.token
  const tokenObj = jwt.decode(token)
  db.query(user.queryUserTel(tokenObj), function (error, results) {
    if (error) console.log(error)
    let uId = results[0].id
    db.query(`select * from address_list where uId='${uId}'`, function (error, results) {
      if (error) console.log(error)
      res.send({
        code: 200,
        success: true,
        data: results
      })
    })
  })

})

// 修改收获地址
router.post('/api/updateAddress', function (req, res, next) {
  // 识别用户
  const token = req.headers.token
  const tokenObj = jwt.decode(token)
  // 获取参数
  const data = req.body
  data.isDefault = data.isDefault ? 1 : 0
  const [id, name, tel, province, city, county, addressDetail, isDefault, areaCode] = [data.id, data.name, data.tel, data.province, data.city, data.county, data.addressDetail, data.isDefault, data.areaCode]
  // 获取用户 id
  db.query(user.queryUserTel(tokenObj), function (error, results) {
    if (error) console.log(error)
    let uId = results[0].id
    // 判断新地址是否位默认地址
    if (isDefault != 1) {
      // 非默认地址，直接更新地址
      let sql = 'update address_list set name=?, tel=?, province=?, city=?, county=?, addressDetail=?, isDefault=?, areaCode=? where id=?'
      db.query(sql, [name, tel, province, city, county, addressDetail, isDefault, areaCode, id], function (error, results) {
        if (error) console.log(error)
        res.send({
          code: 200,
          success: true,
          msg: '修改成功'
        })
      })
    } else {
      // 是默认地址，查询表中该用户默认地址id
      db.query(`select * from address_list where uId='${uId}' and isDefault=1`, function (error, results) {
        if (error) console.log(error)
        // 判断表中是否存在用户的默认地址
        if (results.length == 0) {
          // 表中用户没有默认地址，直接更新该地址
          let sql = 'update address_list set name=?, tel=?, province=?, city=?, county=?, addressDetail=?, isDefault=?, areaCode=? where id=?'
          db.query(sql, [name, tel, province, city, county, addressDetail, isDefault, areaCode, id], function (error, results) {
            if (error) console.log(error)
            res.send({
              code: 200,
              success: true,
              msg: '修改成功'
            })
          })
        } else {
          // 表中用户已有默认地址 获取默认地址id
          let addressId = results[0].id
          // 更改 该地址 默认状态
          db.query(`update address_list set isDefault = replace(isDefault,'1','0') where id = ${addressId}`, function () {
            // 更新地址
            let sql = 'update address_list set name=?, tel=?, province=?, city=?, county=?, addressDetail=?, isDefault=?, areaCode=? where id=?'
            db.query(sql, [name, tel, province, city, county, addressDetail, isDefault, areaCode, id], function (error, results) {
              if (error) console.log(error)
              res.send({
                code: 200,
                success: true,
                msg: '修改成功'
              })
            })
          })
        }
      })
    }
  })
})
// 删除收获地址
router.post('/api/deleteAddress', function (req, res, next) {
  const addressId = req.body.addressId
  db.query(`delete from address_list where id=${addressId}`, function (error, results) {
    if (error) console.log(error)
    res.send({
      code: 200,
      success: true,
      msg: '删除成功'
    })
  })
})
//生成一个订单
router.post('/api/addOrder', function (req, res, next) {
  //token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //前端给后端的数据
  let goodsArr = req.body.arr
  //生成订单号order_id，规则：时间戳 + 6为随机数
  function setTimeDateFmt(s) {
    return s < 10 ? '0' + s : s
  }
  function randomNumber() {
    const now = new Date()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    month = setTimeDateFmt(month)
    day = setTimeDateFmt(day)
    hour = setTimeDateFmt(hour)
    minutes = setTimeDateFmt(minutes)
    seconds = setTimeDateFmt(seconds)
    let orderCode = now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString()
    return orderCode
  }
  /*
  未支付：1
  待支付：2
  支付成功：3
  支付失败：4 | 0
  */
  //商品列表名称
  let goodsName = []
  //订单商品总金额
  let goodsPrice = 0
  //订单商品总数量
  let goodsNum = 0;
  //订单号
  let orderId = randomNumber()

  goodsArr.forEach(v => {
    goodsName.push(v.goods_name);
    goodsPrice += v.goods_price * v.goods_num;
    goodsNum += parseInt(v.goods_num);
  })
  //查询当前用户
  db.query(user.queryUserTel(tokenObj), function (error, results) {
    //用户id
    let uId = results[0].id;

    db.query(`insert into store_order (order_id,uId,goods_name,goods_price,goods_num,order_status) values ('${orderId}', ${uId},'${goodsName}','${goodsPrice}','${goodsNum}','1')`, function () {
      db.query(`select * from store_order where uId = ${uId} and order_id='${orderId}'`, function (err, result) {
        res.send({
          data: {
            success: true,
            code: 200,
            data: result
          }
        })
      })
    })
  })
})
//查询订单
router.post('/api/selectOrder', function (req, res, next) {
  //接收前端给后端的订单号
  let orderId = req.body.orderId
  db.query(`select * from store_order where order_id='${orderId}'`, function (err, result) {
    res.send({
      data: {
        success: true,
        code: 200,
        data: result
      }
    })
  })
})
module.exports = router
