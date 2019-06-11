<h3 id='res.sendStatus'>res.sendStatus(statusCode)</h3>

Sets the response HTTP status code to `statusCode` and send its string representation as the response body.

```js
res.sendStatus(200) // equivalent to res.status(200).send('OK')
res.sendStatus(403) // equivalent to res.status(403).send('Forbidden')
res.sendStatus(404) // equivalent to res.status(404).send('Not Found')
res.sendStatus(500) // equivalent to res.status(500).send('Internal Server Error')
```

If an unsupported status code is specified, the HTTP status is still set to `statusCode` and the string version of the code is sent as the response body.

<div class="doc-box doc-notice" markdown="1">
Some versions of Node.js will throw when `res.statusCode` is set to an
invalid HTTP status code (outside of the range `100` to `599`). Consult
the HTTP server documentation for the Node.js version being used.
</div>

```js
res.sendStatus(9999) // equivalent to res.status(9999).send('9999')
```

[More about HTTP Status Codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
