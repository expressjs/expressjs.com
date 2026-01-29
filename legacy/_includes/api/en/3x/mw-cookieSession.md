<h3 id='cookieSession'>cookieSession()</h3>

Provides cookie-based sessions, and populates `req.session`.
This middleware takes the following options:

* `key` cookie name defaulting to `connect.sess`
* `secret` prevents cookie tampering
* `cookie` session cookie settings, defaulting to `{ path: '/', httpOnly: true, maxAge: null }`
* `proxy` trust the reverse proxy when setting secure cookies (via "x-forwarded-proto")

```js
app.use(express.cookieSession())
```

To clear a cookie simply assign the session to null before responding:

```js
req.session = null
```
