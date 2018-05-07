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

	socket.on('disconnect',()=>{
		console.log('user disconnected');
	})
})

server.listen(port,()=>{
	console.log(`server is up on ${port}`)
});