---
layout: page
title: Маршрутизация в Express
menu: guide
lang: ru
---

# Маршрутизация

*Маршрутизация* определяет, как приложение отвечает на клиентский запрос к конкретному адресу (URI).
Вводную информацию о маршрутизации можно найти в разделе [Основы маршрутизации](/{{ page.lang }}/starter/basic-routing.html).

Приведенный ниже код служит примером одного из самых простых маршрутов.

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
</code>
</pre>

<h2 id="route-methods">Методы Route</h2>

Метод route является производным от одного из методов HTTP и присоединяется к экземпляру класса `express`.

Приведенный ниже код служит примером маршрутов, определенных для методов запросов GET и POST к корневому каталогу приложения.

<pre>
<code class="language-javascript" translate="no">
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
</code>
</pre>

Express поддерживает перечисленные далее методы маршрутизации, соответствующие методам HTTP: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search` и `connect`.

<div class="doc-box doc-info" markdown="1">
Для методов route, преобразуемых в недействительные имена переменных JavaScript, используйте нотацию в квадратных скобках. Например,
`app['m-search']('/', function ...`
</div>

Существует особый метод маршрутизации, `app.all()`, не являющийся производным от какого-либо метода HTTP. Этот метод используется для загрузки функций промежуточной обработки в пути для всех методов запросов.

В приведенном ниже примере обработчик будет запущен для запросов, адресованных "/secret", независимо от того, используется ли GET, POST, PUT, DELETE или какой-либо другой метод запроса HTTP, поддерживаемый в [модуле http](https://nodejs.org/api/http.html#http_http_methods).

<pre>
<code class="language-javascript" translate="no">
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
</code>
</pre>

<h2 id="route-paths">Пути маршрутов</h2>

Пути маршрутов, в сочетании с методом запроса, определяют конкретные адреса (конечные точки), в которых могут быть созданы запросы. Пути маршрутов могут представлять собой строки, шаблоны строк или регулярные выражения.

<div class="doc-box doc-info" markdown="1">
  В Express для сопоставления путей маршрутов используется [path-to-regexp](https://www.npmjs.com/package/path-to-regexp); в документации к path-to-regexp описаны все возможные варианты определения путей маршрутов. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) - удобный инструмент для тестирования простых маршрутов в Express, хотя и не поддерживает сопоставление шаблонов.
</div>

<div class="doc-box doc-warn" markdown="1">
Строки запросов не являются частью пути маршрута.
</div>

Ниже приводятся примеры путей маршрутов на основе строк.

Данный путь маршрута сопоставляет запросы с корневым маршрутом, `/`.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('root');
});
</code>
</pre>

Данный путь маршрута сопоставляет запросы с `/about`.

<pre>
<code class="language-javascript" translate="no">
app.get('/about', function (req, res) {
  res.send('about');
});
</code>
</pre>

Данный путь маршрута сопоставляет запросы с `/random.text`.

<pre>
<code class="language-javascript" translate="no">
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
</code>
</pre>

Ниже приводятся примеры путей маршрутов на основе шаблонов строк.

Приведенный ниже путь маршрута сопоставляет `acd` и `abcd`.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
</code>
</pre>

Этот путь маршрута сопоставляет `abcd`, `abbcd`, `abbbcd` и т.д.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});
</code>
</pre>

Этот путь маршрута сопоставляет `abcd`, `abxcd`, `abRABDOMcd`, `ab123cd` и т.д.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});
</code>
</pre>

Данный путь маршрута сопоставляет `/abe` и `/abcde`.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
Символы ?, +, * и () представляют собой подмножества соответствующих им регулярных выражений. Дефис (-) и точка (.) интерпретируются буквально в путях на основе строк.
</div>

Примеры путей маршрутов на основе регулярных выражений:

Данный путь маршрута сопоставляет любой элемент с "a" в имени маршрута.

<pre>
<code class="language-javascript" translate="no">
app.get(/a/, function(req, res) {
  res.send('/a/');
});
</code>
</pre>

Данный маршрут сопоставляет `butterfly` и `dragonfly`, но не `butterflyman`, `dragonfly man` и т.д.

<pre>
<code class="language-javascript" translate="no">
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
</code>
</pre>

<h2 id="route-handlers">Обработчики маршрутов</h2>

Для обработки запроса можно указать несколько функций обратного вызова, подобных [middleware](/{{ page.lang }}/guide/using-middleware.html). Единственным исключением является то, что эти обратные вызовы могут инициировать `next('route')` для обхода остальных обратных вызовов маршрута. С помощью этого механизма можно включить в маршрут предварительные условия, а затем передать управление последующим маршрутам, если продолжать работу с текущим маршрутом не нужно.

Обработчики маршрутов могут принимать форму функции, массива функций или их сочетания, как показано в примерах ниже.

Одна функция обратного вызова может обрабатывать один маршрут.  Например:

<pre>
<code class="language-javascript" translate="no">
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
</code>
</pre>

Один маршрут может обрабатываться несколькими функциями обратного вызова (обязательно укажите объект `next`). Например:

<pre>
<code class="language-javascript" translate="no">
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
</code>
</pre>

Массив функций обратного вызова может обрабатывать один маршрут.  Например:

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
</code>
</pre>

Маршрут может обрабатываться сочетанием независимых функций и массивов функций.  Например:

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
</code>
</pre>

<h2 id="response-methods">Методы ответа</h2>

Методы в объекте ответа (`res`), перечисленные в таблице ниже, могут передавать ответ клиенту и завершать цикл "запрос-ответ". Если ни один из этих методов не будет вызван из обработчика маршрута, клиентский запрос зависнет.

| Метод               | Описание
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)   | Приглашение загрузки файла.
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)        | Завершение процесса ответа.
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)       | Отправка ответа JSON.
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)      | Отправка ответа JSON с поддержкой JSONP.
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)   | Перенаправление ответа.
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)     | Вывод шаблона представления.
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)       | Отправка ответа различных типов.
| [res.sendFile](/{{ page.lang }}/4x/api.html#res.sendFile)     | Отправка файла в виде потока октетов.
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | Установка кода состояния ответа и отправка представления в виде строки в качестве тела ответа.

<h2 id="app-route">app.route()</h2>

Метод `app.route()` позволяет создавать обработчики маршрутов, образующие цепочки, для пути маршрута.
Поскольку путь указан в одном расположении, удобно создавать модульные маршруты, чтобы минимизировать избыточность и количество опечаток. Дополнительная информация о маршрутах приводится в документации [Router()](/{{ page.lang }}/4x/api.html#router).

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

<h2 id="express-router">express.Router</h2>

С помощью класса `express.Router` можно создавать модульные, монтируемые обработчики маршрутов. Экземпляр `Router` представляет собой комплексную систему промежуточных обработчиков и маршрутизации; по этой причине его часто называют "мини-приложением".

В приведенном ниже примере создается маршрутизатор в виде модуля, в него загружается функция промежуточной обработки, определяется несколько маршрутов, и модуль маршрутизатора монтируется в путь в основном приложении.

Создайте файл маршрутизатора с именем `birds.js` в каталоге приложения со следующим содержанием:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
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

Данное приложение теперь сможет обрабатывать запросы, адресованные ресурсам `/birds` и
`/birds/about`, а также вызывать специальную функцию промежуточной обработки `timeLog` данного маршрута.
