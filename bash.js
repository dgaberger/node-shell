var commands = require("./commands");

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
	var cmd = data.toString().trim(); // remove the newline

	cmdParsed = cmd.substring(0, cmd.indexOf(" "))
	var arg = cmd.substring(cmd.indexOf(" ") + 1)
	// console.log("cmd: " + cmdParsed)
	// console.log("arg: " + arg)
	var done = function(output){
		process.stdout.write(output);
		process.stdout.write('\nprompt > ');
	}

  commands[cmdParsed](arg, done)
  // process.stdout.write('You typed: ' + cmd);
  process.stdout.write('\nprompt > ');

});

// function done(output){
// 	process.stdout.write(output);
// 	process.stdout.write('\nprompt > ');
// }
// abc
// abc
// abcd
