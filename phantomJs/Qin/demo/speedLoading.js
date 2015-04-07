//测试用例:对移动互联任务管理系统进行页面加载时间的测试。
//测试对象:我的工作台：http://172.16.95.87:6363/rwgl/dashboard
//         里程碑管理：http://172.16.95.87:6363/rwgl/milestone
//         需求管理：http://172.16.95.87:6363/rwgl/requirement
//         任务管理：http://172.16.95.87:6363/rwgl/task
//         统计分析：http://172.16.95.87:6363/rwgl/statistics
//         月度重点工作：http://172.16.95.87:6363/rwgl/taskMonth
//         人员信息配置：http://172.16.95.87:6363/rwgl/config/user
//         项目组信息配置：http://172.16.95.87:6363/rwgl/config/project
//         角色信息配置：http://172.16.95.87:6363/rwgl/config/role
//         产品信息配置：http://172.16.95.87:6363/rwgl/config/product
//测试策略：每个页面模拟加载10次，取平均值作为最终测试结果。


var page=require('webpage').create();
// var system=require('system'); 
var t;
var loadTime_Aveage;
var address;
var urlArr=["http://172.16.95.87:6363/rwgl/dashboard",
            "http://172.16.95.87:6363/rwgl/milestone",
            "http://172.16.95.87:6363/rwgl/requirement",
            "http://172.16.95.87:6363/rwgl/task",
            "http://172.16.95.87:6363/rwgl/statistics",
            "http://172.16.95.87:6363/rwgl/taskMonth",
            "http://172.16.95.87:6363/rwgl/config/user",
            "http://172.16.95.87:6363/rwgl/config/project",
            "http://172.16.95.87:6363/rwgl/config/role",
            "http://172.16.95.87:6363/rwgl/config/product"
            ];
//
var times=10; //操作次数。
var testIndex=1; //对urlArr中第1个进行操作

main(times,urlArr); //函数入口

function main(times,urlArr){
  
  var t=0;
  var address = urlArr[testIndex-1];
  var loadTime_Aveage=0;
  var i=1;
  function pageOpen(){
 
    var args= arguments;
    if( t == 0){
      console.log("now loading page:"+address);
      t =new Date().getTime();
    }

    page.open(address,function(status){

      var now = new Date();

      if (status!='success'){
        sonsole.log('FAIL to load the address');
      }else{
      var usedTime=(now.getTime()- t);
      console.log(i + " times Loading , used Time:" + usedTime + " ms");
      loadTime_Aveage+=usedTime;
      t = now.getTime();
      };//else
      
      if(i == times) {
         console.log("average times is "+(loadTime_Aveage/times) + " ms");
         phantom.exit();
         return;
      }
      
      args.callee.call(this, ++i); //递归调用times-1,t值已修改
    })

  }
  pageOpen(times);

}//function main(times,urlArr)
  
