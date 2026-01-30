<h3 id='res.end'>res.end([data[, encoding]][, callback])</h3>

Ends the response process. This method actually comes from Node core, specifically the [response.end() method of http.ServerResponse](https://nodejs.org/api/http.html#responseenddata-encoding-callback).

Use to quickly end the response without any data. If you need to respond with data, instead use methods such as [res.send()](#res.send) and [res.json()](#res.json).

```js
res.end()
res.status(404).end()
```
