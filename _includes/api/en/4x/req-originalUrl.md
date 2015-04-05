<h3 id='req.originalUrl'>req.originalUrl</h3>

This property is much like `req.url`; however, it retains the original request URL,
allowing you to rewrite `req.url` freely for internal routing purposes. For example,
the "mounting" feature of [app.use()](#app.use) will rewrite `req.url` to strip the mount point.

~~~js
// GET /search?q=something
req.originalUrl
// => "/search?q=something"
~~~
