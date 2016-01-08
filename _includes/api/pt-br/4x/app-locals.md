<h3 id='app.locals'>app.locals</h3>

`app.locals` é um objeto JavaScript, e suas propriedades são variáveis locais dentro da aplicação.

~~~js
app.locals.title
// => 'My App'

app.locals.email
// => 'me@myapp.com'
~~~

Quando é definido um valor para uma propriedade de `app.locals`, este valor persiste por toda a vida da aplicação; ao contrário de propriedades definidas com [res.locals](#res.locals) que são válidas somente durante a tempo de vida da requisição.

Você pode acessar variáveis locais em renderização de templates dentro da aplicação.
Isto é muito útil para criar funções de ajuda `helper` para templates, bem como dados a nível de app. Variáveis locais estão disponíveis em middlewares via `req.app.locals` (Veja [req.app](#req.app)).


~~~js
app.locals.title = 'My App';
app.locals.strftime = require('strftime');
app.locals.email = 'me@myapp.com';
~~~
