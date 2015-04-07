//15/4/07 qzguo
//这是通过evaluate()方法来获取dom元素。检测页面简单元素。
//命令行输入：phantomjs QinTest4.js
//第二个值是本文件的名字

var page = require('webpage').create();
page.open('http://phantomjs.org/quick-start.html', function(status) { //第一个参数是目标网页url
  var title = page.evaluate(function() { //该方法获取到文档的title。
    return document.title;
  });
  console.log('Page title is ' + title);
  phantom.exit();
});
