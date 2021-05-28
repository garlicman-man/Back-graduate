let java = require("java"); //引入nodejs的java模块
java.classpath.push("../drivers/testjava.jar"); //导入编写的jar包


function myJDBCtool(tempstr) {
    var result = java.callStaticMethodSync("MyJDBC","mytest",tempstr)
    var j = JSON.parse(result)
    return j
}

exports.sql= myJDBCtool;

// var result = java.callStaticMethodSync("MyJDBC","mytest","select * from z")
// var j = JSON.parse(result)
// console.log(j)








// var async = require('async');

// java.classpath.push('../drivers')



// let MyJDBC = java.import('MyJDBC')

// const HashMap = java.import('java.util.HashMap')
// const List = java.import('java.util.List');
// const Map = java.import('java.util.Map')
// let dbutil = Dbutil();
// let myjdbc = MyJDBC();
// let Dbutil = java.import('Util.Dbutil')
