//测试用例:在移动互联任务管理系统的需求管理中新建一个需求。
//完成检验：记录操作前后截屏结果，并确认操作后的页面有没有生成正确的结果。
//


var page=require('webpage').create();
var system=require('system');
var t;
var address;

if (system.args.length===1){
	console.log('Usage:mian.js <some URL>');
	phantom.exit();
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














