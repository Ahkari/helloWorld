var cannvas = document.getElementById('canvas') ; 
var context = canvas.getContext('2d') ;
//创建渐变色区域对象
var gradient = context.createLinearGradient(0,0,canvas.width,0) ;

canvas.height = 500 ;
canvas.width = 600 ;

context.lineJoin = 'round' ;
context.lineWidth = 30 ; 

context.font = '24px Helvetica' ;
context.fillText('Click anywhere to erase',175,40) ;

//颜色与透明度
context.strokeStyle = 'goldenrod' ;
context.fillStyle = 'rgba(0,0,255,1)';

//矩形描边与矩形绘制
context.fillRect(125,150,200,200) ;
context.strokeRect(75,100,200,200) ;

//矩形擦除
context.canvas.onmousedown = function(e){
	context.clearRect(0,0,canvas.width/2,canvas.height/2) ;
};
