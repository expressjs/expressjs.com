Joins the `links` provided as properties of the parameter to populate the response's
`Link` HTTP header field.

```js
res.links({
  next: 'http://api.example.com/users?page=2',
  last: 'http://api.example.com/users?page=5'
});
```
yields:

```text
Link: &lt;http://api.example.com/users?page=2&gt;; rel="next", 
      &lt;http://api.example.com/users?page=5&gt;; rel="last"
```
