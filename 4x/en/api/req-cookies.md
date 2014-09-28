When the `cookieParser()` middleware is used, this object defaults to `{}`. Otherwise, it contains the cookies sent by the user-agent.

```js
// Cookie: name=tj
req.cookies.name
// => "tj"
```

Please refer to [cookie-parser](https://github.com/expressjs/cookie-parser) for additional documentation or any issues and concerns.
