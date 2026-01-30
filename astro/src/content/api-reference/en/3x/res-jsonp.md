<h3 id='res.jsonp'>res.jsonp([status|body], [body])</h3>

Send a JSON response with JSONP support. This method is identical
to `res.json()` however opts-in to JSONP callback
support.

```js
res.jsonp(null)
// => null

res.jsonp({ user: 'tobi' })
// => { "user": "tobi" }

res.jsonp(500, { error: 'message' })
// => { "error": "message" }
```

By default the JSONP callback name is simply `callback`,
however you may alter this with the <a href="#app-settings">jsonp callback name</a>
setting. The following are some examples of JSONP responses using the same
code:

```js
// ?callback=foo
res.jsonp({ user: 'tobi' })
// => foo({ "user": "tobi" })

app.set('jsonp callback name', 'cb')

// ?cb=foo
res.jsonp(500, { error: 'message' })
// => foo({ "error": "message" })
```
