// 交通路灯问题
// 1.路线做点
// 2.点之间连线为不能同存的路线
// 3.点染色,相邻点不同色
// 4.色彩数为所需的路灯数。

// 线性表
//Q1:Arr1和Arr2非递减，合并出一个Arr3也是非递减
function MergeList(arr1,arr2){
	var len1=arr1.length;
	var len2=arr2.length;
	var i=0;
	var j=0;
	var arr3=[];
	var k=0;
	while (i<len1&&j<len2){
		if (arr1[i]<arr2[j]){
			arr3[k]=arr1[i];
			i++;
		}else{
			arr3[k]=arr2[j];
			j++;
		}
		k++;
	}	
	while (i<len1){
		arr3[k]=arr1[i];
		i++;
		k++;
	}
	while (j<len2){
		arr3[k]=arr2[j];
		j++;
		k++;
	}
	return arr3;
}
var arr1=[3,5,8,11];
var arr2=[2,6,8,9,11,15,20];
var arr3=MergeList(arr1,arr2);
console.log(arr3);	// [2, 3, 5, 6, 8, 8, 9, 11, 11, 15, 20]


//栈和队列
//Q1：数制转换。输入任意一个非负十进制数，得到等值八进制数。
function covert(val,sys){
	var before = val;
	var num = sys;
	var arr=[];
	var after = 0;
	do{
		arr.push(before%num);
		before = Math.floor(before/num);
	}while(before>0);
	do{
		popStack = arr.pop();
		after = after*10+popStack;
	}while(arr[0]!=null);
	return after;
}
console.log(covert(1348,8));

//Q2：递归阶乘
function fact(n){
	if (n==1){
		return 1;
	}
	else{
		return n*fact(n-1);
	}
}
var value=fact(5);
console.log(value);

//Q3：汉诺塔问题。A[5,4,3,2,1] B[] C[],遵循后面比前面小的原则。放进C[5,4,3,2,1]中。//递归思想。
function hanoi(n,a,b,c){
	if (n>0){
		hanoi(n-1,a,c,b);
		count+=1;
		console.log("count:"+count+",operation:"+n+"from "+a+" to "+c);
		hanoi(n-1,b,a,c);
		// console.log("from b to a")
	}
}
var arrA="a";
var arrB="b";
var arrC="c";
var n=3;
var count=0;
// var arrA_shift=[];
hanoi(n,arrA,arrB,arrC);

//队列

//串
//Q1：求主串中和子串相等的字符起始位置
//func1 原生方法
function indexChuan(main,child){
	return main.indexOf(child);
}
var strMain="Lily why?";
var strChild="ly w";
console.log(indexChuan(strMain,strChild));
//func2 模拟其他语言
function indexChuan(main,child){
	var lenM=main.length;
	var lenC=child.length;
	for (i=0;i<lenM;i++){
		var main_sub=main.substring(i,i+lenC);
		if (main_sub==child){
			return i;
		}
	}
}
var strMain="Lily why?";
var strChild="ly w";
console.log(indexChuan(strMain,strChild));

//数组和广义表

//树和二叉树

//树和森林

//图

//哈希表

//插入排序

//折半插入排序

//2-路插入排序

//希尔排序

//冒泡排序

//快速排序

//选择排序

//树形选择排序

//堆排序

//归并排序s

//基数排序






























