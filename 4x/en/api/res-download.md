Transfer the file at `path` as an "attachment". Typically, browsers will prompt the user for download. The Content-Disposition "filename=" parameter (i.e. the one that will appear in the brower dialog) is set to `path` by default. However, you may provide an override `filename`.

When an error has ocurred or transfer is complete the optional callback `fn` is invoked. This method uses [res.sendFile()](#res.sendFile) to transfer the file.

```
res.download('/report-12345.pdf');

res.download('/report-12345.pdf', 'report.pdf');

res.download('/report-12345.pdf', 'report.pdf', function(err){
  if (err) {
    // handle error, keep in mind the response may be partially-sent
    // so check res.headersSent
  } else {
    // decrement a download credit etc
  }
});
```
