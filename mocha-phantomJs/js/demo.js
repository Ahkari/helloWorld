//用于测试的斐波拉契函数

// function fibonacci(n){
	
// 	if (n===0){
// 		return 0;
// 	}
// 	else if (n===1){
// 		return 1;
// 	}else {
// 		return fibonacci(n-1)+fibonacci(n-2);
// 	}
// };
// if (require.main===module){
// 	//直接执行main.js时会进入此处
// 	//如果main.js被其他文件require，则此处不会执行
// 	var n=Number(process.argv[2]); //命令行参数输入n
// 	console.log('fibonacci('+n+')is',fibonacci(n));
// }
// exports.fibonacci=fibonacci;

//上面3-20是执行单元测试前代码。后面是改进后的，需要确定输入值不能大于10小于0,必须为numvber

function main(){
};
main.prototype={
	fibonacci:function(n){
			if (typeof n!=='number'){
				throw new Error('n should be a Number');
			}
			if (n<0){
				throw new Error('n should>=0');
			}
			if (n>10){
				throw new Error('n should<=10');
			}
			if (n===0){
				return 0;
			}
			else if (n===1){
				return 1;
			}else {
				return this.fibonacci(n-1)+this.fibonacci(n-2);
			}
		}
};
var testFunc=new main();

// if (require.main===module){
// 	//直接执行main.js时会进入此处
// 	//如果main.js被其他文件require，则此处不会执行
// 	var n=Number(process.argv[2]); //命令行参数输入n
// 	console.log('fibonacci('+n+')is',fibonacci(n));
// }
// exports.fibonacci=fibonacci;

