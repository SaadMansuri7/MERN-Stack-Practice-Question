import { useEffect, useLayoutEffect, useState } from "react";

{
    //     Q1: What is React ? Why use React over vanilla JavaScript ?
    //         Answer :
    //         React = JavaScript library for building user interfaces(UIs), developed by Facebook / Meta.

    //         Key Concepts:
    //             Component - based - UI broken into reusable pieces
    //             Declarative - Describe what UI should look like, React handles updates
    //             Virtual DOM - Efficient updates by comparing virtual and real DOM

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                Clicked {count} times
            </button>
        );
    }
}

{
    // Q2: What are React components? Functional vs Class components.
    //     Answer:
    //         Component = Independent, reusable piece of UI (JavaScript function/class that returns JSX).

    // FUNCTIONAL COMPONENT (Modern, preferred): A functional component is a plain JavaScript function that accepts "props" (properties) as an argument and returns a React element (JSX) describing what should appear on the screen.
    function Counter() {
        const [count, setCount] = useState(0); // Hooks for state
        return (
            <div>
                <p>Count: {count}</p>
                <button onClick={() => setCount(count + 1)}>Increment</button>
            </div>
        );
    }

    // Class Component: A class component is an ES6 class that extends from React.Component and must include a render() method that returns JSX. 
    class Counter extends React.Component {
        constructor(props) {
            super(props);
            this.state = { count: 0 }; // State in constructor
        }

        increment = () => {
            this.setState({ count: this.state.count + 1 });
        }

        render() {
            return (
                <div>
                    <p>Count: {this.state.count}</p>
                    <button onClick={this.increment}>Increment</button>
                </div>
            );
        }
    }
}

{
    // Q3: What is JSX? How does it differ from HTML?
    //     Answer:
    //         JSX = JavaScript XML - syntax extension that looks like HTML but is JavaScript.

    // JAVASCRIPT IN JSX
    function Greeting() {
        const user = { firstName: 'Alice', lastName: 'Johnson' };
        const isLoggedIn = true;

        return (
            <div>
                {/* Comments in JSX */}
                <h1>Hello, {user.firstName} {user.lastName}!</h1>

                {/* Conditional rendering */}
                {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in</p>}

                {/* Expressions */}
                <p>2 + 2 = {2 + 2}</p>

                {/* Function calls */}
                <p>{getGreeting()}</p>

                {/* Array mapping */}
                <ul>
                    {[1, 2, 3].map(num => <li key={num}>{num}</li>)}
                </ul>
            </div>
        );
    }

    // JSX Rules:
    // Use className instead of class
    // Use htmlFor instead of for
    // CamelCase for attributes (onClick, not onclick)
    // Style as object with camelCase keys
    // Must return single root element (or Fragment)
}

{
    // Q4: What are props? How do you pass and use them?
    //      Answer:
    //          Props(Properites) are the Arguments passed to child components from parent components and are read-only and immutables.

    function UserCard({ id, name = 'Saad', age, phone }) {
        return (
            <div>
                <h1>{name}</h1>
                <h2>{id}</h2>
                <h3>{age}</h3>
                <h4>{phone}</h4>
            </div>
        );
    }

    <UserCard id={1} name="Saad" age={21} phone={2158965748} /> // These are the props which is passed to "UserCard" component.

    const userProps = {
        id: 1,
        name: 'Abcd',
        age: 25,
        phone: 4589657485
    };

    <UserCard {...userProps} /> // you can also pass props like this.
}

{
    // Q5: What is the difference between props and state ?
    //     Answer :
    //          Props:  Props(Properites) are the Arguments passed to child components from parent components and are read-only and immutables.
    //          State: Data managed WITHIN COMPONENT (mutable)

    // COMBINATION - Props from parent, state within component
    function TodoItem({ initialText }) {
        const [isEditing, setIsEditing] = useState(false);
        const [text, setText] = useState(initialText);

        return (
            <div>
                {isEditing ? <input type="text" value={text} onChange={(e) => setText(e.target.value)} /> : <p> {text} </p>}

                <button onClick={() => setIsEditing(!isEditing)} />
                {isEditing ? 'Save' : 'Edit'}
            </div>
        );
    }

    <TodoItem initialText="Hello This is initial Text!" />

    // Comparison Table:
    // Feature	                Props	                    State
    // Source	            Passed from parent	        Managed within component
    // Mutability	        ❌ Read - only	        ✅ Can change(via setState)
    // Purpose	            Configure component	        Track component data
    // Triggers re-render	When parent re - renders	When state changes
}

