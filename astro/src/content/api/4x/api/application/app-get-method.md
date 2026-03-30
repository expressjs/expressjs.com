---
title: app.get
description: Routes HTTP GET requests to the specified path with the specified callback functions.
---

# app.get(path, callback [, callback ...])

Routes HTTP GET requests to the specified path with the specified callback functions.

{% include api/en/4x/routing-args.html %}

For more information, see the [routing guide](/en/guide/routing).

## Example

```js
app.get('/', function (req, res) {
  res.send('GET request to homepage');
});
```
