// Q1: Explain the difference between var, let, and const with scope examples.

// Answer:
// var: Function-scoped, hoisted, can be re - declared and updated
// let: Block - scoped, hoisted but not initialized, can be updated but not re - declared
// const: Block-scoped, hoisted but not initialized, cannot be updated or re - declared(but object properties can be modified)



console.log(a);
var a = 10;
{
    console.log(a);
    var a = 20;
}
console.log(a);

// Output:
// undefined
// undefined
// 20

// explaination: due to hoisting the var a will got to the top as var a; consol.log(a); a = 10 so it will be undefined.and second log is also undefined because we wrote var a = 20 inside the { } so javascript engine treat it as single declaration of a.

// ---
let x = 5;
{
    console.log(x);
    let x = 10;
}
console.log(x);

// Output:
// ReferenceError: Cannot access 'x' before initialization.
// explaination: due to hoisting let x go to the top but gives error because let can't be used without initialization.
// ---

const obj = { count: 1 };
obj.count = 2;
console.log(obj.count);
obj = { count: 3 };

// Output: 2
// TypeError: Assignment to constant variable.
// explanation: we can modify the properties of object but can't reinitialize due to const.
// ---


// Q2: Explain type coercion with examples.What's the difference between == and ===?

// Answer:
// Type coercion is JavaScript's automatic conversion of values from one type to another.
// IMPLICIT Coercion (automatic)
console.log("5" + 5);     // "55" (number converted to string)
console.log("5" - 5);     // 0 (string converted to number)
console.log("5" * "2");   // 10 (both strings to numbers)
console.log(true + 1);    // 2 (true becomes 1)
console.log(false + 1);   // 1 (false becomes 0)


// EXPLICIT Coercion (manual)
let str = "123";
let num = Number(str);    // 123
let bool = Boolean(0);    // false

// == vs ===
console.log(5 == "5");    // true (coerces types, then compares)
console.log(5 === "5");   // false (no coercion, compares type + value)
console.log(null == undefined);   // true (special case)
console.log(null === undefined);  // false (different types)
console.log(0 == false);   // true
console.log(0 === false);  // false
// Best Practice: Always use === (strict equality) unless you specifically need type coercion.



// Expression	Logic	                       Final Comparison	 Result

// [] == false	    ToNumber([]) == ToNumber(false)	0 == 0         true  
// [] => "" => 0 and false => 0
// ![]	NOT(Truthy value)!true	false  ::: if not comparision => !
// [] becomes false because: \[] / {} is truly values so!true => false
// [] == ![] == false	0 == 0	true 

// ---


// Q3: Explain the typeof operator and its quirks.
// Answer:

console.log(typeof "hello");      // "string"
console.log(typeof 42);           // "number"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof Symbol('id')); // "symbol"
console.log(typeof 100n);         // "bigint"

// ⚠️ QUIRKS (Important for interviews!)

// Quirk 1: typeof null returns "object" (JS bug since beginning)
console.log(typeof null);         // "object" ❌ (historic mistake)

// Quirk 2: Functions return "function"
console.log(typeof function () { }); // "function" (not "object")

// Quirk 3: Arrays return "object"
console.log(typeof []);           // "object"
console.log(typeof {});           // "object"

// How to properly check arrays
console.log(Array.isArray([]));   // true ✅
console.log(Array.isArray({}));   // false ✅

// Quirk 4: typeof NaN is "number"
console.log(typeof NaN);          // "number" (Not a Number is a number 🤯)

// How to check for NaN properly
console.log(isNaN(NaN));          // true
console.log(Number.isNaN(NaN));  // true (more reliable)
// Interview Gold: Mentioning the typeof null bug shows deep knowledge!

console.log(NaN === NaN);        // false 🤯
console.log(NaN == NaN);         // false



// Nullish coalescing (??) - ES2020**
let value = null;
console.log(value ?? "default");  // "default"
console.log(0 ?? "default");      // 0 (only null/undefined trigger default)

// ---
// Q4: What are the different ways to declare functions in JavaScript ?
// Answer : There are 4 main ways to declare functions:

// 1. FUNCTION DECLARATION (Traditional)
function greet(name) {
    return `Hello, ${name}!`;

}
console.log(greet("Alice")); // "Hello, Alice!"



