<h3 id='res.download'>res.download(path, [filename], [fn])</h3>

Transfer the file at `path` as an "attachment",
typically browsers will prompt the user for download. The
Content-Disposition "filename=" parameter, aka the one
that will appear in the brower dialog is set to `path`
by default, however you may provide an override `filename`.

When an error has ocurred or transfer is complete the optional
callback `fn` is invoked. This method uses <a href="#res.sendfile">res.sendfile()</a>
to transfer the file.

```js
res.download('/report-12345.pdf')

res.download('/report-12345.pdf', 'report.pdf')

res.download('/report-12345.pdf', 'report.pdf', function (err) {
  if (err) {
    // handle error, keep in mind the response may be partially-sent
    // so check res.headerSent
  } else {
    // decrement a download credit etc
  }
})
```
