---
layout: page
title: Express základný routing
menu: starter
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Základný routing

_Routing_ rozhoduje o tom, ako aplikácia odpovedá na požiadavky (requesty) klientov na jednotlivých koncových bodoch (endpointoch) reprezentovaných pomocou URI (alebo cesty) a špecifickej HTTP request metódy (GET, POST, atď.).

Každý definovaný route môže mať jednu, alebo viacero handler funkcií, ktoré sa vykonajú v prípade, ak je route spárovaný s požiadavkou klienta.

Route definícia má nasledovnú štruktúru:
<pre>
<code class="language-javascript" translate="no">
app.METHOD(PATH, HANDLER)
</code>
</pre>

Kde:

- `app` je `express` inštancia.
- `METHOD` je [HTTP request metóda](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
- `PATH` je cesta na serveri.
- `HANDLER` je funkcia, ktorá sa vykoná, ak je route spárovaný.

<div class="doc-box doc-notice" markdown="1">
Tento tutoriál predpokladá, že existuje inštancia `express` aplikácie s názvom `app` a server je spustený. Ak nie ste oboznámení s vytváraním a spuštaním aplikácií, začnite [Hello world prikladom](/{{ page.lang }}/starter/hello-world.html).
</div>

Nasledujúce priklady ilustrujú definovanie jednoduchých route-ov.

Odpoveď s textom `Hello World!` na hlavnej stránke:

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('Hello World!');
});
</code>
</pre>

Odpoveď na POST request na hlavný route (`/`), hlavnú stránku aplikácie:

<pre>
<code class="language-javascript" translate="no">
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
</code>
</pre>

Odpoveď na PUT request na route `/user`:

<pre>
<code class="language-javascript" translate="no">
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
</code>
</pre>

Odpoveď na DELETE request na route `/user`:

<pre>
<code class="language-javascript" translate="no">
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
</code>
</pre>

Viac informácií ohľadom routing-u nájdete v [routing príručke](/{{ page.lang }}/guide/routing.html).
