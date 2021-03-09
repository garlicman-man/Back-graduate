const helper = require('./helper');
var express = require('express');
// var dbHelper = require('./dbHelper.js');
var router = express.Router();
var URL = require('url');

router.get('/check',function(req,res,next){
  var result = ''
  var params = URL.parse(req.url, true).query;
  console.log(params.xh)
  console.log(params.pwd)
  helper.sql('select * from S where xh='+params.xh+"and pwd="+params.pwd, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result)
    this.result = result
    if(result.recordset.length == 1){
      res.send(result)
    }
    else{
      helper.sql('select * from T where gh='+params.xh+"and pwd="+params.pwd, function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log(result)
        this.result = result
        res.send(result)
      })
    }

  });
})

router.get('/getStudentChosen',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/getUserInfo?id=1
  var params = URL.parse(req.url, true).query;
  // console.log(params);
  console.log(params.xh)
  helper.sql('select E.pid,P.pmc,E.gh,T.xm from E,T,P where E.gh = T.gh and E.pid = P.pid and E.xh = '+ params.xh, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result)
    this.result = result
    res.send(result)
  });
})

router.get('/getTeacherChosen',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/getUserInfo?id=1
  var params = URL.parse(req.url, true).query;
  // console.log(params);
  console.log(params.gh)
  helper.sql('select F.pid,P.pmc,S.xh,S.xm from F,P,S where F.xh = S.xh and F.pid = P.pid and F.gh = '+ params.gh, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result)
    this.result = result
    res.send(result)
  });
})

router.get('/getAllProjectsExceptSelected',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/getUserInfo?id=1
  var params = URL.parse(req.url, true).query;
  // console.log(params);
  // console.log(params.xh)
  helper.sql('select distinct* from O where O.pid not in(select A.pid from(select pid,gh from E where xh='+ params.xh+')as A)', function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result)
    this.result = result
    res.send(result)
  });
})

router.get('/getAllStudentsExceptSelected',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/getUserInfo?id=1
  var params = URL.parse(req.url, true).query;
  // console.log(params);
  // console.log(params.xh)
  helper.sql('select A.pid,P.pmc,A.xh,S.xm from ((select * from E where E.gh='+params.gh+') except (select * from F where F.gh='+params.gh+'))as A join S on S.xh=A.xh join P on P.pid=A.pid', function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result)
    this.result = result
    res.send(result)
  });
})
// insert into E values('005','8765001','18145012')
router.get('/chooseProject',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/add?pid=001&pmc=个人事务管理系统&gh=8765001&xm=吴琪
  var params = URL.parse(req.url, true).query;
  console.log(params.pid);
  console.log(params.gh);
  console.log(params.xh);
  var insertstring = "'"+params.pid+"','"+params.gh+"','"+params.xh+"'"

  // insert into O values('001','个人事务管理系统','8765001','吴琪')
  console.log(insertstring)
  helper.sql("insert into E values("+insertstring+")", err => {
    // insert into E values('001','个人事务管理系统','8765001','吴琪',  '18145001')
    if (err) {
      console.log("error:" + err);
    } else {
      console.log("Ok!");
    }
  });
})

router.get('/chooseStudent',function(req,res,next){
  var result = ''
  // http://localhost:8080/apis/users/add?pid=001&pmc=个人事务管理系统&gh=8765001&xm=吴琪
  var params = URL.parse(req.url, true).query;
  console.log(params.pid);
  console.log(params.gh);
  console.log(params.xh);
  var insertstring = "'"+params.pid+"','"+params.gh+"','"+params.xh+"'"

  console.log(insertstring)
  helper.sql("insert into F values("+insertstring+")", err => {
    if (err) {
      console.log("error:" + err);
    } else {
      console.log("Ok!");
    }
  });
})

router.get('/deletechosenproject',function(req,res,next){
  var result = ''
  var params = URL.parse(req.url, true).query;
  console.log(params.pid);
  console.log(params.xh);
  console.log(params.gh);
  helper.sql("delete E where "+params.xh+"= xh and "+params.pid+" = pid and "+params.gh+"= gh", err => {
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
  console.log(params.gh);
  helper.sql("delete F where "+params.xh+"= xh and "+params.pid+" = pid and "+params.gh+" = gh", err => {
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
