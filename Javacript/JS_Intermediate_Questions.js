{
    // Q1: Implement a debounce function
    // Answer: Debounce is used to delay function execution until the user stops triggering an event, commonly used in search inputs to reduce API calls.

    // <!DOCTYPE html>
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

    // <!DOCTYPE html>
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
    //     Array.prototype.myFilter = function (callback) {
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
    // const even = arr.myFilter(a => a % 2 === 0);
    // console.log('Even: ', even);
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

{
    // Q9: Implement Function.prototype.myCall
       Function.prototype.myCall = function (context, ...cllingargs) {
        context = context ?? globalThis;
        let funKey = Symbol('fun');
        context[funKey] = this;
        let result = context[funKey](...cllingargs);
        delete context[funKey];
        return result;
    }

    const person = {
        name: "Saad"
    }

    function greeeting(city, country) {
        return `Hello ${this.name} from ${city}, ${country}`;
    }

    console.log(greeeting.myCall(person, "Ahmedabad", "India"));
}

{
    // Q10: Implement Function.prototype.myApply
    Function.prototype.myApply = function (context, ...arrayargs) {
        context = context ?? globalThis;
        let funKey = Symbol('fun');
        context[funKey] = this;
        let result;
        if (Array.isArray(arrayargs)) {
            result = context[funKey](...arrayargs);
        } else {
            result = context[funKey]();
        }
        delete context[funKey];
        return result;
    }

    const person = {
        name: "Saad"
    }

    function greeeting(city, country) {
        return `Hello ${this.name} from ${city}, ${country}`;
    }

    console.log(greeeting.myApply(person, ["Ahmedabad", "India"]));
}

{
    // Q11: Implement Promise that runs n times
    let attempt = 0;
    async function retryPromise(fun, count) {
        try {
            await fun();
        } catch (error) {
            if (count === 0) {
                throw error;
            }
            return retryPromise(fun, count - 1);
        }
    }

    function fakeApi() {
        return new Promise((resolve, reject) => {
            attempt++;
            console.log("Attempts: ", attempt);
            if (attempt < 3) {
                reject('Promise rejected!');
            } else {
                resolve('Promise resolved!');
            }
        })
    }

    retryPromise(fakeApi, 4).then(res => console.log('success', res)).catch(err => console.log('error: ', err));
}

{
    // Q12: Implement Memoization
    // A memoization function stores (caches) the result of heavy or expensive computations so the same work is not done again
        function memoization(fun) {
        let cache = {};
        return function (...args) {
            let key = JSON.stringify(args);
            if (cache[key]) {
                console.log('Fetching from Cache');
                return cache[key];
            }

            console.log('Computing....');
            let result = fun.apply(this, args);
            cache[key] = result;
            return result;
        }
    }

    function heaveFun(a, b) {
        for (let i = 0; i < 1e9; i++) { }
        return a + b;
    }

    const memoryFun = memoization(heaveFun);

    console.log(memoryFun(2, 3));
    console.log(memoryFun(2, 3));
    console.log(memoryFun(2, 4));
}

{
    // Q13 Write a function to limit API calls per second
    // I limited API calls by tracking the number of calls in a 1-second window and resetting the counter every second.
    // Throttle controls frequency, rate limiting controls volume over time.
        function rateLimit(fun, limit) {
        let calls = 0;
        let lastCall = Date.now();

        return function (...args) {
            const now = Date.now();

            if (now - lastCall >= 1000) {
                calls = 0;
                lastCall = now;
            }

            if (calls < limit) {
                calls++;
                return fun.apply(this, args);
            } else {
                console.log('Rate Limiting blocks the funtion!');
            }
        }
    }

    function apiCall(id) {
        console.log('API Call: ', id + " Time : ", new Date().toLocaleTimeString());
    }

    const callLimit = rateLimit(apiCall, 2);

    callLimit(1);
    callLimit(2);
    callLimit(3);
    callLimit(4);   
}

{
    // Q14 Implement a task scheduler
        class TaskScheduler {
        constructor() {
            this.queue = [];
            this.isRunning = false;
        }

        async run() {
            if (this.isRunning) return;

            this.isRunning = true;

            while (this.queue.length > 0) {
                let { task } = this.queue.shift();
                await task();
            }
            this.isRunning = false;
        }

        addTask(task, priority = 0) {
            this.queue.push({ task, priority });
            this.queue.sort((a, b) => b.priority - a.priority);
            Promise.resolve().then(() => this.run());
        }
    }

    const scheduler = new TaskScheduler();

    scheduler.addTask(async () => {
        console.log('Mediam priority task!')
    }, 5);

    scheduler.addTask(async () => {
        console.log('Low priority task!')
    }, 1);

    scheduler.addTask(async () => {
        console.log('High priority task!')
    }, 10);  

    // ⚠️ Common Interview Follow-ups (Be Ready)
    // ❓ What is the time complexity?
    // Insert: O(n log n) (due to sort)
    // Execute: O(n)

    // ❓ How to optimize?
    // Use binary heap / priority queue

    // ❓ Where is this used?
    // Job queues
    // Background tasks
    // Notification systems
    // API orchestration
}

{
    // Q15 Implement curring
        function curry(fun) {
        return function curried(...args) {
            if (args.length >= fun.length) {
                return fun.apply(this, args);
            }
            return function (...nextArgs) {
                return curried.apply(this, args.concat(nextArgs))
            }
        }
    }

    function mul(a, b, c) {
        return a * b * c;
    }

    const curring = curry(mul);

    console.log(curring(1, 2, 3));
    console.log(curring(1)(2, 3));
    console.log(curring(1, 2)(3));
}

{
    // Q16 Implement Compose and Pipe 
    function compose(...funs) {
        return function (value) {
            return funs.reduceRight((acc, fun) => { return fun(acc) }, value);
        }
    }

    function pipe(...funs) {
        return function (value) {
            return funs.reduce((acc, fun) => { return fun(acc) }, value);
        }
    }

    const add2 = x => x + 2;
    const multiply3 = x => x * 3;
    const subtract1 = x => x - 1;

    const composeFn = compose(subtract1, multiply3, add2); // execution: add2 -> multiply3 -> subtract1 
    console.log('Compose: ', composeFn(5));

    const pipeFn = pipe(subtract1, multiply3, add2); // execution:  subtract1 ->  multiply3 -> add2
    console.log('Pipe: ', pipeFn(5));
}