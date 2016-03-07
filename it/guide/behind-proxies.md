---
layout: page
title: Express con i proxy
menu: guide
lang: it
---

# Express con i proxy

Quando si esegue un'applicazione Express con un proxy, impostare (utilizzando [app.set()](/{{ page.lang }}/4x/api.html#app.set)) la variabile dell'applicazione `trust proxy` su uno dei valori elencati nella seguente tabella.

<div class="doc-box doc-info" markdown="1">
Anche se l'applicazione non presenterà errori nell'esecuzione se la variabile dell'applicazione `trust proxy` non è impostata, registrerà comunque in modo errato l'indirizzo IP del proxy come indirizzo IP del client a meno che non venga configurato `trust proxy`.
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Tipo</th><th>Valore</th></tr></thead>
  <tbody>
    <tr>
      <td>Booleano</td>
<td markdown="1">
Se impostato su `true`, l'indirizzo IP del client viene considerato come la voce a sinistra dell'intestazione `X-Forwarded-*`.

Se impostato su `false`, significa che l'applicazione abbia una connessione diretta a Internet e l'indirizzo IP del client sia arrivato da `req.connection.remoteAddress`. Questa è l'impostazione predefinita.
</td>
    </tr>
    <tr>
      <td>Indirizzi IP</td>
<td markdown="1">
Un indirizzo IP, una subnet o un array di indirizzi IP e subnet a cui fornire attendibilità. Il seguente elenco mostra i nomi di subnet preconfigurate:

* loopback - `127.0.0.1/8`, `::1/128`
* linklocal - `169.254.0.0/16`, `fe80::/10`
* uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

È possibile impostare gli indirizzi IP in uno dei seguenti modi:

<pre>
<code class="language-js" translate="no">app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code>
</pre>

Quando specificati, gli indirizzi IP o le subnet vengono esclusi dal processo di determinazione dell'indirizzo e l'indirizzo IP non attendibile più vicino al server delle applicazioni viene considerato come indirizzo IP del client.
</td>
    </tr>
    <tr>
      <td>Numero</td>
<td markdown="1">
Considerare attendibile una parte del percorso `n`th dal server proxy principale come client.
</td>
    </tr>
    <tr>
      <td>Funzione</td>
<td markdown="1">
Implementazione attendibilità personalizzata. Questa funzione deve essere utilizzata solo da esperti.
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

Se si imposta un valore non `false` `trust proxy` si verificano tre importanti cambiamenti:

<ul>
  <li markdown="1">Il valore di [req.hostname](/{{ page.lang }}/api.html#req.hostname) viene rilevato dalla serie di valori nell'intestazione `X-Forwarded-Host`, la quale può essere impostata dal client o dal proxy.
  </li>
  <li markdown="1">`X-Forwarded-Proto` può essere impostata dal proxy inverso per far capire all'applicazione se si tratta di `https` o `http` oppure di un nome non valido. Questo valore viene riportato da [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">I valori [req.ip](/{{ page.lang }}/api.html#req.ip) e [req.ips](/{{ page.lang }}/api.html#req.ips) vengono popolati con l'elenco di indirizzi da `X-Forwarded-For`.
  </li>
</ul>

L'impostazione `trust proxy` viene implementata utilizzando il pacchetto [proxy-addr](https://www.npmjs.com/package/proxy-addr). Per ulteriori informazioni, consultare la relativa documentazione.
