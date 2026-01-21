<h3 id='req.cookies'>req.cookies</h3>

This object requires the `cookieParser()` middleware for use.
It contains cookies sent by the user-agent. If no cookies are sent, it
defaults to `{}`.

```js
// Cookie: name=tj
console.log(req.cookies.name)
// => "tj"
```
