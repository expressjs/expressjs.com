<h3 id='app.listen'>app.listen(port, [hostname], [backlog], [callback])</h3>

"Escuta" conexões em um `host` e porta específicos.
Este método é idêntico ao método [http.Server.listen()](http://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback) do Node.


~~~js
var express = require('express');
var app = express();
app.listen(3000);
~~~

A `app` retornada por `express()` é na verdade uma função JavaScript, para ser passada aos servidores HTTP do Node como um função callback para tratar requisições. Isto facilita disponibilizar ambas as versões HTTP e HTTPS das suas aplicações com o mesmo código de base, já que a app não herda deles (É simplesmente um callback).


~~~js
var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
~~~

O método `app.listen()` é conveniente para o seguinte (somente para HTTP):

~~~js
app.listen = function() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
~~~
