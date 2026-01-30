<h3 id='res.sendStatus'>res.sendStatus(statusCode)</h3>

Sets the response HTTP status code to `statusCode` and sends the registered status message as the text response body. If an unknown status code is specified, the response body will just be the code number.

```js
res.sendStatus(404)
```

<div class="doc-box doc-notice" markdown="1">
Some versions of Node.js will throw when `res.statusCode` is set to an
invalid HTTP status code (outside of the range `100` to `599`). Consult
the HTTP server documentation for the Node.js version being used.
</div>

[More about HTTP Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
