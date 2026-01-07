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