{
    // Q7: What is conditional rendering in React?
    //      Answer:

    // METHOD 1: IF/ELSE (Outside JSX)
    function Greeting({ isLoggedIn }) {
        if (isLoggedIn) {
            return <h1>Welcome back!</h1>;
        } else {
            return <h1>Please sign in</h1>;
        }
    }

    // METHOD 2: TERNARY OPERATOR (Inside JSX)
    function Greeting({ isLoggedIn }) {
        return (
            <div>
                {isLoggedIn ? (<h1>Welcome back!</h1>) : (<h1>Please sign in</h1>)}
            </div>
        );
    }

    // METHOD 3: LOGICAL AND (&&) - Show or hide
    function Mailbox({ unreadMessages }) {
        return (
            <div>
                <h1>Hello!</h1>
                {unreadMessages.length > 0 && (
                    <h2>You have {unreadMessages.length} unread messages</h2>
                )}
            </div>
        );
    }

    // METHOD 4: LOGICAL OR (||) - Default value
    function Username({ name }) {
        return <h1>{name || 'Guest'}</h1>; // uses 'Guest' is name is null/undifined/0/''/false.
    }

    // METHOD 5: NULLISH COALESCING (??)
    function Username({ name }) {
        return <h1>{name ?? 'Guest'}</h1>; // Only uses 'Guest' if name is null/undefined (not 0, false, '').
    }

    // METHOD 6: SWITCH STATEMENT
    function StatusMessage({ status }) {
        switch (status) {
            case 'loading':
                return <p>Loading...</p>;
            case 'success':
                return <p>Success!</p>;
            case 'error':
                return <p>Error occurred</p>;
            default:
                return null;
        }
    }
}

{
    // Q8: How do you render lists in React?
    //      Answer: using map method

    // WHY KEYS MATTER
    // Without proper keys, React can't track which items changed
    // Leading to bugs and performance issues

    function userList() {
        const users = [
            { id: 1, name: 'Alice', age: 25 },
            { id: 2, name: 'Bob', age: 30 },
            { id: 3, name: 'Charlie', age: 35 }
        ];

        return (
            <ul>
                <li>
                    {users.map((user) => {
                        <h1 key={user.id}>{user.name} is {user.age} years old!</h1>
                    })}
                </li>
            </ul>
        );

        // // ❌ BAD: Using index as key (unstable)
        // <Item key={index} data={item} />

        // // ✅ GOOD: Using unique ID
        // <Item key={item.id} data={item} />
    }
}

{
    // Q9: What are Fragments in React?
    //      Answer: a Fragment is a feature that allows you to group a list of multiple child elements without adding an extra node to the Document Object Model (DOM) like a div.

    function List() {
        const items = [
            { id: 1, title: 'Title 1', desc: 'Description 1' },
            { id: 2, title: 'Title 2', desc: 'Description 2' }
        ];

        return (
            <dl>
                {items.map(item => (
                    <React.Fragment key={item.id}>
                        <dt>{item.title}</dt>
                        <dd>{item.desc}</dd>
                    </React.Fragment>
                ))}
            </dl>
        ); //dl: description list, dt: description title and dd: description data.
    }
}

{
    // Q10: What is state in React ? Why do we need it ?
    //     Answer : State is a built -in React object that stores data that belongs to a component and can change over time.When state changes, React automatically re - renders the component to reflect the updated data in the UI.
    //     Why we need state: State allows components to be dynamic and interactive.Without state, components would only display static content and couldn't respond to user interactions like clicks, form inputs, or data updates.

    // 1. Form inputs
    function LoginForm() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        return (
            <form>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </form>
        );
    }

    // 2. Toggle visibility
    function Accordion() {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? 'Hide' : 'Show'}
                </button>
                {isOpen && <p>Content here...</p>}
            </div>
        );
    }

    // 3. Data fetching
    function UserList() {
        const [users, setUsers] = useState([]);
        const [loading, setLoading] = useState(true);

        // Fetch users and update state
        useEffect(() => {
            fetch('/api/users').then(res => res.json()).then(data => {
                setUsers(data);
                setLoading(false);
            });
        }, []);

        if (loading) return <p>Loading...</p>;

        return (
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        );
    }
}

{
    // Q11: What is the useState hook ? How does it work ?
    //     Answer :
    //         useState is a React Hook that allows functional components to have state.It returns an array with two elements: the current state value and a function to update that state.

    // Syntax:
    //     const [stateVariable, setStateFunction] = useState(initialValue);

    // How it works:
    //     You call useState(initialValue) which creates a state variable
    //     React returns an array: [currentValue, updateFunction]
    //     When you call the update function, React re - renders the component with new state
    //     React preserves state between re - renders

    // import { useState } from 'react';
    function Counter() {
        // Declare state variable 'count' with initial value 0
        const [count, setCount] = useState(0);
        //     ^state   ^updater    ^initial value

        return (
            <div>
                <p>Count: {count}</p>
                <button onClick={() => setCount(count + 1)}> Increment </button>
            </div>
        );
    }
}

{
    // Q12: How do you update state? What are the different ways?
    //    Answer: State updates in React tell the component to re-render with new data. There are two main ways to update state: direct value updates and functional updates.

    // Important: Never modify state directly! Always use the setter function provided by useState. to maintain consistency accross app and maintain prev state also
    // WHY FUNCTIONAL UPDATE MATTERS
    // ❌ PROBLEM with direct update (multiple updates)
    function Counter() {
        const [count, setCount] = useState(0);
        const addThree = () => {
            setCount(count + 1); // count is 0
            setCount(count + 1); // count is still 0 (not 1!)
            setCount(count + 1); // count is still 0 (not 2!)
            // Result: count becomes 1, not 3!
        };
        return <button onClick={addThree}>Count: {count}</button>;
    }

    // ✅ SOLUTION with functional update
    function Counter() {
        const [count, setCount] = useState(0);
        const addThree = () => {
            setCount(prev => prev + 1); // 0 + 1 = 1
            setCount(prev => prev + 1); // 1 + 1 = 2
            setCount(prev => prev + 1); // 2 + 1 = 3
            // Result: count becomes 3 ✅
        };
        return <button onClick={addThree}>Count: {count}</button>;
    }

    // 1. PRIMITIVES (String, Number, Boolean)
    const [isOpen, setIsOpen] = useState(false);
    setIsOpen(true); // Set to true
    setIsOpen(!isOpen); // Toggle (⚠️ use functional update for reliability)
    setIsOpen(prev => !prev); // ✅ Better toggle

    // 2. ARRAYS - Must create new array (don't mutate)
    const [items, setItems] = useState(['apple', 'banana']);
    // Add item
    setItems([...items, 'orange']); // Spread existing + new
    setItems(prev => [...prev, 'orange']); // ✅ Functional

    // 3. OBJECTS - Must create new object (don't mutate)
    const [user, setUser] = useState({
        name: 'Alice',
        age: 25,
        email: 'alice@example.com'
    });
    // Update single property
    setUser({ ...user, age: 26 }); // Spread existing + override age
    // Update multiple properties
    setUser({
        ...user,
        age: 26,
        email: 'newemail@example.com'
    });
}

