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

//







