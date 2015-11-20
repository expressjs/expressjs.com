<h3 id='app.get'>app.get(name)</h3>

Returns the value of `name` app setting, where `name` is one of strings in the
[app settings table](#app.settings.table). For example:

~~~js
app.get('title');
// => undefined

app.set('title', 'My Site');
app.get('title');
// => "My Site"
~~~
