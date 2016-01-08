<h3 id='app.enabled'>app.enabled(name)</h3>

Retorna `true` se a configuração `name` está ativada (`true`), onde `name` é uma das
propriedades da [tabela de configurações da aplicação](#app.settings.table).

~~~js
app.enabled('trust proxy');
// => false

app.enable('trust proxy');
app.enabled('trust proxy');
// => true
~~~
