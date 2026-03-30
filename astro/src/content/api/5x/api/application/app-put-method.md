---
title: app.put
description: Routes HTTP PUT requests to the specified path with the specified callback functions.
---

# app.put(path, callback [, callback ...])

Routes HTTP PUT requests to the specified path with the specified callback functions.

{% include api/en/5x/routing-args.html %}

## Example

```js
app.put('/', (req, res) => {
  res.send('PUT request to homepage');
});
```
