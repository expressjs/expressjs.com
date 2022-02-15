<h3 id='res.format'>res.format(object)</h3>

Performs content-negotiation on the `Accept` HTTP header on the request object, when present.
It uses [req.accepts()](#req.accepts) to select a handler for the request, based on the acceptable
types ordered by their quality values. If the header is not specified, the first callback is invoked.
When no match is found, the server responds with 406 "Not Acceptable", or invokes the `default` callback.

The `Content-Type` response header is set when a callback is selected. However, you may alter
this within the callback using methods such as `res.set()` or `res.type()`.

The following example would respond with `{ "message": "hey" }` when the `Accept` header field is set
to "application/json" or "\*/json" (however if it is "\*/\*", then the response will be "hey").

```js
res.format({
  'text/plain' () {
    res.send('hey')
  },

  'text/html' () {
    res.send('<p>hey</p>')
  },

  'application/json' () {
    res.send({ message: 'hey' })
  },

  default () {
    // log the request and respond with 406
    res.status(406).send('Not Acceptable')
  }
})
```

In addition to canonicalized MIME types, you may also use extension names mapped
to these types for a slightly less verbose implementation:

```js
res.format({
  text () {
    res.send('hey')
  },

  html () {
    res.send('<p>hey</p>')
  },

  json () {
    res.send({ message: 'hey' })
  }
})
```
