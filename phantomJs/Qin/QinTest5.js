//15/4/07 qzguo
//这是用onConsoleMessage来整合console输出，优先输出原网页js，其次是测试脚本中的console，如A处。
//命令行输入：phantomjs QinTest5.js
//第二个值是本文件的名字

var page = require('webpage').create();
page.onConsoleMessage = function(msg) {
  console.log('Page title is ' + msg); //B处。onConsoleMessage方法统一输出。
};
page.open('../../testPageForQinTest5.html', function(status) {
  page.evaluate(function() {
    console.log(document.title+" ,hello,Lily");	//A处。这里的输出会在B处调用。
  	console.log("this is another testWord");	//A处
  });
  phantom.exit();
});

