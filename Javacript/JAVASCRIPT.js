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

// Q13: How do you create arrays in JavaScript? What are the different methods?
// Answer: There are multiple ways to create arrays:

// 1. Array Literal (Most common)
const fruits = ['apple', 'banana', 'orange'];

// 2. Array Constructor
const numbers2 = new Array(1, 2, 3, 4, 5);
const empty = new Array(5); // Creates array with 5 empty slots

// 3. Array.from() - Create from iterable
const str1 = "hello";
const chars = Array.from(str); // ['h', 'e', 'l', 'l', 'o']

const set = new Set([1, 2, 3, 2, 1]);
const unique = Array.from(set); // [1, 2, 3]

// With mapping function
const doubled1 = Array.from([1, 2, 3], x => x * 2); // [2, 4, 6]

//---

// Q14: Explain array destructuring with examples.
// Answer: Destructuring allows unpacking array values into variables.

// Basic destructuring
const colors = ['red', 'green', 'blue'];
const [first, second, third] = colors;
console.log(first);  // "red"
console.log(second); // "green"

// Skip elements
const [primary, , tertiary] = colors;
console.log(primary);  // "red"
console.log(tertiary); // "blue"

// Rest operator
const numbers3 = [1, 2, 3, 4, 5];
const [one, two, ...rest] = numbers3;
console.log(one);  // 1
console.log(two);  // 2
console.log(rest); // [3, 4, 5]

// Default values
const [x1, y, z = 'default'] = ['x', 'y'];
console.log(z); // "default"

// Swapping variables
let p = 1, q = 2;
[p, q] = [q, p];
console.log(p, q); // 2, 1

// Function return values
function getCoordinates() {
    return [10, 20];
}
const [lat, lng] = getCoordinates();
//---

// Q15: What's the difference between push/pop and shift/unshift?
// Answer:
// Stack operations (end of array):
// push() - Add to end
// pop() - Remove from end

// Queue operations (beginning of array):
// unshift() - Add to beginning
// shift() - Remove from beginning

const arr3 = [1, 2, 3];

// PUSH - Add to end (returns new length)
arr3.push(4, 5);
console.log(arr3); // [1, 2, 3, 4, 5]
// POP - Remove from end (returns removed element)
const last = arr3.pop();
console.log(last); // 5
console.log(arr3);  // [1, 2, 3, 4]
// UNSHIFT - Add to beginning (returns new length)
arr3.unshift(0);
console.log(arr3); // [0, 1, 2, 3, 4]
// SHIFT - Remove from beginning (returns removed element)
const first1 = arr3.shift();
console.log(first1); // 0
console.log(arr3);   // [1, 2, 3, 4]
// Performance Note: push / pop are faster(O(1)) than shift / unshift(O(n)) because shift / unshift re - index entire array.

// ---

// Q16: Explain map(), filter(), and reduce() with practical examples.
// Answer:
// These are the most important array methods for interviews and React development.
// map() - Transform each element (returns new array)
// filter() - Select elements based on condition (returns new array)
// reduce() - Reduce array to single value
{
    numbers = [1, 2, 3, 4, 5];

    // MAP - Transform each element
    const doubled = numbers.map(num => num * 2);
    // [2, 4, 6, 8, 10]

    // FILTER - Select elements
    const evens = numbers.filter(num => num % 2 === 0);
    // [2, 4]

    // REDUCE - Accumulate to single value
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    // 15

    // REAL-WORLD EXAMPLE: E-commerce cart
    const cart = [
        { name: 'Laptop', price: 1000, quantity: 1 },
        { name: 'Mouse', price: 50, quantity: 2 },
        { name: 'Keyboard', price: 100, quantity: 1 }
    ];

    // Get total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0); // 1200

    // Get items over $75
    const expensive = cart.filter(item => item.price > 75);
    // [{ name: 'Laptop', ... }, { name: 'Keyboard', ... }]

    // Apply 10% discount
    const discounted = cart.map(item => ({ ...item, price: item.price * 0.9 }));
    // Interview Gold: These methods don't mutate original array (immutable). Essential for React state management!
}
// ---

