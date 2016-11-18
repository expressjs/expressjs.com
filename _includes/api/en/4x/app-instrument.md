<h3 id='app.instrument'>app.instrument(tracer)</h3>

Add a tracer to the application object. This tracer will be activated each time
the `trace` method of a response is called.

A tracer is a function which takes an options object as argument. It has the
following field:

* `res`: Response that fired the tracing.
* `req`: Request related to the response that fired the tracing.
* `app`: Application object.
* `event`: String sent by the response to name the event.
* `date`: Date when the tracing occured.
* `args`: Additional arguments provided by the tracing call.

For example:

```js
app.instrument(function(options){
  debug(options.event + ' ' + options.date + ' ' + options.argv[0]);
});
```
