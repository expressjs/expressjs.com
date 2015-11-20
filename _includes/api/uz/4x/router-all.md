<h3 id='router.all'>router.all(path, [callback, ...] callback)</h3>

This method functions just like the `router.METHOD()` methods, except that it matches all HTTP verbs. 

This method is extremely useful for
mapping "global" logic for specific path prefixes or arbitrary matches.
For example, if you placed the following route at the top of all other
route definitions, it would require that all routes from that point on
would require authentication, and automatically load a user. Keep in mind
that these callbacks do not have to act as end points; `loadUser`
can perform a task, then call `next()` to continue matching subsequent
routes.

~~~js
router.all('*', requireAuthentication, loadUser);
~~~

Or the equivalent:

~~~js
router.all('*', requireAuthentication)
router.all('*', loadUser);
~~~

Another example of this is white-listed "global" functionality. Here
the example is much like before, but it only restricts paths prefixed with
"/api":

~~~js
router.all('/api/*', requireAuthentication);
~~~
