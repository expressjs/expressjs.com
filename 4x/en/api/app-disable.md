Set Boolean setting `name` to `false`, where `name` is one of the properties from the [app settings table](#app-settings).
Calling `app.set('foo', false)` for a Boolean property is the same as calling `app.disable('foo')`.

For example:

```js
app.disable('trust proxy');
app.get('trust proxy');
// => false
```
