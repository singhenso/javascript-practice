
var gold = {a: 1}
var blue = extend({}, gold); //one time property copying doesn't extend
var red = Object.create(gold); //ongoing lookup-time delegation
gold.b = 2;
console.log(blue.b) //undefined
console.log(red.b) //2