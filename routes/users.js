const helper = require('./helper');
var express = require('express');
// var dbHelper = require('./dbHelper.js');
var router = express.Router();
var URL = require('url');

router.get('/getUserInfo',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/getUserInfo?id=1
  var params = URL.parse(req.url, true).query;
  console.log(params);
  helper.sql('select * from E', function (err, result) {
    if (err) {
      console.log(err);
    }
    this.result = result
    console.log(result)
    // res.send(result.recordset)
    res.send(JSON.stringify(result))
  });
})

router.get('/add',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/getUserInfo?id=1
  var params = URL.parse(req.url, true).query;
  var tempobj = "1299','李2','男','1993-03-06','上海','13613005466','02'"
  helper.sql("insert into S values(@addObj)", err => {
    if (err) {
      console.log("error:" + err);
    } else {
      console.log("Ok!");
    }
  })
})
router.get('/add',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/getUserInfo?id=1
  var params = URL.parse(req.url, true).query;
  helper.sql("delete dbo.E where 1 = 1 and id = @whereObj", err => {
    if (err) {
      console.log("error:" + err);
    } else {
      console.log("Ok!");
    }
  })
})
router.get('/add',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/getUserInfo?id=1
  var params = URL.parse(req.url, true).query;
  helper.sql("update dbo.E set name = @updateObj where id = @whereObj", err => {
    if (err) {
      console.log("error:" + err);
      return;
    } else {
      console.log('Ok!');
    }
  });
})

module.exports = router;
