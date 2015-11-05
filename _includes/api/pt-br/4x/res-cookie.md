<h3 id='res.cookie'>res.cookie(name, value [, options])</h3>

Seta o cookie `name` com `value`.  O parâmetro `value` é uma string ou um objeto convertido para JSON.

O parâmetro `options` é um objeto e que pode ter as seguintes propriedades.

| Propriedade    | Tipo |  Descrição                                                             |
|-------------|-------------------------------------------------------------------------|
| `domain`    | String | Nome de domínio para o cookie. O valor padrão é o nome do domínio do app.
| `expires`   | Data | Data de expiração do cookie em GMT. Se o valor não for especificado ou for 0, cria um cookie de sessão.
| `httpOnly`  | Boleano | Flag que torna o cookie acessível somente por servidor web.
| `maxAge`    | String | Opção conveniente para configurar o tempo de expiração relativo ao momento atual em milissegundos.
| `path`      | String | Caminho para o cookie. O padrão é "/".
| `secure`    | Boleano | Marca o cookie para ser utilizado somente com HTTPS.
| `signed`    | boleano | Indica se o cookie deve ser assinado.

<div class="doc-box doc-notice" markdown="1">
Toda chamada para `res.cookie()` seta o cabeçalho HTTP `Set-Cookie` com as opções especificadas.
Qualquer opção não especificada terá por padrão os valores padronizados em [RFC 6265](http://tools.ietf.org/html/rfc6265).
</div>

Exemplos:

~~~js
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
~~~

O opção `maxAge` serve para configurar "expires" relativamente ao tempo atual, em milissegundos.
A linha a seguir é equivalente ao segundo exemplo acima.


~~~js
res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
~~~

Você pode passar um objeto como parâmetro `value`, que será serializado como JSON e repassado pelo middleware `bodyParser()`.

~~~js
res.cookie('cart', { items: [1,2,3] });
res.cookie('cart', { items: [1,2,3] }, { maxAge: 900000 });
~~~

Quando utilizamos o middleware [cookie-parser](https://www.npmjs.com/package/cookie-parser), este método também suporta cookies assinados. Basta incluir a opção `signed` definida como `true`.
Então `res.cookie()` utilizará `cookieParser(secret)` para assinar o valor.

~~~js
res.cookie('name', 'tobi', { signed: true });
~~~

Posteriormente você pode acessar o valor utilizando o objeto [req.signedCookie](#req.signedCookies).
