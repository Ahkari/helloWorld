define("main",["other","jquery"],function(require,exports,moudle){
	var $=require("jquery");
	// console.log($);

	console.log(typeof $("#allWrap"));


	var other=require("other");

	var getName=other.sayName("lily");
	console.log(getName);

	//module属性
	// console.log("当前的模块id是："+module.id);
	// console.log("当前的模块解析出的路径是："+module.uri);
	// console.log("当前的依赖数组有："+module.dependencies);

    //console.log(module.exports===exports);


});