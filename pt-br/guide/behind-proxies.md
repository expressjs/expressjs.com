---
layout: page
title: Express atrás de proxies
menu: guide
lang: pt-br
---

# Express atrás de proxies

Quando uma aplicação Express estiver rodando atrá de um proxy, defina a variável `trust proxy` (usando [app.set()](/4x/api.html#app.set)) para um dos valores listados na tabela seguinte.

<div class="doc-box doc-info" markdown="1">
A aplicação não deixa de rodar se `trust proxy` não estiver definida, porém irá registrar incorretamente o IP do proxy como sendo o IP do cliente. Para evitar isso, a variável `trust proxy` deve ser configurada
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Tipo</th><th>Valor</th></tr></thead>
  <tbody>
    <tr>
      <td>Boleano</td>
<td markdown="1">
Se `true`, o endereço IP do cliente é entendido como sendo a entrada mais à esquerda no cabeçalho `X-Forwarded-*`.  

Se `false`, a app é entendida como acessando diretamente a Internet, e o endereço IP do cliente é derivado de `req.connection.remoteAddress`. Este é a configuração padrão.
</td>
    </tr>
    <tr>
      <td>Endereço IP</td>
<td markdown="1">
Um endereço IP, sub-rede, ou um array de endereços IPs e sub-redes para trust. A seguir temos a lista de nomes de sub-rede pré configurados.

* loopback - `127.0.0.1/8`, `::1/128`
* linklocal - `169.254.0.0/16`, `fe80::/10`
* uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

Configure endereços IP por qualquer um dos seguintes caminhos:  

<pre><code class="language-js">app.set('trust proxy', 'loopback') // especifica uma única sub-rede
app.set('trust proxy', 'loopback, 123.123.123.123') // especifica uma sub-rede e um endereço
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // especifica múltiplas sub-redes como CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // especifica múltiplas sub-redes como um array</code></pre>


Quando especificados, os endereços IP ou sub-redes são excluídos do processo de determinação de endereço, e o IP não confiável mais próximo para o servidor da aplicação é determinado como o endereço IP do cliente.
</td>
    </tr>
    <tr>
      <td>Número</td>
<td markdown="1">
Trust the `n`th hop from the front-facing proxy server as the client.
</td>
    </tr>
    <tr>
      <td>Função</td>
<td markdown="1">
Implementação trust personalizada. Use somente se você sabe realmente o que está fazendo.
<pre><code class="language-js">app.set('trust proxy', function (ip) {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
  else return false;
})</code></pre>
</td>
    </tr>
  </tbody>
</table>

Configurar um `trust proxy` com valor não `false` resulta em duas mudanças importantes:

<ul>
  <li markdown="1">O valor de [req.hostname](/{{ page.lang }}/api.html#req.hostname) é derivado do valor definido no cabeçalho `X-Forwarded-Host`, que pode ser definido pelo cliente ou pelo proxy.
  </li>
  <li markdown="1">`X-Forwarded-Proto` pode ser definido pelo proxy reverso para informar ao aplicativo se é https ou simplesmente http. Esse valor é refletido por [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">Os valores [req.ip](/{{ page.lang }}/api.html#req.ip) e [req.ips](/{{ page.lang }}/api.html#req.ips) serão preenchidos com lista de endereços de `X-Forwarded-For`.
  </li>
</ul>

A configuração de `trust proxy` é implementada usando o pacote [proxy-addr](https://www.npmjs.com/package/proxy-addr). Para mais informações, consulte sua documentação.
