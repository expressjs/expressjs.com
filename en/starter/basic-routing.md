---
layout: page
title: Building a Node.js Express Server: Basic Routing
menu: starter
lang: en
redirect_from: "/starter/basic-routing.html"
---


# Basic Routing with Express: A Step-by-Step Guide

Welcome to the world of building web servers with Node.js and Express! In this guide, we'll explore the fundamentals of routing in Express, which is crucial for handling client requests effectively.

Understanding Routing
Routing in Express determines how your application responds to specific client requests to different endpoints. Each route consists of a URI (or path) and an HTTP request method (such as GET, POST, etc.). When a route matches a client request, one or more handler functions are executed.

Let's break down the structure of a route definition:

```js
app.METHOD(PATH, HANDLER)
```

Here's what each component represents:

- app: An instance of the Express application.
- METHOD: An HTTP request method, specified in lowercase.
- PATH: The path on the server.
- HANDLER: The function executed when the route is matched.

<div class="doc-box doc-notice" markdown="1">
Assuming you have already created an instance of `express` named `app` and your server is up and running. If you need help with setting up your Express application, check out the [Hello World example](/{{ page.lang }}/starter/hello-world.html).
</div>

## Examples of Basic Routes

Now, let's dive into some examples of defining simple routes:

Respond with `'Hello World!'` on the Homepage:

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

Handle POST Requests to the Root Route:

```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

Handle PUT Requests to the `'/user'` Route:

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

Handle DELETE Requests to the `'/user'` Route:
```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

### Further Resources

Ready to dive deeper into routing with Express? Check out the [routing guide](/{{ page.lang }}/guide/routing.html) for more detailed information.

### [Previous: Express application generator ](/{{ page.lang }}/starter/generator.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Serving static files in Express ](/{{ page.lang }}/starter/static-files.html)
