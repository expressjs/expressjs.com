Application local variables are provided to all templates
rendered within the application. This is useful for providing
helper functions to templates, as well as app-level data.

```
app.locals.title = 'My App';
app.locals.strftime = require('strftime');
app.locals.email = 'me@myapp.com';
```

The `app.locals` object is a JavaScript `Object`. The
properties added to it will be exposed as local variables within the application.

```
app.locals.title
// => 'My App'

app.locals.email
// => 'me@myapp.com'
```

By default, Express exposes only a single app-level local variable: `settings`.

```
app.set('title', 'My App');
// use settings.title in a view
```
