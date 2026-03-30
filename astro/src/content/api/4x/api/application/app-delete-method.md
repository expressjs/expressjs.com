---
title: app.delete
description: Routes HTTP DELETE requests to the specified path with the specified callback functions.
---

# app.delete(path, callback [, callback ...])

Routes HTTP DELETE requests to the specified path with the specified callback functions.
For more information, see the [routing guide](/en/guide/routing).

{% include api/en/4x/routing-args.html %}

## Example

```js
app.delete('/', function (req, res) {
  res.send('DELETE request to homepage');
});
```