// Q17: What's the difference between forEach() and map()?
// Answer:
// Feature         forEach()           map()
// Returns         undefined           New array
// Use case        Side effects        Transformation
// Chainable       ❌ No               ✅ Yes
// Break/continue  ❌ Can't            ❌ Can't

{
    const numbers = [1, 2, 3, 4, 5];

    // forEach - For side effects only
    numbers.forEach(num => {
        console.log(num * 2); // Logs: 2, 4, 6, 8, 10
    });    // Returns: undefined

    // map - Returns new array
    const doubled = numbers.map(num => num * 2);
    console.log(doubled); // [2, 4, 6, 8, 10]

    // ❌ Common mistake - expecting return value from forEach
    const wrong = numbers.forEach(num => num * 2);
    console.log(wrong); // undefined

    // ✅ Chaining with map
    const result = numbers
        .map(x => x * 2)
        .filter(x => x > 5)
        .reduce((sum, x) => sum + x, 0);
    console.log(result); // 30

    // ❌ Can't chain with forEach
    // numbers.forEach(...).filter(...) // Error!
    // When to use:
    // ✅ forEach() - Console logging, DOM manipulation, side effects
    // ✅ map() - Data transformation, React rendering, creating new arrays
}
//-----

{// Q18: Explain find(), findIndex(), some(), and every().
    // Answer:
    // find() - Returns first element that matches condition (or undefined)
    // findIndex() - Returns index of first match (or -1)
    // some() - Returns true if at least one element matches
    // every() - Returns true if all elements match
    const users = [
        { id: 1, name: 'Alice', age: 25, active: true },
        { id: 2, name: 'Bob', age: 17, active: false },
        { id: 3, name: 'Charlie', age: 30, active: true }
    ];

    // FIND - Get first match
    const user = users.find(u => u.age > 18);
    console.log(user); // { id: 1, name: 'Alice', ... }

    const notFound = users.find(u => u.age > 100);
    console.log(notFound); // undefined

    // FINDINDEX - Get position
    const index = users.findIndex(u => u.name === 'Bob');
    console.log(index); // 1

    // SOME - At least one matches?
    const hasMinor = users.some(u => u.age < 18);
    console.log(hasMinor); // true

    const hasAdmin = users.some(u => u.role === 'admin');
    console.log(hasAdmin); // false

    // EVERY - All match?
    const allActive = users.every(u => u.active);
    console.log(allActive); // false

    const allHaveId = users.every(u => u.id);
    console.log(allHaveId); // true

    // Performance Tip: find() and some() stop iterating once condition is met (short-circuit).

    // Common Use Cases:
    // find() - Get user by ID, search
    // some() - Validation (at least one error)
    // every() - Validation (all fields valid)
}

// ---

{
    // Q19: How do you flatten nested arrays ? Explain flat() and flatMap().
    // Answer:
    // flat() - Flattens nested arrays to specified depth
    // flatMap() - Maps then flattens(one level)

    // FLAT - Remove nesting
    const nested = [1, [2, 3], [4, [5, 6]]];

    console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]] (depth 1)
    console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6] (depth 2)
    console.log(nested.flat(Infinity)); // Completely flat

    // FLATMAP - Map then flatten (depth 1 only)
    const arr = [1, 2, 3];

    // Traditional map (nested result)
    const mapped = arr.map(x => [x, x * 2]);
    console.log(mapped); // [[1, 2], [2, 4], [3, 6]]

    // flatMap (automatically flattened)
    const flatMapped = arr.flatMap(x => [x, x * 2]);
    console.log(flatMapped); // [1, 2, 2, 4, 3, 6]

    // PRACTICAL: Split sentences into words
    const sentences = ["Hello world", "How are you"];
    const words = sentences.flatMap(s => s.split(' '));
    console.log(words); // ["Hello", "world", "How", "are", "you"]
}

// ---

