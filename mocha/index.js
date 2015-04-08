//mocha+should.js是js单元测试利器。

//npm install -g mocha
//最好全局方式安装
//npm install shoule 
//在目标文件夹下安装shoule

//在这个文件夹执行mocha，那么它会自动扫描test文件夹下的测试脚本文件

//断言
//it主体部分，每一个it语句都是一个测试单元，一个测试模块中可以有很多测试单元
//其回调函数中通过书写should.js断言库中的语句进行测试。
//should是assert模块的拓展。mocha也可以和其他第三方断言库搭配使用。
//https://github.com/visionmedia/should.js
it("The name should be Ahkari",function(){ //不满足时提示的信息
	name.should.eql("Ahkari"); //name 应该 等于 Ahkari
});

it("Ahkari should be an instance of Person",function(){
	Ahkari.should.be.an.instanceof(Person);	//Ahkari 应该 是 一个 Person 的 实例对象
});

it("Ahkari should be an instance of Object",function(){
	Ahkari.should.be.an.instanceof(Object); //.....
});

it("Ahkari should have property name",function(){
	Ahkari.should.have.property("name"); //Ahkari 应该 有 原型属性 name
});

it("Ahkari should startWith (Ahk)",function(){
    Ahkari.should.startWith('Ahk'); //Ahkari 应该 开始以 Ahk
});

it("Ahkari cont >=10",function(){
    (function(){
        Ahakri.func(11);    //假设其中有这个函数，它不能大于10。括号搞定，决定是否抛异常。
    }).should.throw('Ahkari should < 10');
});



//describe语句分割测试模块，起着划分各个模块部分的作用，她的第一个参数就是对该模块的描述。
describe("Name", function() {
    it("The name should be zhaojian", function() {
        name.should.eql("zhaojian");
    });
});

//异步测试
var fs = require("fs");
require("should");

describe("readFile", function() {
    it("The file content should be zhaojian", function(done) { //回调函数带done
        fs.readFile("text.txt", "utf8", function(err, data) { //异步在这里。
            data.should.eql("zhaojian");
            done(); //必须带done，才能保证异步的正确
        });
    });
});






