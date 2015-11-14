---
layout: page
title: Expressni o'rnatish
menu: starter
lang: uz
---

# O'rnatish

Avval, agar .

~~~sh
$ mkdir myapp
$ cd myapp
~~~

Если в вашей директории ещё нет файла `package.json`, создайте его с помощу `npm init` команды.

~~~sh
$ npm init
~~~

Установите Express в директорию приложения и сохраните в список зависимостей:

~~~sh
$ npm install express --save
~~~

Для того что бы временно установить Express, и не добавлять его в список зависимостей, не указывайте `--save` опцию:

~~~sh
$ npm install express
~~~

<div class="doc-box doc-info" markdown="1">
Node модули установленные с `--save` опцией будут добавлены в `dependencies` список `package.json` файла.
И при использовании `npm install` в директории приложения модули будут автоматически установленны из списка зависимостей.
</div>