{
    // Q20: What's the difference between slice() and splice()?
    // Answer:
    // Feature             slice()             splice()
    // Mutates original    ❌No                ✅Yes
    // Returns             New array(copy)     Removed elements
    // Purpose             Extract portion     Add / remove elements

    // Arguments:
    // slice(start, end)          // end not included
    // splice(start, deleteCount, ...itemsToAdd)

    const arr = [1, 2, 3, 4, 5];

    // SLICE - Extract (doesn't mutate)
    const sliced = arr.slice(1, 4); // Start at index 1, end before 4
    console.log(sliced); // [2, 3, 4]
    console.log(arr);    // [1, 2, 3, 4, 5] (unchanged)

    // SPLICE - Modify (mutates original)
    const removed = arr.splice(1, 2); // Remove 2 elements from index 1
    console.log(removed); // [2, 3] (removed elements)
    console.log(arr);     // [1, 4, 5] (modified!)

    // SPLICE - Insert
    const arr2 = [1, 2, 5];
    arr2.splice(2, 0, 3, 4); // At index 2, remove 0, add 3, 4
    console.log(arr2); // [1, 2, 3, 4, 5]

    // SPLICE - Replace
    const arr3 = [1, 2, 3, 4, 5];
    arr3.splice(2, 2, 'a', 'b'); // Remove 2 elements, add 'a', 'b'
    console.log(arr3); // [1, 2, 'a', 'b', 5]

    //     When to use:
    //      ✅ slice() - Copy arrays, extract portions(immutable operations)
    //      ✅ splice() - Modify arrays in place(use carefully in React!)
}

// ---

{
    // Q21: How do you sort arrays? Explain the sort() method.
    // Answer:
    // sort() mutates the original array and sorts elements as strings by default!

    // ⚠️ DEFAULT (converts to strings)
    const numbers = [10, 5, 40, 25, 1000, 1];
    numbers.sort();
    console.log(numbers); // [1, 10, 1000, 25, 40, 5] ❌ Wrong! => because it will only compare the first digit of the number as string.

    // ✅ CORRECT - Provide compare function
    numbers.sort((a, b) => a - b); // Ascending
    console.log(numbers); // [1, 5, 10, 25, 40, 1000] ✅

    numbers.sort((a, b) => b - a); // Descending
    console.log(numbers); // [1000, 40, 25, 10, 5, 1] ✅

    // STRINGS (works by default)
    const names = ['Charlie', 'Alice', 'Bob'];
    names.sort();
    console.log(names); // ['Alice', 'Bob', 'Charlie']

    // OBJECTS - Sort by property
    const users = [
        { name: 'Charlie', age: 30 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 35 }
    ];

    users.sort((a, b) => a.age - b.age); // Sort by age
    console.log(users);
    // [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 30 }, ...]

    users.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
}
// ---
{
    // Q21: Explain includes(), indexOf(), and lastIndexOf().
    // Answer:
    // includes() - Returns boolean
    // indexOf() - Returns index or - 1
    // lastIndexOf() - Returns last occurrence index or - 1

    const arr = [1, 2, 3, 4, 3, 5];

    // INCLUDES - Check existence (returns boolean)
    console.log(arr.includes(3));    // true
    console.log(arr.includes(10));   // false
    console.log(arr.includes(3, 3)); // true (search from index 3)

    // INDEXOF - Get first position
    console.log(arr.indexOf(3));     // 2 (first occurrence)
    console.log(arr.indexOf(10));    // -1 (not found)
    console.log(arr.indexOf(3, 3));  // 4 (search from index 3)

    // LASTINDEXOF - Get last position
    console.log(arr.lastIndexOf(3)); // 4 (last occurrence)

    // ⚠️ IMPORTANT: These use strict equality (===)
    const mixed = [1, '1', 2];
    console.log(mixed.includes(1));   // true
    console.log(mixed.includes('1')); // true
    console.log(mixed.indexOf(1));    // 0
    console.log(mixed.indexOf('1'));  // 1

    // NaN handling
    const withNaN = [NaN, 1, 2];
    console.log(withNaN.includes(NaN));  // true ✅
    console.log(withNaN.indexOf(NaN));   // -1 ❌ (indexOf can't find NaN)
}
// ---
{
    // Q22: Explain Object.assign() and the spread operator for objects.
    // Answer: Both are used to copy / merge objects(shallow copy).

    // OBJECT.ASSIGN() - Copies properties to target object
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };

    const result = Object.assign(target, source);
    console.log(result); // { a: 1, b: 3, c: 4 }
    console.log(target); // { a: 1, b: 3, c: 4 } (mutated!)

    // Better: Create new object (don't mutate)
    const merged = Object.assign({}, target, source);

    // SPREAD OPERATOR (Modern, preferred)
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };

    const combined = { ...obj1, ...obj2 };
    console.log(combined); // { a: 1, b: 3, c: 4 }
    console.log(obj1);     // { a: 1, b: 2 } (unchanged)

    // CLONING OBJECTS
    const original = { name: 'Alice', age: 25 };
    const clone = { ...original };
    clone.age = 30;
    console.log(original.age); // 25 (not affected)

    // ADDING/OVERRIDING PROPERTIES
    const user = { name: 'Bob', age: 30 };
    const updated = { ...user, age: 31, city: 'NYC' };
    console.log(updated); // { name: 'Bob', age: 31, city: 'NYC' }

    // ⚠️ SHALLOW COPY WARNING
    const obj = {
        name: 'Alice',
        address: { city: 'NYC' }
    };

    const copy = { ...obj };
    copy.address.city = 'LA';
    console.log(obj.address.city); // "LA" (nested object shared!)

    // ✅ DEEP COPY solutions
    // 1. JSON method (doesn't work with functions, dates, undefined)
    const deepCopy1 = JSON.parse(JSON.stringify(obj));

    // 2. structuredClone (modern browsers)
    const deepCopy2 = structuredClone(obj);
}
// ---
{
    // Q23: Explain Object.freeze(), Object.seal(), and their differences.
    // Answer:
    // Object.freeze() - Makes object completely immutable
    // Object.seal() - Prevents adding / removing properties, but allows modification

    // OBJECT.FREEZE() - Complete immutability
    const frozen = { name: 'Alice', age: 25 };
    Object.freeze(frozen);

    frozen.age = 30;        // ❌ Ignored (strict mode: error)
    frozen.city = 'NYC';    // ❌ Ignored
    delete frozen.name;     // ❌ Ignored

    console.log(frozen); // { name: 'Alice', age: 25 } (unchanged)

    // OBJECT.SEAL() - Structure locked, values can change
    const sealed = { name: 'Bob', age: 30 };
    Object.seal(sealed);

    sealed.age = 35;        // ✅ Works!
    sealed.city = 'LA';     // ❌ Ignored
    delete sealed.name;     // ❌ Ignored

    console.log(sealed); // { name: 'Bob', age: 35 }

    // CHECK STATUS
    console.log(Object.isFrozen(frozen));  // true
    console.log(Object.isSealed(sealed));  // true

    // ⚠️ SHALLOW ONLY (nested objects not affected)
    const obj = {
        name: 'Charlie',
        address: { city: 'NYC' }
    };

    Object.freeze(obj);
    obj.name = 'David';           // ❌ Ignored
    obj.address.city = 'LA';      // ✅ Works! (nested object not frozen)

    console.log(obj); // { name: 'Charlie', address: { city: 'LA' } }
}

