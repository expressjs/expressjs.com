<h2>Application</h2>




`app`对象一般用来表示Express程序。通过调用Express模块导出的顶层的`express()`方法来创建它:
```js
var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('hello world!');
});

app.listen(3000);
```
`app`对象具有以下的方法：

 -  路由HTTP请求；具体可以看[app.METHOD](#app.METHOD)和[app.param](#app.param)这两个例子。
 -  配置中间件；具体请看[app.route](#app.route)。
 -  渲染HTML视图；具体请看[app.render](#app.render)。
 -  注册模板引擎；具体请看[app.engine](#app.engine)。

它还有一些属性设置，这些属性可以改变程序的行为。获得更多的信息，可以查阅[Application settings](#app.settings.table])。



<h3 id='app.properties'>Properties</h3>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-locals.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-mountpath.md %}
</section>

<h3 id='app.events'>Events</h3>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-onmount.md %}
</section>

<h3 id='app.methods'>Methods</h3>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-all.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-delete-method.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-disable.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-disabled.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-enable.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-enabled.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-engine.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-get.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-get-method.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-listen.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-METHOD.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-param.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-path.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-post-method.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-put-method.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-render.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-route.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-set.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-use.md %}
</section>

