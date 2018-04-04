var express = require('express');
var app = express();

//1.test express.get() express.set()
app.set('attr', 'value1');
var value = app.get('attr');
console.log(value);

//2.http server
app.get('/', function(req, res){
	res.send('Hello World! Express');
});

var server = app.listen(8081, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});