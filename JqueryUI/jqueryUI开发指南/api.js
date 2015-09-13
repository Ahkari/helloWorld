var tab选项卡 ;

//$el.tabs(options)
$el.tabs({
	//外观行为配置
	collapsible : true ,
	disabled : [0,1] ,
	selected : 0 ,
	event: 'click' ,
	fx : {
		opacity : 'toggle' 
	},
	ajaxOptions : {
		//ajax选项
	},

	//与选项卡相关的事件
	select : function( event, tab){

	},
	show :  function( event , tab){

	},
	add : function( event, tab){

	},
	remove: function( event, tab){

	},
	enable: function( event, tab){

	},
	disabled: function( event, tab){

	},
	load: function( event, tab){

	}
}) ;
//tabs('action',params)
$el.tabs('add','#id',title,index) ;
$el.tabs('remove',index) ;
$el.tabs('disable',index) ;
$el.tabs('enable',index) ;
$el.tabs('select',index) ;
$el.tabs('url',index,url) ;
$el.tabs('load',index) ;
$el.tabs('rotate',duration, repeat) ;
$el.tabs('destroy') ;
$el.tabs('length') ;
//bind()
$el.bind('tabselect',function(event,tab){}) ;
$el.bind('tabsshow',function(event,tab){}) ;
$el.bind('tabsadd',function(event,tab){}) ;
$el.bind('tabsremove',function(event,tab){}) ;
$el.bind('tabsenale',function(event,tab){}) ;
$el.bind('tabsdisable',function(event,tab){}) ;
$el.bind('tabsload',function(event,tab){}) ;


var accordion折叠菜单

//$el.accordion(option)
$el.accordion({
	collapsible :  true,
	active : 0,
	event : 'click',
	animated : 'slide',
	autoHeight : true,
	fillSpace : false,
	change : function( event, menus){
		// 变化发生之后
		// menus : {
		// 	oldHeader : oldHeader ,
		// 	oldContent : oldContent ,
		// 	newHeader : newHeader ,
		// 	newContent : newContent 
		// }
	},
	changestart : function( event, menus){
		// 变化发生之前
	}
})
//$el.accordion('action',params)
$el.accordion('activate',index) ;
$el.accordion('disabled') ;
$el.accordion('enable') ;
$el.accordion('destroy') ;
//$el.bind('accodionevent',function(){})
$el.bind('accordionchange',function( event, menus){}) ;
$el.bind('accordionchangestart')

var dialog对话框 ;
//$el.dialog(option) ;
$el.dialog({
	title : title,
	buttons : {

	},
	position : [ 'center' ,'center' ],
	height : height,
	width : width,
	maxHeight : maxHeight,
	maxWidth : maxWidth,
	minHeight : minHeight,
	minWidth : minWidth
	show : false, //特效
	hide : false,
	autoOpen : true,
	draggab : true,
	resizable : true,
	modal : true,
	stack : true,
	focus : function( event){

	},
	open :  function( event){

	},
	beforeclose : function( event){

	},
	close : function( event){

	},
	drag : function( event){

	},
	dragStart : function( event){

	},
	dragStop : function( event){

	},
	resize : function( event){

	},
	resizeStart : function( event){

	},
	resizeStop : function( event){

	} 
}) ;
//$el.dialog('action',params)
$el.dialog('open') ;
$el.dialog('close') ;
$el.dialog('destory') ;
$el.dialog('disable') ;
$el.dialog('enable') ;
$el.dialog('isOpen') ;
$el.dialog('moveToTop') ;
$el.dialog( 'option', param) ;
$el.dialog( 'option', params, value) ;
// $el.bind('dialogaction')
$el.bind('dialogfocus',function(event){}) ;
$el.bind('dialogopen',function(event){}) ;
$el.bind('dialogbeforeclose',function(event){}) ;
$el.bind('dialogclose',function(event){}) ;
$el.bind('dialogdrag',function(event){}) ;
$el.bind('dialogstart',function(event){}) ;
$el.bind('dialogstop',function(event){}) ;
$el.bind('dialogresize',function(event){}) ;
$el.bind('dialogresizestrat',function(event){}) ;
$el.bind('dialogresizestop',function(event){}) ;


var button按钮 ;
//$el.button(option) ;
$el.button({
	disable : true ,
	label : label ,
	icons : {
		primary : primary,
		secondary : secondary
	},
	text : false
}) ;
//$el.button('action',params)
$el.button('disable') ;
$el.button('enable') ;
$el.button('refresh') ;
$el.button('option',params) ;
$el.button('option',params,value) ;
$el.button('destory') ;