// 2. FUNCTION EXPRESSION (Assigned to variable)
const greet2 = function (name) {
    return `Hello, ${name}!`;
};
console.log(greet2("Bob")); // "Hello, Bob!"



// 3. ARROW FUNCTION (ES6+) - Modern \& Concise
const greet3 = (name) => {
    return `Hello, ${name}!`;
};

// Arrow function - even shorter (implicit return)
const greet4 = name => `Hello, ${name}!`;
console.log(greet4("Charlie")); // "Hello, Charlie!"

// 4. FUNCTION CONSTRUCTOR (Rarely used)
const greet5 = new Function('name', 'return `Hello, ${name}!`');
console.log(greet5("David")); // "Hello, David!"

// Key Differences:

// - Function declarations are HOISTED (can be called before declaration)

// - Function expressions are NOT hoisted

// - Arrow functions don't have their own 'this' binding


// Hoisting  = JavaScript moves function/variable declarations to the top of their scope during compilation.
// SCOPE CHAIN  = Order in which JavaScript looks for variables
// ---

// Q5: Explain rest parameters and spread operator.
// Answer:

// REST PARAMETERS (...) - Collects multiple arguments into array
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3));        // 6
console.log(sum(1, 2, 3, 4, 5));  // 15

// Rest must be LAST parameter
function multiply(multiplier, ...numbers) {
    return numbers.map(num => num * multiplier);
}
console.log(multiply(2, 1, 2, 3)); // \[2, 4, 6]

// SPREAD OPERATOR (...) - Expands array/object into individual elements
// 1. Spreading arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 2. Copying arrays (shallow copy)
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // \[1, 2, 3] (not affected)
console.log(copy);     // \[1, 2, 3, 4]

// 3. Spreading in function calls
const numbers1 = [5, 2, 8, 1, 9];
console.log(Math.max(...numbers1)); // 9

// 4. Spreading objects (ES2018)
const user = { name: "Alice", age: 25 };
const updatedUser = { ...user, age: 26, city: "NYC" };
console.log(updatedUser);
// { name: "Alice", age: 26, city: "NYC" }

// 5. Merging objects (later properties override earlier ones)
const defaults = { theme: "light", lang: "en" };
const userPrefs = { lang: "es", fontSize: 14 };
const settings = { ...defaults, ...userPrefs };
console.log(settings);
// { theme: "light", lang: "es", fontSize: 14 }

// 6. Common use case: Adding elements
const arr = [2, 3, 4];
const newArr = [1, ...arr, 5]; // \[1, 2, 3, 4, 5]

// REST vs SPREAD - Easy way to remember:

// REST: Collects things together (function parameters)

// SPREAD: Spreads things apart (arrays/objects)

// ---

// Q6: What are Immediately Invoked Function Expressions(IIFE) ?
// Answer : IIFE = Function that runs immediately after being defined.
(function () {
    console.log("I run immediately!");
})();

// With parameters
(function (name) {
    console.log(`Hello, ${name}!`);
})("Alice");

// Arrow function IIFE
(() => {
    console.log("Arrow IIFE!");
})();
// ---

// Q7: What is a closure ? Explain with practical examples.
// Answer: Closure = A function that has access to variables from its outer(enclosing) function, even after the outer function has finished executing.
// BASIC CLOSURE
function outer() {
    const message = "Hello"; // Outer variable
    function inner() {
        console.log(message); // Accesses outer variable
    }
    return inner;
}
const myFunc = outer(); // outer() finishes executing
myFunc(); // "Hello" - Still has access to 'message'!


function once(fn) {
    let called = false;
    return function () {
        if (!called) {
            called = true;
            return fn();
        }
        return "Already called";
    };
}
const runOnce = once(() => "Executed");
console.log(runOnce());
console.log(runOnce());
console.log(runOnce());

// Output:
// Executed
// Already called
// Already called

// Question 3
function outer() {
    let value = 10;
    return function inner(x) {
        value += x;
        return value;
    };
}
const fn1 = outer();
const fn2 = outer();
console.log(fn1(5));
console.log(fn1(5));
console.log(fn2(5));

