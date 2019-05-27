<h3 id='basicAuth'>basicAuth()</h3>

Basic Authentication middleware, populating `req.user`
with the username.

Simple username and password:

```js
app.use(express.basicAuth('username', 'password'))
```

Callback verification:

```js
app.use(express.basicAuth(function (user, pass) {
  return user === 'tj' && pass === 'wahoo'
}))
```

Async callback verification, accepting `fn(err, user)`,
in this case `req.user` will be the user object passed.

```js
app.use(express.basicAuth(function (user, pass, fn) {
  User.authenticate({ user: user, pass: pass }, fn)
}))
```
