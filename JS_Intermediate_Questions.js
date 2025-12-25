{
    // Q1: Implement a debounce function
    // Answer: Debounce is used to delay function execution until the user stops triggering an event, commonly used in search inputs to reduce API calls.

    //     <!DOCTYPE html>
    // <html>
    // <head>Debounce Example: </head>
    // <body>
    //     <br>
    //     <input type="text" id="input" placeholder="Search...">
    //     <p id="output"></p>
    // </body>
    // <script>
    //     function debouncing(fun, delay) {
    //         let timeoutId;
    //         return function (...args) {
    //             clearInterval(timeoutId);
    //             timeoutId = setTimeout(() => {
    //                 fun.apply(this, args);
    //             }, delay);
    //         }
    //     }

    //     function fetchResults(query) {
    //         document.getElementById('output').innerText = 'Api Call for: ' + query;
    //         console.log('query: ', query);
    //     }

    //     const debounce = debouncing(fetchResults, 500);

    //     document.getElementById('input').addEventListener('input', function (e) {
    //         debounce(e.target.value)
    //     });
    // </script>
    // </html>
}

{
    // Q2: Implement a throttle function
    // answer: Throttle limits the execution of a function to once every specified interval, commonly used for scroll, resize, and continuous input events.

    //     <!DOCTYPE html>
    // <html>

    // <head>Throttle Example: </head>

    // <body>
    //     <br>
    //     <input type="text" id="input" placeholder="Search..."><br>
    //     <p id="output"></p>
    // </body>
    // <script>
    //     function throttling(fun, delay) {
    //         let lastCall = 0;
    //         return function (...args) {
    //             const now = Date.now();
    //             if (now - lastCall >= delay) {
    //                 lastCall = now;
    //                 fun.apply(this, args);
    //             }
    //         }
    //     }

    //     function throttleFun(query) {
    //         document.getElementById('output').innerText = 'Api Call for Query: ' + query;
    //         console.log('Query: ', query);
    //     }

    //     const throttle = throttling(throttleFun, 1000); //1000ms = 1 sec 

    //     document.getElementById('input').addEventListener('input', function (e) {
    //         throttle(e.target.value);
    //     })

    // </script>

    // </html>
}

{
    // Q3: Implement Array.prototype.myMap
    //     Array.prototype.myMap = function (callback) {
    //     const result = [];

    //     for (let i = 0; i < this.length; i++) { //  this represents array on which the myMap is called.
    //         if (i in this) {
    //             result[i] = callback(this[i], i, this);
    //         }
    //     }
    //     return result;
    // };

    // const arr = [1, 2, 3, , 5];
    // const double = arr.myMap(a => a * 2);
    // console.log('Double: ', double);
}

{
    // Q4: Implement Array.prototype.myFilter
    //     Array.prototype.myMap = function (callback) {
    //     const result = [];

    //     for (let i = 0; i < this.length; i++) {
    //         if (i in this) {
    //             if (callback(this[i], i, this)) {
    //                 result.push(this[i]);
    //             }
    //         }
    //     }
    //     return result;
    // };

    // const arr = [1, 2, 3, , 5];
    // const double = arr.myMap(a => a % 2 === 0);
    // console.log('Double: ', double);
}

{
    // Q5: Implement Array.prototype.myReduce
    //    Array.prototype.myReduce = function (callback, initialValue) {
    //     let accumulator, startIndex;
    //     if (initialValue !== undefined) {
    //         accumulator = initialValue;
    //         startIndex = 0;
    //     } else {
    //         accumulator = this[0];
    //         startIndex = 1;
    //     }

    //     for (let i = startIndex; i < this.length; i++) {
    //         if (i in this) {
    //             accumulator = callback(accumulator, this[i], i, this);
    //         }
    //     }
    //     return accumulator;
    // };

    // const arr = [1, 2, 3, , 5];
    // const sum = arr.myReduce((a, b) => a + b, 0);
    // console.log('Sum: ', sum);
}

{
    // Q6: Implement a once function
    //     function once(fun) {
    //     let called = false, result;
    //     return function (...args) {
    //         if (!called) {
    //             called = true;
    //             result = fun.apply(this, args);
    //         }
    //         return result;
    //     }
    // }

    // function initialize() {
    //   console.log("App initialized");
    //   return "Done...";
    // }
    // const init = once(initialize);

    // console.log(init());
    // console.log(init());
    // console.log(init());

}

{
    // Q7: Implement Counter using closure
    //     function outer() {
    //     let count = 0;
    //     return function inner() {
    //         return count++;
    //     }
    // }

    // let c = outer();
    // let c2 = outer();
    // console.log('c : ',c());
    // console.log('c : ',c());
    // console.log('c : ',c());
    // console.log('c2 : ',c2());
    // console.log('c2 : ',c2());
}

{
    // Q8: Implement Function.prototype.myBind
    //    Function.prototype.myBind = function (context, ...bindArgs) {
    //     let fun = this;
    //     return function (...functionArgs) {
    //         return fun.apply(context, [...bindArgs, ...functionArgs]);
    //     }
    // }

    // const person = {
    //     name: "Saad"
    // }

    // function greeeting(city, country) {
    //     return `Hello ${this.name} from ${city}, ${country}`;
    // }

    // const binding = greeeting.myBind(person, "Ahmedabad");
    // console.log("Binding Example: ", binding("India"));
}

