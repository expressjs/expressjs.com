The `req` object represents the HTTP request and has properties for the 
request query string, parameters, body, HTTP headers, and so on.  In this documentation and by convention, 
the object is always referred to as `req` (and the HTTP response is `res`) but its actual name is determined
by the parameters to the callback function in which you're working.

For example: 
```
app.get('/user/:id', function(req, res){
    res.send('user ' + req.params.id);
});
```

But you could just as well have:
```
app.get('/user/:id', function(request, response){
    response.send('user ' + request.params.id);
});
```

