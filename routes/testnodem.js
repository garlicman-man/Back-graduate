var node_mssql = require('node-mssql');

var queryObj = new node_mssql.Query({
    host: 'localhost',	 // You can use 'x.x.x.x\\instance' to connect to named instance
    port: 1433,
    username: 'sa',
    password: '123456',
    database: 'school'
});


queryObj.table('dbo.E');

/* set update query condition */
queryObj.where('');

/* run update query and fetch response */
queryObj.select(function(results) {
    //  success callback
    console.log(results);
}, function(err, sql) {
    //  failed callback
    if(err)
        console.log(err);

    console.log(sql);
});