{
    //      Q13: What is batching in React state updates ?
    //          Answer : Batching is React's optimization technique where multiple state updates within the same event handler are grouped together and processed as a single re-render, rather than causing multiple re-renders. This improves performance by reducing unnecessary rendering work.
    //          How it works: When you call multiple setState functions in the same synchronous code block(like an event handler), React batches them together and performs only one re - render after all updates are processed.

    // EXAMPLE: Multiple state updates batched
    function Form() {
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        console.log('Component rendered'); // Only logs ONCE

        const handleSubmit = () => {
            setFirstName('Alice');  // State update 1
            setLastName('Johnson'); // State update 2
            setEmail('alice@example.com'); // State update 3
            // React batches all three updates → Only 1 re-render!
        };

        return (
            <form onSubmit={handleSubmit}>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        );
    }
    // WITHOUT BATCHING (Hypothetical)
    // Would cause 3 separate re-renders:
    // Render 1: firstName updated
    // Render 2: lastName updated
    // Render 3: email updated

    // WITH BATCHING (React's behavior)
    // Only 1 re-render with all three values updated

    // BATCHING IN REACT 18+ (Automatic batching everywhere)
}

{
    // Q14: What is the difference between controlled and uncontrolled components ?
    // Answer :
    // Controlled components are form inputs whose values are controlled by React state.The component's state is the "single source of truth" for the input's value.
    // Uncontrolled components are form inputs that manage their own state internally using the DOM, and React accesses their values using refs when needed.

    // CONTROLLED COMPONENT (Recommended)
    // React state controls the input value
    function ControlledForm() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('Email:', email); // Value from state
            console.log('Password:', password);
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email} // ✅ Controlled by state
                    onChange={(e) => setEmail(e.target.value)} // Updates state
                />
                <input
                    type="password"
                    value={password} // ✅ Controlled by state
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }

    // UNCONTROLLED COMPONENT
    // DOM controls the input value
    // import { useRef } from 'react';
    function UncontrolledForm() {
        const emailRef = useRef();
        const passwordRef = useRef();

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('Email:', emailRef.current.value); // Get value from DOM
            console.log('Password:', passwordRef.current.value);
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    ref={emailRef} // ❌ No value prop, no onChange
                    defaultValue="" // Use defaultValue for initial value
                />
                <input
                    type="password"
                    ref={passwordRef}
                    defaultValue=""
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
    // When to use each:
    // Controlled(99 % of the time): Dynamic forms, validation, conditional rendering, formatted inputs
    // Uncontrolled(rare cases): File inputs(must be uncontrolled), integrating with non - React code, very simple forms
}

{
    // Q15: General methods for Array and Objects
    function TodoList() {
        const [todos, setTodos] = useState([
            { id: 1, text: 'Buy milk', completed: false },
            { id: 2, text: 'Walk dog', completed: true }
        ]);

        // 1. ADD ITEM TO ARRAY
        const addTodo = (text) => {
            const newTodo = {
                id: Date.now(),
                text: text,
                completed: false
            };

            // ✅ Create new array with spread
            setTodos([...todos, newTodo]);
            // or
            setTodos(prev => [...prev, newTodo]);
        };

        // 2. REMOVE ITEM FROM ARRAY
        const removeTodo = (id) => {
            // ✅ Filter creates new array
            setTodos(todos.filter(todo => todo.id !== id));
        };

        // 3. UPDATE ITEM IN ARRAY
        const toggleTodo = (id) => {
            // ✅ Map creates new array
            setTodos(todos.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed } // Create new object
                    : todo // Keep existing object
            ));
        };

        // 4. UPDATE NESTED PROPERTY IN ARRAY
        const updateTodoText = (id, newText) => {
            setTodos(todos.map(todo =>
                todo.id === id
                    ? { ...todo, text: newText }
                    : todo
            ));
        };

        // 5. SORT ARRAY (sort mutates, so copy first)
        const sortTodos = () => {
            // ❌ Wrong: sorts original array
            // todos.sort((a, b) => a.text.localeCompare(b.text));

            // ✅ Correct: copy then sort
            setTodos([...todos].sort((a, b) => a.text.localeCompare(b.text)));
        };

        // 5. Filter Logic
        const filteredTodos = todos.filter(todo => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true; // 'all'
        });

        // 6. Clear Completed
        const clearCompleted = () => {
            setTodos(todos.filter(todo => !todo.completed));
        };
    }

    // OBJECTS - Common operations
    function UserProfile() {
        const [user, setUser] = useState({
            name: 'Alice',
            age: 25,
            email: 'alice@example.com',
            address: {
                city: 'NYC',
                country: 'USA'
            },
            preferences: {
                theme: 'dark',
                notifications: true
            }
        });

        // 1. UPDATE SINGLE PROPERTY
        const updateName = (newName) => {
            // ✅ Spread existing object, override name
            setUser({ ...user, name: newName });
        };

        // 2. UPDATE MULTIPLE PROPERTIES
        const updateContact = (email, phone) => {
            setUser({
                ...user,
                email: email,
                phone: phone
            });
        };

        // 3. UPDATE NESTED OBJECT
        const updateCity = (newCity) => {
            setUser({
                ...user,
                address: {
                    ...user.address, // Spread nested object
                    city: newCity
                }
            });
        };

        // 4. UPDATE DEEPLY NESTED PROPERTY
        const updateTheme = (newTheme) => {
            setUser({
                ...user,
                preferences: {
                    ...user.preferences,
                    theme: newTheme
                }
            });
        };

        // 5. ADD NEW PROPERTY
        const addProperty = () => {
            setUser({
                ...user,
                phone: '123-456-7890' // Adds new property
            });
        };

        // 6. REMOVE PROPERTY
        const removeProperty = () => {
            const { email, ...rest } = user; // Destructure to exclude email
            setUser(rest);
        };
    }
}

