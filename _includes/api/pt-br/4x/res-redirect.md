<h3 id='res.redirect'>res.redirect([status,] path)</h3>

Redireciona para a URL especificada em `path` com o [HTTP status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) especificado em `status`. Se `status` é omitido o código padrão "302 Found" é aplicado.

~~~js
res.redirect('/foo/bar');
res.redirect('http://example.com');
res.redirect(301, 'http://example.com');
res.redirect('../login');
~~~

Os redirecionamentos pode feitos para um site diferente, por uma URL completa:


~~~js
res.redirect('http://google.com');
~~~

Ou podem ser relativos ao host name root. Por exemplo, se a aplicação está rodando em `http://example.com/admin/post/new`, o código a seguir irá redirecionar para a URL `http://example.com/admin`:

~~~js
res.redirect('/admin');
~~~

Ou podem ser relativos à URL atual. Por exemplo, a partir de `http://example.com/blog/admin/` (observe a barra final "/") o código a seguir redirecionará para a URL `http://example.com/blog/admin/post/new`.

~~~js
res.redirect('post/new');
~~~

Redirecionando para `post/new` a partir de `http://example.com/blog/admin` (sem barra final), iremos redirecionar para `http://example.com/blog/post/new`.

Se você acha o comportamento acima confuso, pensar em seguimentos de path como diretórios (com barras finais) e arquivos, começará a fazer sentido.

Redirecionamento para path relativas também são possíveis. Se você está em `http://example.com/admin/post/new`, o código seguinte irá redirecionar para `http//example.com/admin/post`:


~~~js
res.redirect('..');
~~~

Um redirecionamento para `back` redireciona a requisição para [referer](http://en.wikipedia.org/wiki/HTTP_referer), padronizando para `/` quando referer é omitido.

~~~js
res.redirect('back');    
~~~
