/*
生物认证平台 自动化冒烟测试
内容:
    1.启动配置: 运行环境与依赖
    2.驱动数据: 基础数据,可自行配置
    3.基础环境配置: 程序准备
    4.工具函数: 全局小工具函数
    5.测试执行: 自动化用例编写,输出结果
author:qzguo
date:2015/5/13
 */


/*
启动配置
 */
var webdriverio = require('webdriverio'),
    assert      = require('assert');    //这玩意不好用,基本不用
    fs          = require('fs'); //文件操作
var options = {
    desiredCapabilities: {
        //使用火狐浏览器
        browserName:'firefox'
    }
};


/*
驱动数据,当实际数据和预定的数据不符时报错
 */
//所期望的系统title名
var global_title = '生物认证运营统计系统' ;
//所期望的左侧导航栏显示的标题依次是
var global_nav = ['概况','模型管理','运营报表','日志管理','我的应用','应用管理','权限管理'];
//开始测试的时间
var global_time = new Date();
//冒烟通过标记
var testResultFlag = true;


//我的应用_新建应用名
var myApp_name = 'Lily'+getRandom(1,10000);
//我的应用_新建应用的能力平台
var myApp_platform = ['Android','IOS','web'];

//应用管理(所操作的应用名继承自'我的应用')_编辑数值
var appConfig = {
    faceMaxres : 520, //人脸最大注册用户数
    faceMaxSer : 250, //人脸最大日服次数
    voiceMaxres : 250,//声纹最大注册用户数
    voiceMaxSer : 520 //声纹最大日服次数
}

//模型管理(暂无)


/*
基础环境等的配置
 */
//创建本次截图目录
fs.exists('screenshot',function(isExist){
    if (isExist){
        fs.mkdir(createFloadName(),function(err){
            //console.log(err);
        })
    }else{
        fs.mkdir('screenshot',function(err){
            fs.mkdir(createFloadName(),function(err){
                //console.log(err);
            })
        })
      
    }
})

/*
工具函数
 */
//1.生成x-y之间的随机数
function getRandom(x,y){
    return Math.floor(Math.random()*(y-x)+x)
}
//2.n个数,使其中i个(i<=n)值为true,其余的为false
//好麻烦的样子,不写了
//3.截图文件夹生成
function createFloadName(){
    var fullYear = global_time.getFullYear();
    var month = global_time.getMonth()+1<10 ? '0'+(global_time.getMonth()+1) : global_time.getMonth()+1 ;
    var day =  global_time.getDate()<10?'0'+global_time.getDate():global_time.getDate();
    var hours = global_time.getHours()<10?'0'+global_time.getHours():global_time.getHours();
    var minutes = global_time.getMinutes()<10?'0'+global_time.getMinutes():global_time.getMinutes();
    var seconds = global_time.getSeconds()<10?'0'+global_time.getSeconds():global_time.getSeconds();
    return 'screenshot/'+fullYear+month+day+hours+minutes+seconds+myApp_name;
}
//4.截图文件名生成
function createFileName(status){
    return createFloadName()+'/'+status+'.png';
}
//5.判断一个元素是否在数组里
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}


/*
测试执行
 */
