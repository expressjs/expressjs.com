Send a JSON response. This method is identical to <code>res.send()</code> when an object or array is passed. However, it may be used for explicit JSON conversion of non-objects, such as null, undefined, etc. (although these are technically not valid JSON).

```
res.json(null)
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })
```
