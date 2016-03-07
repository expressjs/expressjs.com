---
layout: page
title: Express atrás de proxies
menu: guide
lang: pt-br
---

# Express atrás de proxies

Ao executar um aplicativo do Express atrás de um proxy,
configure (usando [app.set()](/{{ page.lang }}/4x/api.html#app.set)) a variável do
aplicativo `trust proxy` para um dos valores
listados na seguinte tabela.

<div class="doc-box doc-info" markdown="1">
Apesar de a execução do aplicativo não falhar se a variável do
aplicativo `trust proxy` não estiver configurada,
ele irá registrar incorretamente o endereço de IP do proxy como o
endereço de IP do cliente a não ser que o `trust
proxy` esteja configurado.
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Tipo</th><th>Valor</th></tr></thead>
  <tbody>
    <tr>
      <td>Booleano</td>
<td markdown="1">
Se `true`, o endereço de IP do cliente será
compreendido como a entrada mais a esquerda no cabeçalho `X-Forwarded-*`.

Se `false`, o aplicativo é compreendido como
exposto diretamente à Internet e o endereço de IP do cliente é
derivado a partir do `req.connection.remoteAddress`. Esta
é a configuração padrão.
</td>
    </tr>
    <tr>
      <td>Endereços IP</td>
<td markdown="1">
Um endereço de IP, sub-rede, ou uma matriz de endereços de IP e
sub-redes confiáveis. A lista a seguir mostra os nomes de sub-rede
pré-configurados:

* loopback - `127.0.0.1/8`, `::1/128`
* linklocal - `169.254.0.0/16`, `fe80::/10`
* uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

É possível configurar endereços de IP de qualquer uma das
formas a seguir:

<pre>
<code class="language-js" translate="no">app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code>
</pre>

Quando especificados, os endereços de IP ou sub-redes são
excluídos do processo de determinação de endereço, e o endereço de
IP não confiável mais próximos do servidor de aplicativos é
determinado como o endereço de IP do cliente.
</td>
    </tr>
    <tr>
      <td>Número</td>
<td markdown="1">
Confia no `n`-ésimo hop a partir do servidor de
proxy frontal como o cliente.
</td>
    </tr>
    <tr>
      <td>Função</td>
<td markdown="1">
Implementação de confiança customizada. Use apenas se souber o que está fazendo.
<pre>
<code class="language-js" translate="no">app.set('trust proxy', function (ip) {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
  else return false;
});</code>
</pre>
</td>
    </tr>
  </tbody>
</table>

Configurando um valor não-`false` para o
`trust
proxy` resulta em três mudanças importantes:

<ul>
  <li markdown="1">O valor de [req.hostname](/{{ page.lang }}/api.html#req.hostname) é
derivado do valor configurado no cabeçalho
`X-Forwarded-Host`, que pode ser configurado pelo
cliente ou pelo proxy.
  </li>
  <li markdown="1">`X-Forwarded-Proto` pode ser
configurado pelo proxy reverso para dizer ao aplicativo se ele é
`https` ou `http` ou até um nome
inválido. Este valor é refletido pelo [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">Os valores [req.ip](/{{ page.lang }}/api.html#req.ip) e
[req.ips](/{{ page.lang }}/api.html#req.ips) são populados com a lista de
endereços do `X-Forwarded-For`.
  </li>
</ul>

A configuração do `trust proxy` é
implementada usando o pacote
[proxy-addr](https://www.npmjs.com/package/proxy-addr). Para
obter mais informações, consulte a documentação.
