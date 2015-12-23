
var fs = require("fs");

 
//console.log(message);

function listFile(){
    var files = fs.readdirSync('./Orbits_GRASP');
    var message  = "";

    for (var i in files) {
          message += files[i] + "|";
    }
    return message.substring(0, message.length - 1);;
}


var http = require('http');

http.createServer(function (req, res) {
    console.log('request received');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('_testcb(\''+ listFile() + '\')')
    res.end();
}).listen(8124);

/*
var exec = require('child_process').exec;
exec('node ./server.js', function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    if (error !== null) {
        console.log('exec error: ', error);
    }
});
*/
