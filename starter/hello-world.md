# Hello world example

Here is an example of a very basic Express app.

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

Save the code in a file named `app.js` and run it with the following command.

```sh
$ node app.js
```

Then, load [http://localhost:3000/](http://localhost:3000/) in a browser to see the output.
