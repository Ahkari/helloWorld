//15/4/07 qzguo
//简单的页面截屏。
//命令行输入：phantomjs QinTest2.js
//第二个值是本文件名

var page=require('webpage').create();    //创建了网页对象
page.open('https://github.com/Ahkari',	 function(status) {   //这里的地址是网页对象的目标网页。
  console.log("Status: " + status);      //输出打开网页动作的状态
  if(status === "success") {     //命令行会提示success
    page.render('example.png');  //在bin文件夹内生成目标网页截图
  }
  phantom.exit();  
});