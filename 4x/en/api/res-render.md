Render a `view` with a callback responding with the rendered string. When an error occurs `next(err)` is invoked internally. When a callback is provided both the possible error and rendered string are passed, and no automated response is performed.
```
res.render('index', function(err, html){
  // ...
});

res.render('user', { name: 'Tobi' }, function(err, html){
  // ...
});
```
