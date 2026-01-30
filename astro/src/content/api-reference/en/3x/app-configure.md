<h3 id='app.configure'>app.configure([env], callback)</h3>

Conditionally invoke `callback` when `env` matches `app.get('env')`,
aka `process.env.NODE_ENV`. This method remains for legacy reasons, and is effectively
an `if` statement as illustrated in the following snippets. These functions are <em>not</em>
required in order to use `app.set()` and other configuration methods.

```js
// all environments
app.configure(function () {
  app.set('title', 'My Application')
})

// development only
app.configure('development', function () {
  app.set('db uri', 'localhost/dev')
})

// production only
app.configure('production', function () {
  app.set('db uri', 'n.n.n.n/prod')
})
```

Is effectively sugar for:

```js
// all environments
app.set('title', 'My Application')

// development only
if (app.get('env') === 'development') {
  app.set('db uri', 'localhost/dev')
}

// production only
if (app.get('env') === 'production') {
  app.set('db uri', 'n.n.n.n/prod')
}
```
