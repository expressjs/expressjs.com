<h3 id='req.app'>req.app</h3>

This property holds a reference to the instance of the Express application that is using the middleware.

If you follow the pattern in which you create a module that just exports a middleware function
and `require()` it in your main file, then the middleware can access the Express instance via `req.app`

For example:

```js
//index.js
app.get('/viewdirectory', require('./mymiddleware.js'))
```

```js
//mymiddleware.js
module.exports = function (req, res) {
  res.send('The views directory is ' + req.app.get('views'));
});
```
