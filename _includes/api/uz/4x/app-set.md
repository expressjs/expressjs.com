<h3 id='app.set'>app.set(name, value)</h3>

Assigns setting `name` to `value`, where `name` is one of the properties from
the [app settings table](#app.settings.table). 

Calling `app.set('foo', true)` for a Boolean property is the same as calling
`app.enable('foo')`. Similarly, calling `app.set('foo', false)` for a Boolean
property is the same as calling `app.disable('foo')`.

Retrieve the value of a setting with [`app.get()`](#app.get).

~~~js
app.set('title', 'My Site');
app.get('title'); // "My Site"
~~~

<h4 id='app.settings.table'>Application Settings</h4>

{% include api/{{ page.lang }}/4x/app-settings.md %}
