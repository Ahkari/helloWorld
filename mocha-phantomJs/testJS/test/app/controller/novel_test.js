// define(['base','common','novel'], function (Base,common,novel) {
// define(['base','novel'], function (Base,novel) {
define(['novel'], function (novel) {

	ctrl=require(novel);

	describe("novel.js",function(){
		it('ctrl should be an Object',function(){
			ctrl.should.be.an.object;
		});
		it('ctrl should be an Object',function(){
			ctrl.should.be.a.function;
		});
		it('ctrl should be a function',function(){
			ctrl.should.be.a.Function;
		});
		it('ctrl should be an instanceof object',function(){
		    ctrl.should.be.an.instanceof(Object);
		});
		// it('ctrl should have property getTopList',function(){
		//     ctrl.should.have.property('template');
		// });
		// it('ctrl should have property getTopList',function(){
		//     ctrl.should.have.property('model');
		// });
		// it('ctrl should be an Object',function(){
		// 	ctrl.should.be.an.Object;
		// });
		
		// it('requestUrl should be an Object',function(){
		// 	requestUrl.should.be.an.Object;
		// });
	});
		

















});//define