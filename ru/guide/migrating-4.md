---
layout: page
title: Миграция до версии Express 4
menu: guide
lang: ru
---

# Переход к Express 4

<h2 id="overview">Обзор</h2>

Express 4, на самом деле, ломает существующий код Express 3. Это означает, что существующее приложение Express 3 не будет работать, если обновить версию Express в установленных зависимостях данного приложения.

В этой статье содержится следующая информация:

<ul class="doclist">
  <li><a href="#changes">Изменения в Express 4.</a></li>
  <li><a href="#example-migration">Пример</a> миграции приложения Express 3 в Express 4.</li>
  <li><a href="#app-gen">Обновление до версии генератора приложений Express 4.</a></li>
</ul>

<h2 id="changes">Изменения в Express 4</h2>

В Express 4 реализованы следующие существенные изменения:

<ul class="doclist">
  <li><a href="#core-changes">Изменения ядра Express и системы промежуточных обработчиков.</a> Зависимости от Connect и встроенных промежуточных обработчиков были удалены, поэтому вам потребуется установить промежуточные обработчики самостоятельно.
  </li>
  <li><a href="#routing">Изменения в системе маршрутизации.</a></li>
  <li><a href="#other-changes">Прочие изменения.</a></li>
</ul>

См. также:

* [Новые функции в 4.x.](https://github.com/expressjs/express/wiki/New-features-in-4.x)
* [Миграция из 3.x в 4.x.](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Изменения ядра Express и системы промежуточных обработчиков
</h3>

Express 4 больше не является зависимым от Connect, и из его ядра удалены все встроенные промежуточные обработчики,
за исключением функции `express.static`. Это означает, что теперь
Express представляет собой независимый веб-фреймворк маршрутизации и промежуточной обработки, и обновления промежуточных обработчиков никак не влияют на новые версии и выпуски Express.

Без встроенных промежуточных обработчиков вам необходимо явным образом установить все средства промежуточной обработки, необходимые для запуска вашего приложения. Выполните следующие действия:

1. Установите модуль: `npm install --save <module-name>`
2. В своем приложении затребуйте модуль: `require('module-name')`
3. Используйте модуль согласно документации к нему: `app.use( ... )`

В таблице ниже приводится список соответствий между промежуточными обработчиками Express 3 и Express 4.

<table class="doctable" border="1">
<tr><th>Express 3</th><th>Express 4</th></tr>
<tr><td><code>express.bodyParser</code></td>
<td><a href="https://github.com/expressjs/body-parser">body-parser</a> +
<a href="https://github.com/expressjs/multer">multer</a></td></tr>
<tr><td><code>express.compress</code></td>
<td><a href="https://github.com/expressjs/compression">compression</a></td></tr>
<tr><td><code>express.cookieSession</code></td>
<td><a href="https://github.com/expressjs/cookie-session">cookie-session</a></td></tr>
<tr><td><code>express.cookieParser</code></td>
<td><a href="https://github.com/expressjs/cookie-parser">cookie-parser</a></td></tr>
<tr><td><code>express.logger</code></td>
<td><a href="https://github.com/expressjs/morgan">morgan</a></td></tr>
<tr><td><code>express.session</code></td>
<td><a href="https://github.com/expressjs/session">express-session</a></td></tr>
<tr><td><code>express.favicon</code></td>
<td><a href="https://github.com/expressjs/serve-favicon">serve-favicon</a></td></tr>
<tr><td><code>express.responseTime</code></td>
<td><a href="https://github.com/expressjs/response-time">response-time</a></td></tr>
<tr><td><code>express.errorHandler</code></td>
<td><a href="https://github.com/expressjs/errorhandler">errorhandler</a></td></tr>
<tr><td><code>express.methodOverride</code></td>
<td><a href="https://github.com/expressjs/method-override">method-override</a></td></tr>
<tr><td><code>express.timeout</code></td>
<td><a href="https://github.com/expressjs/timeout">connect-timeout</a></td></tr>
<tr><td><code>express.vhost</code></td>
<td><a href="https://github.com/expressjs/vhost">vhost</a></td></tr>
<tr><td><code>express.csrf</code></td>
<td><a href="https://github.com/expressjs/csurf">csurf</a></td></tr>
<tr><td><code>express.directory</code></td>
<td><a href="https://github.com/expressjs/serve-index">serve-index</a></td></tr>
<tr><td><code>express.static</code></td>
<td><a href="https://github.com/expressjs/serve-static">serve-static</a></td></tr>
</table>

Это [полный список](https://github.com/senchalabs/connect#middleware) промежуточных обработчиков Express 4.

В большинстве случаев можно просто заменить промежуточные обработчики старой, 3-й, версии на соответствующие обработчики Express 4. Дополнительную информацию можно найти в документации к модулю в GitHub.

<h4 id="app-use"><code>app.use</code> принимает параметры</h4>

В версии 4 можно использовать параметр переменной для определения пути загрузки функций промежуточной обработки, после чего считать значение параметра из обработчика маршрута.
Например:

<pre>
<code class="language-javascript" translate="no">
app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  next();
});
</code>
</pre>
<h3 id="routing">
Система маршрутизации
</h3>

Теперь промежуточные обработчики маршрутизации загружаются в приложения неявным образом, поэтому вам не нужно обращать внимание на порядок загрузки промежуточных обработчиков `router`.

Способ определения маршрутов остается неизменным, но в системе маршрутизации предусмотрено две новые функции, предназначенные для упорядочения маршрутов:

{: .doclist }
* Новый метод `app.route()` - для создания обработчиков маршрутов, образующих цепочки, для пути маршрута.
* Новый класс `express.Router` - для создания модульных монтируемых обработчиков маршрутов.

<h4 id="app-route">Метод <code>app.route()</code></h4>

Новый метод `app.route()` позволяет создавать обработчики маршрутов, образующие цепочки, для пути маршрута. Поскольку путь указан в одном расположении, удобно создавать модульные маршруты, чтобы минимизировать избыточность и количество опечаток. Дополнительная информация
о маршрутах приводится в документации по [`Router()`](/{{ page.lang }}/4x/api.html#router).

Ниже приведен пример объединенных в цепочку обработчиков маршрутов, определенных с помощью функции `app.route()`.

<pre>
<code class="language-javascript" translate="no">
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
</code>
</pre>

<h4 id="express-router">Класс <code>express.Router</code></h4>

Еще одной функцией, позволяющей упорядочить маршруты, является новый класс `express.Router`, с помощью которого можно создавать модульные монтируемые обработчики маршрутов. Экземпляр `Router` представляет собой комплексную систему промежуточных обработчиков и маршрутизации; по этой причине его часто называют "мини-приложением".

В приведенном ниже примере создается маршрутизатор в виде модуля, в него загружается промежуточный обработчик, определяется несколько маршрутов, и модуль монтируется в путь в главном приложении.

Например, создайте файл маршрутизатора с именем `birds.js` в каталоге приложения со следующим содержанием:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
</code>
</pre>

Потом загрузите модуль маршрутизации в приложение:

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

Данное приложение теперь сможет обрабатывать запросы, адресованные ресурсам в путях `/birds` и
`/birds/about`, и вызывать специальный промежуточный обработчик `timeLog` данного маршрута.

<h3 id="other-changes">
Прочие изменения
</h3>

В приведенной ниже таблице перечислены прочие, не слишком масштабные, но важные изменения, внесенные в версии Express 4:

<table class="doctable" border="1">
<tr>
<th>Объект</th>
<th>Описание</th>
</tr>
<tr>
<td>Node.js</td>
<td>Express 4 требуется Node.js 0.10.x или более поздних версий; поддержка
Node.js 0.8.x приостановлена.</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
Модуль `http` теперь необходим только в случае, если вам требуется работать с ним непосредственно (socket.io/SPDY/HTTPS). Приложение можно запустить с помощью функции `app.listen()`.
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
Функция `app.configure()` удалена.  Для определения среды и соответствующей настройки приложения используйте
`process.env.NODE_ENV` или функцию
`app.get('env')`.
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
Свойство приложения `json spaces` в Express 4 по умолчанию отключено.
</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
Используйте `req.accepts()`, `req.acceptsEncodings()`,
`req.acceptsCharsets()` и `req.acceptsLanguages()`.
</td>
</tr>
<tr>
<td markdown="1">
`res.location()`
</td>
<td markdown="1">
Относительные URL-адреса более не распознаются.
</td>
</tr>
<tr>
<td markdown="1">
`req.params`
</td>
<td markdown="1">
Был массив; теперь объект.
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
Была функция; теперь объект.
</td>
</tr>
<tr>
<td markdown="1">
`res.headerSent`
</td>
<td markdown="1">
Изменен на `res.headersSent`.
</td>
</tr>
<tr>
<td markdown="1">
`app.route`
</td>
<td markdown="1">
Теперь представлен как `app.mountpath`.
</td>
</tr>
<tr>
<td markdown="1">
`res.on('header')`
</td>
<td markdown="1">
Удален.
</td>
</tr>
<tr>
<td markdown="1">
`res.charset`
</td>
<td markdown="1">
Удален.
</td>
</tr>
<tr>
<td markdown="1">
`res.setHeader('Set-Cookie', val)`
</td>
<td markdown="1">
Функциональность ограничена установкой исходного значения cookie. Для использования дополнительных функциональных возможностей применяется
`res.cookie()`.
</td>
</tr>
</table>

<h2 id="example-migration">Пример миграции приложения</h2>

Ниже приводится пример миграции приложения Express 3 в Express 4.
Рассмотрим файлы `app.js` и `package.json`.

<h3 id="">
Приложение версии 3
</h3>

<h4 id=""><code>app.js</code></h4>

Рассмотрим приложение Express v.3, включающее в себя следующий файл `app.js`:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here' }));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code>
</pre>

<h4 id=""><code>package.json</code></h4>

Сопутствующий ему файл `package.json` версии 3, может выглядеть примерно так:

<pre>
<code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.12.0",
    "pug": "*"
  }
}
</code>
</pre>

