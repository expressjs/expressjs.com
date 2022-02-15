<h3 id='app.post.method'>app.post(path, callback [, callback ...])</h3>

Routes HTTP POST requests to the specified path with the specified callback functions.
For more information, see the [routing guide](/guide/routing.html).

{% include api/en/5x/routing-args.html %}

#### Example

```js
app.post('/', (req, res) => {
  res.send('POST request to homepage')
})
```
