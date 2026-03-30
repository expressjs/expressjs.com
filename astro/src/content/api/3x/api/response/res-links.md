---
title: res.links
description: Join the given links to populate the Link response header field.
---

# res.links(links)

Join the given `links` to populate the "Link" response header field.

```js
res.links({
  next: 'http://api.example.com/users?page=2',
  last: 'http://api.example.com/users?page=5',
});
```

p yields:

```
Link: <http://api.example.com/users?page=2> rel="next",
      <http://api.example.com/users?page=5> rel="last"
```
