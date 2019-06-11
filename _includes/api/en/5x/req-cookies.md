<h3 id='req.cookies'>req.cookies</h3>

When using [cookie-parser](https://www.npmjs.com/package/cookie-parser) middleware, this property is an object that
contains cookies sent by the request.  If the request contains no cookies, it defaults to `{}`.

```js
// Cookie: name=tj
console.dir(req.cookies.name)
// => "tj"
```

If the cookie has been signed, you have to use [req.signedCookies](#req.signedCookies).

For more information, issues, or concerns, see [cookie-parser](https://github.com/expressjs/cookie-parser).
