---
layout: page
title: Использование шаблонизаторов в Express
menu: guide
lang: ru
---

# Использование шаблонизаторов в Express

Для того чтобы отображать в Express файлы шаблонов, необходимо задать следующие параметры приложения:

* `views`, каталог, в котором находятся файлы шаблонов. Например: `app.set('views', './views')`
* `view engine`, используемый шаблонизатор. Например: `app.set('view engine', 'pug')`

Затем установите соответствующий пакет npm шаблонизатора:

```console
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
Шаблонизаторы, совместимые с Express, например, Pug, экспортируют функцию `__express(filePath, options, callback)`, вызываемую с помощью функции `res.render()` для вывода кода шаблона.

Это правило действует не для всех шаблонизаторов. Библиотека [Consolidate.js](https://www.npmjs.org/package/consolidate) соблюдает его путем преобразования всех популярных шаблонизаторов Node.js, благодаря чему работает в Express без проблем.
</div>

После указания механизма визуализации (view engine) не нужно указывать его или загружать модуль шаблонизатора в приложение; Express загружает модуль внутренними средствами, как показано далее (для примера, приведенного выше).

<pre>
<code class="language-javascript" translate="no">
app.set('view engine', 'pug');
</code>
</pre>

Создайте файл шаблона Pug с именем `index.pug` в каталоге `views` со следующим содержанием:

<pre>
<code class="language-javascript" translate="no">
html
  head
    title= title
  body
    h1= message
</code>
</pre>

Затем создайте маршрут для вывода файла `index.pug`. Если свойство `view engine` не задано, необходимо указать расширение файла `view`. В противном случае, можно не указывать расширение.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>

При выполнении запроса к домашней странице файл `index.pug` будет отображаться как HTML.

Для получения дополнительной информации о работе шаблонизаторов в Express обратитесь к разделу ["Разработка шаблонизаторов для Express"](/{{ page.lang }}/advanced/developing-template-engines.html).
