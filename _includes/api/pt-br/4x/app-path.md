<h3 id='app.path'>app.path()</h3>

Retorna o caminho canônico da aplicação, uma string.

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

O comportamento desse método pode se tornar muito complicado em casos complexos de aplicações montadas:
geralmente é melhor usar [req.baseUrl](#req.baseUrl) para obter o caminho canônico da aplicação.
