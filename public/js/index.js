	
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
		var li = jQuery('<li></li>');
		li.text(`${mess.from}: ${mess.text}`);

		jQuery('#messages').append(li);
	})


	socket.on('disconnect', function(){
		console.log('disconnected from server');
	});

	// socket.on('newEmail', function(email){
	// 	console.log('new Email', email);
	// })

	// socket.emit('createMessage',{
	// 	from : 'frank',
	// 	text : 'hi'
	// },function(data) {
	// 	console.log(data);
	// });

	socket.on('newLocationMessage' , function(message){
		var li =jQuery('<li></li>');
		var a  = jQuery('<a target = "_blank"> My current Location </a>');
		li.text(`${message.from}: `);
		a.attr('href' , message.url);
		li.append(a);
		jQuery('#messages').append(li)
	})


	jQuery('#message-form').on('submit',function(e){
		e.preventDefault();

		socket.emit('createMessage',{
			from: 'user',
			text: jQuery('[name=message]').val()
		}, function(){

		})
	});

	var locationbutton = jQuery('#send-location');

	locationbutton.on('click' , function(){

		if(!navigator.geolocation){
			return alert('geolocation not supported by browswer')
		}

		navigator.geolocation.getCurrentPosition(function(position){


			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});


		}, function(){
			alert('unable to fetch geolocation')
		});

	});