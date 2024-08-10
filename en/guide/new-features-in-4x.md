# New features in 4.x

See [Express 4.x docs](http://expressjs.com/4x/api.html) for more examples and complete API documentation. You may also be interested in \[Migrating from 3.x to 4.x\](Migrating from 3.x to 4.x).

## removed bundled middleware

None of the middleware from connect is bundled with express (or exposed on the `express` module). Any middleware you want to use should be installed and listed in your apps package.json. This allows for feature fixes and faster updates to middleware without affecting express core.

See [middleware modules](https://github.com/senchalabs/connect#middleware) for a list of modules for old connect middleware.

## Router improvements

express now exposes a better `Router` and route API to curb many instances of duplicating route naming and make it easier to split Routers into files for project organization.

### no more app.use(app.router)

All routing methods will be added in the order in which they appear. You should **not** do `app.use(app.router)`. This eliminates the most common issue with Express.

In other words, mixing `app.use()` and `app[VERB]()` will work **exactly** in the order in which they are called.

```js
app.get("/", home);
app.use("/public", require("st")(process.cwd()));
app.get("/users", users.list);
app.post("/users", users.create);
```

### app.route(path)

Instead of using the `app.get()`, `app.post()`, etc... verbs directly (which are still supported), a new `route()` method, which returns an instance of a `Route`, can be used. You can then call all of the HTTP verbs on this instance and even add middleware specific to this route.

```js
app
  .route("/users")
  .get(function (req, res, next) {})
  .post(function (req, res, next) {});
```

`route()` takes a `path` argument which is the same argument you pass to `.get()` or `.post()` when creating a route.

Additionally, the returned route has an `.all()` method which is helpful if you want to add middleware to the route or handle all VERBS.

### Router

Another addition is the public API for express `Router`s. A Router is like a mini express app. It contains no views or settings but does provide the typical routing APIs (`.use`, `.get`, `.param`, `.route`).

Apps and Routers can also `.use()` other routers allowing you to create files that export a router to organize your apps better.

Imagine an example `routes/people.js` in your project.

```js
var people = express.Router();

people.use(function (req, res, next) {});

people.get("/", function (req, res, next) {});

module.exports.people = people;
```

You can mount it under the `/people` path so that any request to `/people/*` will route to the people router.

```js
app.use("/people", require("./routes/people").people);
```

See the [Router docs](http://expressjs.com/4x/api.html#router) for more examples.
