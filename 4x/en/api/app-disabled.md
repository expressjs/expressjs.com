Check if setting `name` is disabled, where `name` is one of the properties from the [app settings table](#app.settings).

```js
app.disabled('trust proxy');
// => true

app.enable('trust proxy');
app.disabled('trust proxy');
// => false
```