// ---

{
    // Q24: What is optional chaining(?.) and nullish coalescing(??) ?
    //     Answer :
    //     Modern operators(ES2020) for handling null / undefined safely.
    // OPTIONAL CHAINING (?.)
    // Problem: Nested property access
    const user = {
        name: 'Alice',
        address: {
            city: 'NYC'
        }
    };

    // ❌ Old way (risky)
    // console.log(user.profile.bio); // Error: Cannot read property 'bio'

    // ❌ Old safe way (verbose)
    const bio1 = user && user.profile && user.profile.bio;

    // ✅ Optional chaining (clean)
    const bio2 = user?.profile?.bio;
    console.log(bio2); // undefined (no error!)

    // OPTIONAL CHAINING with ARRAYS
    const users = [
        { name: 'Bob', posts: [{ title: 'Post 1' }] }
    ];

    console.log(users[0]?.posts?.[0]?.title); // "Post 1"
    console.log(users[1]?.posts?.[0]?.title); // undefined (no error)

    // OPTIONAL CHAINING with FUNCTIONS
    const obj = {
        greet: () => 'Hello'
    };

    console.log(obj.greet?.()); // "Hello"
    console.log(obj.missing?.()); // undefined (no error)

    // NULLISH COALESCING (??)
    // Returns right side only if left is null/undefined (not 0, '', false)

    const value1 = null ?? 'default';     // "default"
    const value2 = undefined ?? 'default'; // "default"
    const value3 = 0 ?? 'default';        // 0 (not null/undefined!)
    const value4 = '' ?? 'default';       // '' (not null/undefined!)
    const value5 = false ?? 'default';    // false (not null/undefined!)

    // COMPARISON with OR (||)
    console.log(0 || 'default');    // "default" (0 is falsy)
    console.log(0 ?? 'default');    // 0 (0 is not null/undefined)

    console.log('' || 'default');   // "default" ('' is falsy)
    console.log('' ?? 'default');   // '' ('' is not null/undefined)

    // PRACTICAL EXAMPLE: Default values
    function greet(name) {
        // ✅ Correctly handles empty string
        const userName = name ?? 'Guest';
        return `Hello, ${userName}`;
    }

    console.log(greet('Alice')); // "Hello, Alice"
    console.log(greet(''));      // "Hello, " (empty string kept)
    console.log(greet(null));    // "Hello, Guest"

    // COMBINED USAGE
    const user2 = {
        settings: {
            notifications: false
        }
    };

    const notify = user2?.settings?.notifications ?? true;
    console.log(notify); // false (not undefined, actual value)
}

