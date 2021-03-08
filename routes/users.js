const helper = require('./helper');
var express = require('express');
// var dbHelper = require('./dbHelper.js');
var router = express.Router();
var URL = require('url');

router.get('/check',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/getUserInfo?id=1
  var params = URL.parse(req.url, true).query;
  // console.log(params);
  console.log(params.xh)
  console.log(params.pwd)
  helper.sql('select * from S where xh='+params.xh+"and pwd="+params.pwd, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result)
    this.result = result
    res.send(result)
  });
})

router.get('/getStudent',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/getUserInfo?id=1
  var params = URL.parse(req.url, true).query;
  // console.log(params);
  console.log(params.xh)
  helper.sql('select * from E where xh='+params.xh, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result)
    this.result = result
    res.send(result)
  });
})

router.get('/add',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/add?pid=001&pmc=个人事务管理系统&gh=8765001&xm=吴琪
  var params = URL.parse(req.url, true).query;
  console.log(params.pid);
  console.log(params.pmc);
  console.log(params.gh);
  console.log(params.xm);
  console.log(params.xh);
  var insertstring = "'"+params.pid+"','"+params.pmc+"','"+params.gh+"','"+params.xm+"'"
  // insert into O values('001','个人事务管理系统','8765001','吴琪')
  console.log(insertstring)
  helper.sql("insert into O values("+insertstring+")", err => {
    if (err) {
      console.log("error:" + err);
      res.send(0)
    } else {
      console.log("Ok!");
      res.send(1)
    }
  });
})

router.get('/deletechosenproject',function(req,res,next){
  var result = ''
  var params = URL.parse(req.url, true).query;
  console.log(params.pid);
  console.log(params.xh);
  helper.sql("delete O where "+params.xh+"= xh and "+params.pid+" = pid", err => {
    if (err) {
      console.log("error:" + err);
    } else {
      console.log("Ok!");
    }
  })
})

router.get('/deletechosenstudent',function(req,res,next){
  var result = ''
  var params = URL.parse(req.url, true).query;
  console.log(params.pid);
  console.log(params.xh);
  helper.sql("delete O where "+params.xh+"= xh and "+params.pid+" = pid", err => {
    if (err) {
      console.log("error:" + err);
    } else {
      console.log("Ok!");
    }
  })
})




router.get('/update',function(req,res,next){
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
