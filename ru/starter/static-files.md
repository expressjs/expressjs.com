---
layout: page
title: Предоставление статических файлов в Express
menu: starter
lang: ru
---

# Предоставление статических файлов в Express

Для предоставления статических файлов, например, изображений, файлов CSS и JavaScript в Express используется функция промежуточной обработки `express.static`.

Для того чтобы начать непосредственное предоставление файлов, необходимо передать имя каталога, в котором находятся статические ресурсы, в функцию промежуточной обработки `express.static`. Например, воспользуйтесь приведенным ниже кодом для предоставления изображений, файлов CSS и JavaScript, расположенных в каталоге `public`:

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
</code>
</pre>

Теперь можно загрузить файлы, находящиеся в каталоге `public` directory:

<pre>
<code class="language-javascript" translate="no">
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code>
</pre>

<div class="doc-box doc-info">
Express выполняет поиск файлов относительно статического каталога, поэтому имя статического каталога не является частью URL.
</div>

Для использования нескольких каталогов, содержащих статические ресурсы, необходимо вызвать функцию промежуточной обработки `express.static` несколько раз:

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code>
</pre>

Express выполняет поиск файлов в том порядке, в котором указаны статические каталоги в функции промежуточной обработки `express.static`.

Для того чтобы создать префикс виртуального пути (то есть, пути, фактически не существующего в файловой системе) для файлов, предоставляемых с помощью функции `express.static`, необходимо [указать путь монтирования](/{{ page.lang }}/4x/api.html#app.use) для статического каталога, как показано ниже:

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static('public'));
</code>
</pre>

Теперь можно загрузить файлы, находящиеся в каталоге `public`, указанного в префиксе пути `/static`.

<pre>
<code class="language-javascript" translate="no">
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code>
</pre>

Тем не менее, путь, переданный в функцию `express.static`, указан относительно каталога, из которого запускается процесс `node`. В случае запуска приложения Express из другого каталога, безопаснее использовать абсолютный путь к каталогу для предоставления файлов:

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static(__dirname + '/public'));
</code>
</pre>
