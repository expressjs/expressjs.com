<h3 id='req.originalUrl'>req.originalUrl</h3>

This property is much like `req.url`, however it retains
the original request url, allowing you to rewrite `req.url`
freely for internal routing purposes. For example the "mounting" feature
of <a href="#app.use">app.use()</a> will rewrite `req.url` to
strip the mount point.

```js
// GET /search?q=something
console.log(req.originalUrl)
// => "/search?q=something"
```
