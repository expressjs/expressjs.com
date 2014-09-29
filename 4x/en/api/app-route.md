Returns an instance of a single route, which can then be used to handle HTTP verbs with optional middleware. Using `app.route()` is a recommended approach for avoiding duplicate route names (and thus typo errors).

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
})
```
