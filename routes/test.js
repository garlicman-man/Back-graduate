
const helper = require('./helper');

helper.sql('select * from E', function (err, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('data :', result.rowsAffected);
  console.log('data :', result.recordset[0].xh);
  return result;
});



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
// helper.sql("insert into dbo.tableName(obj)values(@addObj)", err => {
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
