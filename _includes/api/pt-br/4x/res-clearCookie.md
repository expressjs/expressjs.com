<h3 id='res.clearCookie'>res.clearCookie(name [, options])</h3>

Limpa o cookie especificado por `name`. Para mais detalhes sobre o objeto `options`, veja [res.cookie()](#res.cookie).

~~~js
res.cookie('name', 'tobi', { path: '/admin' });
res.clearCookie('name', { path: '/admin' });
~~~
