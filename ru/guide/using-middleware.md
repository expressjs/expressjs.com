---
layout: page
title: Использование промежуточных обработчиков Express
menu: guide
lang: ru
---

# Использование промежуточных обработчиков

Express - это веб-фреймворк маршрутизации и промежуточной обработки с минимальной собственной функциональностью: приложение Express, по сути, представляет собой серию вызовов функций промежуточной обработки.

Функции *промежуточной обработки* (middleware) - это функции, имеющие доступ к [объекту запроса](/{{ page.lang }}/4x/api.html#req)  (`req`), [объекту ответа](/{{ page.lang }}/4x/api.html#res) (`res`) и к следующей функции промежуточной обработки в цикле "запрос-ответ" приложения. Следующая функция промежуточной обработки, как правило, обозначается переменной `next`.

Функции промежуточной обработки могут выполнять следующие задачи:

* Выполнение любого кода.
* Внесение изменений в объекты запросов и ответов.
* Завершение цикла "запрос-ответ".
* Вызов следующей функции промежуточной обработки из стека.

Если текущая функция промежуточной обработки не завершает цикл "запрос-ответ", она должна вызвать `next()` для передачи управления следующей функции промежуточной обработки. В противном случае запрос зависнет.

Приложение Express может использовать следующие типы промежуточных обработчиков:

 - [Промежуточный обработчик уровня приложения](#middleware.application)
 - [Промежуточный обработчик уровня маршрутизатора](#middleware.router)
 - [Промежуточный обработчик для обработки ошибок](#middleware.error-handling)
 - [Встроенные промежуточные обработчики](#middleware.built-in)
 - [Промежуточные обработчики сторонних поставщиков ПО](#middleware.third-party)

Промежуточные обработчики уровня приложения и уровня маршрутизатора можно загружать с помощью необязательного пути для монтирования.
Также можно загрузить последовательность функций промежуточной обработки одновременно, в результате чего создается вспомогательный стек системы промежуточных обработчиков в точке монтирования.

<h2 id='middleware.application'>Промежуточный обработчик уровня приложения</h2>

Свяжите промежуточный обработчик уровня приложения с экземпляром [объекта приложения](/{{ page.lang }}/4x/api.html#app), воспользовавшись функциями `app.use()` и `app.METHOD()`, где `METHOD` - метод HTTP запроса, обрабатываемый функцией промежуточной обработки (например, GET, PUT или POST) в нижнем регистре.

В данном примере представлена функция промежуточной обработки без пути монтирования. Эта функция выполняется при каждом получении запроса приложением.

<pre>
<code class="language-javascript" translate="no">
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
</code>
</pre>

В данном примере представлена функция промежуточной обработки, монтируемая в путь `/user/:id`. Эта функция выполняется для всех типов запросов
HTTP в пути `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

В данном примере представлен маршрут и функция его обработки (система промежуточных обработчиков). Эта функция обрабатывает запросы GET, адресованные ресурсам в пути `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
</code>
</pre>

Ниже приводится пример загрузки последовательности функций промежуточной обработки в точку монтирования, с указанием пути монтирования.
Этот пример иллюстрирует создание вспомогательного стека промежуточных обработчиков, с выводом информации о запросе для всех типов запросов HTTP, адресованных ресурсам в пути `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

Обработчики маршрутов позволяют определить несколько маршрутов для одного пути. В приведенном ниже примере определено два маршрута для запросов GET, адресованных ресурсам в пути `/user/:id`. Второй маршрут не создает никаких неудобств, но его вызов никогда не будет выполнен, поскольку первый маршрут завершает цикл "запрос-ответ".

В данном примере представлен вспомогательный стек промежуточных обработчиков для обработки запросов GET, адресованных ресурсам в пути `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
</code>
</pre>

Для того чтобы пропустить остальные функции дополнительной обработки в стеке промежуточных обработчиков маршрутизатора, вызовите `next('route')` для передачи управления следующему маршруту.
**ПРИМЕЧАНИЕ**: `next('route')` работает только в функциях промежуточной обработки, загруженных с помощью функций `app.METHOD()` или `router.METHOD()`.

В данном примере представлен вспомогательный стек промежуточных обработчиков для обработки запросов GET, адресованных ресурсам в пути `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
</code>
</pre>

<h2 id='middleware.router'>Промежуточный обработчик уровня маршрутизатора</h2>

Промежуточный обработчик уровня маршрутизатора работает так же, как и промежуточный обработчик уровня приложения, но он привязан к экземпляру `express.Router()`.

<pre>
<code class="language-javascript" translate="no">
var router = express.Router();
</code>
</pre>
Загрузите промежуточный обработчик уровня маршрутизатора с помощью функций `router.use()` и `router.METHOD()`.

В приведенном ниже примере с помощью промежуточного обработчика уровня маршрутизатора создается копия системы промежуточных обработчиков, представленной выше для обработчиков уровня приложения:

<pre>
<code class="language-javascript" translate="no">
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
</code>
</pre>

<h2 id='middleware.error-handling'>Промежуточный обработчик для обработки ошибок</h2>

<div class="doc-box doc-notice" markdown="1">
Промежуточный обработчик ошибок всегда содержит *четыре* аргумента.  Для определения данной функции как обработчика ошибок необходимо указать четыре аргумента. Даже если вам не нужно использовать объект `next`, необходимо указать его, чтобы сохранить сигнатуру. В противном случае, объект `next` будет интерпретирован как обычный промежуточный обработчик, который не будет обрабатывать ошибки.
</div>

Определите функции промежуточного обработчика для обработки ошибок так же, как другие функции промежуточной обработки, но с указанием не трех, а четырех аргументов в сигнатуре `(err, req, res, next)`):

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Подробная информация о промежуточном обработчике ошибок приведена в разделе [Обработка ошибок](/{{ page.lang }}/guide/error-handling.html).

<h2 id='middleware.built-in'>Встроенные промежуточные обработчики</h2>

Начиная с версии 4.x, Express не является зависимым от [Connect](https://github.com/senchalabs/connect). За исключением `express.static`, все функции промежуточной обработки, ранее включенные в Express, находятся в отдельных модулях. Ознакомьтесь со [списком функций промежуточной обработки](https://github.com/senchalabs/connect#middleware).

<h4 id='express.static'>express.static(root, [options])</h4>

Единственной встроенной функцией промежуточной обработки в Express является `express.static`. Эта функция основана на [serve-static](https://github.com/expressjs/serve-static) и отвечает за предоставление статических ресурсов приложения Express.

Аргумент `root` указывает на корневой каталог, из которого предоставляются статические ресурсы.

Необязательный объект `options` может содержать следующие свойства:

| Свойство      | Описание                                                           |   Тип      | По умолчанию         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | Опция для предоставления файлов с точкой. Возможные значения - "allow", "deny", "ignore" | Строка | "ignore" |
| `etag`        | Включение или отключение генерации etag  | Булевский | `true` |
| `extensions`  | Установка альтернативных вариантов расширений файлов. | Массив | `[]` |
| `index`       | Отправка файла индекса каталога. Установите значение `false`, чтобы отключить индексацию каталога. | Смешанный | "index.html" |
 `lastModified` | Установка в заголовке `Last-Modified` даты последнего изменения файла в ОС. Возможные значения: `true` или `false`. | Булевский | `true` |
| `maxAge`      | Установка значения свойства max-age в заголовке Cache-Control, в миллисекундах, или в виде строки в [формате ms](https://www.npmjs.org/package/ms) | Число | 0 |
| `redirect`    | Перенаправление к заключительному символу "/", если имя пути - это каталог. | Булевский | `true` |
| `setHeaders`  | Функция для установки заголовков HTTP, предоставляемых с файлом. | Функция |  |

Ниже приводится пример использования функции промежуточной обработки `express.static` с объектом дополнительных опций:

<pre>
<code class="language-javascript" translate="no">
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
</code>
</pre>

Для каждого приложения допускается наличие нескольких статических каталогов:

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
</code>
</pre>

Дополнительную информацию о функции `serve-static` и ее опциях можно найти в документации по [serve-static](https://github.com/expressjs/serve-static).

<h2 id='middleware.third-party'>Промежуточные обработчики сторонних поставщиков ПО</h2>

Для расширения функциональности приложений Express используются промежуточные обработчики сторонних поставщиков ПО.

Установите модуль Node.js для соответствующей функциональной возможности, затем загрузите его в приложение на уровне приложения или на уровне маршрутизатора.

В приведенном ниже примере показана установка и загрузка функции промежуточной обработки для синтаксического анализа cookie `cookie-parser`.

```console
$ npm install cookie-parser
```

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
</code>
</pre>

Список функций промежуточных обработчиков, предоставляемых сторонними поставщиками ПО и часто используемых в Express, приведен в разделе  [Промежуточные обработчики сторонних поставщиков ПО](../resources/middleware.html).
