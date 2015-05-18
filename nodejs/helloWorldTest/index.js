var http = require('http');

//创建http服务器
var server = http.createServer(function(request,response){
	response.writeHead(200,{
		'Content-type' : 'text/plain'
	});
	
	response.write('Hello World!');

	response.end();

});

//监听端口8000
server.listen(8000);

//输出到控制套
console.log('Server running on port 8000')

