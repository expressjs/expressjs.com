The `res` object represents the HTTP response that an Express app sends when it gets an HTTP request.

In this documentation and by convention, 
the object is always referred to as `res` (and the HTTP request is `req`) but its actual name is determined
by the parameters to the callback function in which you're working.

For example: 
```js
app.get('/user/:id', function(req, res){
    res.send('user ' + req.params.id);
});
```

But you could just as well have:
```js
app.get('/user/:id', function(request, response){
    response.send('user ' + request.params.id);
});
```

