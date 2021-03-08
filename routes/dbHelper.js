/**
 * Created by �ŷ�ӱ on 2015/10/9.
 */
var mssql = require('mssql');
var user = "sa",
    password = "sa",
    server = "192.168.20.153",
    database = "GG_ChatDB";

/**
 * Ĭ��config����
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
 * ��ʼ��config
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
 * �ָ�Ĭ��config
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
 * ִ��ԭ��Sql
 * @param sql
 * @params ��������(��Ϊ�գ�Ϊ�ձ�ʾ���Ӳ���)
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
 * ��������ѯ
 * @param tableName ����
 * @param topNumber ǰtopNumber��
 * @param whereSql  whereSql
 * @param params    ��ѯ�������󣨿�Ϊ""��Ϊ""��ʾ�����κβ������������Ϊ""����whereSql����ҲΪ""��
 * @param orderSql  ����Sql����Ϊ""��Ϊ""��ʾ������
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
 * ��ѯ����
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
 * ���
 * @param addObj    ��Ӷ��󣨱��
 * @param tableName ����
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
                ps.unprepare(function (err) {        //�������������ӳ�
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
 * �޸�
 * @param updateObj     �޸����ݣ����
 * @param whereObj      �޸Ķ��󣨱��
 * @param tableName     ����
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
                ps.unprepare(function (err) {        //�������������ӳ�
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
 * ɾ��
 * @param deleteObj ɾ������
 * @param tableName ����
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
                ps.unprepare(function (err) {        //�������������ӳ�
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
