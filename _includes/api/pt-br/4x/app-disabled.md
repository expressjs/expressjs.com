<h3 id='app.disabled'>app.disabled(name)</h3>

Retorna `true` se o Booleano `name` está desativado (`false`), onde `name` é uma das
propriedades da [tabela de configurações da aplicação](#app.settings.table).

~~~js
app.disabled('trust proxy');
// => true

app.enable('trust proxy');
app.disabled('trust proxy');
// => false
~~~
