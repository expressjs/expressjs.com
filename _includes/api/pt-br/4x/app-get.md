<h3 id='app.get'>app.get(name)</h3>

Retorna o valor da configuração `name`, onde `name` é uma das propriedades da
[tabela de configurações da aplicação](#app.settings.table).

~~~js
app.get('title');
// => undefined

app.set('title', 'My Site');
app.get('title');
// => "My Site"
~~~
