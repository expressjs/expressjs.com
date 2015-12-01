---
layout: page
title: Express базовое обучение маршрутизации
menu: starter
lang: ru
---

# Базовое обучение маршрутизации

Этот материал дает базовое представление о работе маршрутизации в Express. Маршрутизация определяет, как приложение отвечет на клиенский запрос
к конкретному адресу (endpoint), которым является URI (или путь), и определеному методу HTTP запроса (GET, POST, и т.д.).

Каждый маршрут (route) имеет одну или более функций обработки, которые выполняются, когда маршрут сопоставится.

Определение маршрута имеет следующую структуру `app.METHOD(PATH, HANDLER)`, где `app` это экземпляр `express`, `METHOD` это [метод запроса HTTP](http://ru.wikipedia.org/wiki/Hypertext_Transfer_Protocol), `PATH` это адрес на сайте, и `HANDLER` это функция, выполняемая когда маршрут будет сопоставлен.

<div class="doc-box doc-notice" markdown="1">
Этот руководство подразумевает, что экземпляр `express`, названый `app`, создан, и сервер запущен. Если вы не знакомы с созданием и запуском приложения, ознакомтесь с [примером Hello world](/ru/starter/hello-world.html).
</div>

Следующий код демонстрирует некоторые примеры маршрутов в приложении.

<pre><code class="language-javascript" translate="no">
// ответ с "Hello World!" на главной странице
app.get('/', function (req, res) {
  res.send('Hello World!');
})

// получение POST-запроса на главную страницу
app.post('/', function (req, res) {
  res.send('Got a POST request');
})

// получение PUT-запроса по адресу /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
})

// получение DELETE-запроса по адресу /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
})
</code></pre>

Чтобы больше узнать про маршрутизацию, ознакомтесь с руководством [Маршрутизация](/ru/guide/routing.html).
