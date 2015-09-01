(function(){
$.widget('customs.progressbar1',{
	options: {value: 0,count: 0}
	,
	_create: function(){
		this.options.value = this._constrain(this.options.value) ;
		this.element.addClass('progressbar') ;
		this.refresh() ;
		console.log( this.options.count++ ) ;
	}
	,
	_init: function(){
		console.log( this.options.count++ ) ;
	}
	,
	_setOption: function( key, value){
		if (key === 'value') {
			value = this._constrain(value) ;
		};
		this._super( key, value) ;
	}
	,
	_setOptions: function( options){
		this._super( options ) ;
		this.refresh() ;
	}
	,
	refresh: function(){
		var progress = this.options.value + "%" ;
		this.element.text( progress ) ;
		if ( this.options.value === 100 ){
			//触发回调事件
			this._trigger("complete",null, {value: 100}) ;
		}
	}
	,
	_constrain: function( value ){
		if ( value>100 ){
			return 100 ;
		}else if (value<0){
			return 0 ;
		}else{
			return value ;
		}
	}
	,addStart: function( beforeVal ){
		var a = this.addOne( beforeVal ) ;
		console.log( a ) ;
	}
	,addOne: function( beforeVal ){
	    return beforeVal + 2 ;
	}
	,

})
$.widget('customs.progressbar2', $.customs.progressbar1 ,{
	options : {
		defaultValue: 200 
	}
	,
	addOne: function(val){
		val  = this._superApply( arguments ) ;
		return val + 10 ;
	}
	,
	callbackFunc: function( val ){
		if ( val === 30 ){
			var result = this._trigger('addOne', null, { val : 50 }) ;
			console.log( result ) ;
		}
	}
})



})()



//加载调用
// $(function(){
	var $bar = $('<div></div>')
		.appendTo('body')
		// .progressbar1({
		// 	complete : function(event,data){
		// 		console.log( 'callback trigger') ;
		// 	}
		// })
		// .progressbar1({
		// 	addOne: function(val){
		// 		return val+1 ;
		// 	},
		// 	change: function(){
		// 		console.log('change-callback') ;
		// 	},
		// 	complete: function(){
		// 		console.log('trigger-complete') ;
		// 	}
		// })
		// .bind( 'progressbar1complete' , function( event,data){
		// 	console.log('event trigger bubble') ;
		// 	console.log('the progress bar value is ' + data.value ) ;

		// }) ;

	//$bar.progressbar1( 'option', 'value', 50) ;
	//执行方法, 没参数, 则获取
	// console.log( $bar.progressbar1( 'value' )) ;
	//执行方法, 有参数, 则设置
	// $bar.progressbar1( 'value' , 60 ) ;
	//再次通过方法获取
	// console.log( $bar.progressbar1( 'value' )) ;
	//读取option操作
	// console.log( $bar.progressbar1('option','value')) ;
	// console.log( $bar.progressbar1('option','value',20)) ;
	// console.log( $bar.progressbar1('option','value')) ; 

	//这个是私有, 所以弄不了
	// console.log( $bar.progressbar('_constrain',50) ) ;

// })









/*

(function(){
$.widget('custom.progressbar',{
	optiopns: {
		value: 0
	}
	,
	_create: function(){
		var progressVal = this.options.value + "%" ;
		this.element
			.addClass( "progressbar" )
			.text( progressVal ) ; 
	}
	,
	//创建公有方法.
	value: function(value){
		//如果没有参数传递进来, 就用来getter
		if ( value === undefined ){
			return this.options.value ;
		}
		//有参数, 作为setter
		this.options.value = this._constrain( value ) ;
		var progress = this.options.value + "%" ;
		this.element.text( progress ) ;
	}
	,
	//创建私有方法
	_constrain: function(value){
		if ( value>100 ){
			value = 100 ;
		}else if ( value<0 ){
			value = 0 ;
		}
		return value ;
	}
})() ;








})()



*/