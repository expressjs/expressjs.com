<h3 id='app.METHOD'>app.METHOD(path, callback [, callback ...])</h3>

Faz o roteamento de uma requisição HTTP, onde METHOD é um método de requisição HTTP como GET, PUT, POST e etc, (em letras minúsculas). Assim, os métodos atualmente disponíveis são `app.get()`,
`app.post()`, `app.put()` e etc.

Veja a baixo a lista completa.

Para mais informações, veja [routing guide](/guide/routing.html).

O Express suporta os seguintes métodos de roteamento, correspondentes aos métodos HTTP de mesmo nome:

<table style="border: 0px; background: none">
<tr>
<td style="background: none; border: 0px;" markdown="1">
* `checkout`
* `connect`
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
* `propfind`
* `proppatch`
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

<div class="doc-box doc-info" markdown="1">
  Para rotear métodos com nomes inválidos de variáveis javascript, use a notação de colchetes. Por exemplo, 
   `app['m-search']('/', function ...`.
</div>

Você pode fornecer múltiplas funções callback que se comportam como middlewares, exceto que esses callbacks podem invocar `next('route')` para repassar a rota para callbacks restantes. Você pode usar isto para definir pré condições em uma rota, e então passar o controle para próximas rotas se não há mais razão para continuar na rota atual..

<div class="doc-box doc-info" markdown="1">
  A documentação da API está completamente explicitada somente para os métodos HTTP mais populares: `app.get()`,
  `app.post()`, `app.put()`, and `app.delete()`.
  The API documentation has explicit entries only for the most popular HTTP methods `app.get()`,
  `app.post()`, `app.put()`, and `app.delete()`.
  Porém os outros métodos listados acima trabalham exatamente na mesma forma.
</div>

Existe um método de roteamento especial, `app.all()`, que não corresponde a nenhum método HTTP. Ele carrega middlewares em uma rota, para todos os método de requisição HTTP.

No exemplo a seguir, o `handler` é executado em requsições para "/secret" quando utilizamos GET, POST, PUT, DELETE, ou qualquer outro método de requisição HTTP.

~~~js
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // repassa o controle para o próximo handler
})
~~~
