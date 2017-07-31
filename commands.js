var fs = require('fs');
var request = require('request');

module.exports = {
	pwd: function(argument){
		process.stdout.write(process.env.PWD)
	},
	date: function(argument){
		process.stdout.write(Date())
	},
	ls: function(argument){
		fs.readdir('.', function(err, files) {
		  if (err) throw err;
		  files.forEach(function(file) {
		    process.stdout.write(file.toString() + "\n");
		  })
		});
	},
	echo: function(argument){
		console.log(argument)
	},
	cat: function(argument){
		fs.readFile(argument, function(err, content) {
		  if (err) throw err;
			// process.stdout.write(content + "\n");
			done(content + "\n");
		});
	},
	sort: function(argument, done){
		fs.readFile(argument, function(err, content) {
		  if (err) throw err;
			// process.stdout.write(content + "\n");
			var contentTrim = content.toString().split('\n').map(function(line){
				return line.trim();
			})
			done(contentTrim.sort().join('\n'));
		});
	},
	wc: function(argument, done){
		fs.readFile(argument, function(err, content) {
		  if (err) throw err;
			// process.stdout.write(content + "\n");
			// var contentTrim = content.toString().split('\n').map(function(line){
			// 	return line.trim();
			// })
			done(content.toString().split('\n').length.toString());
		});
	},
	uniq: function(argument, done){
		fs.readFile(argument, function(err, content) {
		  if (err) throw err;
			// process.stdout.write(content + "\n");
			var contentTrim = content.toString().split('\n').map(function(line){
				return line.trim();
			})
			var obj = {};
			var arr = [];
			contentTrim.forEach(function(line){
				if (!obj[line]){
					obj[line] = line;
					arr.push(line);
				}
			})
			done(arr.join('\n'));
		});
	},
	head: function(argument, done, numOfLines){
		var numOfLines = arguments[2] || 5;
		fs.readFile(argument, function(err, content) {
		  if (err) throw err;
			var lineIndex = 0;
			while (content.indexOf("\n", lineIndex)>-1 && numOfLines > 0){
				lineIndex = content.indexOf("\n", lineIndex+1);
				// console.log("lineIndex:",lineIndex);
				numOfLines--;
				// console.log("numofLines: ", numOfLines);
			}

			// process.stdout.write(content.toString().substring(0, lineIndex) + "\n");
			done(content.toString().substring(0,lineIndex) + "\n");
		});
	},
	tail: function(argument, done, numOfLines){
		var numOfLines = arguments[2] || 5;
		fs.readFile(argument, function(err, content) {
		  if (err) throw err;
			var lineIndex = content.length;
			while (content.lastIndexOf("\n", lineIndex)>-1 && numOfLines > 0){
				lineIndex = content.lastIndexOf("\n", lineIndex-1);
				// console.log("lineIndex:",lineIndex);
				numOfLines--;
				// console.log("numofLines: ", numOfLines);
			}

			// process.stdout.write(content.toString().substring(lineIndex) + "\n");
			done(content.toString().substring(lineIndex) + "\n");
		});
	},
	curl: function(url, done){
		request('http://'+url, function (error, response, body) {
			console.log('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			// console.log('body:', body); // Print the HTML for the Google homepage.
			done(body);
		});
	}
}
