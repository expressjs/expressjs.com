<h3 id='app.path'>app.path()</h3>

Returns the canonical path of the app, a string.

~~~js
var app = express()
  , blog = express()
  , blogAdmin = express();

app.use('/blog', blog);
blog.use('/admin', blogAdmin);

console.log(app.path()); // ''
console.log(blog.path()); // '/blog'
console.log(blogAdmin.path()); // '/blog/admin'
~~~

The behavior of this method can become very complicated in complex cases of mounted apps:
it is usually better to use [req.baseUrl](#req.baseUrl) to get the canonical path of the app.
