<h3 id='app.disable'>app.disable(name)</h3>

Define o Booleano `name` para `false`, onde `name` é uma das propriedades da [tabela de configurações da aplicação](#app.settings.table).
Chamar `app.set('foo', false)` para uma propriedade Booleana é o mesmo que chamar `app.disable('foo')`.

Por exemplo:

~~~js
app.disable('trust proxy');
app.get('trust proxy');
// => false
~~~
