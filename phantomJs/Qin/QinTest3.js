//15/4/07 qzguo
//这是用来测网页响应速度的。
//命令行输入：phantomjs QinTest3.js https://github.com/Ahkari
//第二个值是本文件的名字，第三个值是需要打开的目标网页地址。

var page = require('webpage').create(),     //创建了网页对象
  system = require('system'),    //system对象，存储必要参数如address
  t, address; 

if (system.args.length === 1) { //长度为一可能就是输入时缺少了地址参数。
  console.log('Usage: loadspeed.js <some URL>');
  phantom.exit(); //缺少参数就不执行测试直接退出
}

t = Date.now(); //当前时间
address = system.args[1];
page.open(address, function(status) {	//这里的address是地址参数。开始加载页面
  if (status !== 'success') {
    console.log('FAIL to load the address');   //加载失败就显示这个
  } else {	//加载成功
    t = Date.now() - t; //获得加载时长
    console.log('Loading ' + system.args[1]);	//可知system.args[1]的值就是address
    console.log('Loading time ' + t + ' msec');    //显示加载时长，单位ms
  }
  phantom.exit();
});
