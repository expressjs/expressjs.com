<h3 id='app.all'>app.all(path, callback [, callback ...])</h3>

Este método trabalho como o padrão [app.METHOD()](#app.METHOD), exceto que casa com todos os métodos de requisição HTTP.

Isto é útil para inserir uma lógica "global" para qualquer requisição.
Por exemplo, se você colocar o seguinte código antes de todas as outras definições de rota, será exigida para qualquer requisição uma autenticação, e um usuário será carregado automaticamente. 
Tenha em mente que os callbacks não precisam agir como pontos finais da rota: `loadUser`, por exemplo, pode realizar uma tarefa e então chamar `next()` para continuar a sequência de casamento das próximas rotas.


~~~js
app.all('*', requireAuthentication, loadUser);
~~~

Ou equivalente:

~~~js
app.all('*', requireAuthentication)
app.all('*', loadUser);
~~~

Um outro exemplo é a utilização para requisições de funcionalidades globais.
O próximo exemplo funciona como o anterior, porém está restringindo a exigência de autenticação a rotas que iniciem com "/api":

~~~js
app.all('/api/*', requireAuthentication);
~~~