<h3 id="">
Процесс
</h3>

Процесс миграции начинается с установки обязательных промежуточных обработчиков для приложения Express 4 и обновления Express и Pug до соответствующих последних версий с помощью следующей команды:

```console
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest pug@latest --save
```

Внесите в файл `app.js` следующие изменения:

1. Встроенные функции промежуточной обработки Express `express.favicon`,
    `express.logger`, `express.methodOverride`,
    `express.session`, `express.bodyParser` и
    `express.errorHandler` более не доступны в объекте
    `express`.  Необходимо вручную установить соответствующие им альтернативные объекты и загрузить их в приложение.

2. Функцию `app.router` загружать не нужно.
    Она не является действительным объектом приложения Express 4, поэтому удалите код
    `app.use(app.router);`.

3. Убедитесь в том, что функции промежуточной обработки загружаются в соответствующем порядке, - загрузите `errorHandler` после загрузки маршрутов приложения.

<h3 id="">Приложение версии 4</h3>

<h4 id=""><code>package.json</code></h4>

При запуске указанной выше команды `npm` будет выполнено обновление `package.json` следующим образом:

<pre>
<code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "body-parser": "^1.5.2",
    "errorhandler": "^1.1.1",
    "express": "^4.8.0",
    "express-session": "^1.7.2",
    "pug": "^2.0.0-beta6",
    "method-override": "^2.1.2",
    "morgan": "^1.2.2",
    "multer": "^0.1.3",
    "serve-favicon": "^2.0.1"
  }
}
</code>
</pre>

