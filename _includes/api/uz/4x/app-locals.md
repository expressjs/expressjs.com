<h3 id='app.locals'>app.locals</h3>

The `app.locals` object is a JavaScript object, and its 
properties are local variables within the application.

~~~js
app.locals.title
// => 'My App'

app.locals.email
// => 'me@myapp.com'
~~~

Once set, the value of `app.locals` properties persist throughout the life of the application,
in contrast with [res.locals](#res.locals) properties that
are valid only for the lifetime of the request.

You can accesss local variables in templates rendered within the application.
This is useful for providing helper functions to templates, as well as app-level data.
Note, however, that you cannot access local variables in middleware.

~~~js
app.locals.title = 'My App';
app.locals.strftime = require('strftime');
app.locals.email = 'me@myapp.com';
~~~
