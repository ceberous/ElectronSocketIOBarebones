$(document).ready( function() {

	var messages = [];
	var sockServerAddr "http://localhost";
	var port = 3000;

	var socket = io.connect( sockServerAddr + ":" + port.toString(); );
	console.log(socket.id);

	socket.on('message', function (data) {
		console.log(data.message);
	});
	
});