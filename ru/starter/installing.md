---
layout: page
title: Установка Express
menu: starter
lang: ru
---

# Установка

Считая, что вы уже установили Node.js, первым делом создайте директорию для вашего проекта и
сделайте её вашей рабочей директорией.

<pre><code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code></pre>

Если в вашей директории ещё нет файла `package.json`, создайте его с помощью команды `npm init`.

<pre><code class="language-sh" translate="no">
$ npm init
</code></pre>

Установите Express в директорию приложения и сохраните в список зависимостей:

<pre><code class="language-sh" translate="no">
$ npm install express --save
</code></pre>

Для того, чтобы временно установить Express, и не добавлять его в список зависимостей, не указывайте опцию `--save`:

<pre><code class="language-sh" translate="no">
$ npm install express
</code></pre>

<div class="doc-box doc-info" markdown="1">
Модули Node, установленные с опцией `--save`, будут добавлены в список `dependencies` файла `package.json`.
При использовании `npm install` в директории приложения модули будут автоматически установленны из списка зависимостей.
</div>
