//url: /2013-12-26/Accounts/:accountSid/ivr/batchdial

var http = require('http')
var program = require('commander')
var moment = require('moment')

//parse args
program
  .version('0.0.1')
  .option('-c, --count []', 'Count of numbers', '2')
  .option('-d, --degree []', 'Concurrent degree', '1')
  .parse(process.argv);

console.log('Count of numbers: ' + program.count);
console.log('Concurrent degree: ' + program.degree);

var count = -1;
var numbers = '';
if (isNaN(program.count)) {
	process.exit(-1)
} else {
	count = parseInt(program.count, 10);
}
var degree = -1;
if (isNaN(program.degree)) {
	process.exit(-2)
} else {
	degree = parseInt(program.degree, 10);
}

//http header
var option = {
	host: '115.29.163.144',
	port: 18302,
	path: '/2013-12-26/Accounts/aaf98f8951af2ba80151c222100f467d/ivr/batchdial',
	method: 'POST',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=utf-8',
		Connection: 'close'
	}
}

//construct http body
var body = {
	appId: '8a216da8621834ef0162190bf0c700ff',
	numbers: '19910370001,19910370002,19910370003,19910370004,19910370005,19910370006,19910370007,19910370008,19910370009,19910370010,19910370011,19910370012,19910370013,19910370014,19910370015,19910370016,19910370017,19910370018,19910370019,19910370020,19910370021,19910370022,19910370023,19910370024,19910370025,19910370026,19910370027,19910370028,19910370029,19910370030,19910370031,19910370032,19910370033,19910370034,19910370035,19910370036,19910370037,19910370038,19910370039,19910370040,19910370041,19910370042,19910370043,19910370044,19910370045,19910370046,19910370047,19910370048,19910370049,19910370050',
	count: 50,
	reqId: '998',
	disnumber: '17010374501',
	menuName: 'mytest'
}

for (var d = 0; d < degree; d++) {
	console.log('--degree--' + degree);
//http req
var req = http.request(option, function(res) {  
    console.log('<STATUS> ' + res.statusCode);  
    console.log('<HEADERS> \r\n' + JSON.stringify(res.headers));  
    res.setEncoding('utf8');  
    res.on('data', function (chunk) {  
        console.log('<BODY> \r\n' + chunk);  
    });
})

//http error handle
req.on('error', function (e) {  
    console.log('problem with request: ' + e.message);
})

//construct req.body.numbers
numbers='';
for(var i = 0; i < count; i++) {
	//console.log('--' + i + '--');
	if (numbers !== '') {
		numbers += ',';
	}
	if (i <= 10) {
		numbers += '1991037900' + i;
	} else if (i <= 100) {
		numbers += '199103790' + i;
	} else if (i <= 1000) {
		numbers += '19910379' + i;		
	}
}

body.numbers = numbers;
body.count = count;
body.reqId = d + 1000;

var bodyStr = JSON.stringify(body);
console.log('<Req Content>\r\n' + bodyStr);

req.write(bodyStr);

req.end();
}