{
    // Q16: What is useEffect? What are side effects in React?
    //      Answer: useEffect is a React Hook that allows you to perform side effects in functional components. It runs after the component renders and can be configured to run on specific conditions.
    // Common side effects:
    // Fetching data from APIs
    // Manually changing the DOM
    // Setting up timers (setTimeout, setInterval)
    // Logging to console or analytics
    // Reading/writing to localStorage
    // Setting up event listeners

    // EXAMPLE 1: Updating document title (side effect)
    function PageTitle({ title }) {
        useEffect(() => {
            // Side effect: Changing document title
            document.title = title;
        }, [title]); // Re-run when title changes

        return <h1>{title}</h1>;
    }

    // EXAMPLE 2: Fetching data (side effect)
    function UserProfile({ userId }) {
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            setLoading(true);
            fetch(`/api/users/${userId}`).then(response => response.json()).then(data => {
                setUser(data);
                setLoading(false);
            });
        }, [userId]); // Re-fetch when userId changes

        if (loading) return <p>Loading...</p>;
        if (!user) return <p>User not found</p>;
        return <div>{user.name}</div>;
    }

    // EXAMPLE 3: Timer (side effect)
    function Timer() {
        const [seconds, setSeconds] = useState(0);
        useEffect(() => {  // Side effect: Set up interval
            const interval = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
            // Cleanup: Clear interval
            return () => {
                clearInterval(interval);
            };
        }, []); // Run once on mount
        return <p>Seconds: {seconds}</p>;
    }
}

{
    // Q17: What is the dependency array in useEffect? How does it work?
    //      Answer: The dependency array is the second argument to useEffect that controls when the effect runs. It tells React which values the effect depends on, and React will only re-run the effect if those values change between renders.

    // PATTERN 1: No dependency array - Runs after EVERY render
    function Component1() {
        const [count, setCount] = useState(0);
        useEffect(() => {
            console.log('Runs after every render'); // Runs on mount AND after every update
        }); // ⚠️ No dependency array
        return <button onClick={() => setCount(count + 1)}>{count}</button>;
    } // Logs: Initial render, then after every click

    // PATTERN 2: Empty dependency array [] - Runs ONCE on mount
    function Component2() {
        const [count, setCount] = useState(0);
        useEffect(() => {
            console.log('Runs only once on mount'); // Like componentDidMount in class components
        }, []); // ✅ Empty array
        return <button onClick={() => setCount(count + 1)}>{count}</button>;
    } // Logs: Only on initial render, not on clicks

    // PATTERN 3: With dependencies - Runs when dependencies change
    function Component3() {
        const [count, setCount] = useState(0);
        const [name, setName] = useState('Alice');
        useEffect(() => {
            console.log('Runs when count changes');
            document.title = `Count: ${count}`;
        }, [count]); // ✅ Only re-runs when count changes
        return (
            <div>
                <button onClick={() => setCount(count + 1)}>{count}</button>
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
        );
    } // Effect runs: Initial render + when count changes (NOT when name changes)
}

