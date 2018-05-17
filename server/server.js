let express = require('express');
let http =require('http');
let path = require('path');
let socketIO = require('socket.io');

//console.log(hbs);

const {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT||3000;
let app = express();
let server = http.createServer(app);
var io = socketIO(server);  

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log('new user connected');
	var d = new Date(); 
	var time = 	`${d.getHours()}: `+`${d.getMinutes()} :`+ `${d.getSeconds()}`;
	
	socket.on('disconnect',()=>{
		console.log('user disconnected');
	})

	// socket.emit('newEmail',{
	// 	from : 'mike@example.com',
	// 	text : 'hey. what is going on',
	// 	createAt: 123
	// });
	
	socket.emit('newMessage',generateMessage('Admin','welcome to chat app'));

	socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));

	socket.on('createEmail',(newEmail)=>{
		console.log('Create email', newEmail);
	})

	socket.on('createMessage',(message, callback)=>{
		var d = new Date(); 
		var time = 	`${d.getHours()}: `+`${d.getMinutes()} :`+ `${d.getSeconds()}`;
		message.time = time;
		console.log('Create message',message);

		io.emit('newMessage',generateMessage(message.from,message.text));
		
				
		// socket.broadcast.emit('newMessage',{
		// 	from: message.from,
		// 	text: message.text,
		// 	time: message.time
		// });

		callback('this is from Admin');
	})

	socket.on('createLocationMessage', (coords)=>{
		//console.log(generateLocationMessage('admin',coords.latitude, coords.longitude))
		socket.broadcast.emit('newLocationMessage', generateLocationMessage('admin',coords.latitude, coords.longitude))
	})


	socket.on('createEmail',(newEmail)=>{
		console.log('Create email', newEmail);
	})
})

server.listen(port,()=>{
	console.log(`server is up on ${port}`)
});

