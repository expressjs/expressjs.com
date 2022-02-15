<h3 id='app.put.method'>app.put(path, callback [, callback ...])</h3>

Routes HTTP PUT requests to the specified path with the specified callback functions.

{% include api/en/5x/routing-args.html %}

#### Example

```js
app.put('/', (req, res) => {
  res.send('PUT request to homepage')
})
```