{
    // Q18: What is the cleanup function in useEffect? When and why do you use it?
    //     Answer: The cleanup function is a function returned from useEffect that React calls to clean up side effects before running the effect again or when the component unmounts. It prevents memory leaks and unwanted behavior.

    // EXAMPLE 2: Timers (Must cleanup!)
    function Timer() {
        const [seconds, setSeconds] = useState(0);
        useEffect(() => {
            console.log('Starting timer');
            const intervalId = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);

            return () => { // ✅ CLEANUP: Clear interval
                console.log('Clearing timer');
                clearInterval(intervalId);
            };
        }, []); // Empty deps

        return <p>{seconds} seconds</p>;
    }

    // EXAMPLE 4: Fetch requests (Cleanup for race conditions)
    function UserProfileSafe({ userId }) {
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            let cancelled = false; // Flag to track if effect is stale
            const fetchUser = async () => {
                setLoading(true);
                const response = await fetch(`https://api.example.com/users/${userId}`);
                const data = await response.json();
                // ✅ Only update state if effect hasn't been cancelled
                if (!cancelled) {
                    setUser(data);
                    setLoading(false);
                }
            };
            fetchUser();
            // Cleanup: Mark effect as cancelled
            return () => {
                cancelled = true;
            };
        }, [userId]);

        // Scenario this prevents:
        // 1. userId = 1 → Start fetch for user 1 (slow)
        // 2. userId = 2 → Cancel fetch 1, start fetch for user 2 (fast)
        // 3. Fetch 2 completes → Show user 2 ✅
        // 4. Fetch 1 completes → Ignored because cancelled ✅
        // Without cleanup: Would show user 1 (wrong!) ❌
        if (loading) return <p>Loading...</p>;
        return <div>{user?.name}</div>;
    }
}

{
    // Q19: PAGINATION
    function PaginatedList() {
        const [items, setItems] = useState([]);
        const [page, setPage] = useState(1);
        const [loading, setLoading] = useState(false);
        const [hasMore, setHasMore] = useState(true);

        useEffect(() => {
            const fetchPage = async () => {
                setLoading(true);
                const response = await fetch(`https://api.example.com/items?page=${page}`);
                const data = await response.json();
                setItems(prev => [...prev, ...data.items]); // Append new items
                setHasMore(data.hasMore);
                setLoading(false);
            };
            fetchPage();
        }, [page]); // Fetch when page changes

        return (
            <div>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
                {loading && <p>Loading more...</p>}

                {hasMore && !loading && (
                    <button onClick={() => setPage(page + 1)}>
                        Load More
                    </button>
                )}
            </div>
        );
    }
}

