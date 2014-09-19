Inherited from node's <code>http.ServerResponse</code>, ends the response process. The only recommended use is for quickly ending the response without any data. If you need to respond with data, use Express' response methods such as <code>res.send()</code>, <code>res.json()</code> etc.

```
res.end();
res.status(404).end();
```
