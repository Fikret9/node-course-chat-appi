[{
	id: 'xyz',
	name: 'ccc' ,
	room: 'vvv'
}]
 


class Users {
	constructor () {
		this.users = [];
	}
	addUser (id, name, room) {
		var user = {id,name,room};
		this.users.push(user);
	}
	removeUser(id) {
		var user =  this.getUser(id);
		console.log('removing', id);
		if (user) {
			this.users = this.users.filter((user) => user.id !== id); 
			console.log('removed ', id);
		}
		return user;
		
	}
	getUser(id) {
		var users = this.users.filter((user) => user.id === id);
		return users[0]; 
	}
	getUserList (room) {
		var users = this.users.filter((user) => user.room === room);
		var namesArray = users.map((user) => user.name);
        return namesArray;
		
	}
}

module.exports = {Users};


// class Person {
//  constructor (name, age) {
//  this.name = name;
//  this.age=age;
//  }
//  getUserDescription() {
//  	return `${this.name} is ${this.age} years old`;
//  }
// }

// var me = new Person('Fikret',58);
// console.log(me.getUserDescription());