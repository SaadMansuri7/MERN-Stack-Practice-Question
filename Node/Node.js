// EXPRESS BASICS(FOUNDATION)

{
    //     1 What is Express.js ? (Quick context)
    //     Express.js is a Node.js web framework that helps you:
    //         Create APIs(REST APIs)
    //         Handle HTTP requests & responses
    //         Build backend servers faster

    // Think of it as:
    //     Node.js = raw engine
    //     Express = steering wheel + controls
}

{
    //     2 Setting Up an Express Server
    //     Step 1: Initialize Project
    //     npm init - y

    //      Step 2: Install Express
    //     npm install express

    // 📁 Basic Folder Structure
    //     project /
    //  ├─ node_modules /
    //  ├─ package.json
    //  └─ index.js

    //     Step 3: Create Express Server(index.js)
    //     const express = require("express");
    //     const app = express(); // create express app
    //     const PORT = 3000;

    //     // start server
    //     app.listen(PORT, () => {
    //         console.log(`Server running on http://localhost:${PORT}`);
    //     });


    // What's happening ?
    //     express() → creates the app
    //     app.listen() → starts the HTTP server

    // Interview Tip:
    // Express does not create a server itself.
    // It uses Node's HTTP module internally.
}


{
    //     3: Routing(GET, POST, PUT, PATCH, DELETE)
    //          What is Routing ?
    //          Routing means: Handling different URLs + HTTP methods

    // Basic GET Route:
    //     app.get("/", (req, res) => {
    //         res.send("Hello Express!");
    //     });
    //     Visit: http://localhost:3000/

    //     ---

    //         POST Route
    //     app.post("/users", (req, res) => {
    //         res.send("User created");
    //     });

    // Used when:
    // Creating data
    // Submitting forms
    // Sending JSON

    //     ---

    //         PUT     vs  PATCH
    //     Method	    Purpose
    //     PUT	        Replace entire resource
    //     PATCH	    Update partial resource

    //     app.put("/users/:id", (req, res) => {
    //         res.send(`User ${req.params.id} replaced`);
    //     });

    //     app.patch("/users/:id", (req, res) => {
    //         res.send(`User ${req.params.id} updated`);
    //     });

    //     ---

    //         DELETE Route
    //     app.delete("/users/:id", (req, res) => {
    //         res.send(`User ${req.params.id} deleted`);
    //     });

    //     ---

    //         REST API Mapping(Very Important)
    // Operation	HTTP Method	Example
    // Read	GET / users
    // Create	POST / users
    // Update	PUT / PATCH / users / 1
    // Delete	DELETE / users / 1
}


// {4 Route Parameters(req.params)
//     What are Route Params ? : Dynamic values inside URL.
//     app.get("/users/:id", (req, res) => {
//         const userId = req.params.id;
//         res.send(`User ID is ${userId}`);
//     });
// URL: /users/42

// Output: User ID is 42

// Multiple Params
// app.get("/users/:id/orders/:orderId", (req, res) => {
//     const { id, orderId } = req.params;
//     res.send(`User ${id}, Order ${orderId}`);
// });}



{
    //     5 Query Strings(req.query)
    //         What are Query Strings ? : Optional key - value data in URL.
    //         ex: /products?category=laptop&price=50000

    // Access Query Params
    //     app.get("/products", (req, res) => {
    //         const { category, price } = req.query;
    //         res.json({
    //             category,
    //             price,
    //         });
    //     });

    //     Output:
    //     {
    //         "category": "laptop",
    //             "price": "50000"
    //     }
}

{
    // Q6: Request Object(req): req contains incoming request data
    // Common properties:
    // req.params   // URL params
    // req.query    // Query strings
    // req.body     // Request body (POST/PUT)
    // req.headers  // HTTP headers
    // req.method   // GET, POST, etc
    // req.url      // URL path

    // Example
    //     app.get("/info", (req, res) => {
    //         res.json({
    //             method: req.method,
    //             url: req.url,
    //             headers: req.headers,
    //         });
    //     });
}

{
    // Q7: Response Object(res): res sends data back to client
    // Common methods:
    // res.send()
    // res.json()
    // res.status()
    // res.redirect()

    // Sending JSON
    // res.json({ success: true });

    // Setting Status Code
    // res.status(201).json({
    //     message: "User created",
    // });

    // Send + Status Together
    // res.status(404).send("Not Found");
}