{
    // Q20: SEARCH WITH DEBOUNCING
    function SearchResults() {
        const [query, setQuery] = useState('');
        const [results, setResults] = useState([]);
        const [loading, setLoading] = useState(false);
        useEffect(() => {
            if (query.trim() === '') {
                setResults([]);
                return;
            }
            // Debounce: Wait 500ms after user stops typing
            const timerId = setTimeout(async () => {
                setLoading(true);
                const response = await fetch(`https://api.example.com/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setResults(data);
                setLoading(false);
            }, 500);
            // Cleanup: Cancel previous timeout
            return () => {
                clearTimeout(timerId);
            };
        }, [query]); // Re-run when query changes
        return (
            <div>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                {loading && <p>Searching...</p>}
                <ul>
                    {results.map(result => (
                        <li key={result.id}>{result.title}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

{
    // Q21: What are the React component lifecycle phases and how does useEffect relate to them ?**
    //Answer:
    // Component lifecycle refers to the series of phases a component goes through from creation to removal.In class components, there were specific lifecycle methods.In functional components with hooks, useEffect can mimic all lifecycle phases.
    // Three main lifecycle phases:
    //     1.  Mounting  - Component is being created and inserted into the DOM
    //     2.  Updating  - Component is re - rendering due to prop or state changes
    //     3.  Unmounting  - Component is being removed from the DOM
    // CLASS COMPONENT LIFECYCLE (Old way)
    class ClassComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = { count: 0 };
        }
        // MOUNTING PHASE
        componentDidMount() {
            // Runs once after first render
            console.log('Component mounted');
            this.fetchData();
            this.timerId = setInterval(() => {
                this.setState({ count: this.state.count + 1 });
            }, 1000);
        }
        // UPDATING PHASE
        componentDidUpdate(prevProps, prevState) {
            // Runs after every update (except first render)
            console.log('Component updated');

            if (prevProps.userId !== this.props.userId) {
                this.fetchData();
            }
        }
        // UNMOUNTING PHASE
        componentWillUnmount() {
            // Runs once before component is removed
            console.log('Component will unmount');
            clearInterval(this.timerId);
        }
        render() {
            return <div>{this.state.count}</div>;
        }
    }

    // FUNCTIONAL COMPONENT WITH USEEFFECT (Modern way)
    function FunctionalComponent({ userId }) {
        const [count, setCount] = useState(0);

        // MIMIC componentDidMount (mount only)
        useEffect(() => {
            console.log('Component mounted');
            fetchData();
        }, []); // Empty array = run once on mount

        // MIMIC componentDidMount + componentWillUnmount
        useEffect(() => {
            console.log('Component mounted - setting up timer');

            const timerId = setInterval(() => {
                setCount(prev => prev + 1);
            }, 1000);

            // Cleanup = componentWillUnmount
            return () => {
                console.log('Component unmounting - clearing timer');
                clearInterval(timerId);
            };
        }, []); // Empty array = mount + unmount

        // MIMIC componentDidUpdate (when userId changes)
        useEffect(() => {
            console.log('userId changed, fetching new data');
            fetchData();
        }, [userId]); // Runs when userId changes

        // MIMIC componentDidUpdate (on every update)
        useEffect(() => {
            console.log('Component updated');
            // Runs after every render
        }); // No dependency array = every render

        return <div>{count}</div>;
    }
}

{
    // Q22: useEffect vs useLayoutEffect 
    // answer: 
    // useEffect: useEffect runs after the browser paints the UI on the screen.
    // Best for side effects
    // Does not block rendering

    // useLayoutEffect: useLayoutEffect runs after DOM updates but before the browser paints.
    // Blocking
    // Runs synchronously
    // Used when you need to measure or modify layout before paint
    // Example: 
    // import { useLayoutEffect, useRef, useState } from "react";
    function Box() {
        const boxRef = useRef();
        const [width, setWidth] = useState(0);
        useLayoutEffect(() => {
            setWidth(boxRef.current.offsetWidth);
        }, []);
        return (
            <div>
                <div ref={boxRef} style={{ width: "200px" }}>
                    Box
                </div>
                <p>Width: {width}px</p>
            </div>
        );
    }

    // useEffect runs after the browser paints and is used for side effects,
    // while useLayoutEffect runs synchronously after DOM updates but before paint, making it suitable for layout measurements.

    // 🔥 When to Use What(Cheat Sheet)
    // ✅ Use useEffect for:
    // API calls
    // Event listeners
    // Logging
    // Timers
    // Subscriptions

    // ✅ Use useLayoutEffect for:
    // Measuring DOM size
    // Scroll position fixes
    // Animations that must not flicker
}

{
    // Q23: What is useRef? How is it different from useState?
    // Answer:
    // useRef is a React Hook that creates a mutable reference object that persists across re-renders. Unlike useState, updating a ref does NOT trigger a re-render.

    // Key differences:
    // Feature	                useState	        useRef
    // Triggers re-render	    ✅ Yes	           ❌ No
    // Value access	            state	            ref.current
    // Updates	                Async (batched)	    Sync (immediate)
    // Use case	                UI data	            Non-UI data, DOM refs

    // import { useState, useRef } from 'react';
    // BASIC COMPARISON
    function Counter() {
        const [count, setCount] = useState(0);
        const renderCount = useRef(0);
        renderCount.current += 1; // This runs on every render

        return (
            <div>
                <p>Count: {count}</p>
                <p>Renders: {renderCount.current}</p>
                <button onClick={() => setCount(count + 1)}>Increment</button>
            </div>
        );
    }
    // Behavior:
    // Click button → count updates → component re-renders → renderCount increments
    // But changing renderCount.current doesn't cause re-render
}

{
    // COMPREHENSIVE EXAMPLE: Optimized Search with Debouncing
    function OptimizedSearch() {
        const [query, setQuery] = useState('');
        const [results, setResults] = useState([]);
        const [isSearching, setIsSearching] = useState(false);

        // Refs for mutable values
        const timeoutRef = useRef(null);
        const requestCountRef = useRef(0);
        const previousQueryRef = useRef('');
        const abortControllerRef = useRef(null);

        useEffect(() => {
            // Clear previous timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Abort previous request
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            if (query.trim() === '') {
                setResults([]);
                return;
            }

            // Debounce: Wait 500ms after typing stops
            timeoutRef.current = setTimeout(async () => {
                setIsSearching(true);
                requestCountRef.current += 1;
                const currentRequestId = requestCountRef.current;
                abortControllerRef.current = new AbortController();
                try {
                    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`,
                        { signal: abortControllerRef.current.signal }
                    );
                    const data = await response.json();
                    // Only update if this is still the latest request
                    if (currentRequestId === requestCountRef.current) {
                        setResults(data);
                        previousQueryRef.current = query;
                    }
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.error('Search failed:', error);
                    }
                } finally {
                    if (currentRequestId === requestCountRef.current) {
                        setIsSearching(false);
                    }
                }
            }, 500);

            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }
            };
        }, [query]);

        return (
            <div>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                {isSearching && <p>Searching...</p>}
                <p>Total requests made: {requestCountRef.current}</p>
                <p>Previous query: {previousQueryRef.current}</p>
                <ul>
                    {results.map(result => (
                        <li key={result.id}>{result.title}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

{
    // Q24: What is React Context? Why do we need it?
    // Answer: React Context is a way to share data across multiple components without passing props through every level of the component tree. It solves the "prop drilling" problem where you have to pass props through intermediate components that don't need them.

    // ✅ WITH CONTEXT - Direct access without prop drilling
    // import { createContext, useContext, useState } from 'react';
    // 1. Create Context
    const UserContext = createContext(null);
    // 2. Provider wraps components that need access
    function App() {
        const [user, setUser] = useState({ name: 'Alice', theme: 'dark' });
        return (
            <UserContext.Provider value={user}>
                <Header />
            </UserContext.Provider>
        );
    }

    function Header() {
        return <Navigation />; // No user prop needed!
    }
    function Navigation() {
        return <UserMenu />; // No user prop needed!
    }
    function UserMenu() {
        const user = useContext(UserContext); // 3. Access context directly with useContext
        return <div>Welcome, {user.name}! Theme: {user.theme}</div>;
    }
    // user data flows: App → UserContext → UserMenu (skips intermediate components)
}

{
    // REAL-WORLD EXAMPLE: Authentication Context
    const AuthContext = createContext(null);

    function AuthProvider({ children }) {
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);

        // Check if user is logged in on mount
        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const response = await fetch('/api/auth/me');
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                } finally {
                    setLoading(false);
                }
            };

            checkAuth();
        }, []);

        const login = async (email, password) => {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                return { success: true };
            }

            return { success: false, error: 'Login failed' };
        };

        const logout = async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
        };

        const value = {
            user,
            loading,
            login,
            logout,
            isAuthenticated: !!user
        };

        return (
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        );
    }

    // Custom hook
    function useAuth() {
        const context = useContext(AuthContext);

        if (!context) {
            throw new Error('useAuth must be used within AuthProvider');
        }

        return context;
    }

    // Usage throughout app
    function LoginPage() {
        const { login } = useAuth();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            const result = await login(email, password);

            if (result.success) {
                console.log('Logged in!');
            } else {
                alert(result.error);
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        );
    }

    function UserProfile() {
        const { user, logout } = useAuth();

        return (
            <div>
                <p>Welcome, {user.name}!</p>
                <button onClick={logout}>Logout</button>
            </div>
        );
    }

    function ProtectedRoute({ children }) {
        const { isAuthenticated, loading } = useAuth();

        if (loading) return <p>Loading...</p>;
        if (!isAuthenticated) return <Navigate to="/login" />;

        return children;
    }

    // App setup
    function App() {
        return (
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/profile" element={
                            <ProtectedRoute>
                                <UserProfile />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </Router>
            </AuthProvider>
        );
    }
}

