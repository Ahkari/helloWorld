//本文件运行后，读取log.txt文件，然后分割处理。返回结果。

var fs=require('fs');

//readFile
fs.readFile('./log.txt',function(err,logDate){

	//有异常
	if (err) throw err;

	//logData is a Buffer,convert to string.
 	var text=logDate.toString();

 	var result={};

 	//用换行来分割。
 	var lines=text.split('\n');

 	lines.forEach(function(line){
 		var parts=line.split(' ');
 		var letter=parts[1];
 		var count=parseInt(parts[2]);

 		if (!result[letter]){
 			result[letter]=0;
 		}

 		result[letter]+=parseInt(count);

 	});

 	console.log(result);

});//fs.readFile