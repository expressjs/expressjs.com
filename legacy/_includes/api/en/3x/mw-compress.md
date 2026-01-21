<h3 id='compress'>compress()</h3>

Compress response data with gzip / deflate. This middleware
should be placed "high" within the stack to ensure all
responses may be compressed.

```js
app.use(express.logger())
app.use(express.compress())
app.use(express.methodOverride())
app.use(express.bodyParser())
```
