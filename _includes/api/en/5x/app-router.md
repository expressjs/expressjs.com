<h3 id='app.router'>app.router</h3>

The application's in-built instance of router. This is created lazily, on first access.

```js
const express = require('express')
const app = express()
const router = app.router

router.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000)
```

You can add middleware and HTTP method routes to the `router` just like an application.

For more information, see [Router](#router).
