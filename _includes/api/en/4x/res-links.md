<h3 id='res.links'>res.links(links)</h3>

Joins the `links` provided as properties of the parameter to populate the response's
`Link` HTTP header field.

For example, the following call:

```js
res.links({
  next: 'http://api.example.com/users?page=2',
  last: 'http://api.example.com/users?page=5'
});
```

Yields the following results:

```js
Link: <http://api.example.com/users?page=2>; rel="next",
      <http://api.example.com/users?page=5>; rel="last"
```
