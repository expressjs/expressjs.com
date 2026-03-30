---
title: req.baseUrl
description: The URL path on which a router instance was mounted.
---

# req.baseUrl

The URL path on which a router instance was mounted.

The `req.baseUrl` property is similar to the [mountpath](#app.mountpath) property of the `app` object,
except `app.mountpath` returns the matched path pattern(s).

For example:

```js
const greet = express.Router();

greet.get('/jp', (req, res) => {
  console.log(req.baseUrl); // /greet
  res.send('Konichiwa!');
});

app.use('/greet', greet); // load the router on '/greet'
```

Even if you use a path pattern or a set of path patterns to load the router,
the `baseUrl` property returns the matched string, not the pattern(s). In the
following example, the `greet` router is loaded on two path patterns.

```js
app.use(['/gre:"param"t', '/hel{l}o'], greet); // load the router on '/gre:"param"t' and '/hel{l}o'
```

When a request is made to `/greet/jp`, `req.baseUrl` is "/greet". When a request is
made to `/hello/jp`, `req.baseUrl` is "/hello".
