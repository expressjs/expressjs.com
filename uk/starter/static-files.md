---
layout: page
title: Обробка статичних файлів в Express
menu: starter
lang: uk
description: Understand how to serve static files like images, CSS, and JavaScript
  in Express.js applications using the built-in 'static' middleware.
---

# Обробка статичних файлів в Express

Для обробки статичних файлів, таких як зображення, CSS файли, та JavaScript файли, використовуйте вбудовану у Express функцію `express.static`.

Передайте ім'я директорії яка містить статичні файли у `express.static` щоб розпочати отримувати їх напряму. Наприклад, використовуйте цей код для того, щоб обробляти статичні файли у директорії з іменем `public`:

```js
app.use(express.static('public'))
```

Тепер ви можете підключити файли з директорії `public`:

```text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
Express looks up the files relative to the static directory, so the name of the static directory is not part of the URL.
</div>

Щоб використовувати декілька директорій для статичних файлів, викличіть функцію `express.static`  декілька разів:

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express шукає файли в тому порядку, в якому ви викликали функцію `express.static` та передали їй шлях до папки як аргумент.

Щоб створити віртуальний префікс для шляху (якщо шлях насправді відсутній у файловій системі) для файлів які обробляються функцією `express.static`, [та встановити власний маршрут](/{{ page.lang }}/4x/api.html#app.use) зробіть як показано нище:

```js
app.use('/static', express.static('public'))
```

Тепер ви можете підключити файли, які знаходяться у директорії `public` з використанням префіксу `/static`.

```text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

Проте, шлях який ви передаєте у функцію `express.static` є відносним до директорії з якої ви запускаєте ваш `node` процес. Якщо ви запускаєете додаток з іншої директорії, більш безпечним є вказувати абсолютний шлях:

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```
