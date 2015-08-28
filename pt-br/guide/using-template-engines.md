---
layout: page
title: Usando template engines com o Express
menu: guide
lang: pt-br
---

# Usando template engines com o Express

Antes que o Express possa renderizar arquivos de template, as seguintes configurações precisão ser feitas na aplicação.

* `views`, o diretório onde os arquivos de templates estão localizados. Exemplo: `app.set('views', './views')`
* `view engine`, a template engine que será utilizada. Exemplo: `app.set('view engine', 'jade')`

Então instalamos os pacotes npm da templete engine correspondente.

~~~sh
$ npm install jade --save
~~~

<div class="doc-box doc-notice" markdown="1">
Templates engines compatíveis com o Express, como a Jade, exportam uma função assinada como __express(filePath, options, callback) que é chamada por `res.render()` para renderizar o código do template.

Algumas templates engines não seguem esta convenção. A biblioteca [Consolidate.js](https://www.npmjs.org/package/consolidate) foi criada para mapear todas as template engines populares do nodeJS para esta convenção, permitindo que todas funcionem perfeitamente com o Express.
</div>

Uma vez que a view engine estiver definida, você não precisa especificá-la explicitamente nem carregar o módulo da engine no seu app. O Express fará isso internamente como mostrado a seguir.

~~~js
app.set('view engine', 'jade');
~~~

	Crie um arquivo de template jade chamado "index.jade" no diretório views, com o seguinte conteúdo

~~~js
html
  head
    title!= title
  body
    h1!= message
~~~

Crie então uma rota para renderizar o arquivo "index.jade". Se a propriedade `view engine` estiver definida, você pode omitir a extensão do arquivo view, caso contrário a extensão precisará ser especificada.


~~~js
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
~~~

Ao ser feita uma requisição GET para a home page  o arquivo "index.jade" será renderizado como HTML.

Para entender melhor como templates engines trabalham no Express, leia ["Desenvolvendo templates engines para o Express"](/advanced/developing-template-engines.html).
