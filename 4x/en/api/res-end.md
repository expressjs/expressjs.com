Inherited from node's `http.ServerResponse`, ends the response process. The only recommended use is for quickly ending the response without any data. If you need to respond with data, use Express' response methods such as `res.send()`, `res.json()` etc.

```js
res.end();
res.status(404).end();
```
