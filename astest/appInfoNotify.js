var http = require('http'); 

//-------------------------------------------------------
//1.plain text [BEGIN]
//var content = '<?xml version="1.0" encoding="utf-8" ?><Request><Appid>ff8080813bbcae3f013bbcae74540000</Appid><action>modify</action></Request>';
//1.plain text [END]
//-------------------------------------------------------

//-------------------------------------------------------
//2.json to xml [BEGIN]
var xml2js = require('xml2js');

var jsonBuilder = new xml2js.Builder({
   rootName:'Request',
   xmldec:{
      version:'1.0',
      'encoding': 'utf-8'
    }
}); // jons -> xml

var json = {
  'Appid': 'ff8080813bbcae3f013bbcae74540000',
  'action': 'modify'
};

var content = jsonBuilder.buildObject(json);
//2.json to xml [END]
//-------------------------------------------------------
var options = {  
    hostname: '192.168.180.79',  
    port: 10500,  
    path: '/appinfonotify',  
    method: 'POST',  
    headers: {
      'Accept': '*/*',
      'Content-Type': 'text/xml; charset=utf-8',
      'User-Agent': 'Hisun',
      'Host': 'Hisunsray',
      'Cache-Control': 'no-cache',
      'Connection': 'close'
    }  
};  
  
var req = http.request(options, function (res) {  
    console.log('STATUS: ' + res.statusCode);  
    console.log('HEADERS: ' + JSON.stringify(res.headers));  
    res.setEncoding('utf8');  
    res.on('data', function (chunk) {  
        console.log('BODY: ' + chunk);  
    });  
});
  
req.on('error', function (e) {  
    console.log('problem with request: ' + e.message);
});
  
// write data to request body  
req.write(content);  
  
req.end();