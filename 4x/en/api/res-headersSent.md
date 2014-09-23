Property indicating if HTTP headers has been sent for the response.

```
app.get('/', function (req, res) {
  console.log(res.headersSent); // false
  res.send('OK');
  console.log(res.headersSent); // true
})
```
