Send a JSON response with JSONP support. This method is identical to <code>res.json()</code>, except that it opts-in to JSONP callback support.

```
res.jsonp(null)
// => null

res.jsonp({ user: 'tobi' })
// => { "user": "tobi" }

res.status(500).jsonp({ error: 'message' })
// => { "error": "message" }
```

By default, the JSONP callback name is simply <code>callback</code>. However, you may alter this with the <a href="#app-settings">jsonp callback name</a> setting. The following are some examples of JSONP responses using the same code:

```
// ?callback=foo
res.jsonp({ user: 'tobi' })
// => foo({ "user": "tobi" })

app.set('jsonp callback name', 'cb');

// ?cb=foo
res.status(500).jsonp({ error: 'message' })
// => foo({ "error": "message" })
```