{
    // Q8: Middleware Needed for POST Data(IMPORTANT)

    // To read JSON body:
    // app.use(express.json());

    // Without this → req.body will be undefined.
    // POST Example with Body
    //     app.post("/login", (req, res) => {
    //             const { email, password } = req.body;

    //             res.json({
    //                 email,
    //                 password,
    //             });
    //         });
}

{
    // Q9: What is Middleware? : Middleware is a function that runs between the request and the response.
    // Client → Middleware → Route → Response

    // In Express, everything is middleware:
    // body parsing
    // logging
    // authentication
    // error handling

    // Formal Definition: A middleware function has access to:
    //     (req, res, next)
    //     req → incoming request
    //     res → outgoing response
    //     next() → passes control to next middleware

    //     Basic Middleware Example
    //         app.use((req, res, next) => {
    //             console.log("Middleware executed");
    //             next();
    //         });

    // If you don't call next(), the request stops there
}

{
    // Q10: Why Middleware Exists(Real World Thinking)
    // Imagine an office:
    // Step	Middleware Role
    // Security check	Auth middleware
    // Form verification	Validation middleware
    // Entry log	Logger middleware
    // Final desk	Route handler

}
{
    // Q11: Request Lifecycle(VERY IMPORTANT)
    // Express Request Flow
    // Request
    // ↓
    // Middleware 1
    // ↓
    // Middleware 2
    // ↓
    // Route Handler
    // ↓
    // Response

    Example
    app.use((req, res, next) => {
        console.log("Step 1");
        next();
    });

    app.use((req, res, next) => {
        console.log("Step 2");
        next();
    });

    app.get("/", (req, res) => {
        res.send("Hello");
    });

    // Interview Line
    // Express executes middleware top to bottom, in the order they are defined.
}

{
    // Q11: Built -in Middleware(Express Provides These)
    // 1. express.json(): Parses incoming JSON payload.
    // app.use(express.json());

    // Without it:
    // req.body === undefined ❌

    // 2. express.urlencoded(): Handles form data(application / x - www - form - urlencoded)
    // app.use(express.urlencoded({ extended: true }));

    // Used for:
    //     HTML forms
    //     traditional POST requests

    // 3. express.static(): Serves static files
    // app.use(express.static("public"));

    // Folder:
    //     public /
    //     ├─ index.html
    //     ├─ style.css
    // Access directly in browser.

    // Built -in Middleware Summary
    // Middleware	Purpose
    // express.json	Parse JSON
    // express.urlencoded	Parse form data
    // express.static	Serve static files
}

{
    // Q12: Custom Middleware: AuthMiddleare Example
    const authMiddleware = (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        next();
    };

    app.get("/profile", authMiddleware, (req, res) => {
        res.send("Profile data");
    });

}

{
    // Q13: Express Router- What & Why
    // What is Express Router ? : express.Router() is a mini Express app used to:
    // Group related routes
    // Split routes into files
    // Apply middleware to specific routes

    // Basic Router Example
    const express = require("express");
    const router = express.Router();

    router.get("/", (req, res) => {
        res.send("Users list");
    });

    module.exports = router;

    // Route Organization & Modularization(REAL PROJECT STYLE)
    // Recommended Folder Structure
    //     src /
    //     ├─ routes /
    //     │   ├─ user.routes.js
    //     │   ├─ product.routes.js
    //     │   └─ order.routes.js
    //     ├─ app.js
    //     └─ server.js
}

{
    // Q14: Route Prefixing : What is Route Prefixing ?
    // Adding a common base path for routes.
    // app.use("/users", userRoutes);


    // This means:
    //     router.get("/")   → /users
    //     router.get("/:id") → /users/: id

    // Nested Routes(Backend Reality)
    // What are Nested Routes ?: Routes that depend on a parent resource.
    //     Example:
    //         Users → Orders
    //         URLs:
    //             /users/1 / orders
    //             / users / 1 / orders / 99

    // order.routes.js
    const express = require("express");
    const router = express.Router({ mergeParams: true });

    router.get("/", (req, res) => {
        res.send(`Orders for user ${req.params.userId}`);
    });

    router.post("/", (req, res) => {
        res.send(`Create order for user ${req.params.userId}`);
    });

    module.exports = router;

}

