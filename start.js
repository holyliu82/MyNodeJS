require('./app')();

var str = 'abc' 
	+ process.pid + 'end';
console.log('str:' + str);