---
layout: page
title: Основы маршрутизации в Express
menu: starter
lang: ru
description: Learn the fundamentals of routing in Express.js applications, including
  how to define routes, handle HTTP methods, and create route handlers for your web
  server.
---

# Основы маршрутизации

*Маршрутизация* определяет, как приложение отвечает на клиентский запрос к конкретному адресу (конечной точке), которым является URI (или путь), и определенному методу запроса HTTP (GET, POST и т.д.).

Каждый маршрут может иметь одну или несколько функций обработки, которые выполняются при сопоставлении маршрута.

Определение маршрута имеет следующую структуру:
```js
app.METHOD(PATH, HANDLER)
```

Где:

- `app` - это экземпляр `express`.
- `METHOD` - [метод запроса HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
- `PATH` - путь на сервере.
- `HANDLER` - функция, выполняемая при сопоставлении маршрута.

<div class="doc-box doc-notice" markdown="1">
В этом учебнике мы исходим из предположения о том, что экземпляр `express` с именем `app` уже создан, и сервер работает. Если вы не знакомы со способами создания и запуска приложения, обратитесь к разделу [Пример "Hello world"](/{{ page.lang }}/starter/hello-world.html).
</div>

Приведенные ниже элементарные примеры иллюстрируют способ определения простых маршрутов.

Ответ `Hello World!` на домашней странице:

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

Ответ на запрос POST в корневом маршруте (`/`), на домашней странице приложения:

```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

Ответ на запрос PUT, адресованный маршруту `/user`:

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

Ответ на запрос DELETE, адресованный маршруту `/user`:

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

Дополнительная информация о маршрутизации приведена в [руководстве по маршрутизации](/{{ page.lang }}/guide/routing.html).