{
    // Q15: Clean Architecture(Mental Model)
    // Route  →  Controller  →  Service  →  Database
    //     Responsibility Breakdown
    //     Layer	Responsibility
    //     Routes	URL + HTTP method
    //     Controllers	Handle req & res
    //     Services	Business logic
    //     DB / Models	Data persistence

    // Folder Structure
    // src /
    // ├─ routes /
    // │   └─ user.routes.js
    // ├─ controllers /
    // │   └─ user.controller.js
    // ├─ services /
    // │   └─ user.service.js
    // ├─ app.js
    // └─ server.js

    // How Request Flows Now (IMPORTANT)
    //     POST /users
    //     ↓
    //     Route
    //     ↓
    //     Controller (req → service → res)
    //     ↓
    //     Service (logic + DB)
    //     ↓
    //     Response
}

{
    // Q16: What are Cookies? : A cookie is small data stored in the browser and sent to the server with every request.
    // Stored on: Client(Browser)
    // Sent via: HTTP headers

    // Example 
    //     When you log in:
    //         Server sends a cookie → browser stores it
    //         Browser sends that cookie on every request

    // Cookie Characteristics
    // Feature	            Cookie
    // Stored on	        Client
    // Size	            ~4 KB
    // Security	        Less secure

    // Example:
    // res.cookie("user", "saad");

    // Browser stores:
    // user = saad

    // Cookies in Express
    // Install Cookie Parser: npm install cookie - parser

    // Setup
    const cookieParser = require("cookie-parser");
    app.use(cookieParser());

    // Set Cookie
    app.get("/set-cookie", (req, res) => {
        res.cookie("token", "abc123", {
            httpOnly: true,
            maxAge: 60000,
        });
        res.send("Cookie set");
    });

    // Read Cookie
    app.get("/get-cookie", (req, res) => {
        res.send(req.cookies.token);
    });

    // Important Cookie Options
    res.cookie("key", "value", {
        httpOnly: true, // JS can't access
        secure: true,   // HTTPS only
        maxAge: 60000,  // expiry
    });
}

{
    //     Q17: What are Sessions? : A session stores user data on the server, and only a session ID is stored in a cookie.
    //     Stored on: Server
    //     Cookie stores: session ID

    //     Real Life Analogy
    //         Cookie = token number
    //         Session = file stored in server cupboard

    //     Session Characteristics
    //     Feature	            Session
    //     Stored on	        Server
    //     Secure	            Yes
    //     Scalable	        Needs storage
    //     Uses cookie	        Yes (session ID)

    //     Cookies           vs              Sessions
    //     Feature	        Cookies	        Sessions
    //     Storage	        Client	        Server
    //     Security	    ❌ Less	      ✅ More
    //     Size limit	    Small	        Large
    //     Performance	    Faster	        Slight overhead
    //     Use case	    Preferences	    Login/auth


    //     How Sessions Work (STEP BY STEP)

    //     User logs in
    //     Server creates session
    //     Session ID sent as cookie
    //     Browser stores cookie
    //     Next request → cookie sent
    //     Server finds session using ID


    // Sessions in Express (express-session)
    // Install: npm install express-session

    // Setup Session Middleware
    const session = require("express-session");

    app.use(
        session({
            secret: "supersecret",
            resave: false,
            saveUninitialized: false,
        })
    );

    // Create Session (Login)
    app.post("/login", (req, res) => {
        const { username } = req.body;

        req.session.user = username;
        res.send("Logged in");
    });

    // Access Session
    app.get("/profile", (req, res) => {
        if (!req.session.user) {
            return res.status(401).send("Not logged in");
        }

        res.send(`Welcome ${req.session.user}`);
    });

    // Destroy Session (Logout)
    app.post("/logout", (req, res) => {
        req.session.destroy();
        res.send("Logged out");
    });
}

{
    // Q18: When to Use What(Real Projects)

    // Use Cookies when:
    //     Theme
    //     Language
    //     Remember preferences

    // Use Sessions when:  
    //     Login system
    //     Server - controlled auth
    //     Admin panels
}

