const helper2 = require('./test');

// console.log(temp.error)
try{
    var result = ""
    result= helper2.sql("select * from s")
    if(result.error != -1){
        console.log(result.length)
        console.log(result)
    }
    else{
        console.log("error")
    }
}catch(err){
    console.log( 'error occured!',err );
}


