var obj = require("./ceshi.js");
//console.log(obj.sayHello("222"));
console.log('%s:%d', 'hello', 25);
var http = require("http");
http.createServer(function(req, res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write('<h1>Node.js</h1>');
	res.end('<p>hello world</p>');
}).listen(4000);