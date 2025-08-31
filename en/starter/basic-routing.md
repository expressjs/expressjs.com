---
layout: page
title: Express basic routing
description: Learn the fundamentals of routing in Express.js applications, including how to define routes, handle HTTP methods, and create route handlers for your web server.
menu: starter
redirect_from: "/starter/basic-routing.html"
---

# Basic routing

_Routing_ refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.

Route definition takes the following structure:

```js
app.METHOD(PATH, HANDLER)
```

Where:

- `app` is an instance of `express`.
- `METHOD` is an [HTTP request method](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), in lowercase.
- `PATH` is a path on the server.
- `HANDLER` is the function executed when the route is matched.

<div class="doc-box doc-notice" markdown="1">
This tutorial assumes that an instance of `express` named `app` is created and the server is running. If you are not familiar with creating an app and starting it, see the [Hello world example](/{{ page.lang }}/starter/hello-world.html).
</div>

// GET request to the homepage
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' })
})

// POST request to the homepage
app.post('/', (req, res) => {
  res.status(201).json({ message: 'Got a POST request' })
})

// PUT request to /user
app.put('/user', (req, res) => {
  res.status(200).json({ message: 'Got a PUT request at /user' })
})

// PATCH request to /user (partial update)
app.patch('/user', (req, res) => {
  res.status(200).json({ message: 'Got a PATCH request at /user' })
})

// DELETE request to /user
app.delete('/user', (req, res) => {
  res.status(200).json({ message: 'Got a DELETE request at /user' })
})

For more details about routing, see the [routing guide](/{{ page.lang }}/guide/routing.html).

###  [Previous: Express application generator ](/{{ page.lang }}/starter/generator.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Serving static files in Express ](/{{ page.lang }}/starter/static-files.html)
