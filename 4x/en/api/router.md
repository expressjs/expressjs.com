A `router` object is an isolated instance of middleware and routes. You can think of it
as a "mini-application," capable only of performing middleware and routing
functions. Every Express application has a built-in app router.

A router behaves like middleware itself, so you can use it as an argument to
[app.use()](#app.use) or as the argument to another router's  [use()](#router.use) method.

The top-level `express` object has a `Router()` function that creates a new `router` object.
