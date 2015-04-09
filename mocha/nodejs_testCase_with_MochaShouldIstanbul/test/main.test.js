
var main=require('../src/main');
var should=require('should');

var tenMath=function(n){
	return n*10;
}

describe('test/main.test.js',function(){
	

	it('should equal 0 when n===0',function(){
		main.fibonacci(0).should.eql(0);

	});	//it

	it('should equal 1 when n===1',function(){
		main.fibonacci(1).should.eql(1);
	});

	it('should equal 55 when n===10',function(){

		main.fibonacci(10).should.eql(55);

	});//it

	it('should throw when n>10',function(){
		(function(){
			main.fibonacci(11);	//准备报错
		}).should.throw('n should<=10');


	});//it

	it('should throw when n<0',function(){
		(function(){
			main.fibonacci(-1);
		}).should.throw('n should>=0');
	});//it

	it('should throw when n isnt Number',function(){
		(function(){
			main.fibonacci('呵呵');
		}).should.throw('n should be a Number');
	});
});//describe

describe("local",function(){
	it('should equal 10 when n=1',function(){
		tenMath(1).should.eql(10);
	});
});



















