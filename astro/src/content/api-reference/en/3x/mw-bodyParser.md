<h3 id='bodyParser'>bodyParser()</h3>

Request body parsing middleware supporting JSON, urlencoded,
and multipart requests. This middleware is simply a wrapper
for the `json()`, `urlencoded()`, and
`multipart()` middleware.

```js
app.use(express.bodyParser())

// is equivalent to:
app.use(express.json())
app.use(express.urlencoded())
app.use(express.multipart())
```

For security sake, it's better to disable file upload if your application
doesn't need it. To do this, use only the needed middleware, i.e. don't use
the `bodyParser` and `multipart()` middleware:

```js
app.use(express.json())
app.use(express.urlencoded())
```

If your application needs file upload you should set up
<a href='https://groups.google.com/d/msg/express-js/iP2VyhkypHo/5AXQiYN3RPcJ'>a strategy for dealing with those files</a>.
