<h3 id='req.signedCookies'>req.signedCookies</h3>

Quando utilizando o middleware [cookie-parser](https://www.npmjs.com/package/cookie-parser), essa propriedade
contém cookies assinados enviados pela requisição, não assinados e prontos para uso. Cookies assinados
fazem parte de um objeto diferente para mostrar a intenção do desenvolvedor; caso contrário, um ataque
malicioso poderia ser colocado no valor de `req.cookie` (o qual é fácil de falsificar). Note que assinar
um cookie não o torna "escondido" o criptografado mas simplesmente previne a adulteração (porque o segredo
usado para a assinatura é privado). Se nenhum cookie assinado for enviado, o valor padrão da propriedade é `{}`.

~~~js
// Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
req.signedCookies.user
// => "tobi"
~~~

Para mais informações ou em caso de problemas veja [cookie-parser](https://github.com/expressjs/cookie-parser).
