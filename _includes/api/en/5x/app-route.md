<h3 id='app.route'>app.route(path)</h3>

Returns an instance of a single route, which you can then use to handle HTTP verbs with optional middleware.
Use `app.route()` to avoid duplicate route names (and thus typo errors).

```js
const app = express()

app.route('/events')
  .all((req, res, next) => {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
  })
  .get((req, res, next) => {
    res.json({})
  })
  .post((req, res, next) => {
    // maybe add a new event...
  })
```
