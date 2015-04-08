//通过浏览器请求访问你放在public中任何文件，包括html图片等。



var express=require('express');
var app=express();

app.use(express.static(__dirname+'/public')); //默认进入public文件夹

app.listen(8080);














