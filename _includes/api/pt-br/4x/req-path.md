<h3 id='req.path'>req.path</h3>

Contém a parte "path" da URL de requisição.

~~~js
// example.com/users?sort=desc
req.path
// => "/users"
~~~

<div class="doc-box doc-info" markdown="1">
Quando chamado de um middleware, o ponto de montagem não é incluído no `req.path`. Veja [app.use()](/4x/api.html#app.use) para mais detalhes.
</div>
