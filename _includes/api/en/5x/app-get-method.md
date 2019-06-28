<h3 id='app.get.method'>app.get(path, callback [, callback ...])</h3>

Routes HTTP GET requests to the specified path with the specified callback functions.

{% include api/en/4x/routing-args.html %}

For more information, see the [routing guide](/guide/routing.html).

#### Example

```js
app.get('/', function (req, res) {
  res.send('GET request to homepage')
})
```