{
    // DECISION MATRIX
    // Context is best for:
    // - Rarely changing global data (theme, auth, locale)
    // - Avoiding prop drilling
    // - Data needed by many components at different levels
    // - Small to medium apps

    // Redux/Zustand when:
    // - Frequently changing state
    // - Complex state logic
    // - Need DevTools for debugging
    // - Large apps with lots of shared state
    // - Time-travel debugging needed

    // React Query when:
    // - Server state (API data)
    // - Need caching
    // - Auto-refetching
    // - Optimistic updates
    // - Pagination/Infinite scroll

    // Props when:
    // - Direct parent-child
    // - Component reusability important
    // - Simple data flow

    // Local State when:
    // - Component-specific data
    // - No other component needs it
    // - Simple UI state
}

{
    //    Q25: Q1: What are custom hooks? Why do we create them?
    //       Answer:  Custom hooks are JavaScript functions that use React hooks (useState, useEffect, etc.) to encapsulate and reuse stateful logic across multiple components. They let you extract component logic into reusable functions.
    // Custom hooks are just functions that use React hooks internally. They don't create components, just share logic.

    // WITHOUT CUSTOM HOOK - Logic duplicated in multiple components
    function ComponentA() {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            fetch('/api/data')
                .then(res => res.json())
                .then(setData)
                .catch(setError)
                .finally(() => setLoading(false));
        }, []);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return <div>{data?.title}</div>;
    }

    function ComponentB() {
        // Same logic repeated! ❌
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            fetch('/api/data')
                .then(res => res.json())
                .then(setData)
                .catch(setError)
                .finally(() => setLoading(false));
        }, []);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return <div>{data?.description}</div>;
    }

    function useFetch(url) {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        async function fetchData(url) {
            setLoading(true);
            let res = await fetch(url);
            let data = res.json();
            setData(data);
        }

        useEffect(() => {
            try {
                fetchData();
            } catch (error) {
                console.log(error);
                setError(error);
            }

            return () => {
                setLoading(false);
                setError('');
            }
        }, [url]);

        return { data, loading, error };
    }

    function ComponentAClean() {
        const { data, loading, error } = useFetch('/api/data');
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return <div>{data?.title}</div>;
    }

    function ComponentBClean() {
        const { data, loading, error } = useFetch('/api/data');
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return <div>{data?.description}</div>;
    }
}

{
    //Q26:      React.memo: A higher-order component (HOC) used to skip re-rendering a functional component if its props have not changed. It performs a shallow comparison of current and previous props to determine if it can reuse the last rendered result.
    //      useMemo: A React Hook that caches the result of a calculation between re-renders. It returns a memoized value and only recalculates it when one of its specified dependencies has changed.
    //      useCallback: A React Hook that caches a function definition between re-renders. It returns the same function instance across renders to maintain referential integrity, only recreating the function if its dependencies change. 

    // import { useCallback, useState } from "react";
    // import { Child } from "./Child"
    const Parent = () => {
        const [count, setCount] = useState(0);
        const onHandle = useCallback(() => {
            console.log('clicked!!!');
        }, []);

        return (
            <div>
                <button onClick={() => setCount(prev => prev + 1)}>Increment Count: ${count}</button>
                <Child onHandle={onHandle} />
            </div>
        );
        // import React from "react";
        const Child = React.memo(function Child({ onHandle }) {
            console.log('Child Re-render!!!!!');
            return (
                <button onClick={onHandle}>Click</button>
            )
        });
    }


}

{
    // Q27: What is useReducer ? When should you use it instead of useState ?
    //     Answer : useReducer is a React Hook for managing complex state logic.It's similar to Redux reducers - you dispatch actions to update state based on action types. Use it when state updates depend on previous state or involve multiple sub-values.

    const [state, dispatch] = useReducer(reducer, initialState, init); //here init is optional
    // reducer: (state, action) => newState
    // initialState: Initial state value
    // init: Optional lazy initializer function
    // Returns: [currentState, dispatch]
}

