---
layout: page
title: Serving static files in Express
menu: starter
lang: zh
---

# 静态文件

对于使用静态文件，比如images，CSS，JavaScrip和其他静态文件，Express中内置了中间件 - `express.static`

通过引入静态资源的路径，`express.static`中间件可以获取该路径下的所有文件。
举例来说，如果你把image,CSS,JavaScript 文件放入到一个名为`public`的文件夹，你可以这样做：

~~~js
app.use(express.static('public'));
~~~

现在，你能够获取`public`目录下所有文件:

~~~
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
~~~

<div class="doc-box doc-info">
这些文件由于在相对位置被找到，所以静态路径的名字并不会出现在URL中。
</div>

如果你想使用多个路径来引用不同的静态资源，可以使用`express.static`中间件多次:

~~~js
app.use(express.static('public'));
app.use(express.static('files'));
~~~

这些文件将会按照在静态目录中使用`express.static`中间件设置的顺序依次被查找到。

如果你想创建一个“虚拟”（这个路径在文件系统中并不存在）路径前缀，可以[指定安装路径](/4x/api.html#app.use)，如下所示：

~~~js
app.use('/static', express.static('public'));
~~~

现在，你能够获取`public`目录下的所有文件，包括路径前缀“static/”

~~~
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
~~~
