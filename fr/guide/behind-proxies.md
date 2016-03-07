---
layout: page
title: Serveurs proxy derrière Express
menu: guide
lang: fr
---

# Express derrière proxys

Lorsque vous exécutez une application Express derrière un proxy, affectez à la variable d'application `trust proxy` l'une des valeurs indiquées dans le tableau suivant, en utilisant [app.set()](/{{ page.lang }}/4x/api.html#app.set).

<div class="doc-box doc-info" markdown="1">
L'exécution de l'application n'échouera pas si la variable d'application `trust proxy` n'est pas définie, mais l'adresse IP du proxy sera enregistrée de manière incorrecte en tant qu'adresse IP du client.``
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Type</th><th>Valeur</th></tr></thead>
  <tbody>
    <tr>
      <td>Booléen</td>
<td markdown="1">
Si la valeur est `true`, l'adresse IP du client est interprétée comme étant l'entrée la plus à gauche dans l'en-tête `X-Forwarded-*`.
Si la valeur est `false`, l'application est interprétée comme étant directement accessible sur Internet et l'adresse IP du client est dérivée de `req.connection.remoteAddress`. Il s'agit du paramètre par défaut.
</td>
    </tr>
    <tr>
      <td>Adresses IP</td>
<td markdown="1">
Adresse IP, sous-réseau ou tableau d'adresses IP et de sous-réseaux auxquels faire confiance. La liste suivante montre les noms de sous-réseau préconfigurés :
* loopback - `127.0.0.1/8`, `::1/128`
* linklocal - `169.254.0.0/16`, `fe80::/10`
* uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

Vous pouvez définir les adresses IP de l'une des manières suivantes :

<pre>
<code class="language-js" translate="no">app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code>
</pre>

S'ils sont spécifiés, les sous-réseaux ou les adresses IP sont exclus du processus d'identification d'adresse, et l'adresse IP sans confiance la plus proche du serveur d'applications est identifiée comme étant l'adresse IP du client.
</td>
    </tr>
    <tr>
      <td>Numérique</td>
<td markdown="1">
Approuve le `n`ème tronçon à partir proxy de face comme étant le client.
</td>
    </tr>
    <tr>
      <td>Fonction</td>
<td markdown="1">
Implémentation de confiance personnalisée. N'utilisez cette option que si vous êtes sûr de vous.
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

La définition d'une valeur autre que `false` `trust proxy` entraîne trois modifications importantes :

<ul>
  <li markdown="1">La valeur de [req.hostname](/{{ page.lang }}/api.html#req.hostname) est dérivée de l'ensemble de valeurs indiqué dans l'en-tête `X-Forwarded-Host`, qui peut être défini par le client ou par le proxy.
  </li>
  <li markdown="1">`X-Forwarded-Proto` peut être défini par le proxy inverse pour indiquer à l'application s'il s'agit de `https` ou de `http`, voire d'un nom non valide. Cette valeur est reflétée par [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">Les valeurs [req.ip](/{{ page.lang }}/api.html#req.ip) et [req.ips](/{{ page.lang }}/api.html#req.ips) sont renseignées avec la liste des adresses provenant de `X-Forwarded-For`.
  </li>
</ul>

Le paramètre `trust proxy` est implémenté à l'aide du package [proxy-addr](https://www.npmjs.com/package/proxy-addr). Pour plus d'informations, consultez la documentation associée.
