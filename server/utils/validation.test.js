const expect = require('expect');
const {isRealString}  = require('./validation.js');

describe ('is realstring validation',() =>{
   it ('should reject non-string values',() =>{
   	    var input = 12345;
   	    var response = isRealString(input);
   		expect(response).toBe(false);
   		
   });

   it ('should reject with only spaces',() =>{
   	    var input = '      ';
   	    var response = isRealString(input);
   		expect(response).toBe(false);
   });

   it ('should allow string with non-space charaters',() =>{
        var input = ' My chat room    ';
   	    var response = isRealString(input);
   		expect(response).toBe(true);
   });

});