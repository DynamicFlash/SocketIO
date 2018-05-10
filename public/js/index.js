	
	const socket = io();

	socket.on('connect', function(){
		console.log('connected to server');

		// socket.emit('createEmail', {
		// 	to: 'jen@example.com',
		// 	text: 'hey, This is Aldrin'
		// })
	});

	socket.on('newMessage',function(mess){
		console.log('new messsage', mess)
	})


	socket.on('disconnect', function(){
		console.log('disconnected from server');
	});

	socket.on('newEmail', function(email){
		console.log('new Email', email);
	})

