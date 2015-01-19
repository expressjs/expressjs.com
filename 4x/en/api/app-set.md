Assign setting `name` to `value`, where `name` is one of the properties from the [app settings table](#app-settings-table).

Calling `app.set('foo', true)` for a Boolean property is the same as calling `app.enable('foo')`. Similarly, calling `app.set('foo', false)` for a Boolean property is the same as calling `app.disable('foo')`.

```js
app.set('title', 'My Site');
app.get('title'); // "My Site"
```

The value can be retrieved using [`app.get()`](#app.get)
