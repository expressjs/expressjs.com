<h3 id='app.METHOD'>app.METHOD(path, callback [, callback ...])</h3>

Routes an HTTP request, where METHOD is the HTTP method of the request, such as GET,
PUT, POST, and so on, in lowercase. Thus, the actual methods are `app.get()`,
`app.post()`, `app.put()`, and so on.  See [Routing methods](#routing-methods) below for the complete list.

{% include api/en/5x/routing-args.html %}

#### Routing methods

Express supports the following routing methods corresponding to the HTTP methods of the same names:

<table style="border: 0px; background: none">
<tr>
<td style="background: none; border: 0px;" markdown="1">
* `checkout`
* `copy`
* `delete`
* `get`
* `head`
* `lock`
* `merge`
* `mkactivity`
</td>
<td style="background: none; border: 0px;" markdown="1">
* `mkcol`
* `move`
* `m-search`
* `notify`
* `options`
* `patch`
* `post`
</td>
<td style="background: none; border: 0px;" markdown="1">
* `purge`
* `put`
* `report`
* `search`
* `subscribe`
* `trace`
* `unlock`
* `unsubscribe`
</td>
</tr>
</table>

The API documentation has explicit entries only for the most popular HTTP methods `app.get()`,
`app.post()`, `app.put()`, and `app.delete()`.
However, the other methods listed above work in exactly the same way.

To route methods that translate to invalid JavaScript variable names, use the bracket notation. For example, `app['m-search']('/', function ...`.

<div class="doc-box doc-info" markdown="1">
  The `app.get()` function is automatically called for the HTTP `HEAD` method in addition to the `GET`
  method if `app.head()` was not called for the path before `app.get()`.
</div>

The method, `app.all()`, is not derived from any HTTP method and loads middleware at
the specified path for _all_ HTTP request methods.
For more information, see [app.all](#app.all).

For more information on routing, see the [routing guide](/guide/routing.html).
