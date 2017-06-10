<h3 id='res.json'>res.json([body])</h3>

Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a 
JSON string using [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

The parameter can be any JSON type, including object, array, string, Boolean, or number,
and you can also use it to convert other values to JSON, such as `null`, and `undefined` 
(although these are technically not valid JSON).

```js
res.json(null);
res.json({ user: 'tobi' });
res.status(500).json({ error: 'message' });
```
