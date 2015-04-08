//组织代码，分离分析log文件

var Parser=function(){

};

Parser.prototype.parse=function(text){
	var results={};

	var lines=text.split('\n');

	lines.forEach(function(line){
		var parts=line.split(' ');
		var letter=parts[1];
		var count=parseInt(parts[2]);

		if (!results[letter]){
			results[letter]=0;
		}

		results[letter]+=parseInt(count);

	});//lines.forEach

	return results;

};//Parser.prototype.parse=function()




module.exports=Parser;	//告诉node从该文件中要输出的内容，这里我们输出了构造函数，用户可以通过Parser对象来创建实例。





