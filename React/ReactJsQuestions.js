import React, { useCallback, useContext, useMemo } from "react"
import { ThemeContext } from "./context/ThemeContext"
import { createContext, useState } from "react"
{
    // Q1: React context:
    const ThemeContext = createContext();
    function ThemeProvider({ children }) {
        const [theme, setTheme] = useState('light');

        function toggleTheme() {
            console.log('theme: ', theme);
            setTheme(prev => (prev === 'light' ? 'dark' : 'light'));  //we are just modifiying the theme variable not implementing it
        }

        return (
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        );
    }

    function useThemeContext() {
        let context = useContext(ThemeContext);
        if (!context) {
            throw console.error('Theme provider can only be used with Theme context');
        }
    }

    const ThemeConsumer = () => {
        let { theme, toggleTheme } = useContext(ThemeContext);
        return (
            <div>
                <p>Theme: {theme}</p>
                <button onClick={toggleTheme}>Change Theme</button>
            </div>
        )
    }
}

{
    // Q2: useCallback and React.memo and useMemo for unneccessory child re-rendering
    // useCallback = Memoize the Callback function
    // React.memo = Memoize the Component
    // useMemp = Memoize the result of heavy calculation
    const Parent = () => {
        const [count, setCount] = useState(0);
        const onChildClick = useCallback(() => {
            console.log('Child component button Clicked!!');
        }, []);

        function heaveCalculation() {
            for (let i = 0; i < 1e9; i++) {
                count = count + 1;
            }
            return count;
        }

        const heavyWithUseMemo = useMemo(() => heaveCalculation, [count]);

        return (
            <div>
                <button onClick={() => setCount(prev => prev + 1)}>Increment Count: {count}</button>
                <p>Heavy calculation: {heavyWithUseMemo}</p>
                <Child onChildClick={onChildClick} />
            </div>
        );
    }

    const Child = React.memo(function Child({ onChildClick }) {
        console.log('Child Re-render!!!!!');
        return (
            <button onClick={onChildClick}>Click</button>
        )
    })
}

{
    // Q3: Frontend only login form 
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [localStorageData, setLocalStorageData] = useState({ email: localStorage.getItem('email'), password: localStorage.getItem('password') });

    function handleChange(e) {
        let { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function login() {
        if (formData.email && formData.password) {
            localStorage.setItem('email', formData.email);
            localStorage.setItem('password', formData.password);
            setLocalStorageData({ email: formData.email, password: formData.password });
        }
    }

    function logout() {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        setLocalStorageData({ email: '', password: '' });
    }

    return (
        <div>

            {localStorageData.email ? (<div>
                <p>Hello {localStorageData.email}, your Password is: {localStorageData.password}</p>
                <button onClick={logout}>Logout</button>
            </div>)
                : (<div>
                    <input type="email" value={formData.email} name="email" placeholder="Email..." onClick={handleChange} />
                    <input type="password" value={formData.password} name="password" placeholder="Password..." onClick={handleChange} />
                    <button onClick={login}>Login</button>
                </div>)}
        </div>
    );
}

{
    // Q4: Portals/Modals: allows to render children in dom node outside the component tree  

    //index.html
    <div id="root-modal"></div> //add this 

    const Modal = ({ isOpen, onclose, children }) => {
        if (!isOpen) return;
        return ReactDOM.createPortal(
            <div onClick={onclose} style={outerStyle}>
                <div onClick={(e) => e.stopPropagation()} style={innerStyle}>
                    {children}
                </div>
            </div>,
            document.getElementById('root-modal')
        );
    }

    function app() {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <button onClick={() => setIsOpen(true)}>Open Modal</button>
                <Modal isOpen={isOpen} onclose={() => setIsOpen(false)}>
                    <h1>Modal Content!</h1>
                    <p>This is an Example of Modal Content...</p>
                    <button onclose={() => setIsOpen(false)}>Close</button>
                </Modal>
            </>
        );
    }


    const outerStyle = {
        position: 'fixed',
        display: 'flex',
        inset: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }

    const innerStyle = {
        background: "#000000ff",
    }
}