/**
 * Created by 张凡颖 on 2015/10/9.
 */
var mssql = require('mssql');
var user = "sa",
    password = "sa",
    server = "192.168.20.153",
    database = "GG_ChatDB";

/**
 * 默认config对象
 * @type {{user: string, password: string, server: string, database: string, options: {encrypt: boolean}, pool: {min: number, idleTimeoutMillis: number}}}
 */
var config = {
    user: user,
    password: password,
    server: server, // You can use 'localhost\\instance' to connect to named instance
    database: database,
    options: {
        encrypt: true // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        idleTimeoutMillis: 3000
    }
};

/**
 * 初始化config
 * @param user
 * @param password
 * @param server
 * @param database
 */
var initConfig = function (user, password, server, database) {
    config = {
        user: user,
        password: password,
        server: server, // You can use 'localhost\\instance' to connect to named instance
        database: database,
        options: {
            encrypt: true // Use this if you're on Windows Azure
        },
        pool: {
            min: 0,
            idleTimeoutMillis: 3000
        }
    }
};

/**
 * 恢复默认config
 */
var restoreDefaults = function () {
    config = {
        user: user,
        password: password,
        server: server, // You can use 'localhost\\instance' to connect to named instance
        database: database,
        options: {
            encrypt: true // Use this if you're on Windows Azure
        },
        pool: {
            min: 0,
            idleTimeoutMillis: 3000
        }
    };
};

/**
 * 执行原生Sql
 * @param sql
 * @params 参数对象(可为空，为空表示不加参数)
 * @param callBack(err,recordset)
 */
var querySql = function (sql, params, callBack) {
    var connection = new mssql.ConnectionPool(config, function (err){
        // var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        if (params != "") {
            for (var index in params) {
                if (typeof params[index] == "number") {
                    ps.input(index, mssql.Int);
                } else if (typeof params[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                }
            }
        }
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(params, function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

//querySql("select id as roleId,roleName from dbo.role","",function(err,recordset){
//   console.dir(recordset);
//});

/**
 * 带参数查询
 * @param tableName 表名
 * @param topNumber 前topNumber条
 * @param whereSql  whereSql
 * @param params    查询参数对象（可为""，为""表示不加任何参数，如果此项为""，则whereSql必须也为""）
 * @param orderSql  排序Sql（可为""，为""表示不排序）
 * @param callBack
 */
var select = function (tableName, topNumber, whereSql, params, orderSql, callBack) {
    var connection = new mssql.ConnectionPool(config, function (err){
        var ps = new mssql.PreparedStatement(connection);
        var sql = "select * from " + tableName + " ";
        if (topNumber != "") {
            sql = "select top(" + topNumber + ") * from " + tableName + " ";
        }
        sql += whereSql + " ";
        if (params != "") {
            for (var index in params) {
                if (typeof params[index] == "number") {
                    ps.input(index, mssql.Int);
                } else if (typeof params[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                }
            }
        }
        sql += orderSql;
        console.log(sql);
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(params, function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

//select("dbo.userTable",3,"","","order by id",function(err,recordset){
//    console.log(recordset);
//});

/**
 * 查询所有
 * @param tableName
 * @param callBack
 */
var selectAll = function (tableName, callBack) {
    var connection = new mssql.ConnectionPool(config, function (err){
        var ps = new mssql.PreparedStatement(connection);
        var sql = "select * from " + tableName + " ";
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute("", function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

//selectAll("dbo.userTable",function(err,recordset){
//   console.log(recordset);
//});

/**
 * 添加
 * @param addObj    添加对象（必填）
 * @param tableName 表名
 * @param callBack(err,recordset)
 */
var add = function (addObj, tableName, callBack) {
    var connection = new mssql.ConnectionPool(config, function (err){
        var ps = new mssql.PreparedStatement(connection);
        var sql = "insert into " + tableName + "(";
        if (addObj != "") {
            for (var index in addObj) {
                if (typeof addObj[index] == "number") {
                    ps.input(index, mssql.Int);
                } else if (typeof addObj[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                }
                sql += index + ",";
            }
            sql = sql.substring(0, sql.length - 1) + ") values(";
            for (var index in addObj) {
                if (typeof addObj[index] == "number") {
                    sql += addObj[index] + ",";
                } else if (typeof addObj[index] == "string") {
                    sql += "'" + addObj[index] + "'" + ",";
                }
            }
        }
        sql = sql.substring(0, sql.length - 1) + ")";
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(addObj, function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

//add({userName:"admin",loginTimes:555},"dbo.userTable",function(err,recordset){
//    console.log(recordset);
//});

/**
 * 修改
 * @param updateObj     修改内容（必填）
 * @param whereObj      修改对象（必填）
 * @param tableName     表名
 * @param callBack(err,recordset)
 */
var update = function (updateObj, whereObj, tableName, callBack) {
    var connection = new mssql.ConnectionPool(config, function (err){
        var ps = new mssql.PreparedStatement(connection);
        var sql = "update " + tableName + " set ";        //update userTable set userName = 'admin',loginTimes = 12,password = 'admin'
        if (updateObj != "") {
            for (var index in updateObj) {
                if (typeof updateObj[index] == "number") {
                    ps.input(index, mssql.Int);
                    sql += index + "=" + updateObj[index] + ",";
                } else if (typeof updateObj[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                    sql += index + "=" + "'" + updateObj[index] + "'" + ",";
                }
            }
        }
        sql = sql.substring(0, sql.length - 1) + " where ";
        if (whereObj != "") {
            for (var index in whereObj) {
                if (typeof whereObj[index] == "number") {
                    ps.input(index, mssql.Int);
                    sql += index + "=" + whereObj[index] + " and ";
                } else if (typeof whereObj[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                    sql += index + "=" + "'" + whereObj[index] + "'" + " and ";
                }
            }
        }
        sql = sql.substring(0, sql.length - 5);
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(updateObj, function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

//update({userName:"awdawdaw",password:"awdawdwad"},{id:1},"dbo.userTable",function(err,recordset){
//   console.log(recordset);
//});

/**
 * 删除
 * @param deleteObj 删除对象
 * @param tableName 表名
 * @param callBack(err,recordset)
 */
var del = function (whereSql, params, tableName, callBack) {
    var connection = new mssql.ConnectionPool(config, function (err){
        var ps = new mssql.PreparedStatement(connection);
        var sql = "delete from " + tableName + " ";
        if (params != "") {
            for (var index in params) {
                if (typeof params[index] == "number") {
                    ps.input(index, mssql.Int);
                } else if (typeof params[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                }
            }
        }
        sql += whereSql;
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(params, function (err, recordset) {
                callBack(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};

//del("where id = @id",{id:16},"dbo.userTable",function(err,recordset){
//    console.log(recordset);
//});

exports.initConfig = initConfig;
exports.config = config;
exports.del = del;
exports.select = select;
exports.update = update;
exports.querySql = querySql;
exports.restoreDefaults = restoreDefaults;
exports.selectAll = selectAll;
exports.add = add;
