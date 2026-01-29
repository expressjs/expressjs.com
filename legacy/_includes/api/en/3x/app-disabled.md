<h3 id='app.disabled'>app.disabled(name)</h3>

Check if setting `name` is disabled.

```js
app.disabled('trust proxy')
// => true

app.enable('trust proxy')
app.disabled('trust proxy')
// => false
```
