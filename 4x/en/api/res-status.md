Chainable alias of node's `res.statusCode`. Use this method to set the HTTP status for the response.

```
res.status(403).end();
res.status(400).send('Bad Request');
res.status(404).sendFile('/absolute/path/to/404.png');
```
