Returns the canonical path of the app.

```js
var app = express()
  , blog = express()
  , blogAdmin = express();

app.use('/blog', blog);
blog.use('/admin', blogAdmin);

console.log(app.path()); // ''
console.log(blog.path()); // '/blog'
console.log(blogAdmin.path()); // '/blog/admin'
```

The behavior of this method can become very complicated in complex cases of mounted apps, hence it is recommended to use [req.baseUrl](#req.baseUrl) to get the canonical path of the app.
