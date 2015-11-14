<h3 id='app.enable'>app.enable(name)</h3>

Sets the Boolean setting `name` to `true`, where `name` is one of the properties from the [app settings table](#app.settings.table).
Calling `app.set('foo', true)` for a Boolean property is the same as calling `app.enable('foo')`.

~~~js
app.enable('trust proxy');
app.get('trust proxy');
// => true
~~~
