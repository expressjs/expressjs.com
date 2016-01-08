<h3 id='req.path'>req.path</h3>

Contains the path part of the request URL.

~~~js
// example.com/users?sort=desc
req.path
// => "/users"
~~~

<div class="doc-box doc-info" markdown="1">
The mount point is not included in `req.path`, when called from a middleware.
</div>
