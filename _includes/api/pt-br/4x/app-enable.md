<h3 id='app.enable'>app.enable(name)</h3>

Define o Booleano `name` para `true`, onde `name` é uma das propriedades da [tabela de configurações da aplicação](#app.settings.table).
Chamar `app.set('foo', true)` para uma propriedade Booleana é o mesmo que chamar `app.enable('foo')`.

~~~js
app.enable('trust proxy');
app.get('trust proxy');
// => true
~~~
