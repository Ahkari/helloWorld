define(["demo_test","novel_test","common_test"],function(demo_test,novel_test,common_test){
//需要测试什么部分，就添加进依赖中。
// define(["demo_test","novel_test"],function(demo_test,novel_test){


// define(["demoTest","./test/app/controller/novel.test"],function(demoTest,novelTest){
//define(["demoTest"],function(demoTest){



//mocha框架主入口
if (window.mochaPhantomJS) { 
    mochaPhantomJS.run(); 
    console.log("mocha-phantomjs is run");
}else { 
 	   mocha.run();
       console.log("mocha run"); 
}





});//define


      