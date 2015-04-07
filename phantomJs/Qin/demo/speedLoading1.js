 
 var  t= 0;

 var address = 'http://172.16.95.87:6363/rwgl/dashboard';


var page=require('webpage').create();

  function main3(times){

    var args= arguments;
    if( t == 0){
      t =new Date().getTime();
    }

    page.open(address,function(){

      var now = new Date();

      console.log(times + ", used Time:" + (now.getTime()- t));

      t = now.getTime();
      if(times == 1) {
         phantom.exit();
         return;
      }

       args.callee.call(this, times-1);
    })

  }

  main3(10);