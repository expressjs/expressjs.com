---
layout: page
title: Обработка ошибок в Express
menu: guide
lang: ru
---

# Обработка ошибок

Функции промежуточного обработчика для обработки ошибок определяются так же, как и другие функции промежуточной обработки, но с указанием для функции обработки ошибок не трех, а четырех аргументов: `(err, req, res, next)`. Например:

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Промежуточный обработчик для обработки ошибок должен быть определен последним, после указания всех `app.use()` и вызовов маршрутов; например:

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
</code>
</pre>

Ответы, поступающие из функции промежуточной обработки, могут иметь любой формат, в зависимости от ваших предпочтений. Например, это может быть страница сообщения об ошибке HTML, простое сообщение или строка JSON.

В целях упорядочения (и для фреймворков более высокого уровня) можно определить несколько функций промежуточной обработки ошибок, точно так же, как это допускается для обычных функций промежуточной обработки. Например, для того чтобы определить обработчик ошибок для запросов, совершаемых с помощью `XHR`, и для остальных запросов, можно воспользоваться следующими командами:

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
</code>
</pre>

В данном примере базовый код `logErrors` может записывать информацию о запросах и ошибках в `stderr`, например:

<pre>
<code class="language-javascript" translate="no">
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
</code>
</pre>

Кроме того, в данном примере `clientErrorHandler` определен, как указано ниже; в таком случае ошибка явным образом передается далее следующему обработчику:

<pre>
<code class="language-javascript" translate="no">
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
</code>
</pre>

"Обобщающая" функция `errorHandler` может быть реализована так:

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>

При передаче какого-либо объекта в функцию `next()` (кроме строки `'route'`), Express интерпретирует текущий запрос как ошибку и пропустит все остальные функции маршрутизации и промежуточной обработки, не являющиеся функциями обработки ошибок. Для того чтобы обработать данную ошибку определенным образом, необходимо создать маршрут обработки ошибок, как описано в следующем разделе.

Если задан обработчик ошибок с несколькими функциями обратного вызова, можно воспользоваться параметром `route`, чтобы перейти к следующему обработчику маршрута.  Например:

<pre>
<code class="language-javascript" translate="no">
app.get('/a_route_behind_paywall',
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) {

      // continue handling this request
      next('route');
    }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });
</code>
</pre>

В данном примере обработчик `getPaidContent` будет пропущен, но выполнение всех остальных обработчиков в `app` для  `/a_route_behind_paywall` будет продолжено.

<div class="doc-box doc-info" markdown="1">
Вызовы `next()` и `next(err)` указывают на завершение выполнения текущего обработчика и на его состояние.  `next(err)` пропускает все остальные обработчики в цепочке, кроме заданных для обработки ошибок, как описано выше.
</div>

## Стандартный обработчик ошибок

В Express предусмотрен встроенный обработчик ошибок, который обрабатывает любые возможные ошибки, встречающиеся в приложении. Этот стандартный обработчик ошибок добавляется в конец стека функций промежуточной обработки.

В случае передачи ошибки в `next()` без обработки с помощью обработчика ошибок, такая ошибка будет обработана встроенным обработчиком ошибок. Ошибка будет записана на клиенте с помощью трассировки стека. Трассировка стека не включена в рабочую среду.

<div class="doc-box doc-info" markdown="1">
Для запуска приложения в рабочем режиме необходимо задать для переменной среды `NODE_ENV` значение `production`.
</div>

При вызове `next()` с ошибкой после начала записи ответа
(например, если ошибка обнаружена во время включения ответа в поток, направляемый клиенту), стандартный обработчик ошибок Express закрывает соединение и отклоняет запрос.

Поэтому при добавлении нестандартного обработчика ошибок вам потребуется делегирование в стандартные
механизмы обработки ошибок в Express в случае, если заголовки уже были отправлены клиенту:

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>
