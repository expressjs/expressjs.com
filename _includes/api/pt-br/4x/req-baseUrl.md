<h3 id='req.baseUrl'>req.baseUrl</h3>

A URL do caminho em que a instância do roteador foi montado.
Por exemplo:
~~~js
var greet = express.Router();

greet.get('/jp', function (req, res) {
  console.log(req.baseUrl); // /greet
  res.send('Konichiwa!');
});

app.use('/greet', greet); // Carrega o roteador em '/greet'
~~~

Mesmo se você usar um padrão de caminho ou conjunto de padrões para para
carregar o roteador, a propriedade `baseUrl` retorna a string coincidente, não
os padrões. No seguinte exemplo, o roteador `greet` é carregador em dois
padrões de caminho.

~~~js
app.use(['/gre+t', '/hel{2}o'], greet); // Carrega o roteador em '/gre+t' e '/hel{2}o'
~~~

Quando uma requisição é feita para `/greet/jp`, `req.baseUrl` é "/greet".
Quando uma requisição é feita a `/hello/jp`, `req.baseUrl` é "/hello".

`req.baseUrl` é similar a propriedade [mountpath](#app.mountpath) do objeto
`app`, exceto `app.mountpath` retorna padrões de caminho coincidente(s).
