<h3 id='res.trace'>res.trace(event [, parameters])</h3>

Fire all tracers instrumented at the application level.

Optional parameters:

- `event`, name of the event to send to tracers.
- `parameters`, additional parameters to send to tracers.

```js
app.get('/', function(req, res){
  res.trace('index:visited', 'my-parameter');
  res.render('index');
});
```
