<h3 id='cookieParser'>cookieParser()</h3>

Parses the Cookie header field and populates `req.cookies`
with an object keyed by the cookie names. Optionally you may enabled
signed cookie support by passing a `secret` string.

```js
app.use(express.cookieParser())
app.use(express.cookieParser('some secret'))
```
