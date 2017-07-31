var fs = require('fs');

module.exports = {
	pwd: function(arguments){
		process.stdout.write(process.env.PWD)
	},
	date: function(arguments){
		process.stdout.write(Date())
	},
	ls: function(arguments){
		fs.readdir('.', function(err, files) {
		  if (err) throw err;
		  files.forEach(function(file) {
		    process.stdout.write(file.toString() + "\n");
		  })
		});
	},
	echo: function(arguments){
		console.log(arguments)
	}
}


