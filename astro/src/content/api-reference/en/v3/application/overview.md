---
title: Properties
description: section markdown="1">
---

<h2 id="app">Application</h2>

The `app` object conventionally denotes the Express application.
Create it by calling the top-level `express()` function exported by the Express module:

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('hello world');
});

app.listen(3000);
```
