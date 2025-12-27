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

