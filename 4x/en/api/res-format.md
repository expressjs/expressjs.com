Performs content-negotiation on the Accept HTTP header on the request object, when present. It uses [req.accepts()](#req.accepts) to select a handler for the request, based on the acceptable types ordered by their quality values. If the header is not specified, the first callback is invoked. When no match is found, the server responds with 406 "Not Acceptable", or invokes the `default` callback.

The Content-Type response header is set for you when a callback is selected. However, you may alter this within the callback using `res.set()` or `res.type()` etcetera.

The following example would respond with `{ "message": "hey" }` when the Accept header field is set to "application/json" or "*/json" (however if "*/*" is given, then "hey" will be the response).

```
res.format({
  'text/plain': function(){
    res.send('hey');
  },

  'text/html': function(){
    res.send('<p>hey</p>');
  },

  'application/json': function(){
    res.send({ message: 'hey' });
  },

  'default': function() {
    // log the request and respond with 406
    res.status(406).send('Not Acceptable');
  }
});
```
In addition to canonicalized MIME types, you may also use extension names mapped to these types for a slightly less verbose implementation:

```
res.format({
  text: function(){
    res.send('hey');
  },

  html: function(){
    res.send('<p>hey</p>');
  },

  json: function(){
    res.send({ message: 'hey' });
  }
});
```
