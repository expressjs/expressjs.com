<h3 id='router.all'>router.all(path, [callback, ...] callback)</h3>

Este método funciona como os métodos `router.METHOD()` exceto que casam com todos os verbos HTTP.

É extremamente útil para mapear lógicas "globais" para casar paths prefixadas ou arbitrárias.

Por exemplo, se você inserir a seguinte rota no topo de todas as outras definições de rota, isto forçar que qualquer rota exiga autenticação de usuário e automaticamente carregue seus dados. Tendo em mente que esses callbacks não precisam atuar como `end points`; `loadUser` pode realizar uma tarefa, então chamar `next()` para continuar casando as rotas seguintes.

~~~js
router.all('*', requireAuthentication, loadUser);
~~~

Ou o equivalente:

~~~js
router.all('*', requireAuthentication)
router.all('*', loadUser);
~~~

Outro exemplo de uso disto é para criar uma funcionalidade global de "lista branca". O próximo exemplo é parecido com o anterior, mas ele está restrito a paths prefixadas com "/api":

~~~js
router.all('/api/*', requireAuthentication);
~~~
