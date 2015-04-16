
一.代码复杂度
让函数保持最小代码量的一个方法是：命令Command和查询Query保持分离
命令函数表示做什么do something，查询函数表示返回什么return something
命令表示setter，查询表示getter
命令函数使用模mock进行测试，查询函数使用桩stub进行测试
function configure(value){
	var fs=require('fs')
		,config={docRoot:'/somewhere'}
		,key
		,stat
	;
	for (key in values){
		config[key]=values[key];
	}
	try{
		stat=fs.statSync(config.docRoot);
		if(!stat.isDirectory()){
			throw new Error('Is not valid');
		}
	}catch(e){
		console.log("**"+config.docRoot+" does not exist or is not a directory!! **")
		return;
	}
	//... check other values ...
	return config;
}

//测试语法
describe("configure tests",function(){
	it("undef if docRoot does not exist",function(){
		expect(configure({docRoot:'/xxx'})).toBeUndefined();
	});
	it("not undef if docRoot does exist",function(){
		expect(configure({docRoot:'/tmp'})).not.toBeUndefined();
	});
	it("adds values to config hash".function(){
		var config=configure({docRoot:'/tmp',zany:'crazy'});
		expect(config).not.toBeUndefined();
		expect(config.zany).toEqual('crazy');
		expect(config.docRoot).toEqual('/tmp');
	});

	it("verifies value1 good...",function(){

	});
	it("verifies value1 bad...",function(){

	});

	//..many more validation tests with multiple expects...


})


二.检查代码合理性（规范程度）
JSInit	//减少复杂性，确保不使用过于复杂或容易出错的构造。
1.合理使用空格，空格影响可读性。
2.for循环中的var声明，javascript变量只有全局和函数作用域两种。所以将其var声明移到函数顶部比较好。
3.不提倡++或--。一般正常使用
4.循环需要有花括号。



三.圈复杂度  //表示代码中独立现行路径的数量，需编写的单元测试的最小数量
可用jsmeter这样的简单的命令行工具
或jscheckstyle计算圈复杂度
function sum(a,b){
	if(typeof(a)!==typeof(b)){
		throw new Error("Cannot sum different types!");
	}else{
		return a+b;
	}
} //圈复杂度为2，测试每个分支，保证100%的代码覆盖率

圈复杂度和错误修复概率。(修复代码引入新的bug的几率)
1-10	5%
20-30	20%
>50		40%	(从未见过一个函数圈复杂度达到50)
>100	60%

圈复杂度尽量不超过10

最简单的重构修复师使用lookup表
function doSomething(a){
	if(a==='x'){
		doX();
	}else if(a==='y'){
		doY();
	}else{
		doZ();
	}
}
lookup重构后
function doSomething(a){
	var lookup={x:doX,y:doY},def=doZ;
	lookup[a]?lookup[a]():def();
}

四.代码重用
有85%都是可重用的
程序特定15%	领域特定65%	领域独立20%
避免反复造车。专注于可以让程序显得独特的15%的代码，并使用第三方库，摆脱繁重的工作。

五.扇出
测量函数直接或间接依赖的模块或对象的数量。
复杂度公式(fan_IN*fan_out)2

扇入

六.耦合
耦合关注的是这些依赖模块是如何组合在一起的。
内容耦合。最紧的耦合方式。
公共耦合。
控制耦合。
印记耦合。
数据耦合。
无耦合。
function setTable(){
	var cloth=new TabelCloth()
		,dishes=new Dishes();
	this.placeTableCloth(cloth);
	this.placeDishes(dishes);
}
用两个对象创建新对象导致了紧耦合。
由于紧耦合影响，这种方法不具独立性，测试时还需准备TableCloth和Dishes对象。
单元测试确实是要独立于外部依赖而测试设置方法，但上述代码导致测试困难。

function setTable(cloth,Dishes){
	this.setTableCloth(cloth);
	this.placeDishes(dishes);
}//使用注入，达到松耦合。
//我们的测试代码直接向方法传递桩和模参数，这样方法易隔离，易测试。

七.依赖注入

八.注释
YUIDoc	//将注释转换为html文档，需要遵循javadoc，以/**开始以*/结束
npm -g install yuidocjs
JSDoc	

Docco/Rocco

九.人工测试


