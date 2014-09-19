Express is a routing and middleware web framework with minimal functionality of its own. Functionality to Express apps are added via third-party middleware.

Install the node module for the required functionality and loaded it in your app at the application level or at the router level.

In the following example, `cookie-parser`, a cookie parsing middleware is installed and loaded in the app.

```
  $ npm install cookie-parser
```

```
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie parsing middleware
app.use(cookieParser);
```
[Here](https://github.com/senchalabs/connect#middleware) is a list of third-party middleware commonly used with Express.
