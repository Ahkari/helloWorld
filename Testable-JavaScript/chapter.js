
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

来看个做鸡肉大餐的例子
function makeChickenDinner(ingredients){	//食谱：如何做鸡肉大餐（香料）
	var chicken=new ChickenBreast()			//鸡肉就选	新鲜的鸡脯肉
		,oven=new ConventionalOven()		//烤炉我们用  普通的有情怀的烤炉
		,mixer=new Mixer()					//混合器就用  混合器
		,dish=mixer.mix(chicken,ingredients)//一盘食物	混合器使用了自己特有的搅拌方法，把鸡肉和香料处理装盘

	return oven.bake(dish,new FDegrees(350),new Timer("50 minutes"));	//有情怀的烤炉，把装盘的食物，以350度，烘焙50分钟。然后返回给久等的我们。
}
var dinner=makeChickenDinner(ingredients);	//今天的晚饭就吃用自选香料的鸡肉大餐

该函数扇出高的离谱，创建了五个外部对象，并调用了两个不同对象的两个方法。

我们的测试代码直接向方法传递桩和模参数，这样方法易隔离，易测试。

单元测试代码：
说人话：
测试做晚饭的方法是不是可行：
	1.外部准备。
		鸡脯肉
		香料
		混合器。它能混合食物
		被混合过的食物。食物被打上“已混合”标签。
		有情怀的烤炉。它能烘焙食物
		烤炉的温度调节按钮
		烤炉的时间调节按钮
		被烘焙过的食物。食物被打上“已烘焙”标签。
		。。。
	2.测试断言。
		是否好吃是检验食物的唯一标准，出来的食物必需是“已混合”“已烘焙”过的。
	3.测试开始。
		提供香芹和盐。
		开始做晚饭。
	4.返回断言结果。

通过注入或事件来减少耦合，通过使用外观包含多个对象来减少扇出。

function Cooker(over){	//创建一个烤炉外观，除了烘焙功能，他还自带温度调节和时间调节按钮。
	this.oven=oven;
}
Cooker.prototype.bake=function(dish,deg,timer){
	return this.oven.bake(dish,deg,timer);
};
Cooker.prototype.degrees_f=function(deg){
	return new FDegrees(deg);
};
Cooker.prototype.timer=function(time){
	return new Timer(time);
};

function makeChickenDinner(ingredients,cooker){	//食谱：如何做鸡肉大餐（香料，有节操烤箱）
	var chicken=new ChickenBreast()				//鸡肉就选	新鲜的鸡脯肉
		,mixer=new Mixer()						//混合器就用  混合器
		,dish=mixer.mix(chicken,ingredients)	//一盘食物	混合器使用了自己特有的搅拌方法，把鸡肉和香料处理装盘

	return cooker.bake(dish    //传入进来的有节操的烤炉，自带温度和时间控制。把混合过的食物烘焙好。
		,cooker.degrees_f(350)
		,cooker.timer("50 minutes")
	);
}
var cooker=new Cooker(new ConventionalOven())
	,dinner=makeChickenDinner(ingredients,cooker);

现在的makeChickenDinner只有ChickenBreast和Mixer两个紧耦合。
注入的外观cooker负责一系列的打杂。
重构后的单元测试代码：
	1.外部准备。
		被混合过的食物。食物被打上“已混合”标签。
		被烘焙过的食物。食物被打上“已烘焙”标签。
		鸡脯肉
		混合器。它能混合食物
		香料
		。。。
	2.测试断言。
		是否好吃是检验食物的唯一标准，出来的食物必需是“已混合”“已烘焙”过的。	
	3.测试开始。
		提供香芹和盐。
		提供测试用烤箱，含有烘焙方法，和温度，时间调节按钮。
		开始做晚饭。
	4.返回断言结果。

以上新测试代码拜托了几个需要模拟的对象，取而代之的是针对特定测试进行的局部模拟。

