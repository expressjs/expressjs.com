---
title: router.param
description: Adds callback triggers to route parameters, where name is the name of the parameter and callback is the callback function. Although name is technically optional, it is required.
menuTitle: router.param
---

<h3 id='router.param'>router.param(name, callback)</h3>

Adds callback triggers to route parameters, where `name` is the name of the parameter and `callback` is the callback function. Although `name` is technically optional, using this method without it is deprecated starting with Express v4.11.0 (see below).

The parameters of the callback function are:

- `req`, the request object.
- `res`, the response object.
- `next`, indicating the next middleware function.
- The value of the `name` parameter.
- The name of the parameter.

<div class="doc-box doc-info" markdown="1">
Unlike `app.param()`, `router.param()` does not accept an array of route parameters.
</div>

For example, when `:user` is present in a route path, you may map user loading logic to automatically provide `req.user` to the route, or perform validations on the parameter input.

```js
router.param('user', (req, res, next, id) => {
  // try to get the user details from the User model and attach it to the request object
  User.find(id, (err, user) => {
    if (err) {
      next(err)
    } else if (user) {
      req.user = user
      next()
    } else {
      next(new Error('failed to load user'))
    }
  })
})
```

Param callback functions are local to the router on which they are defined. They are not inherited by mounted apps or routers, nor are they triggered for route parameters inherited from parent routers. Hence, param callbacks defined on `router` will be triggered only by route parameters defined on `router` routes.

A param callback will be called only once in a request-response cycle, even if the parameter is matched in multiple routes, as shown in the following examples.

```js
router.param('id', (req, res, next, id) => {
  console.log('CALLED ONLY ONCE')
  next()
})

router.get('/user/:id', (req, res, next) => {
  console.log('although this matches')
  next()
})

router.get('/user/:id', (req, res) => {
  console.log('and this matches too')
  res.end()
})
```

On `GET /user/42`, the following is printed:

```
CALLED ONLY ONCE
although this matches
and this matches too
```
