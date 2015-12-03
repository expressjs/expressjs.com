---
layout: page
title: Встановлення Express
menu: starter
lang: uk
---

# Встановлення

По-перше, якщо ви ще не створили, створіть директорію для вашого проекту і зробіть її вашої робочої директорією.

<pre><code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code></pre>

Якщо у вашій директорії ще немає файлу `package.json`, створіть його за допомогою` npm init` команди.

<pre><code class="language-sh" translate="no">
$ npm init
</code></pre>

Встановіть Express в директорію програми та збережіть у список залежностей:

<pre><code class="language-sh" translate="no">
$ npm install express --save
</code></pre>

Для того щоб тимчасово встановити Express, і не додавати його в список залежностей, не вказуйте `--save` опцію:

<pre><code class="language-sh" translate="no">
$ npm install express
</code></pre>

<div class="doc-box doc-info" markdown="1">
Node модулі встановлені з `--save` опцією будуть додані в` dependencies` список `package.json` файлу.
І при використанні `npm install` в директорії додатку модулі будуть автоматично встановлені зі списку залежностей.
</div>