<h4 id=""><code>app.js</code></h4>

Затем удалите недействительный код, загрузите обязательные промежуточные обработчики и внесите остальные необходимые изменения. Файл `app.js` будет иметь вид:

<pre>
<code class="language-javascript" translate="no">
var http = require('http');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', user.list);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
Если вам не нужно работать непосредственно с модулем `http` (socket.io/SPDY/HTTPS), загружать его не обязательно, а приложение можно просто запустить следующим образом:
<pre>
<code class="language-js" translate="no">app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});</code>
</pre>
</div>

<h3 id="">Запустите приложение</h3>

Процесс миграции завершен, и данное приложение теперь является приложением версии
Express 4. Для подтверждения запустите приложение с помощью следующей команды:

```console
$ node .
```

Загрузите [http://localhost:3000](http://localhost:3000). Будет отображена домашняя страница в Express 4.

<h2 id="app-gen">Обновление до версии генератора приложений Express 4</h2>

Инструмент командной строки для генерации приложений Express остается неизменным -
  `express`, но для обновления его до новой версии необходимо удалить установку
  генератора приложений Express 3, а затем установить новый `express-generator`.

<h3 id="">Установка </h3>

Если в системе уже установлен генератор приложений Express 3, его необходимо удалить:

```console
$ npm uninstall -g express
```

В зависимости от настроек прав доступа к файлам и каталогам, эту команду, возможно, следует вызвать с помощью `sudo`.

Теперь установите новый генератор:

```console
$ npm install -g express-generator
```

В зависимости от настроек прав доступа к файлам и каталогам, эту команду, возможно, следует вызвать с помощью `sudo`.

Итак, команда `express` в вашей системе обновлена до версии генератора
Express 4.

<h3 id="">Изменения генератора приложений </h3>

Опции команд и их использование, в основном, остались без изменений, за исключением следующих:

{: .doclist }
* Удалена опция `--sessions`.
* Удалена опция `--jshtml`.
* Добавлена опция `--hogan` для поддержки [Hogan.js](http://twitter.github.io/hogan.js/).

<h3 id="">Пример</h3>

Выполните следующую команду для создания приложения Express 4:

```console
$ express app4
```

Обратив внимание на содержимое файла `app4/app.js`, вы заметите, что все функции
промежуточной обработки (кроме `express.static`), обязательные для приложения, загружаются
как независимые модули, а промежуточный обработчик `router` больше не загружается в приложение явным образом.

Также вы заметите, что файл `app.js` теперь является модулем Node.js, а не самостоятельным приложением, которое генерировалось старой версией генератора.

После установки зависимостей запустите приложение с помощью следующей команды:

```console
$ npm start
```

Обратив внимание на сценарий запуска npm в файле `package.json`,
вы заметите, что, фактически, командой, запускающей приложение, является
`node ./bin/www`, которой в Express 3 соответствовала команда `node app.js`.

Поскольку файл `app.js`, созданный генератором Express 4, теперь является модулем
Node.js, его уже нельзя запускать отдельно как приложение (если не изменить код). Модуль необходимо загрузить в файл Node.js и запустить через файл Node.js. В данном случае, файлом Node.js является `./bin/www`.

Ни каталог `bin`, ни файл `www` без расширения
не являются обязательными для создания приложения Express или запуска такого приложения. Это всего лишь
рекомендованные генератором значения, которые можно менять в соответствии с вашими потребностями.

Для того чтобы избавиться от каталога `www` и оставить все, "как было в Express 3",
удалите строку `module.exports = app;` в конце файла
`app.js`, а вместо нее вставьте следующий код:

<pre>
<code class="language-javascript" translate="no">
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code>
</pre>

Убедитесь в том, что вы загрузили модуль `debug` в начало файла `app.js` с помощью следующего кода:

<pre>
<code class="language-javascript" translate="no">
var debug = require('debug')('app4');
</code>
</pre>

Далее, замените `"start": "node ./bin/www"` в файле `package.json` на `"start": "node app.js"`.

Итак, функциональность `./bin/www` была перемещена обратно в
`app.js`.  Такое изменение не является рекомендованным, но цель данного упражнения заключалась в том, чтобы помочь вам разобраться в принципах работы файла `./bin/www` и понять, почему файл `app.js` теперь нельзя запускать как самостоятельный.
