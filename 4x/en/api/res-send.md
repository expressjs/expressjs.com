Send a response.

```js
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('<p>some html</p>');
res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });
```

This method performs a myriad of useful tasks for simple non-streaming responses such as automatically assigning the Content-Length unless previously defined and providing automatic **HEAD** and HTTP cache freshness support.

When a `Buffer` is given the Content-Type is set to "application/octet-stream" unless previously defined as shown below:

```js
res.set('Content-Type', 'text/html');
res.send(new Buffer('<p>some html</p>'));
```

When a `String` is given the Content-Type is set defaulted to "text/html":

```js
res.send('<p>some html</p>');
```

When an `Array` or `Object` is given Express will respond with the JSON representation:

```js
res.send({ user: 'tobi' });
res.send([1,2,3]);
```
