---
layout: page
title: Разработка шаблонизаторов для Express
menu: advanced
lang: ru
---

# Разработка шаблонизаторов для Express

Для создания собственного шаблонизатора воспользуйтесь методом `app.engine(ext, callback)`. `ext` соответствует расширению имени файла, а `callback` является функцией шаблонизатора, принимающей в качестве параметров следующие элементы: расположение файла, объект опций и функцию обратного вызова.

Приведенный ниже код служит примером реализации самого простого шаблонизатора для вывода файлов `.ntl`.

<pre>
<code class="language-javascript" translate="no">
var fs = require('fs'); // this engine requires the fs module
app.engine('ntl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
</code>
</pre>

Теперь ваше приложение сможет отображать файлы `.ntl`. Создайте файл с именем `index.ntl` в каталоге `views` со следующим содержимым.

<pre>
<code class="language-javascript" translate="no">
#title#
#message#
</code>
</pre>
Затем создайте следующий маршрут в своем приложении.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>
При выполнении запроса к домашней странице файл `index.ntl` будет отображаться как HTML.
