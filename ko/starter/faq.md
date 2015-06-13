---
layout: page
title: Express FAQ
menu: starter
lang: en
---

# FAQ

## How should I structure my application?

There is no definitive answer to this question. It depends 
on the scale of your application and the team involved. To be as
flexible as possible, Express makes no assumptions in terms of structure.

Routes and other application-specific logic may live in as many files
as you wish, in any directory structure you prefer. View the following
examples for inspiration:

* [Route listings](https://github.com/strongloop/express/blob/master/examples/route-separation/index.js#L19)
* [Route map](https://github.com/strongloop/express/blob/master/examples/route-map/index.js#L47)
* [MVC style controllers](https://github.com/strongloop/express/tree/master/examples/mvc)

Also, there are third-party extensions for Express, which simplify some of these patterns:

* [Resourceful routing](https://github.com/expressjs/express-resource)

## How do I define models?

Express has no notion of a database at all. This is
left up to third-party Node modules, allowing you to
interface with nearly any database.

See [LoopBack](http://loopback.io) for an Express-based framework centered around models.

## How can I authenticate users?

This is another opinionated area that Express does not
venture into.  You may use any authentication scheme you wish.
For a simple username / password scheme, see [this example](https://github.com/strongloop/express/tree/master/examples/auth).


## Which template engines does Express support?

Express supports any template engine that conforms with the `(path, locals, callback)` signature.
To normalize template engine interfaces and caching, see the
[consolidate.js](https://github.com/visionmedia/consolidate.js)
project for support. Unlisted template engines may still support the Express signature.

## How do you handle 404s?

In Express, 404s are not the result of an error. Therefore,
the error-handler middleware will not capture 404s. This is
because a 404 is simply the absence of additional work to do;
in other words, Express has executed all middleware / routes,
and found that none of them responded. All you need to
do is add a middleware at the very bottom (below all others)
to handle a 404:

~~~js
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
~~~

## How do you setup an error handler?

You define error-handling middleware the same way as other middleware,
except with four arguments instead of three; specifically with the signature `(err, req, res, next)`:

~~~js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
~~~

For more information, see [Error handling](/guide/error-handling.html).

## How do I render plain HTML?

You don't! There's no need to "render" HTML with `res.render()`.
If you have a specific file, use `res.sendFile()`.
If you are serving many assets from a directory use the `express.static()`
middleware.
