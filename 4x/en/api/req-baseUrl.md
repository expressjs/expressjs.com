This property refers to the URL path, on which a router instance was mounted.

```js
var greet = express.Router();

greet.get('/jp', function (req, res) {
  console.log(req.baseUrl); // /greet
  res.send('Konichiwa!');
});

app.use('/greet', greet); // load the router on '/greet'
```

Even if a path pattern or a set of path patterns were used to load the router, the matched string is returned as the `baseUrl`, instead of the pattern(s). In the following example, the `greet` router is loaded on two path patterns.

```js
app.use(['/gre+t', '/hel{2}o'], greet); // load the router on '/gre+t' and '/hel{2}o'
```

When the request is made to `/greet/jp`, `req.baseUrl` will be equal to "/greet"; and when the request is made to `/hello/jp`, it will be equal to "/hello".

`req.baseUrl` is similar to the [mountpath](#app.mountpath) property of the `app` object, except `app.mountpath` returns the matched path pattern(s).
