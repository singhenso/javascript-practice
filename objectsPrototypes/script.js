'use strict';

//constructor function
function livingThing(){
	this.planet = 'earth'
}
//added prototype property here
livingThing.prototype.needsEnergy = true;

//instantiated in memory here
var organism = new livingThing();
console.log(organism); //returns object livingThing
console.log(organism.needsEnergy); //true; inherits from living thing prototype

function Animal(){};
Animal.prototype = Object.create(livingThing.prototype);
Animal.prototype.hasFur = true;
Animal.prototype.grunt = function(){
	console.log('Grunt');
}
var sallyTheGiraffe = new Animal();

console.log(sallyTheGiraffe.constructor); //returns livingthing
Animal.prototype.constructor = Animal;
console.log(sallyTheGiraffe.constructor); //returns animal

console.log(sallyTheGiraffe.needsEnergy); //true
console.log(sallyTheGiraffe.planet); //undefined, wasn't part of the prototype so didn't inherit
console.log(sallyTheGiraffe.hasFur); //true

/*
	Things that are unique to the object should be inside the constructor and passed in.

	Things not unique can be added to the prototype.
*/

function Cat(color){
	this.eats = 'mice',
	this.color = color
}
Cat.prototype = Object.create(Animal.prototype);
var kitty = new Cat('brown');

kitty.grunt(); //Grunt
console.log(kitty.needsEnergy); //true

/*----------------Creating prototypes with classes---------------------*/

class Person{
	constructor(occupation){
		this.occupation = occupation || 'Occupation unknown'
	}

	sayHello(){
		console.log('Hello my occupation is ' + this.occupation);
	}
}

class SoftwareDeveloper extends Person{
	constructor(name){
		super('Software Developer') //calls parent's constructor
		this.name = name
	}
}

var Lisa = new SoftwareDeveloper('Lisa');

console.log(Lisa.name + ', ' + Lisa.occupation);
Lisa.sayHello();

/*
	Using the class syntax instead of constructor syntax makes objects not enumerable test
*/