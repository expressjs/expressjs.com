---
title: req.route
description: Contains the currently-matched route, a string
---

# req.route

Contains the currently-matched route, a string. For example:

```js
app.get('/user/{:id}', (req, res) => {
  console.dir(req.route, { depth: null });
  res.send('GET');
});
```

Example output from the previous snippet:

```
Route {
  path: '/user/{:id}',
  stack: [
    Layer {
      handle: [Function (anonymous)],
      keys: [],
      name: '<anonymous>',
      params: undefined,
      path: undefined,
      slash: false,
      matchers: [ [Function: match] ],
      method: 'get'
    }
  ],
  methods: [Object: null prototype] { get: true }
}
```
