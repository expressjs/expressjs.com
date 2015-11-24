<h3 id='app.render'>app.render(view, [locals], callback)</h3>

Retorna o HTML renderizado de uma view pela função `callback`. Este método aceita um parâmetro opcional que é um objeto contendo variáveis locais para a view. Funciona como o [res.render()](#res.render), com a exceção de que não pode enviar a view renderizada para o cliente por conta própria.

<div class="doc-box doc-info" markdown="1">
Pense em `app.render()` como uma função utilitária para gerar strings contendo a view renderizada.

Internamente `res.render()` utiliza `app.render()` para renderizar views.
</div>

<div class="doc-box doc-notice" markdown="1">
A variável local `cache` é reservada, pois é utilizada para cache de views. Defina essa variável como `true`, se você quer utilizar cache de views durante o desenvolvimento; cacheamento de views está por padrão habilitado em modo de produção.

</div>

~~~js
app.render('email', function(err, html){
  // ...
});

app.render('email', { name: 'Tobi' }, function(err, html){
  // ...
});
~~~
