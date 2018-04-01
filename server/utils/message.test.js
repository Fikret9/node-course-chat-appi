const expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');
describe ('generateMessage',() =>{
   it ('should generate correct message object',() =>{
   	    var from = 'Fikret';
   	    var text = 'this is a message';
 

   		var response = generateMessage(from,text);
   		expect(response.from === from);
   		expect(response.text === text);
   		expect(response.createdAt).toBeA('number');
   });
});

describe ('generateLocationMessage',() =>{
   it ('should generate correct location object',() =>{
   	    var from = 'Fikret';
   	    var lat  = '41.0';
   	    var lng  = '50.5 ';  
   	    var url  = 'https://www.google.com/maps?q=41.0,50.5' ;
   		var response = generateLocationMessage(from,lat,lng); 
   		response.url = response.url.trim();
   		expect(response).toInclude({from,url});   		
   		expect(response.createdAt).toBeA('number');
   });
});