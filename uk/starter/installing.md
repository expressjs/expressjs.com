---
layout: page
title: Встановлення Express
menu: starter
lang: uk
---

# Встановлення

Припускаючи, що у вас вже встановлено [Node.js](https://nodejs.org/), створіть робочу директорію, де буде ваш застосунок:

<pre><code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code></pre>

Використовуйте команду `npm init` для створення файлу `package.json`.
Більш докладно про роботу `package.json` написано в [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json).

<pre><code class="language-sh" translate="no">
$ npm init
</code></pre>

Під час виконання цієї команди, у вас спитається про деякі моменти (ім’я та версія вашого застосунку і т.д.).
Ви можете просто натискати Enter, щоб приймати запропоновані початкові варіанти для більшості пунктів, за виключенням цього:

<pre><code class="language-sh" translate="no">
entry point: (index.js)
</code></pre>

Введіть `app.js`, або будь-яке інше ім’я для головного файла. Якщо ви хочете залишити запропоноване ім’я `index.js`,
натискайте Enter.

Тепер встановіть Express в новоствореній директорії та збережіть його в списку залежностей:

<pre><code class="language-sh" translate="no">
$ npm install express --save
</code></pre>

Щоб встановити Express без додавання його в список залежностей, не передавайте параметр `--save`:

<pre><code class="language-sh" translate="no">
$ npm install express
</code></pre>

<div class="doc-box doc-info" markdown="1">
Модулі Node.js, встановлені з параметром `--save`, додаються до списку `залежностей` у файл `package.json`, що знаходиться в корені робочого каталогу.
Цей список використовується при запуску команди `npm install` щоб автоматично встановлювати вказані там модулі.
</div>
