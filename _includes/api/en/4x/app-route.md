<h3 id='app.route'>app.route(path)</h3>

Returns an instance of a single route, which you can then use to handle HTTP verbs with optional middleware.
Use `app.route()` to avoid duplicate route names (and thus typo errors).

```js
var app = express();

app.route('/events')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
})
.get(function(req, res, next) {
  res.json(...);
})
.post(function(req, res, next) {
  // maybe add a new event...
});
```
