<h3 id='res.headersSent'>res.headersSent</h3>

Boolean property that indicates if the app sent HTTP headers for the response.

```js
app.get('/', (req, res) => {
  console.log(res.headersSent) // false
  res.send('OK')
  console.log(res.headersSent) // true
})
```
