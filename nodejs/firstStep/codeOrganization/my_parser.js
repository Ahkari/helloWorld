
var Parser=require('./parser');
var fs=require('fs');

fs.readFile('../log.txt',function(err,logDate){

	if (err) throw err;

	var text=logDate.toString();

	var parser=new Parser();

	console.log(parser.parse(text));


});//fs.readFile