//用例一
//1.正常进入http://localhost:8080/biometric/biometriclogin.do
//断言.当前标题为global_title
webdriverio
    .remote(options)
    .init()
    .url('http://localhost:8080/biometric/')
    .windowHandleMaximize()
    .title(function(err,res){
        console.log('应用模块冒烟测试开始:')
        //assert(err === null);
        //console.group('标题验证:');
        console.log('当前标题为:'+res.value);
        if (res.value == global_title) {
            console.info('标题验证通过:当前标题为"'+res.value+'"');
        }else{
            console.error('标题验证失败:当前标题为"'+res.value+'",预期标题为'+global_title);
            testResultFlag = false ;
        };
        //console.groupEnd();    
    })
    .pause(1000)
    .getText('#nav-menu ul li a',function(err,res){
        //assert(err === null);
        //console.group('导航栏验证:');
        var i=0;
        console.log('当前左侧导航栏标题依次为:')
        var flag=0;
        for (i;i<res.length;i++){
            if (res[i]!=global_nav[i]){
                flag++;
            }
            console.log(res[i]+';');
        }
        console.log('有'+flag+'个导航标题不匹配')
        if (flag == 0 ){
            console.info('导航验证通过');
        }else{
            console.error('导航验证失败');
            testResultFlag = false ;
        };
        //console.groupEnd();
    })
    .pause(3000)
    .saveScreenshot(createFileName('index'))
    .pause(3000)
    .click('=我的应用',function(err,res) {
        var selector = 'div[title='+myApp_name+']';
        this
            .pause(4000)
            .saveScreenshot(createFileName('myApp'))
            .pause(4000)
            .isExisting(selector,function(err,isExisting){
            if (isExisting){
                console.log('错误,名为"'+myApp_name+'"的应用已存在');
                testResultFlag = false ;
            }else{
                console.log('新建前,名为"'+myApp_name+'"的应用不存在');
            }


            this
            .click('=创建新应用',function(err,res){
                this
                .pause(4000)
                .saveScreenshot(createFileName('myApp_addNewApp'))
                .pause(4000)
                .setValue('#app_name',myApp_name)
                .pause(1000)
                .setValue('#app_name',myApp_name) //可能因模糊查询不能正常假如数值,这里用两次
                .pause(1000)
                .click('input[value=android]')
                .pause(1000)
                .click('input[value=ios]')
                .pause(1000)
                .click('input[value=web]')
                .pause(1000)
                .click('.button-pannel button',function(err,res){
                    this
                        .pause(4000)
                        .saveScreenshot(createFileName('myApp_addNewApp_after'))
                        .pause(4000)
                        .isExisting(selector,function(err,isExisting){
                            if (isExisting){
                                console.log('我的应用模块-名为"'+myApp_name+'"的应用成功生成')
                            }else{
                                console.log('错误:没有正常生成指定应用')
                                testResultFlag = false ;
                            }
                        })
                        // .element(selector,function(err,ele){
                        //     var args = arguments;
                        //     console.log(args);
                        //     // console.log(err);
                        //     // console.log(ele);
                        //     var resultLength = ele.length;
                        //     console.log('生成了'+resultLength+'个');
                        // })
                        .getAttribute('div#page.content div.area-wrap div.area:first-child div.bd ul.business li:first-child div.icon-wrap i.icon.icon-face','class',function(err,attr){
                            // var testSelectClass = 'selected' ;
                            var testSelectClass = /selected/;
                            if (testSelectClass.test(attr)){
                                console.log('错误:新建应用Android能力需为灰色');
                                testResultFlag = false ;
                            }else{
                                console.log('新建应用Android能力为灰色');
                            }
                            this
                                .getAttribute('div#page.content div.area-wrap div.area:nth-child(2) div.bd ul.business li:first-child div.icon-wrap i.icon.icon-face','class',function(err,attr){
                                    var testSelectClass = /selected/;
                                    if (testSelectClass.test(attr)){
                                        console.log('错误:新建应用Web能力需为灰色');
                                        testResultFlag = false ;
                                    }else{
                                        console.log('新建应用Web能力为灰色');
                                    }
                                    this
                                        .getAttribute('div#page.content div.area-wrap div.area:nth-child(3) div.bd ul.business li:first-child div.icon-wrap i.icon.icon-face','class',function(err,attr){
                                            var testSelectClass = /selected/;
                                            if (testSelectClass.test(attr)){
                                                console.log('错误:新建应用IOS能力需为灰色');
                                                testResultFlag = false ;
                                            }else{
                                                console.log('新建应用IOS能力为灰色');
                                            }
                                        })
                                })
                        })

                })
            })
        })
    })
    .pause(5000)

    //进入应用管理页面操作,开通能力
    .click('=应用管理',function(err,res){
        var selector1 = 'div#page.content div.wrap div.listview.app-listview table tbody tr.ell:nth-child';
        var selector2= 'td:nth-child';   
        var selectName= function(numRow,numCol){
            return selector1+'('+numRow+') '+selector2+'('+numCol+')'
        };
        this
            .pause(4000)
            .saveScreenshot(createFileName('appConfig'))
            .pause(4000)
            .getText(selectName(1,1),function(err,text){
                var testIsExict = myApp_name;
                if (testIsExict == text){
                    console.log('应用管理模块-名为'+ myApp_name +'的应用已正常生成');
                }else{
                    console.log('错误:未能在应用管理中查询到名为'+myApp_name+'的应用');
                    testResultFlag = false ;
                }
                this
                    .getText(selectName(1,3),function(err,text){

                        if (contains(myApp_platform, text)){
                            console.log('该应用平台为'+text);
                        }else{
                            console.log('错误:该应用平台名称不在预期集合中');
                            testResultFlag = false ;
                        }
                    })
                    .getText(selectName(2,1),function(err,text){
                        var testIsExict = myApp_name ;
                        if (testIsExict == text){
                            console.log('名为'+ myApp_name +'的应用已正常生成');
                        }else{
                            console.log('错误:未能在应用管理中查询到名为'+myApp_name+'的应用');
                            testResultFlag = false ;
                        }
                        this
                            .getText(selectName(2,3),function(err,text){
                                if (contains(myApp_platform, text)){
                                    console.log('该应用平台为'+text);
                                }else{
                                    console.log('错误:该应用平台名称不在预期集合中');
                                    testResultFlag = false ;
                                }
                            })
                            .getText(selectName(3,1),function(err,text){
                                var testIsExict = myApp_name ;
                                if (testIsExict == text){
                                    console.log('名为'+ myApp_name +'的应用已正常生成');
                                }else{
                                    console.log('错误:未能在应用管理中查询到名为'+myApp_name+'的应用');
                                    testResultFlag = false ;
                                }
                                this
                                    .getText(selectName(3,3),function(err,text){
                                        if (contains(myApp_platform, text)){
                                            console.log('该应用平台为'+text);
                                        }else{
                                            console.log('错误:该应用平台名称不在预期集合中');
                                            testResultFlag = false ;
                                        }
                                    })//.getText(selectName(3,3),function(err,text)    
                            })//.getText(selectName(3,1),function(err,text)
                    })//.getText(selectName(2,1),function(err,text) 
            })//.getText(selectName(1,1),function(err,text)
            //var appConfig = {
                                // faceMaxres : 520, //人脸最大注册用户数
                                // faceMaxSer : 250, //人脸最大日服次数
                                // voiceMaxres : 250,//声纹最大注册用户数
                                // voiceMaxSer : 520 //声纹最大日服次数
                            //}

            .pause(5000)
            .click(selectName(1,9)+'>a',function(err,res){
                this
                    .pause(4000)
                    .saveScreenshot(createFileName('appConfig_editApp'))
                    .pause(4000)
                    .setValue('input[name="appAbles[0].maxResNum"]',appConfig.faceMaxres)
                    .pause(1000)
                    .setValue('input[name="appAbles[0].maxSerNum"]',appConfig.faceMaxSer)
                    .pause(1000)
                    .setValue('input[name="appAbles[1].maxResNum"]',appConfig.voiceMaxres)
                    .pause(1000)
                    .setValue('input[name="appAbles[1].maxSerNum"]',appConfig.voiceMaxSer)
                    .pause(1000)
                    .click('button.btn.btn-green.w106[type="submit"]',function(err,res){
                        // var selector1 = 'div#page.content div.wrap div.listview.app-listview table tbody tr.ell:nth-child';
                        // var selector2= 'td:nth-child';   
                        // var selectName= function(numRow,numCol){
                        //     return selector1+'('+numRow+') '+selector2+'('+numCol+')'
                        // };
                        this
                            .pause(4000)
                            .saveScreenshot(createFileName('appConfig_editApp_after'))
                            .pause(4000)
                            .getText(selectName(1,4),function(err,text){
                                if (text == appConfig.faceMaxres){
                                    console.log('人脸最大注册用户数已更改为'+appConfig.faceMaxres)
                                }else{
                                    console.log('错误:人脸最大注册用户数没有正确更改');
                                    testResultFlag = false ;
                                }
                            })
                            .getText(selectName(1,5),function(err,text){
                                if (text == appConfig.faceMaxSer){
                                    console.log('人脸最大日服务数已更改为'+appConfig.faceMaxSer)
                                }else{
                                    console.log('错误:人脸最大日服务数没有正确更改');
                                    testResultFlag = false ;
                                }
                            })
                            .getText(selectName(1,6),function(err,text){
                                if (text == appConfig.voiceMaxres){
                                    console.log('声纹最大注册用户数已更改为'+appConfig.voiceMaxres)
                                }else{
                                    console.log('错误:声纹最大注册用户数没有正确更改');
                                    testResultFlag = false ;
                                }
                            })
                            .getText(selectName(1,7),function(err,text){
                                if (text == appConfig.voiceMaxSer){
                                    console.log('声纹最大日服务数已更改为'+appConfig.voiceMaxSer)
                                }else{
                                    console.log('错误:声纹最大日服务数没有正确更改');
                                    testResultFlag = false ;
                                }
                            })
                            .pause(2000)
                    })
            })    
    })

    //返回我的应用,查看第一个能力是否已开通
    .click('=我的应用',function(err,res){
        this
            .pause(4000)
            .saveScreenshot(createFileName('appConfig_editApp_after_isMyAppStatusChange'))
            .pause(4000)
            .getAttribute('div#page.content div.area-wrap div.area:nth-child(1) div.bd ul.business li:first-child div.icon-wrap i.icon.icon-face','class',function(err,attr){
                var testSelectClass = /selected/;
                if (testSelectClass.test(attr)){
                    console.log('第一个应用能力成功开通!');
                }else{
                    console.log('错误:第一个应用能力仍为灰色');
                    testResultFlag = false ;
                }
            })
            .pause(2000)
    })//.click
    
    //再返回应用管理,将本次测试新建的三个项删除
    .click('=应用管理',function(err,res){
        var selector1 = 'div#page.content div.wrap div.listview.app-listview table tbody tr.ell:nth-child';
        var selector2= 'td:nth-child';   
        var selectName= function(numRow,numCol){
            return selector1+'('+numRow+') '+selector2+'('+numCol+')'
        };
        this
            .pause(2000)
            .click(selectName(1,8)+'>a',function(err,res){
                this
                    .pause(1000)
                    .click('button.btn.btn-green.w106[type="submit"]',function(err,res){
                        this
                            .pause(2000)
                            .click(selectName(1,8)+'>a',function(err,res){
                                this
                                    .pause(1000)
                                    .click('button.btn.btn-green.w106[type="submit"]',function(err,res){
                                        this
                                            .pause(2000)
                                            .click(selectName(1,8)+'>a',function(err,res){
                                                this
                                                    .pause(1000)
                                                    .click('button.btn.btn-green.w106[type="submit"]',function(err,res){
                                                        this 
                                                            .pause(4000)
                                                            .saveScreenshot(createFileName('appConfig_delete'))
                                                            .pause(4000)
                                                            .getText('selectName(1,7)',function(err,text){
                                                                if (myApp_name != text){
                                                                    console.log('名为'+myApp_name+'的应用已成功删除')
                                                                }else{
                                                                    console.log('错误:名为'+myApp_name+'的应用仍未删除');
                                                                    testResultFlag = false ;
                                                                } 

                                                                //冒烟结果输出
                                                                if ( testResultFlag ){
                                                                    console.log("应用模块冒烟通过! 基本功能无误")
                                                                }else{
                                                                    console.log("应用模块冒烟失败! 请排查错误")
                                                                }

                                                            })

                                                            
                                                    })
                                            })
                                    })
                            })
                    })
            })
    })

