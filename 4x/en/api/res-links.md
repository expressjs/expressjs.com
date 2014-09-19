Join the given <code>links</code> to populate the "Link" response header field.

```
res.links({
  next: 'http://api.example.com/users?page=2',
  last: 'http://api.example.com/users?page=5'
});
```
yields:

```
Link: &lt;http://api.example.com/users?page=2&gt;; rel="next", 
      &lt;http://api.example.com/users?page=5&gt;; rel="last"
```
