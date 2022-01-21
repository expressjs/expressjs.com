---
layout: page
title: Пример "Hello World" в Express
menu: starter
lang: ru
---

# Пример "Hello world"

<div class="doc-box doc-info" markdown="1">
Ниже приведен пример самого простого приложения, которое можно создать с помощью Express. Оно состоит из одного файла, *в отличие* от приложений, генерируемых с помощью [генератора приложений Express](/{{ page.lang }}/starter/generator.html), который обеспечивает создание основы для полноценного приложения с многочисленными файлами на JavaScript, шаблонами Jade и вложенными каталогами различного предназначения.
</div>

Вначале создайте каталог с именем `myapp`, перейдите в него и запустите команду `npm init`. Затем установите `express` как зависимость, следуя указаниям, приведенным в [руководстве по установке](/{{ page.lang }}/starter/installing.html).

В каталоге `myapp` создайте файл с именем `app.js` и добавьте следующий код:

<pre>
<code class="language-javascript" translate="no">
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
</code>
</pre>

Приложение запускает сервер и слушает соединения на порте 3000. Приложение выдает ответ "Hello World!" на запросы, адресованные корневому URL (`/`) или *маршруту*. Для всех остальных путей ответом будет **404 Not Found**.

<div class="doc-box doc-notice" markdown="1">
`req` (запрос) и `res` (ответ) являются теми же объектами, которые предоставляет Node,  поэтому можно вызвать `req.pipe()`, `req.on('data', callback)` и выполнить любые другие действия, не требующие участия Express.
</div>

Запустите приложение с помощью следующей команды:

```console
$ node app.js
```

После этого откройте в браузере страницу [http://localhost:3000/](http://localhost:3000/), чтобы просмотреть результат.

