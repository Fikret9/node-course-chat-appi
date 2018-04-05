const expect = require('expect');
const {Users} = require('./users');

describe ('Users',() =>{
	var users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node course'
		},{
			id: '3',
			name: 'Jen',
			room: 'React course'
		},
		{
		id: '2',
			name: 'Jean',
			room: 'Node course'	
		}
		]
	});
   it ('should add new user',() =>{
   	    var users = new Users();
   	    var user = {
   	    	id: '123',
   	    	name: 'FIkret',
   	    	room: 'Node js'
   	    }
   	    
   	    var resUser = users.addUser(user.id,user.name,user.room);
   		expect(users.users).toEqual([user]);
   		
   }); 


	it ('should return names for Node course',() =>{
   	    var userlist = users.getUserList('Node course');   	    
   		expect(userlist).toEqual(['Mike','Jean']);
   		
    }); 
	it ('should return names for React course',() =>{
   	    var userlist = users.getUserList('React course');   	    
   		expect(userlist).toEqual(['Jen']);
   		
   }); 

  //
   it ('should remove user',() =>{
   	    var user = users.removeUser('3');    
   		expect(user.id).toBe('3');
   		expect(users.users.length).toBe(2);
   		
   });

	it ('should not remove user for non-existent id',() =>{
   	    var user = users.removeUser('9');   
   	    expect(user).toNotExist();
   	    expect(users.users.length).toBe(3);   
   		
   		
   });

	it ('should find user',() =>{
   	    var user = users.getUser('1');   	    
   		expect(user.name).toBe('Mike');
   		
   });

	it ('should not find user with invalid id ',() =>{
   	    var user = users.getUser('8');   	    
   		expect(user).toNotExist();
   		
   });

});