再次通过注入Chicken和Mixer进行优化。
function makeChickDinner(ingredients,cooker,chicken,mixer){//食谱：如何做鸡肉大餐（香料，有节操烤箱，鸡肉，混合器）
	var dish=mixer.mix(chicken,ingredients);
	return cooker.bake(dish
		,cooker.degrees_f(350)
		,cooker.timer('50 minutes')
		);
}
最终的单元测试代码：
	1.外部准备。
		无
	2.测试断言。
		是否好吃是检验食物的唯一标准，出来的食物必需是“已混合”“已烘焙”过的。	
	3.测试开始。
		提供香芹和盐。
		提供鸡肉。
		提供测试用混合器，含有混合方法。
		提供测试用烤箱，含有烘焙方法，和温度，时间调节按钮。
		开始做晚饭。
	4.返回断言结果。

所有的通用模拟，都消失了，测试代码就完全控制了传入的模拟对象。
可以让代码进行更广泛的测试以及具有更大的灵活性。
减少函数内部引用，换成参数注入。


扇入
被调用
扇入可以很好地测量代码中常见功能的重用。

六.耦合
耦合关注的是这些依赖模块是如何组合在一起的。
内容耦合。最紧的耦合方式。
在外部对象上调用方法或函数，或通过修改对象属性直接改变对象状态。
耦合分数5
	o.prototype='blah';	
	o.method=function(){};	
	o.prototype.method=function(){};

公共耦合。
两个对象都共享另外一个全局变量。这两个对象公共耦合。
耦合分数4
	var Global='global';
	Function A(){Global='A'};
	Function B(){Global='B'};

控制耦合。
基于标记或参数设置来控制外部对象。
耦合分数3
var absFactory=new AbstractFactory({env:'TEST'});

印记耦合。
向外部对象传递一个记录，而只使用该记录的一部分。

数据耦合。
一个对象传递给另一个对象消息数据，而没有传递控制外部对象的参数。

无耦合。
任意两个对象直接绝对零耦合。

//代码检查和审查是查找代码耦合的一个非常好的方法。


function setTable(){
	var cloth=new TabelCloth()
		,dishes=new Dishes();
	this.placeTableCloth(cloth);
	this.placeDishes(dishes);
}
用两个对象设置新对象导致了紧耦合。
由于紧耦合影响，这种方法不具独立性，测试时还需准备TableCloth和Dishes对象。
单元测试确实是要独立于外部依赖而测试设置方法，但上述代码导致测试困难。
如下。
function setTable(cloth,Dishes){
	this.setTableCloth(cloth);
	this.placeDishes(dishes);
}//使用注入，达到松耦合。
//我们的测试代码直接向方法传递桩和模参数，这样方法易隔离，易测试。

七.依赖注入
依赖让代码复杂。让构建，测试，调试变得困难。

八.注释
注释和测试不应该是非此即彼的命题。至少要做到，对所有的公共方法编写测试并维护注释。
文档化你的JS代码有点类似于测试； 
我们都意识到要这么做，
但我们都不确定怎么做，
大多数人都没有做，
但其实我们非常支持这么做。

YUIDoc	//根据你写的代码注释生成API文档，需要遵循javadoc，以/**开始以*/结束
//配合以sublimeText的DocBlockr。
1.YUI注释规范，必须以两个**开头
/**
 * YUIDOC会认这个
 */

/*
但不认这个
 */
2.主标签。每个注释块中能有且仅有一个主标签。描述当前代码块的作用。
@module	描述一组关联的类(构造方法归位类)
/**
 * @moudle Backbone
 */
 var Backbone = Backbone || {};
@class 专门描述类(通常是个构造方法)。每个@class的标签注释块都应该有一个@static或@construct的副标签
/**
 * 
 */

@method 描述类中的方法。常用@return和@params副标签加以说明

@property 说明类的属性值。@type和@default副标签配合使用。
/**
 * @property templateString
 */
this.templateString = "div";

@event 类似method，但无需@return。

3.副标签。注释块可以有很多副标签。
@submodule	分散模块
@extends	描述继承
@constructor	可被实例化。构造器
@static 	不能实例化。静态类。Math()
@final	值不可变的属性和常量。
@param  主要标签。定义@method @event的参数。
		后跟三个信息。name参数名，type参数类型(可选，用{}包括起来)，description参数描述	
@return 有返回值的方法。
@type  定义@property属性的类型。
@private/@protected	传统语言中的。不能在实例之外访问。(YUIDco忽略)
@requires	一个module依赖多个module时标明。
@default  定义@property的默认值。
@uses	
@example
@chainable
@

npm -g install yuidocjs
JSDoc	

Docco/Rocco

九.人工测试


