"use strict";

console.log("Hello World!");

//* Basics
const c = 2;    // x can't be reassigned anymore
// c = 4;       // Error
console.log(typeof c);

let y = 4;      // y can be reassigned after definition
y = 5;

// let y1;          // error, variable must be initialized
// Arithmatic expressions work like C
const res = (c+2)*y;

// Old style: DO NOT USE !!!
var y2 = 4;
// y3 = 7;   // works without "use strict", but DO NOT USE

//** Maths
y = Math.sin(c);
y = Math.pow(c,3);  // x^3, no ^-operator in JS
y = c**3;           // Power operator, new in ES6
const pi = Math.PI;



//** Special values and types
const u1 = undefined;
const u2 = Number.NaN;
const u3 = null;       // not much used in JS

//** Strings
const z = 'abc';
const z1 = "xyz";
const zType = typeof z;
console.log('The value of z = ' + z);     // String concatenation
console.log('c='+c);


//** Logical comparison
const flag = (7>3);
const x = 2;
const x2 = 2;
console.log(x==x2);
console.log(x===x2);
console.log(2=="2");   // true if equal up to type conversion
console.log(2==="2");   // true if type and value are the same


//* Control flow

//** while and switch similar to C
let count = 0;
for(let k=0; k<5; k++) {
  count += 2;
}
console.log("count="+count);


//** if conditions similar to C, too
if (count>8) {
  // executed
} else {
  // not executed
}


//** Simple user interaction
// alert("Message");
// const xxx = prompt('Some question');

// Exercise: Multiplication app




//* Functions
// Option 1:
function f1(a,b,c) {
  const tmp = a+b+c;   // tmp is local variable
  return tmp;
}


y = f1(1,2,3);

// Option 2: function definition is assignment:
const f2 = function(a,b,c) {
  "use strict";
  return a*b*c;
};



const s = Math.sin;     // alias for Math.sin
console.log(s(Math.PI));

// function arguments can have default values:
const f3 = function(a,b=3,c=2) {
  // "use strict"; // doesn't work
  return a*b*c;
};


// Exercise: Newton iteration

//** Error handling with try and catch
function factorial(n) {
  if (n===0 || n===1) {
    return 1;
  } else if(n>1) {
    return n*factorial(n-1);
  } else {
    throw Error("n must be a non-negative integer");
  }
}

try {
  x = factorial(2.3);
} catch(err) {
  console.log("Something happened: " + err.message);
}


//* Arrays
const v1 = [1,2,3,4];
const v2 = new Array(4);
// Note: v1 cannot be reassigned, but array can be modified!!
v1[0] = 17;
v1.pop();




//** Loop over elements
for (let k=0; k<v2.length; ++k) {
  console.log(k);
  v2[k] = Math.random();
}


// Special loop notation (ES6) for looping over array elements
for(let elem of v2) {
  console.log('elem=', elem);
}


//** Element access
let v = [];
v[4] = 12;

// an array can hold different types!
v = [];
v[0] = 12;
v[1] = 'Hallo';











//** Vectorization
v = [1,2,3,4];
console.log(v[2]);
Math.sin(v);     // doesn't work like Matlab :-(


function myPrint(value, idx) {
  console.log('The value at index ' + idx + ' is ' + value);
}
v.forEach(myPrint);  // forEach ignores return values

// vectorized computation of sines:
let w = v.map(Math.sin);

//** Arrow functions (ES 6):
// Syntactic simplification
let func = x => 2*x+3;

// a slighty more elaborate example
func = (x,y) => {
  const a = x+y;
  return 2*a;
};

// see for instance here for further details: http://es6-features.org/#ExpressionBodies


// application: apply sin*cos to an array:
w = v.map(function(value) {
  return Math.sin(value) * Math.cos(value);
});

// still shorter using arrow functions:
w = v.map(x => Math.sin(x)*Math.cos(x));









//* Objects

// Object definition:
const obj = {
  x: 3,
  y: 'Hello'
};
// Field access with dot-notation
console.log('obj.x=', obj.x);

// you can modify the fields of a const object!
obj.x = 12;



//** Object methods
// Note the 'this' keyword: It represents the scope of 'obj'

const obj1 = {
  field1: 12,
  field2: 'Hello',
  print() {
    console.log('Here is f');
    console.log('field 1 = '  + this.field1);
  },
  func5: function() {
    console.log('Here is f');
    console.log('field 1 = '  + this.field1);
  }
};

obj1.func2 = function() {
  console.log('field 2 = '  + this.field2);
};






















//** Copying
// Copying means creating a new reference, not a new object !!
const obj2 = obj1;
obj2.field1 = 15;
obj2.print();    // as expected
obj1.print();     // !!


//** Passing objects to functions by reference:
func = function(obj) {
  obj.field1 = 67;
};



//* Object orientation
// How to create many diffent objects with same fields?


//** Constructor functions: capital letter!
function A(a,b) {
  "use strict";
  this.x = a;
  this.y = b;
  this.z = 10;
  this.f = function() {return this.x*this.y;};
}
const b1 = new A(1,2);    // correct object creation
console.log(b1 instanceof A);
// var b2 = A(1,2);   // BUG: In this call 'this' refers to the global scope
const b2 = new A(3,4);




// Use the prototype to add something to any object of type A
A.prototype.z2 = 12;   // now accessible in all A objects

// It'ss a good idea to add methods to the prototype
A.prototype.f2 = function() {return this.x + this.y;};

// Don't use arrow function here, because this is not bound to a A-object but to a global object!!
A.prototype.f3 = () => this.x + this.y;




// Example for inheritance

function Animal(type) {
  "use strict";
  this.type = type;
}
Animal.prototype.print = function() {
  console.log('this is an animal of type ' + this.type);
};



function Dog(name) {
  "use strict";
  Object.assign(this, new Animal("dog"));
  this.name = name;
}
Object.setPrototypeOf(Dog.prototype, Animal.prototype);


let d = new Dog('Pfiffi');
d.__proto__ === Dog.prototype;
Dog.prototype.__proto__ = Animal.prototype;
