/*
API类别--特效执行方法(核心)
*/
//allClass
$(this).addClass('big-blue',1000,'easeOutBounce') ;
//颜色动画
$('#elem').animate({
	color: "green",
	backgroundColor: "rgb(20,20,20)"
}) ;
//动画曲线
见API
//effect执行方法
$('div').effect('bounce','slow') ;
//hide执行方法
$('div').hide('drop',{direction:'down'},'slow') ;
//removeClass
$(this).removeClass('big-blue',1000,'easeInBack') ;
//show执行方法
$('div').show('fold',1000) ;
//switchClass执行方法
$(this).switchClass('big','blue',1000,'easeInOutQuad') ;
//toggle执行方法
$('div').toggle('fold',1000) ;
//toggleClass执行方法
$(this).toggleClass('big-blue',1000,'easeOutSine') ;

/*
API类别--特效
*/
//百叶窗
$('#toggle').toggle('blind') ;
//反弹
$('#toggle').toggle('bounce',{ times: 3},'slow') ;
//剪辑
$('#toggle').toggle('clip') ;
//降落
$('#toggle').toggle('drop') ;
//爆炸
$('#toggle').toggle('explode') ;
//淡入淡出
$('#toggle').toggle('fade') ;
//折叠
$('#toggle').toggle('fold') ;
//高亮突出
$('#toggle').toggle('highlight') ;
//膨胀
$('#toggle').toggle('puff') ;
//跳动/闪动
$('#toggle').toggle('pulsate') ;
//缩放
$('#toggle').toggle('scale') ;
$('#toggle').toggle({effect:'scale',direction:'horizontal'}) ;
//震动
$('#toggle').effect('shake') ;
//尺寸调整
$('#toggle').effect('size',{
		to: {width:200,height:60}
	},1000}
})
//滑动
$('#toggle').toggle('slide') ;
//轮廓转移
$(this).effect('transfer',{to:$('div').eq(i),1000}) ;


/*
API类别--交互
*/
可拖拽 / 可放置 / 鼠标交互 / 可调整尺寸小部件 / 可选择小部件 / 可排序小部件

/*
API类别--基于JQuery的方法重载
*/
//添加类, 增加了缓入效果
$(this).addClass('big-blue', 1000, 'easeOutBounce') ;
//异步聚焦, 增加了等待事件
$(input).focus(2000,function()}) ;
//隐藏, 增加了自定义效果
$('div').hide('drop',{direction:'down'},'slow') ;
//定位, 相对于另一个元素,定位一个元素
$('#position1').position({
	my:'center left', //我在
	at:'right top', //位于
	of:'#targetElement' //之上
});
//移除类, 增加自定义效果
$(this).removeClass('big-blue',1000,'easeInBack') ;
//呈现, 自定义重载
$('div').show('fold',1000) ;
//显示隐藏, 自定义重载
$('div').toggle('fold',1000) ;
//类切换, 自定义重载
$('div').toggle('big-blue',1000) ;


/*
API类别--方法
*/
//警用文本选择, 不推荐
.disableSelection()
//应用特效
.effect()
//启用文本选择
.enableSelection()
//异步聚焦
.focus()
//隐藏自定义
.hide()
//相对元素来定位
.position()
//移除元素集合ID
.removeUniqueId()
//获取最近的可滚动的祖先
.scrollParent()
//展示自定义
.show()
//显示或隐藏匹配的元素
.toggle()
//为匹配的元素集合生成并申请唯一的Id
.uniqueId()
//获取z-index
.zindex()


/*
API类--选择器
*/
//获取存储在data指定键下面的元素
$(":data(key)")
//获取可被focus的元素, input啊, 有href的a, 有tabindex的段落
$(':focusable').css('border-color','red') ;
//获取可被tab的元素
$(':tabbabel').css('border-color','red') ;


