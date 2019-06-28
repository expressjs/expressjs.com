<h3 id='res.download'>res.download(path [, filename] [, options] [, fn])</h3>

<div class="doc-box doc-info" markdown="1">
The optional `options` argument is supported by Express v4.16.0 onwards.
</div>

Transfers the file at `path` as an "attachment". Typically, browsers will prompt the user for download.
By default, the `Content-Disposition` header "filename=" parameter is `path` (this typically appears in the browser dialog).
Override this default with the `filename` parameter.

When an error occurs or transfer is complete, the method calls the optional callback function `fn`.
This method uses [res.sendFile()](#res.sendFile) to transfer the file.

The optional `options` argument passes through to the underlying [res.sendFile()](#res.sendFile)
call, and takes the exact same parameters.

```js
res.download('/report-12345.pdf')

res.download('/report-12345.pdf', 'report.pdf')

res.download('/report-12345.pdf', 'report.pdf', function (err) {
  if (err) {
    // Handle error, but keep in mind the response may be partially-sent
    // so check res.headersSent
  } else {
    // decrement a download credit, etc.
  }
})
```
