<h3 id='app.mountpath'>app.mountpath</h3>

A propriedade `app.mountpath` é o caminho padrão no qual uma sub aplicação foi montada.

<div class="doc-box doc-info" markdown="1">
  Uma sub aplicação é uma instância de `express` que pode ser utilizada para manipular a solicitação para uma rota.
</div>

~~~js
var express = require('express');

var app = express(); // a aplicação principal
var admin = express(); // a sub aplicação

admin.get('/', function (req, res) {
  console.log(admin.mountpath); // /admin
  res.send('Admin Homepage');
})

app.use('/admin', admin); // montar a sub aplicação
~~~

É semelhante à propriedade [baseUrl](#req.baseUrl) do objeto `req`, exceto que `req.baseUrl` retorna o caminho de URL correspondente, em vez do padrão correspondente.

Se uma sub aplicação é montada em vários caminhos padrões, `app.mountpath` devolve a lista de padrões que está montado, como mostrado no exemplo a seguir.

~~~js
var admin = express();

admin.get('/', function (req, res) {
  console.log(admin.mountpath); // [ '/adm*n', '/manager' ]
  res.send('Admin Homepage');
})

var secret = express();
secret.get('/', function (req, res) {
  console.log(secret.mountpath); // /secr*t
  res.send('Admin Secret');
});

admin.use('/secr*t', secret); // carrega o roteador 'secret' em '/secr*t', sobre a sub aplicação 'admin'
app.use(['/adm*n', '/manager'], admin); // carrega o roteador 'admin' em '/adm*n' e '/manager', sobre a aplicação pai
~~~
