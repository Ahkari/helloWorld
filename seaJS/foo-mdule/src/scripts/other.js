define("other",function(require,exports,moudle){
	//exports方式一
	var sayName=function(name){return "I L U "+name;};
	exports.sayName=sayName;
	//export方式二
	exports.say=function(){return "I am Ahkari"};
	//export数据或对象
	var foo={"name":"liuqin"};
	exports.foo={"name":"liuqin"};
});