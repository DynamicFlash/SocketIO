let express = require('express');
let http =require('http');
let path = require('path');
let socketIO = require('socket.io');

//console.log(hbs);

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
	
	socket.emit('newMessage', {
		text : "welcome to chat room",
		createdAt : `${time}`
	})

	socket.on('createEmail',(newEmail)=>{
		console.log('Create email', newEmail);
	})

	socket.on('createMessage',(Message)=>{
		var d = new Date(); 
		var time = 	`${d.getHours()}: `+`${d.getMinutes()} :`+ `${d.getSeconds()}`;
		Message.time = time;
		console.log('Create email',Message);

		io.emit('newMessage',{
			from : Message.from,
			text : Message.text,
			time : Message.time
		})
	})




	socket.on('createEmail',(newEmail)=>{
		console.log('Create email', newEmail);
	})
})

server.listen(port,()=>{
	console.log(`server is up on ${port}`)
});

