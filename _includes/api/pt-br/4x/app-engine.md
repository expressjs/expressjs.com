<h3 id='app.engine'>app.engine(ext, callback)</h3>

Registra o motor de template `callback` como `ext`.

Por padrão, Express vai `require()` o motor baseado na extensão do arquivo.
Por exemplo, se você tentar renderizar o arquivo "foo.jade", Express invoca o
seguinte internamente e guarda o `require()` nas chamadas subseqüentes para
aumentar o desempenho.

~~~js
app.engine('jade', require('jade').__express);
~~~

Use este método para motores que não fornecem `.__express` ou se você
deseja mapear uma extensão diferente para o motor de template.

Por examplo, para mapear o motor de template EJS para arquivos ".html":

~~~js
app.engine('html', require('ejs').renderFile);
~~~

Neste caso, EJS fornece um método `.renderFile()` com
a mesma assinatura que o Express espera: `(path, options, callback)`,
embora note que ele chama o método `ejs.__express` internamente por isso,
se você está usando extensões ".ejs" você não precisa fazer nada.

Alguns motores de template não seguem esta convenção. A
biblioteca [consolidate.js](https://github.com/tj/consolidate.js) mapeia
motores de template Node para seguir esta convenção, para que eles funcionem
sem problemas com Express.

~~~js
var engines = require('consolidate');
app.engine('haml', engines.haml);
app.engine('html', engines.hogan);
~~~