{
    // Q28: What is React Router? Why do we need routing in React?
    //     Answer: React Router is a library that enables navigation between different views / pages in a React application without full page reloads.It allows you to build Single Page Applications(SPAs) with multiple "pages" while maintaining a single HTML file.
    //     npm install react-router-dom 

    // Why we need routing:
    //  Navigate between different views without page refresh
    //  Maintain browser history(back / forward buttons work)
    //  Shareable URLs(deep linking)
    //  Organize app into logical sections
    //  Code splitting by route(lazy loading)

    // import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
    function app() {
        return (
            <BrowserRouter>
                <nav>
                    <Link to="\">Dashboard</Link>
                    <Link to="\contactus">Contact Us</Link>
                    <Link to="\aboutus">About Us</Link>
                </nav>

                <Routes>
                    <Route path="\" element={<Dashboard />} />
                    <Route path="\buynow" element={<BuyNow />} />
                    <Route path="\contactus" element={<ContactUs />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

{
    // Q29: How do you handle dynamic routes and URL parameters?
    // Answer: Dynamic routes use URL parameters to display different content based on the URL.

    // import { useParams, useSearchParams, useLocation } from 'react-router-dom';
    // COMPREHENSIVE EXAMPLE: E-commerce Product Page
    function ProductPage() {
        const { productId, variant } = useParams();
        const [searchParams, setSearchParams] = useSearchParams();
        const navigate = useNavigate();
        const color = searchParams.get('color') || 'black';
        const size = searchParams.get('size') || 'M';
        const [product, setProduct] = useState(null);

        useEffect(() => {
            fetch(`/api/products/${productId}`)
                .then(r => r.json())
                .then(setProduct);
        }, [productId]);

        const updateVariant = (newColor, newSize) => {
            setSearchParams({ color: newColor, size: newSize });
        };

        const addToCart = () => {
            // Navigate with state
            navigate('/cart', {
                state: {
                    addedProduct: {
                        id: productId,
                        variant,
                        color,
                        size
                    }
                }
            });
        };

        if (!product) return <p>Loading...</p>;
        return (
            <div>
                <h1>{product.name}</h1>
                <p>Variant: {variant || 'standard'}</p>

                <div>
                    <label>Color:</label>
                    <select value={color} onChange={(e) => updateVariant(e.target.value, size)}>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                    </select>
                </div>

                <div>
                    <label>Size:</label>
                    <select value={size} onChange={(e) => updateVariant(color, e.target.value)}>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                    </select>
                </div>
                <button onClick={addToCart}>Add to Cart</button>
            </div>
        );
    }

    // URL Examples:
    // /products/123 - productId: 123
    // /products/123/premium - productId: 123, variant: premium
    // /products/123?color=white&size=L - productId: 123, color: white, size: L

    // URL Parameter Types:
    // Path params(:id) - Part of URL structure
    // Query params(?key = value) - Optional filters / settings
    // Hash(#section) - Page sections
    // State - Hidden data passed between routes
}

{
    // Q30: How do you implement nested routes and layouts?
    // Answer: Nested routes create hierarchical navigation with shared layouts.
    <Routes>
        {/* single Route */}
        <Route path="\" element={<Dashboard />} />
        {/* nested Route */}
        <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
        </Route>

        {/* /dashboard                 - DashboardLayout
                ├─ /dashboard            - DashboardHome
                ├─ /dashboard/profile    - Profile
                ├─ /dashboard/settings   - Settings */}
    </Routes >
}

{
    // Q31: Lazy loading allows you to split your code into smaller chunks that load only when needed, improving initial load time.

    // Instead of regular imports:
    // import Home from './pages/Home';
    // import About from './pages/About';

    // import React, { Suspense, lazy } from 'react';
    // import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
    // Use lazy loading:
    const Home = lazy(() => import('./pages/Home'));
    const About = lazy(() => import('./pages/About'));
    const Dashboard = lazy(() => import('./pages/Dashboard'));
    const Profile = lazy(() => import('./pages/Profile'));

    // Loading component
    const LoadingSpinner = () => (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Loading...</h2>
        </div>
    );

    function App() {
        return (
            <BrowserRouter>
                <nav>
                    <Link to="/">Home</Link> |
                    <Link to="/about">About</Link> |
                    <Link to="/dashboard">Dashboard</Link>
                </nav>

                <Suspense fallback={<LoadingSpinner />}> {/* Suspense catches lazy components while they load */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile/:id" element={<Profile />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        );
    }
}

{
    // Q32: Error Boundaries: Catch JavaScript errors anywhere in the component tree.
    class ErrorBoundary extends React.Component {
        state = { hasError: false, error: null, errorInfo: null };

        static getDerivedStateFromError(error) {
            return { hasError: true, error }; // Update state so next render shows fallback UI
        }

        componentDidCatch(error, errorInfo) {
            // Log error to error reporting service
            console.error('Error caught by boundary:', error, errorInfo);
            this.setState({ error, errorInfo });
            // Send to logging service
            // logErrorToService(error, errorInfo);
        }

        render() {
            if (this.state.hasError) {
                return (
                    <div>
                        <h2>Something went wrong!</h2>
                        <details>
                            {this.state.error && this.state.error.toString()}
                            {this.state.errorInfo.componentStack}
                        </details>
                        <button onClick={() => this.setState({ hasError: false })}> Try again </button>
                    </div>
                );
            }
            return this.props.children;
        }
    }

    function App() {
        return (
            <ErrorBoundary>
                <Header />
                <ErrorBoundary>
                    <Sidebar />
                </ErrorBoundary>
                <ErrorBoundary>
                    <MainContent />
                </ErrorBoundary>
            </ErrorBoundary>
        );
    }
}