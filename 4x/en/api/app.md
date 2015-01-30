The `app` object conventially denotes the Express application.
Create it by calling the top-level `express()` function exported by the Express module:

```js
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
```

The `app` object has a methods for
* Routing HTTP requests; see for example, [app.METHOD](#app.METHOD) and [app.param](#app.param).
* Configuring middlewware; see [app.route](#app.route).
* Rendering HTML views; see [app.render](#app.render).
* Registering a template engine; see [app.engine](#app.engine).

It also has settings (properties) that affect how the application behaves;
for more information, see [Application settings](#app.settings.table).
