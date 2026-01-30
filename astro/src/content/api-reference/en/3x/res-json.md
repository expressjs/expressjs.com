<h3 id='res.json'>res.json([status|body], [body])</h3>

Send a JSON response. This method is identical
to `res.send()` when an object or
array is passed, however it may be used for
explicit JSON conversion of non-objects (null, undefined, etc),
though these are technically not valid JSON.

```js
res.json(null)
res.json({ user: 'tobi' })
res.json(500, { error: 'message' })
```
