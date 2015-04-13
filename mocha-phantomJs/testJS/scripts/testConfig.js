/**
 * 模块基础路径配置
 * Created by qzguo on 2015/4/10.
 */
requirejs.config({
    //从start所在目录开始算,一般指代requireJS所在目录。与原工程的requireJS的根路径不一样。但都指向同一个requireJS文件。
    baseUrl: '../js/lib',
    paths: {
        //结构化JS程序单元测试demo的路径
        demo:'../demo', 
        //demo测试文件
        demo_test:'../../testJS/test/demo_test',
        
        //模拟项目中的JS目录与文件(需要与项目的requireJS的配置一致。)
        app: '../app',	//app根目录

        base:'../app/controller/base',
        
        novel:'../app/controller/novel',
        // common:'../app/common',
        // common:'../app/common',
        //模拟项目的JS测试文件
        
        novel_test: '../../testJS/test/app/controller/novel_test',
        common_test: '../../testJS/test/app/common_test',

        //被测js依赖的lib
        zepto: './zepto',


    }
});