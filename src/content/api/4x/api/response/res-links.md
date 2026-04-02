---
title: res.links
description: Joins the links provided as properties of the parameter to populate the response Link HTTP header field.
---

# res.links(links)

Joins the `links` provided as properties of the parameter to populate the response's
`Link` HTTP header field.

For example, the following call:

```js
res.links({
  next: 'http://api.example.com/users?page=2',
  last: 'http://api.example.com/users?page=5',
});
```

Yields the following results:

```
Link: <http://api.example.com/users?page=2>; rel="next",
      <http://api.example.com/users?page=5>; rel="last"
```
