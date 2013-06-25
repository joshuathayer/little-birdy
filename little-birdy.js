var irc = require('irc');
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
var http = require('http');
var connect = require('connect');
var router = require('flask-router')();
var app = connect()
    .use(connect.bodyParser())
    .use(router.route);

var ircname = "sillybirdy";
var ircchannel = '#sillybirdy';
var ircserver = "irc.birdynode.net";

var httpport = 5223;
var udpport  = 5222;

// IRC client
var client = new irc.Client(ircserver, ircname, {
	    channels: [ircchannel],
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});

// UDP listener
server.on("message", function (msg, rinfo) {
	  console.log("UDP: " + msg + " from " +
		      rinfo.address + ":" + rinfo.port);
	  client.say(ircchannel, msg);
});

server.on("listening", function () {
	  var address = server.address();
	    console.log("UDP server listening " +
		          address.address + ":" + address.port);
});

// HTTP listener
router.post('/commit', function(req, res) {
    console.log("HTTP /commit");
    var payload = JSON.parse(req.body.payload);
    var repo    = payload.repository.url;
    var commits = payload.commits;
    client.say(ircchannel, "git push to " + repo);
    commits.map(function(commit) {
	var msg = commit.committer.email + " - " + commit.message + " (" + commit.url + ")";
	client.say(ircchannel, msg);
    });
    res.write("thank you");
    res.end();
});

server.bind(udpport);
app.listen(httpport);
