<h3 id='res.jsonp'>res.jsonp([body])</h3>

Sends a JSON response with JSONP support. This method is identical to `res.json()`,
except that it opts-in to JSONP callback support.

```js
res.jsonp(null);
// => callback(null)

res.jsonp({ user: 'tobi' });
// => callback({ "user": "tobi" })

res.status(500).jsonp({ error: 'message' });
// => callback({ "error": "message" })
```

By default, the JSONP callback name is simply `callback`. Override this with the
<a href="#app.settings.table">jsonp callback name</a> setting.

The following are some examples of JSONP responses using the same code:

```js
// ?callback=foo
res.jsonp({ user: 'tobi' });
// => foo({ "user": "tobi" })

app.set('jsonp callback name', 'cb');

// ?cb=foo
res.status(500).jsonp({ error: 'message' });
// => foo({ "error": "message" })
```
