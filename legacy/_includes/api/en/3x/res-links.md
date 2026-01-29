<h3 id='res.links'>res.links(links)</h3>

Join the given `links` to populate the "Link" response header field.

```js
res.links({
  next: 'http://api.example.com/users?page=2',
  last: 'http://api.example.com/users?page=5'
})
```

p yields:

```
Link: <http://api.example.com/users?page=2> rel="next",
      <http://api.example.com/users?page=5> rel="last"
```