var progressbar进度条
//$el.progressbar(options) ;
$el.progressbar({
	value : value ,
	change : function(){

	}
}) ;
//$el.progressbar('action',params) ;
$el.progressbar('value') ;
$el.progressbar('value',value) ;
$el.progressbar('options',params) ;
$el.progressbar('options',param,value) ;
$el.progressbar('destory') ;
//$el.bind('progressbaraction') ;
$el.bind('progressbarchange',function(){}) ;


var slider滑块 ;
//$el.slider(options) ;
$el.slider({
	disabled : false ,
	animate : false ,
	orientation : 'horizontal' ,
	min : 0 ,
	max : 100 ,
	value : value ,
	range : true | min | max ,
	step : 1 ,
	start : function(event){

	},
	stop : function(event){

	},
	change : function(event){
		//和stop一样
	},
	slide : function(event){
		//拖动调用,点击不调用
	}
}) ;
//$el.slider('action',params)
$el.slider('disable',function(event){}) ;
$el.slider('enable',function(event){}) ;
$el.slider('value',function(event){}) ;
$el.slider('value',value) ;
$el.slider('values') ;
$el.slidder('values',values) ;
$el.slider('option',params) ;
$el.slider('option',param,value) ;
$el.slider('destory') ;
//$el.bind('slderaction') ;
$el.bind('slidestart',function(){}) ;
$el.bind('slidestop',function(){}) ;
$el.bind('slidechange',function(){}) ;
$el.bind('slide',function(){})


var datepicker日历 ;
//$el.datepicker(options)
$el.datepicker({
	firstDay : 0 ,
	numberOfMonths : 1 ,
	showOtherMonths : false ,
	selectOtherMonths : false ,
	changeMonth : false ,
	chanegYear : false ,
	showAnim : 'fadeIn' ,
	duration : 0 ,
	dataFormat : 'mm/dd/yy' ,
	dayNames : [] ,
	dayNamesShort : [] ,
	dayNamesMin : [] ,
	monthNames : [] ,
	monthNamesShort : [] ,
	minDate : minDate ,
	maxDate : maxDate ,
	defaultDate : defaultDate ,
	beforeShow : function(){

	} ,
	beforeShowDay : function(date){
		//参数时date对象
		return [true,'class','tips'] ;
	} ,
	onChangeMothYear : function( year, month){

	} ,
	onClose : function(dateText){

	} ,
	onSelect : function(dateText){

	}
})
//$el.datepicker('acition',params)
$el.datepicker('show') ;
$el.datepicker('hide') ;
$el.datepicker('getDate') ;
$el.datepicker('setDate',date) ;
$el.datepicker('option',param) ;
$el.datepicker('option',param,value) ;
$el.datepicker('destory') ;



var autocompletion自动补全 ;
//$el.autocomplete(options) ;
$el.autocomplete({
	disabled : true ,
	source : source ,
	minLength : 1 ,
	delay : 300 ,
	open : function(event){} ,
	close : function(event){} ,
	search : function(event){} ,
	focus : function(event){} ,
	select : function(event){} ,
	change : function(event){}
})
//$el.autocomplete('action',params) ;
$el.autocpmplete('disable') ;
$el.autocpmplete('enable') ;
$el.autocomplete('search',value) ;
$el.autocomplete('close') ;
$el.autocomplete('widget') ;
$el.autocomplete('option',param) ;
$el.autocomplete('option',param,value) ;
$el.autocomplete('destory') ;
//$el.bind('autocompleteaction') ;
//等同于上面


var draggabl拖放 ;
//$el.draggable(options) ;
$el.draggable({
	disable : false ,
	cancel : '$el' ,
	helper : 'clone' | 'original' ,
	appendTo : '$el' | DOM | 'parent' ,
	addClass : true ,
	cursor : cursor ,
	delay : 0 ,
	destance : 1 ,
	opacity : 1 ,
	scope : 放置元素的 ,
	connectToSortable : 排序列表 ,
	revert : false ,
	revertDuration : 0 ,
	grid : [x,y] ,
	axis : false ,
	containment : [x1,y1,x2,y2] ,
	snap : snap ,
	snapMode :  snapMode ,
	snapTolerance : snapTolerance ,
	scroll : true ,
	scrollSensitivity : true ,
	scrollSpeed : 20 ,
	helper :  ,
	position :  ,
	offset :  ,
	start : function( event, ui){

	} ,
	drag : function( event, ui){

	} ,
	stop : function( event, ui){

	}
})
//$el.draggable('action',params)
$el.draggable('disable') ;
$el.draggable('enable') ;
$el.draggable('option',params) ;
$el.draggable('option',params,value) ;
$el.draggable('destory') ;
//$el.bind('draggableaction')
//同之前



