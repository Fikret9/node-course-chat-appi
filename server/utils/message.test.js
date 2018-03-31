const expect = require('expect');
var {generateMessage} = require('./message');
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