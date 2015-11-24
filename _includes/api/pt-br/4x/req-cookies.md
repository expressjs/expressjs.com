<h3 id='req.cookies'>req.cookies</h3>

Quando utilizando o middleware [cookie-parser](https://www.npmjs.com/package/cookie-parser),
essa propriedade é um objeto que contém os cookies enviados pela requisição. Se
a requisição não contiver cookies, o padrão é `{}`.

~~~js
// Cookie: name=tj
req.cookies.name
// => "tj"
~~~

Para mais informações ou em caso de problemas veja [cookie-parser](https://github.com/expressjs/cookie-parser).