{
    // Q25: Explain shallow copy vs deep copy of objects.
    // Answer:
    // Shallow Copy - Copies top - level properties(nested objects shared)
    // Deep Copy - Recursively copies all levels(completely independent)

    // SHALLOW COPY METHODS
    const original = {
        name: 'Alice',
        age: 25,
        address: { city: 'NYC' }
    };

    // Method 1: Spread operator
    const copy1 = { ...original };

    // Method 2: Object.assign()
    const copy2 = Object.assign({}, original);

    // PROBLEM: Nested objects are shared!
    copy1.name = 'Bob';           // ✅ Original unchanged
    copy1.address.city = 'LA';    // ❌ Original changed too!

    console.log(original.name);        // "Alice" (not affected)
    console.log(original.address.city); // "LA" (affected!)

    // DEEP COPY METHODS
    // Method 1: JSON (simple but has limitations)
    const deepCopy1 = JSON.parse(JSON.stringify(original));
    deepCopy1.address.city = 'Chicago';
    console.log(original.address.city); // "LA" (not affected)

    // Method 2: structuredClone() (Modern, recommended)
    const deepCopy2 = structuredClone(original);
    deepCopy2.address.city = 'Boston';
    console.log(original.address.city); // "LA" (not affected)

    // ✅ structuredClone handles: Dates, Sets, Maps, TypedArrays
    // ❌ Still can't clone: Functions, DOM nodes
}

//---

