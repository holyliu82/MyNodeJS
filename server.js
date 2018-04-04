var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var root = __dirname;

http.createServer(function (req, res) {	
    console.log('Recv Http Req>>>');
    var url = parse(req.url);
    console.log('url=' + url.text);
    var path = join(root, url.pathname);
    console.log('path=' + path);

    res.writeHead(200, { 'Content-Type': 'text/plain' }); 
    res.end('Hello World\n'); 
}).listen(1337, "127.0.0.1"); 

console.log('Server running at http://127.0.0.1:1337/');