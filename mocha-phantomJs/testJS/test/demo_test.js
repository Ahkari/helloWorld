define(["demo"],function(demo){
// var main=require('../src/main');
// var should=require('../node_modules/should/should.js');
var tenMath=function(n){
	return n*10;
};
var str="abc";
//console.log("mocha is running");
describe('main.js',function(){
	describe('testFunc.fibonacci',function(){
		it('should equal 0 when n===0',function(){
			testFunc.fibonacci(0).should.eql(0);
		});	//it
		it('should equal 1 when n===1',function(){
			testFunc.fibonacci(1).should.eql(1);
		});
		it('should equal 55 when n===10',function(){
			testFunc.fibonacci(10).should.eql(55);
		});//it
		it('should throw when n>10',function(){
			(function(){
				testFunc.fibonacci(11);	//准备报错
			}).should.throw('n should<=10');
		});//it
		it('should throw when n<0',function(){
			(function(){
				testFunc.fibonacci(-1);
			}).should.throw('n should>=0');
		});//it
		it('should throw when n isnt Number',function(){
			(function(){
				testFunc.fibonacci('呵呵');
			}).should.throw('n should be a Number');
		});
	});
	describe("local",function(){
		it('tenMath should equal 10 when n=1',function(){
			tenMath(1).should.eql(10);
		});
		it('str should startWith s',function(){
			str.should.startWith('a');
		});
		it('should return -1 when not present',function(){
			[1,2,3].indexOf(4).should.equal(-1);
		})
	});
});//describe


});//define