{
    //     Q26: What is asynchronous programming ? Why is it needed ?
    //         Answer :
    //         Asynchronous programming = Executing tasks without blocking the main thread, allowing other operations to continue.
    //         Why needed ? JavaScript is single - threaded.Without async, long operations(API calls, file reading) would freeze the entire application.

    //  What is a Promise ? Explain its states and basic usage.
    //     Answer:
    //     Promise = Object representing eventual completion(or failure) of an asynchronous operation.

    // 3 States:
    // Pending - Initial state, operation ongoing
    // Fulfilled - Operation completed successfully
    // Rejected - Operation failed

    // CREATING A PROMISE
    const myPromise = new Promise((resolve, reject) => {
        const success = true;

        setTimeout(() => {
            if (success) {
                resolve('Operation successful!'); // Fulfilled
            } else {
                reject('Operation failed!');      // Rejected
            }
        }, 1000);
    });

    // CONSUMING A PROMISE
    myPromise
        .then(result => {
            console.log(result); // "Operation successful!"
        })
        .catch(error => {
            console.error(error); // If rejected
        })
        .finally(() => {
            console.log('Promise settled (fulfilled or rejected)');
        });

    // Explain Promise.all(), Promise.race(), Promise.allSettled(), and Promise.any().

    // SETUP: Sample promises
    const promise1 = Promise.resolve(3);
    const promise2 = new Promise(resolve => setTimeout(() => resolve(42), 1000));
    const promise3 = new Promise(resolve => setTimeout(() => resolve(100), 2000));
    const promiseFail = Promise.reject('Error occurred');

    // 1. PROMISE.ALL() - Waits for ALL to fulfill (or ONE to reject)
    Promise.all([promise1, promise2, promise3])
        .then(results => {
            console.log(results); // [3, 42, 100] (after 2 seconds)
        })
        .catch(error => {
            console.error('One failed:', error);
        });

    // If ANY promise rejects, entire Promise.all rejects
    Promise.all([promise1, promiseFail, promise3])
        .then(results => console.log('Success'))
        .catch(error => console.error('Failed:', error)); // "Failed: Error occurred"

    // 2. PROMISE.RACE() - Returns first settled (fulfilled OR rejected)
    Promise.race([promise2, promise3])
        .then(result => {
            console.log('First finished:', result); // 42 (after 1 second)
        });

    Promise.race([promise2, promiseFail])
        .then(result => console.log('Won:', result))
        .catch(error => console.error('Lost:', error)); // Depends which finishes first

    // 3. PROMISE.ALLSETTLED() - Waits for ALL (never rejects)
    Promise.allSettled([promise1, promiseFail, promise3])
        .then(results => {
            console.log(results);
            // [
            //   { status: 'fulfilled', value: 3 },
            //   { status: 'rejected', reason: 'Error occurred' },
            //   { status: 'fulfilled', value: 100 }
            // ]
        });

    // 4. PROMISE.ANY() - Returns first FULFILLED (ignores rejections)
    const fail1 = Promise.reject('Error 1');
    const fail2 = Promise.reject('Error 2');
    const success = new Promise(resolve => setTimeout(() => resolve('Success'), 1000));

    Promise.any([fail1, fail2, success])
        .then(result => {
            console.log('First success:', result); // "Success"
        })
        .catch(error => {
            console.error('All failed'); // Only if ALL reject
        });
}
//---

{
    //Q27:  What is async / await ? How is it different from Promises ?
    //     Answer :
    //     async / await = Syntactic sugar over Promises, makes asynchronous code look synchronous.

    // PROMISE SYNTAX
    function fetchData() {
        return fetch('https://api.example.com/data')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(error => {
                console.error(error);
            });
    }

    // ASYNC/AWAIT SYNTAX (Same functionality, cleaner)
    async function fetchDataAsync() {
        try {
            const response = await fetch('https://api.example.com/data');
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

}

//---

{
    //     Q28: What is the Event Loop ? Explain how JavaScript handles asynchronous code.
    //         Answer:
    //             Event Loop = Mechanism that handles asynchronous operations in JavaScript's single-threaded environment.

    //Components:
    // Call Stack - Executes synchronous code(LIFO)
    // Web APIs - Handles asynchronous operations/callbacks(setTimeout, fetch, DOM events)
    // Callback Queue - Stores callbacks from Web APIs(FIFO)
    // Microtask Queue - Higher priority queue(Promises)
    // Event Loop - Monitors and moves tasks means moves completed callbacks from the callback/microtask queue to Call Stack when it's empty.

    // DETAILED EXAMPLE
    console.log('A');

    setTimeout(() => console.log('B'), 0);

    Promise.resolve()
        .then(() => console.log('C'))
        .then(() => console.log('D'));

    console.log('E');

    // OUTPUT: A → E → C → D → B
    // Explanation:
    // 1. A (sync)
    // 2. setTimeout queued (macrotask)
    // 3. Promise queued (microtask)
    // 4. E (sync)
    // 5. Call stack empty → Process microtasks (C, D)
    // 6. Process macrotasks (B)
}

//---

{
    // Q29: How does method chaining work ? Implement it.
    // Answer:
    // METHOD CHAINING - Return 'this' from methods
    class Calculator {
        constructor() {
            this.value = 0;
        }

        add(n) {
            this.value += n;
            return this; // Enable chaining
        }

        subtract(n) {
            this.value -= n;
            return this;
        }

        multiply(n) {
            this.value *= n;
            return this;
        }

        divide(n) {
            if (n !== 0) {
                this.value /= n;
            }
            return this;
        }

        getResult() {
            return this.value;
        }
    }

    // CHAINING IN ACTION
    const calc = new Calculator();
    const result = calc
        .add(10)
        .multiply(2)
        .subtract(5)
        .divide(3)
        .getResult();

    console.log(result); // 5
}