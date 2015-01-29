Routes an HTTP request, where METHOD is the HTTP method of the request, such as GET,
PUT, POST, and so on, in lowercase. Thus, the actual methods are `app.get()`,
`app.post()`, `app.put()`, and so on.  See below for the complete list.

For more information, see the [routing guide](/guide/routing.html).

Express supports the following routing methods corresponding to the HTTP methods of the same names:

<table style="border: 0px; background: none; width: 600px;">
<tr>
<td style="background: none; border: 0px;">
<ul>
<li>`checkout`</li>
<li> `connect`</li>
<li> `copy`</li>
<li> `delete`</li>
<li> `get` </li>
<li> `head`</li>
<li> `lock`</li>
<li> `merge`</li>
<li> `mkactivity`</li>
</ul>
</td>
<td style="background: none; border: 0px;">
<ul>
<li> `mkcol`</li>
<li> `move`</li>
<li> `m-search`</li>
<li> `notify`</li>
<li> `options`</li>
<li> `patch`</li>
<li> `post`</li>
<li> `propfind`</li>
<li> `proppatch`</li>
</ul>
</td>
<td style="background: none; border: 0px;">
<ul>
<li> `purge`</li>
<li> `put`</li>
<li> `report`</li>
<li> `search`</li>
<li> `subscribe`</li>
<li> `trace`</li>
<li> `unlock`</li>
<li> `unsubscribe`</li>
</ul>
</td>
</tr>
</table>

<div class="doc-box doc-info">
  To route methods which translate to invalid JavaScript variable names, use the bracket notation. For example, 
  `app['m-search']('/', function ...`.
</div>

You can provide multiple callback functions that behave just like middleware, except
that these callbacks can invoke `next('route')` to bypass
the remaining route callback(s). You can use this mechanism to impose pre-conditions
on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.

<div class="doc-box doc-info">
  The API documentation has explicit entries only for the most popular HTTP methods `app.get()`,
  `app.post()`, `app.put()`, and `app.delete()`.
  However, the other methods listed above work in exactly the same way.
</div>

There is a special routing method, `app.all()`, that is not derived from any HTTP method.
It loads middleware at a path for all request methods.

In the following example, the handler is executed for requests to "/secret" whether using
GET, POST, PUT, DELETE, or any other HTTP request method.

```js
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```
