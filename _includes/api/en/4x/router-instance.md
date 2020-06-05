<h3 id='router.instance'>router(req, res, next)</h3>

Once a router instance has been created and all the relevant route handlers have been added
you can use in a few different ways.

```js
const userRouter = express.Router()

userRouter.get('/events', (req, res, next) => {
  const { userId } = req.query
  // return user specific events
})

userRouter.get('/tasks', (req, res, next) => {
  const { userId } = req.query
  // return user specific tasks
})
```

  - Directly pass it to another router's route handler.

```js
app.use('/calendar', userRouter)
```

  - Or you can call pass the `req`, `res`, and `next` arguments to the `Router` instance as a function
  within another router's route handler.
  
```js
app.use('*', (req, res, next) => {
  if (req.query.userId) {
    // if a user id is passed in use the user specific router
    userRouter(req, res, next)
  } else {
    next()
  }
})
```

This allows you to have a more fine-grained control over what the router instance is responsible for, 
while still maintaining a clear separation of concerns between different functionalities. In the example 
above, the logic is split by whether a user ID is specified in the request query params. This allows
for easily separating logic for authenticated users versus visitors.
