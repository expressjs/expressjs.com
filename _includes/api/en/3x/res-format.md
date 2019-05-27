<h3 id='res.format'>res.format(object)</h3>

Performs content-negotiation on the request Accept header
field when present. This method uses `req.accepted`, an array of
acceptable types ordered by their quality values, otherwise the
first callback is invoked. When no match is performed the server
responds with 406 "Not Acceptable", or invokes the `default`
callback.

The Content-Type is set for you when a callback is selected,
however you may alter this within the callback using `res.set()`
or `res.type()` etcetera.

The following example would respond with `{ "message": "hey" }`
when the Accept header field is set to "application/json" or "*/json",
however if "*/*" is given then "hey" will be the response.

```js
res.format({
  'text/plain': function () {
    res.send('hey')
  },

  'text/html': function () {
    res.send('<p>hey</p>')
  },

  'application/json': function () {
    res.send({ message: 'hey' })
  }
})
```

In addition to canonicalized MIME types you may also
use extnames mapped to these types, providing a slightly
less verbose implementation:

```js
res.format({
  text: function () {
    res.send('hey')
  },

  html: function () {
    res.send('<p>hey</p>')
  },

  json: function () {
    res.send({ message: 'hey' })
  }
})
```
