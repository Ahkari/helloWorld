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

//内部排序
//Q1：直接插入排序。
//将一个记录插入到已排好序的有序表中。得到一个新的，记录数增1的有序表。
function InsertSort(arr){
	var len=arr.length;
	var arrResult=[arr[0]];
	for (var i=1;i<len;i++){
		for (var j=0;j<i+1;j++){
			if (arr[i]<=arrResult[j]){
				arrResult.splice(j,0,arr[i]);
				break;
			}
		}
		if (arrResult.length!=i+1){
			arrResult.push(arr[i]);
		}
	}
	return arrResult;
}
var array=[49,38,65,97,76,13,27,49];
var result=InsertSort(array);
console.log(result);

//Q2：折半插入排序
//相对于简单插入，插入查找时从中间开始
function BInsertSort(arr){
	var len=arr.length;
	var arrResult=[arr[0]];
	for (var i=1;i<len;i++){
		var mid=Math.floor((1+arrResult.length)/2);
		var midValue=arrResult[mid-1];
		if (midValue>=arr[i]){
			for (var j=0;j<mid+1;j++){
				if (arr[i]<=arrResult[j]){
					arrResult.splice(j,0,arr[i]);
					break;
				}
			}
		}else if(midValue<arr[i]){
			for (var j=mid+1;j<i+1;j++){
				if (arr[i]<=arrResult[j]){
					arrResult.splice(j,0,arr[i]);
					break;
				}
			}

		};
		if (arrResult.length!=i+1){
			arrResult.push(arr[i]);
		}
	}
	return arrResult;
}
var array=[49,38,65,97,76,13,27,49];
var result=BInsertSort(array);
console.log(result);

//Q3：2-路插入排序
function twoInsert(arr){
	var len=arr.length;
	var resultArr=[];
	resultArr.push(arr[0]);
	for (var i=1;i<len;i++){
		resultArr.push(arr[i]);
		for (var j=0;j<i;j++){
			if (resultArr[i-j]<=resultArr[i-j-1]){
				var resultTmp=resultArr[i-j-1];
				resultArr[i-j-1]=resultArr[i-j];
				resultArr[i-j]=resultTmp;
			}
		}
	}
  return resultArr;
}
var array=[49,38,65,97,76,13,27,49];
var result=twoInsert(array);
console.log(result);

//希尔排序
//将带排序记录序列分割成若干子序列插入排序，多次后基本有序时，再对全体记录进行一次直接插入排序。
//需要Q1，2，3中的方法。辅以增量算法。

//Q4：冒泡排序
function bobbleSort(arr){
	var len=arr.length;
	for (var i=0;i<len;i++){
		for (var j=0;j<(len-i-1);j++){
			if (arr[j]<arr[j+1]){
			}else if(arr[j]>=arr[j+1]){
				var arrTmp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=arrTmp;
			}
		}
	}
	return arr;
}
var array=[49,38,65,97,76,13,27,49];
var result=bobbleSort(array);
console.log(result);

//Q5：快速排序
//一趟排序将待排记录分割成独立两部分，然后在对两部分分别继续排序以达整个序列有序。

//Q6：简单选择排序
//每一趟在n-i+1(i=1,2,...,n-1)个记录中选取关键字最小的记录作为有序序列中第i个记录。

//Q7：树形选择排序
//n个记录关键字两两比较，直至选出最小关键字的记录。（特性：选出最小值后把他变为最大值再次树形排序可得次大值）

//Q8：堆排序
//一个堆是完全二叉树，父节点一定比子节点大或小，移除根节点后把末节点提上去，然后慢慢换下去。就可得新堆。

//Q9：归并排序
//两个或两个以上的有序表组合成一个新的有序表。从数组最开始两两归并。

//Q10：基数排序
//






