{
    // Q19: COMPLETE JWT AUTHENTICATION FLOW
    // High - Level Flow(Understand First)
    // 1 User registers / logs in
    // 2 Server verifies credentials
    // 3 Server generates JWT
    // 4 JWT sent to client
    // 5 Client stores JWT(AuthContext)
    // 6 Client sends JWT in headers
    // 7 Backend middleware verifies JWT
    // 8 Protected route accessed

    // What is JWT ?: JWT(JSON Web Token) is a stateless authentication mechanism where the server issues a signed token that the client sends with every request.

    // Where should JWT be stored ?
    // Best : HTTP - only cookie
    // Common: Memory / localStorage
    //     localStorage is vulnerable to XSS

    // What happens if JWT is stolen?
    // Attacker can access protected routes until token expires.

    // Mitigation:
    // Short expiry
    // Refresh tokens
    // HTTPS
    // HttpOnly cookies

    // What is inside JWT?
    // {
    //   "header": { "alg": "HS256" },
    //   "payload": { "userId": "123" },
    //   "signature": "signed_hash"
    // }

    // Why is JWT stateless?
    // Server does not store session data — token itself contains user info.

    // How does backend verify JWT?
    // Using jwt.verify(token, secret).
}

{
    // BACKEND(Node.js + Express + MongoDB)
    // Install Dependencies
    // npm install express mongoose jsonwebtoken bcryptjs cors

    // server.js (Entry Point)
    {
        const express = require("express");
        const mongoose = require("mongoose");
        const cors = require("cors");

        const authRoutes = require("./routes/auth.routes");

        const app = express();

        app.use(express.json());
        app.use(cors());

        mongoose.connect("mongodb://127.0.0.1:27017/jwt-auth");

        app.use("/api/auth", authRoutes);

        app.listen(3000, () => console.log("Server running on port 3000"));

        // User Model (models/User.js)
        const mongoose = require("mongoose");

        const userSchema = new mongoose.Schema({
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            }
        });

        module.exports = mongoose.model("User", userSchema);
    }

    // Auth Routes (routes/auth.routes.js)
    {
        const express = require("express");
        const router = express.Router();

        const {
            register,
            login,
            profile
        } = require("../controllers/auth.controller");

        const authMiddleware = require("../middlewares/auth.middleware");

        router.post("/register", register);
        router.post("/login", login);
        router.get("/profile", authMiddleware, profile);

        module.exports = router;
    }

    // Auth Controller (controllers/auth.controller.js)
    {
        const User = require("../models/User");
        const bcrypt = require("bcryptjs");
        const jwt = require("jsonwebtoken");

        const JWT_SECRET = "supersecretkey";

        exports.register = async (req, res) => {
            const { email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                email,
                password: hashedPassword,
            });

            res.status(201).json({ message: "User registered" });
        };

        exports.login = async (req, res) => {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ message: "Invalid credentials" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

            const token = jwt.sign(
                { userId: user._id },
                JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({ token });
        };

        exports.profile = async (req, res) => {
            res.json({ userId: req.user.userId });
        };
    }

    // JWT Middleware (middlewares/auth.middleware.js)
    {
        const jwt = require("jsonwebtoken");
        const JWT_SECRET = "supersecretkey";

        const authMiddleware = (req, res, next) => {
            const authHeader = req.headers.authorization;

            if (!authHeader)
                return res.status(401).json({ message: "No token" });

            const token = authHeader.split(" ")[1];

            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                req.user = decoded;
                next();
            } catch (err) {
                res.status(401).json({ message: "Invalid token" });
            }
        };

        module.exports = authMiddleware;
    }

    // RONTEND (React + AuthContext)
    // Auth Context (context/AuthContext.js)
    {
        // import { createContext, useState } from "react";
        const AuthContext = createContext();
        const AuthProvider = ({ children }) => {
            const [token, setToken] = useState(
                localStorage.getItem("token")
            );

            const login = (jwtToken) => {
                localStorage.setItem("token", jwtToken);
                setToken(jwtToken);
            };

            const logout = () => {
                localStorage.removeItem("token");
                setToken(null);
            };

            return (
                <AuthContext.Provider value={{ token, login, logout }}>
                    {children}
                </AuthContext.Provider>
            );
        };
    }

    // Wrap App (main.jsx / index.jsx)
    {// import ReactDOM from "react-dom/client";
        // import App from "./App";
        // import { AuthProvider } from "./context/AuthContext";

        ReactDOM.createRoot(document.getElementById("root")).render(
            <AuthProvider>
                <App />
            </AuthProvider>
        );
    }

    // Login API Call (Store Token)
    {
        const loginUser = async () => {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: "test@test.com",
                    password: "123456",
                }),
            });

            const data = await res.json();
            login(data.token);
        };
    }

    // Protected API Call (Send Token)
    {
        fetch("http://localhost:3000/api/auth/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}