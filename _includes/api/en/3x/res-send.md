<h3 id='res.send'>res.send([body|status], [body])</h3>

Send a response.

```js
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('<p>some html</p>');
res.send(404, 'Sorry, we cannot find that!');
res.send(500, { error: 'something blew up' });
res.send(200);
```

This method performs a myriad of
useful tasks for simple non-streaming responses such
as automatically assigning the Content-Length unless
previously defined and providing automatic <em>HEAD</em> and
HTTP cache freshness support.

When a `Buffer` is given
the Content-Type is set to "application/octet-stream"
unless previously defined as shown below:

```js
res.set('Content-Type', 'text/html');
res.send(new Buffer('<p>some html</p>'));
```

When a `String` is given the
Content-Type is set defaulted to "text/html":

```js
res.send('<p>some html</p>');
```

When an `Array` or `Object` is
given Express will respond with the JSON representation:

```js
res.send({ user: 'tobi' });
res.send([1,2,3]);
```

Finally when a `Number` is given without
any of the previously mentioned bodies, then a response
body string is assigned for you. For example 200 will
respond will the text "OK", and 404 "Not Found" and so on.

```js
res.send(200)
res.send(404)
res.send(500)
```
