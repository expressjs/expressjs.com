<h3 id='app.delete.method'>app.delete(path, callback [, callback ...])</h3>

Routes HTTP DELETE requests to the specified path with the specified callback functions.
For more information, see the [routing guide](/guide/routing.html).

{% include api/en/4x/routing-args.html %}

#### Example

```js
app.delete('/', function (req, res) {
  res.send('DELETE request to homepage')
})
```
