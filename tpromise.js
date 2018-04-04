var Promise = require('bluebird');
var mysql = require('mysql');
var config = require('./config');

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

//test promise with mysql
//main();
//testmysql();
testmysqlpool();

function main() {
	console.log('main begin');

	divide(10,3).then(function(result) {
		console.log('result=' + result);
	}, function() {
		console.log('error in divide');
	});

	console.log('main end');
}

function divide(a, b) {
	console.log('divide begin');

	var intA = parseInt(a, 10);
	var intB = parseInt(b, 10);
	if (intB !== 0) {
		return Promise.resolve(intA/intB);
	}
	else {
		return Promise.resolve(intA/intB);
		//return Promise.resolve(null);			
	}
}

function testmysql() {
	//var mySqlPool = mysql.createPool(config.mysql);
	//var connection = mysql.createConnection(config.mysql);
	var connection = mysql.createConnection({
	    host: '192.168.179.156',
	    port: '3306',
        user: 'openser',
        password: 'kaifaopenserpass',
        database: 'openser'
	});

	console.log('line: 48');

	connection.connect();

	console.log('line: 52');

	var sql = 'select * from ccp_application where appid=\'00000000414f610f01414fba566f0009\'';
	connection.query(sql, function(error, result){
		if (error) {
			throw error;
			return;
		}
		console.log('line: 56');
		console.log('result:' + result[0].appId + ',' + 'accountId: ' + result[0].friendlyName);
		console.log('result2:' + JSON.stringify(result[0]));
	});

	connection.end();
}

function testmysqlpool() {
	console.log('>>>testmysqlpool');
	var mySqlPool = mysql.createPool({
		connectionLimit: 10,
	    host: '192.168.179.156',
	    port: '3306',
        user: 'openser',
        password: 'kaifaopenserpass',
        database: 'openser'
	});

	/*mySqlPool.getConnection(function(err,connection) {  
        if(err) {  
            console.log("建立连接失败");  
        }else{  
            console.log("建立连接成功");  
            console.log(mySqlPool._allConnections.length);//1   
            connection.query('select * from user',function(err,rows) {  
                if (err) {  
                    console.log("查询失败");  
                } else{  
                    console.log(rows);                 
                }  
                //connection.destroy();  
                console.log(mySqlPool._allConnections.length);//0      
            });
        }  
    });*/
    var sql = 'select * from ccp_application where appid=\'00000000414f610f01414fba566f0009\'';
    var result;
    mySqlPool.queryAsync(sql, result);
    console.log('result:' + JSON.stringify(result));
	mySqlPool.end();
}