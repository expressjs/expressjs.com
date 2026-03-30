---
title: app.post
description: Routes HTTP POST requests to the specified path with the specified callback functions.
---

# app.post(path, callback [, callback ...])

Routes HTTP POST requests to the specified path with the specified callback functions.
For more information, see the [routing guide](/en/guide/routing).

{% include api/routing-args.html %}

#### Example

```js
app.post('/', (req, res) => {
  res.send('POST request to homepage');
});
```
