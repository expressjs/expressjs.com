---
layout: page
title: Установка Express
menu: starter
lang: ru
description: Learn how to install Express.js in your Node.js environment, including
  setting up your project directory and managing dependencies with npm.
---

# Установка

Предположим, вы уже установили [Node.js](https://nodejs.org/). Создайте каталог для своего приложения и сделайте его своим рабочим каталогом.

```bash
$ mkdir myapp
$ cd myapp
```

С помощью команды `npm init` создайте файл `package.json` для своего приложения.
Дополнительную информацию о работе `package.json` можно найти в разделе [Специфика работы с npm package.json](https://docs.npmjs.com/files/package.json).

```bash
$ npm init
```

Эта команда выдает целый ряд приглашений, например, приглашение указать имя и версию вашего приложения.
На данный момент, достаточно просто нажать клавишу ВВОД, чтобы принять предлагаемые значения по умолчанию для большинства пунктов, кроме следующего:

```bash
entry point: (index.js)
```

Введите `app.js` или любое другое имя главного файла по своему желанию. Если вас устраивает `index.js`, нажмите клавишу ВВОД, чтобы принять предложенное имя файла по умолчанию.

Теперь установите Express в каталоге `myapp` и сохраните его в списке зависимостей. Например:

```bash
$ npm install express --save
```

Для временной установки Express, без добавления его в список зависимостей, не указывайте опцию `--save`:

```bash
$ npm install express
```

<div class="doc-box doc-info" markdown="1">
Модули Node, установленные с опцией `--save`, добавляются в список `dependencies` в файле `package.json`.
В дальнейшем, при запуске `npm install` в каталоге `app` установка модулей из списка зависимостей будет выполняться автоматически.
</div>
