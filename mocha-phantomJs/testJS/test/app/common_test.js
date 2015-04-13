// define(function () {
define(['app/common'], function (common) {
	// var common=require(['app/common']);


	describe("common.js",function(){
		it('common should be an Object',function(){
			common.should.be.an.object;
		});
		it('common should be an Object',function(){
			common.should.be.a.function;
		});
		it('common should have prop named isShare',function(){

			console.log(typeof common)
			console.log(typeof common.ajax);
			common.ajax.should.be.a.function;
		});
	
	});
		










});//define