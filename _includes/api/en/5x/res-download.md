<h3 id='res.download'>res.download(path [, filename] [, options] [, fn])</h3>

<div class="doc-box doc-info" markdown="1">
The optional `options` argument is supported by Express v4.16.0 onwards.
</div>

Transfers the file at `path` as an "attachment". Typically, browsers will prompt the user for download.
By default, the `Content-Disposition` header "filename=" parameter is derrived from the `path` argument, but can be overridden with the `filename` parameter.
If `path` is relative, then it will be based on the current working directory of the process.

The following table provides details on the `options` parameter.

<div class="doc-box doc-info" markdown="1">
The optional `options` argument is supported by Express v4.16.0 onwards.
</div>

<div class="table-scroller" markdown="1">

| Property        | Description                                     | Default     | Availability |
|-----------------|-------------------------------------------------|-------------|--------------|
| `maxAge`        | Sets the max-age property of the `Cache-Control` header in milliseconds or a string in [ms format](https://www.npmjs.org/package/ms)| 0 | 4.16+ |
| `lastModified`  | Sets the `Last-Modified` header to the last modified date of the file on the OS. Set `false` to disable it.| Enabled | 4.16+ |
| `headers`       | Object containing HTTP headers to serve with the file. The header `Content-Disposition` will be overriden by the `filename` argument.|  | 4.16+ |
| `dotfiles`      | Option for serving dotfiles. Possible values are "allow", "deny", "ignore".| "ignore" | 4.16+ |
| `acceptRanges`  | Enable or disable accepting ranged requests. | `true` | 4.16+ |
| `cacheControl`  | Enable or disable setting `Cache-Control` response header.| `true` | 4.16+ |
| `immutable`   | Enable or disable the `immutable` directive in the `Cache-Control` response header. If enabled, the `maxAge` option should also be specified to enable caching. The `immutable` directive will prevent supported clients from making conditional requests during the life of the `maxAge` option to check if the file has changed. | `false` | 4.16+ |

</div>

The method invokes the callback function `fn(err)` when the transfer is complete
or when an error occurs. If the callback function is specified and an error occurs,
the callback function must explicitly handle the response process either by
ending the request-response cycle, or by passing control to the next route.

```js
res.download('/report-12345.pdf')

res.download('/report-12345.pdf', 'report.pdf')

res.download('/report-12345.pdf', 'report.pdf', (err) => {
  if (err) {
    // Handle error, but keep in mind the response may be partially-sent
    // so check res.headersSent
  } else {
    // decrement a download credit, etc.
  }
})
```
