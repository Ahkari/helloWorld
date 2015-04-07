//15/4/07 qzguo
//这是用onResourceRequested和onResourceReceived来追踪请求和响应状态。
//命令行输入：phantomjs QinTest6.js
//第二个值是本文件的名字

var page = require('webpage').create();
page.onResourceRequested = function(request) {
  console.log('Request ' + JSON.stringify(request, undefined, 4)); //请求信息
};
page.onResourceReceived = function(response) {
  console.log('Receive ' + JSON.stringify(response, undefined, 4)); //响应信息
};
page.open('../../testJsonForQinTest6.json'); //这里面内容貌似不能解析，这个方法只是单纯的查看请求和响应的信息。这里的url是目标地址。


