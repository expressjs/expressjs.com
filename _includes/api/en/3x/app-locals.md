<h3 id='app.locals'>app.locals</h3>

Application local variables are provided to all templates
rendered within the application. This is useful for providing
helper functions to templates, as well as app-level data.

```js
app.locals.title = 'My App'
app.locals.strftime = require('strftime')
```

The `app.locals` object is a JavaScript `Function`,
which when invoked with an object will merge properties into itself, providing
a simple way to expose existing objects as local variables.

```js
app.locals({
  title: 'My App',
  phone: '1-250-858-9990',
  email: 'me@myapp.com'
})

console.log(app.locals.title)
// => 'My App'

console.log(app.locals.email)
// => 'me@myapp.com'
```

A consequence of the `app.locals` Object being ultimately a Javascript Function Object is that you must not reuse existing (native) named properties for your own variable names, such as `name, apply, bind, call, arguments, length, constructor`.

```js
app.locals({ name: 'My App' })

console.log(app.locals.name)
// => return 'app.locals' in place of 'My App' (app.locals is a Function !)
// => if name's variable is used in a template, a ReferenceError will be returned.
```

The full list of native named properties can be found in many specifications. The <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference">JavaScript specification</a> introduced original properties, some of which still recognized by modern engines, and the <a href="http://www.ecma-international.org/ecma-262/5.1/">EcmaScript specification</a> then built on it and normalized the set of properties, adding new ones and removing deprecated ones. Check out properties for Functions and Objects if interested.

By default Express exposes only a single app-level local variable, `settings`.

```js
app.set('title', 'My App')
// use settings.title in a view
```
