const helper = require('./helper');
var express = require('express');
// var dbHelper = require('./dbHelper.js');
var router = express.Router();

var URL = require('url');


router.get('/getUserInfo',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/getUserInfo?id=1
  var params = URL.parse(req.url, true).query;

  helper.sql('select * from E', function (err, result) {
    if (err) {
      console.log(err);

    }
    this.result = result
    console.log(result)
    res.send(result.recordset)
  });

})

/*
 * 查询所有
 * @param tableName
 * @param result
 */
// helper.sql('select * from E', function (err, result) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('data :', result);
// });
//
// /*
//  * 修改
//  * @param updateObj     修改内容（必填）
//  * @param whereObj      修改对象（必填）
//  * @param tableName     表名
//  * @param callBack(err,recordset)
//  */
// helper.sql("update dbo.tableName set name = @updateObj where id = @whereObj", err => {
//   if (err) {
//     console.log("error:" + err);
//     return;
//   } else {
//     console.log('Ok!');
//   }
// });
//
// /*
//  * 添加
//  * @param addObj    添加对象（必填）
//  * @param tableName 表名
//  * @param callBack(err,recordset)
//  */
// var tempobj = "1299','李2','男','1993-03-06','上海','13613005466','02'"

// helper.sql("insert into S values(@addObj)", err => {
//   if (err) {
//     console.log("error:" + err);
//   } else {
//     console.log("Ok!");
//   }
// })
//
// /*
//  * 删除
//  * @param whereObj    删除对象（必填）
//  * @param tableName 表名
//  * @param callBack(err,recordset)
//  */
// helper.sql("delete dbo.tableName where 1 = 1 and id = @whereObj", err => {
//   if (err) {
//     console.log("error:" + err);
//   } else {
//     console.log("Ok!");
//   }
// })

// var express = require('express');
// var router = express.Router();
// const helper = require('./helper');
// var db = require('./db')
//
// function User()
// {
//   this.name='';
//   this.age=0;
//   this.sex='';
// }
// var URL = require('url');
// /* GET users listing. */
// // router.get('/', function(req, res, next) {
// //   res.send('respond with a resource');
// // });
// router.get('/getUserInfo',function(req,res,next){
//   var user = new User();
//   var result = ''
//   // http://localhost:8080/apis/users/getUserInfo?id=1
//   var params = URL.parse(req.url, true).query;
//
//
//     helper.sql('select * from E', function (err, result) {
//         if (err) {
//             console.log(err);
//
//         }
//         this.result = result
//         console.log(result)
//         res.send(result)
//     });
//
// })

module.exports = router;
