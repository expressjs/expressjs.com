<h3 id='res.render'>res.render(view [, locals] [, callback])</h3>

Renderiza a `view` e envia a string HTML renderizada para o cliente.
Parâmetros opcionais:


- `locals`, um objeto cujas propriedades definem variáveis locais para a view.
- `callback`, uma função callback. Se fornecida, o método retorna tanto um possível erro como a string renderizada, mas não realiza uma resposta automática. Quando um erro ocorre, o método invoca internamente `next(err)`.

<div class="doc-box doc-notice" markdown="1">
A variável local `cache` habilita cacheamento de view. Defina esse parâmetro para `true`,
para cachear a view durante o desenvolvimento; cacheamento de view está habilitado por padrão em modo de produção.
</div>

~~~js
// Envia a view renderizada para o cliente
res.render('index');

// se um callback é especificado, a string HTML renderizada precisa ser enviada explicitamente
res.render('index', function(err, html) {
  res.send(html);
});

// passa uma variável local para a view
res.render('user', { name: 'Tobi' }, function(err, html) {
  // ...
});
~~~
