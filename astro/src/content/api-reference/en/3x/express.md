<h2 id="express">express()</h2>

Creates an Express application. The `express()` function is a top-level function exported by the _express_ module.

```js
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000)
```