// Output: 15,20,15
// ---

// Q8: What are higher - order functions ? Give examples.
// Answer: Higher - Order Function = A function that either:
// Takes a function as an argument, OR
// Returns a function, OR
// Both


// TYPE 1: Takes function as argument
// Example 1: Array methods (built-in HOFs)
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);

// map() is HOF, takes function as argument
// filter() is HOF
const evens = numbers.filter(num => num % 2 === 0);

// reduce() is HOF
const sum = numbers.reduce((acc, num) => acc + num, 0);

// ---

// Q9: Explain call, apply, and bind methods.
// Answer: These methods control the this context of functions.
// KEY DIFFERENCES TABLE:
// Method | Invokes Immediately? | Arguments Format
// call   | YES                 | Individual (arg1, arg2)
// apply  | YES                 | Array [arg1, arg2]
// bind   | NO (returns fn)     | Individual (can partial)

const obj = {
    value: 42,
    getValue() {
        return this.value;
    }
};
const extracted = obj.getValue; // whenever the value is assigned to a different variable it lost the context and become undefined.
console.log(obj.getValue());
console.log(extracted());
console.log(extracted.call(obj));
const bound = extracted.bind({ value: 100 }); // bind force to use the value/context
console.log(bound());

// Output:
// undefined
// 42
// 100


// Question 2
function show() {
    console.log(this.name);
}
const a = { name: "A", show };
const b = { name: "B" };
const boundShow = a.show.bind(b);
setTimeout(a.show, 0); // because settimeout is different function so it lost the context to solve it use arrow funtion/bind
setTimeout(boundShow, 0);

// Output:
// undefined
// B
// ---

// Q10: What is function currying? Implement examples.
// Answer: Currying = Transforming a function with multiple arguments into a sequence of functions each taking a single argument.
// NORMAL FUNCTION (not curried)
function add(a, b, c) {
    return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// CURRIED VERSION (manual)
function addCurried(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
}
console.log(addCurried(1)(2)(3)); // 6

// With arrow functions (cleaner)
const addCurriedArrow = a => b => c => a + b + c;
console.log(addCurriedArrow(1)(2)(3)); // 6

// PARTIAL APPLICATION (step by step)
const addOne = addCurriedArrow(1);      // a = 1
const addOneTwo = addOne(2);            // b = 2
const result = addOneTwo(3);            // c = 3
console.log(result); // 6
// ---


// Q11: What is function composition? Implement compose and pipe functions.
// Answer: Function Composition = Combining multiple functions to create a new function where output of one becomes input of next.

// MANUAL COMPOSITION
const add5 = x => x + 5;
const multiply3 = x => x * 3;
const subtract2 = x => x - 2;

// Without composition (nested calls - hard to read)
const result1 = subtract2(multiply3(add5(10)));
console.log(result1); // ((10 + 5) \* 3) - 2 = 43

// COMPOSE FUNCTION (Right to Left execution)
function compose(...fns) {
    return function (value) {
        return fns.reduceRight((acc, fn) => fn(acc), value);
    };
}
// Execution: add5(10) → multiply3(15) → subtract2(45) = 43
// ---

// PIPE FUNCTION (Left to Right execution)
function pipe(...fns) {
    return function (value) {
        return fns.reduce((acc, fn) => fn(acc), value);
    };
}
// Execution: add5(10) → multiply3(15) → subtract2(45) = 43
// ---

// Q12: Explain callback functions and the callback hell problem.
// Answer: CALLBACK FUNCTION = Function passed as argument to another function

// Simple example
function greet(name, callback) {
    console.log(`Hello, ${name}!`);
    callback();
}

function sayGoodbye() {
    console.log("Goodbye!");
}

greet("Alice", sayGoodbye);

// Output:
// "Hello, Alice!"
// "Goodbye!"

// CALLBACK HELL: Callback hell occurs when callbacks are nested deeply, making code hard to read and maintain.Solutions include using named functions, Promises, or async/await for cleaner, more readable asynchronous code.
// Nested callbacks - CALLBACK HELL!
step1(function () {
    step2(function () {
        step3(function () {
            console.log('All steps complete');
            // Imagine 10 more nested levels... 😱
        });
    });
});

// ---







