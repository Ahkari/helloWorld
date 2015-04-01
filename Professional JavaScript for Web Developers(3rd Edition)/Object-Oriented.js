/*
创建对象
2015.3.31
*/
//工厂模式
function createPerson(name,age,job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		alert(this.name);
	}
	return o;
}
var person1=createPerson("Ahkari","23","Front-end Developer");
var person2=createPerson("Lily","23","Tester");

//构造函数模式
//约定：构造函数第一个字母大写。
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function(){
		alert(this.name);
	};
}
var person1=new Person("Ahkari","23","Front-end Developer");
var person2=new Person("Lily","23","Tester");
//觉得构造函数模式对象中创建的函数sayName每次都是一个新的实例，那我们可以内部只弄一个指向的指针。改造如下。
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = sayName;
}
function sayName(name){
	alert(this.name);
}
var person1=new Person("Ahkari","23","Front-end Developer"); 
//缺点：sayName是全局函数。全局作用域名不符实。如果对象方法很多，那更蛋疼，大量的全局变量。毫无封装性可言。

//通过原型模式解决。
//每个创建的函数都有一个prototype原型属性，它是个指针，指向一个对象。这个对象用途是包含可以由特定类型的所有实例共享的属性和方法。
function Person(){
}
Person.propotype.name="Ahkari";
Person.propotype.age="23";
Person.propotype.job="Front-end Developer";
Person.propotype.sayName=function(){
	alert(this.name);
}
var person1=new Person();
person1.sayName();	//原型值。为Ahkari
var person2=new Person();
person2.name="Lily";
person2.sayName();	//覆盖原型，为Lily
delete person2.name;
person2.sayNam();	//覆盖被移出，为Ahkari
//好一点的原型语法.但propotype的constructor不再指向构造函数，而是指向Object构造函数。但可设置回去。
function Person(){

}
Person.propotype={
	name:"Ahkari",
	age:"23",
	job:"Front-end Developer",
	sayName:function(){
		alert(this.name);
	}
};

//组合使用构造函数模式和原型模式
//构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。
//ECMAScript中认同度最高的一种创建自定义类型的方法
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.friend = ["Shelby","Court"]
}
Person.propotype={
	sayName:function(){
		alert(this.name);
	}
}
var person1=new Person("Ahkari","23","Front-end Developer");
var person2=new Person("Lily","23","Front-end Developer");
person1.friend.push("Van");
alert(person1.friend);	//三个
alert(person2.friend);	//两个
alert(person1.friend === person2.friend);	//false
alert(person1.sayName === person2.sayName);	//true

//动态原型模式
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;

	if (typeof this.sayName != "function"){
		Person.propotype.sayName = function(){
			alert(this.name);
		}
	};
}
var friend=new Person("Ahkari","23","Front-end Developer");
friend.sayName();

//寄生构造函数模式，可用于创建具额外特殊方法的对象。和工厂模式类似。
function Person(name,age,job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		alert(this.name);
	}
	return o;
}
var person1=new Person("Ahkari","23","Front-end Developer");
person1.sayName();

//稳妥构造函数。没用公共属性，也不用this，不用new构造函数
//只能通过内部函数获取内部属性值
function Person(name,age,job){
	//要返回的对象
	var o = new Object();
	//这里定义私有变量和函数
	var name = name;
	//添加方法
	o.sayName = function(){
		alert(name);
	};
	//返回对象
	return o;
}
var person1=Person("Ahkari","23","Front-end Developer");
person1.sayName();	//"Ahkari"

/*
继承
2015.3.31
*/
//原型链
//原型链的继承方式。将父类的实例传递给子类的原型
function SuperType(){
	this.value = true;
}
SuperType.propotype.getSuperValue = function(){
	return this.value;
}
function SubType(){
	this.valueInSub = false;
}
//SubType继承SuperType
SubType.propotype=new SuperType();
SubType.propotype.getSubValue=function(){
	return this.valueInSub;
};
var obj=new SubType();
alert(obj.getSuperValue());		//true

//借用构造函数-伪造对象-经典继承
//在子类型构造函数额内部调用超类型构造函数
//使用call()和apply()的特性，可以给超类传递参数。
function SuperType(){
	this.colors = ["red","yellow","white"];
}
function SubType(){
	//继承SuperType
	SuperType.call(this);
}
var obj1=new SubType();
obj1.colors.push("black");
alert(obj1.colors);		//四个
var obj2=new SubType();
alert(obj2.colors);		//三个

//组合继承-伪经典继承
//结合原型链和借用构造函数技术。使用原型链实现对原型属性和方法的继承，通过借用构造函数实现对实例属性的继承。
//原型上定义方法实现函数复用，又能保证每个实例都有它自己的属性
//JavaScript中最常用的继承模式
function SuperType(name){
	this.name = name;
	this.color = ["red","yellow","white"];
}
SuperType.propotype.sayName=function(){
	alert(this.name);
}
function SubType(name,age){
	//继承SuperType属性。并非处于原型中。
	SuperType.call(this,name);
	this.age = age;
}
//继承SuperType方法
SubType.propotype=new SuperType();
SubType.propotype.constructor=SubType;
SubType.propotype.sayAge=function(){
	alert(this.age);
}
var person1=new SubType("Ahkari","23");
person1.colors.push("black");
alert(person1.colors);	//四个
person1.sayName();	//Ahkari
person1.sayAge();	//23
var person2=new SubType("Lily","23");
alert(person2.colors);	//三个
person2.sayName();	//Lily

//原型式继承
//一个对象作为另一个的基础。只想让一个对象与另一个对象保持类似的情况下。便捷。
var person={
	name : "Ahkari",
	friend : ["a","b","c"]
};
var person1=Object.create(person);
person1.name="Lily";
person1.friend.push("d");
var person2=Object.create(person);
person2.name="I L U";
person2.friend.push("e");
alert(person.name);		//Ahkari
alert(person.friend);	//a,b,c,d,e
//Object.create的第二个参数指定的任何属性都会覆盖原型对象上的同名属性
var person={
	name : "Ahkari",
	friend : ["a","b","c"]
}
var person1=Object.create(person,{ name : {value : "Lily"} } );
alert(person1.name);	//Lily

//寄生式继承
//创建一个仅用于封装继承过程的函数。然后加些方法增强。
function createPerson(original){
	var clone = Object(original);
	clone.sayHi=function(){
		alert("hi");
	};
	return clone;
}
var person={
	name : "Ahkari",
	friend : ["a","b","c"]
};
var anotherPerson=createPerson(person);
anotherPerson.sayHi();		//"hi"

//寄生组合式继承
//用构造函数来继承属性，原型链的混成形式来继承方法
//不必为了指定子类型的原型而调用超类型的构造函数，本质就是用寄生式继承来继承超类型的原型，在将结果指定给子类型原型。
//高效在它只调用一次SuperType构造函数
function initProp(SubType,SuperType){
	var propotype=Object(SuperType.propotype);	//创建对象
	propotype.constructor=SubType;	//增强对象
	SubType.propotype=propotype;	//指定对象
}
function SuperType(name){
	this.name=name;
	this.color=["red","yellow","white"];
}
SuperType.propotype.sayName=function(){
	alert(this.name);
};
function SubType(name,age){
	SuperType.call(this.name);
	this.age=age;
}
initProp(SubType,SuperType);                                                                                                                                                                      
SubType.propotype.sayAge=function(){
	alert(this.age);
};




























































































































