//搭建简单HTTP服务器，任何请求都返回hello world
var http=require('http');

http.createServer(function(req,res){
	res.writeHead(200,{'Content-Tyep':'text/plain'});
	res.end('Hello World\n');

}).listen(8080);//http.createServer

console.log('Server running on port 8080.');























