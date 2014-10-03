# Hello World! example

Here is an example of a very basic express app.

```js
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
```

The app starts a server and listens on port 3000 for connection. It will respond with "Hello World!" for requests to the homepage. For every other path, it will respond with a **404 Not Found**.
