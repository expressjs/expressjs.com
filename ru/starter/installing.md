---
layout: page
title: Установка Express
menu: starter
lang: ru
---

# Установка

Предположим, вы уже установили [Node.js](https://nodejs.org/). Создайте каталог для своего приложения и сделайте его своим рабочим каталогом.

<pre>
<code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code>
</pre>

С помощью команды `npm init` создайте файл `package.json` для своего приложения.
Дополнительную информацию о работе `package.json` можно найти в разделе [Специфика работы с npm package.json](https://docs.npmjs.com/files/package.json).

<pre>
<code class="language-sh" translate="no">
$ npm init
</code>
</pre>

Эта команда выдает целый ряд приглашений, например, приглашение указать имя и версию вашего приложения.
На данный момент, достаточно просто нажать клавишу ВВОД, чтобы принять предлагаемые значения по умолчанию для большинства пунктов, кроме следующего:

<pre>
<code class="language-sh" translate="no">
entry point: (index.js)
</code>
</pre>

Введите `app.js` или любое другое имя главного файла по своему желанию. Если вас устраивает `index.js`, нажмите клавишу ВВОД, чтобы принять предложенное имя файла по умолчанию.

Теперь установите Express в каталоге `myapp` и сохраните его в списке зависимостей. Например:

<pre>
<code class="language-sh" translate="no">
$ npm install express
</code>
</pre>


