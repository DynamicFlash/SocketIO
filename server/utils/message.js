var generateMessage = (from , text)=>{
	var d = new Date(); 
	var time = 	`${d.getHours()}:`+`${d.getMinutes()}:`+ `${d.getSeconds()}`;
	return{
		from,
		text,
		createdAt : time
	};
};

var generateLocationMessage = (from , latitude, longitude)=>{
	var d = new Date(); 
	var time = 	`${d.getHours()}:`+`${d.getMinutes()}:`+ `${d.getSeconds()}`;
	 return {
	 	from,
	 	url : `http://www.google.com/maps?q=${latitude},${longitude}`,
	 	_createdAt: time
	 };
};

//console.log(generateMessage("aldrin", "this is test"));

module.exports ={generateMessage , generateLocationMessage};