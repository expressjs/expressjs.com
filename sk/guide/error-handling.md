---
layout: page
title: Error handling v Express-e
menu: guide
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Error handling

Middleware funkcie pre error-handling sa definujú rovnako, ako ostatné middleware funkcie s jediným rozdielom a to, že majú štyri argumenty namiesto troch:
`(err, req, res, next)`. Napr.:

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Error-handling middleware zadefinujte ako posledný, za ostatnými `app.use()` a route definíciami, napr.:

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
</code>
</pre>

Návratové hodnoty predávané medzi jednotlivými middleware funkciami môžu byť v ľubovoľnom formáte, ako napr. stránka s HTML errorom, jednoduchá message, či JSON string.

Z dôvodu lepšej organizácie kódu je možné zadefinovať niekoľko error-handling middleware funkcií, podobne ako je tomu so štandardnými middleware funkciami.
Napr., ak chcete zadefinovať error-handling pre `XHR` volania a pre tie ostatné, môžete použiť nasledujúci príklad:

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
</code>
</pre>

V nasledujúcom príklade `logErrors` sú všetky errory vypísané na `stderr`, napr.:

<pre>
<code class="language-javascript" translate="no">
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
</code>
</pre>

V nasledujúcom príklade je `clientErrorHandler` zadefinovaný tak, aby XHR errory boli explicitne odchytené; tie ostatné sa nespracovávajú a ich spracovanie je ponechané nasledujúcej middleware funkcii v poradí:

<pre>
<code class="language-javascript" translate="no">
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
</code>
</pre>

Finálna "catch-all" `errorHandler` funkcia môže byť implementovaná takto:

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>

Ak do funkcie `next()` predáte čokoľvek (okrem stringu `'route'`), Express bude považovať toto volanie ako error a automaticky preskočí všetky zostávajúce non-error middleware funkcie. Ak potrebujete tento error spracovať špeciálne, budete musieť vytvoriť error-handling route, ako je popísane v ďalšej sekcii.

Ak váš route handler obsahuje viacero callback funkcií, môžete k preskočeniu na ďalší route handler v poradí použiť parameter `route`.  Napr.:

<pre>
<code class="language-javascript" translate="no">
app.get('/a_route_behind_paywall',
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) {

      // continue handling this request
      next('route');
    }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });
</code>
</pre>

V tomto príklade bude `getPaidContent` handler preskočený, ale ďalšie zostávajúce `app` handlery pre `/a_route_behind_paywall` budú vykonané.

<div class="doc-box doc-info" markdown="1">
Volania `next()` a `next(err)` hovoria, že aktuálny handler dokončil svoju úlohu príp. v akom stave. Volanie `next(err)` zabezpeči preskočenie všetkých zostávajúcich handlerov v poradí okrem tých, ktoré slúžia na spracovanie errorov, ako je popísané vyššie.
</div>

## Defaultný Error Handler

Express obsahuje vstavaný error handler, ktorý sa stará o všetky errory, aké sa môžu v aplikácii vyskytnúť. Táto defaultná error-handling middleware funkcia je pridaná na koniec stacku middleware funkcií.

Ak funkcii `next()` predáte error a nespracujete ho vlatným error handlerom, error bude spracovaný vstavaným error handlerom, pričom error a jeho stack trace bude vrátený klientovi. Stack trace nie je vrátený v prípade produkčného módu.

<div class="doc-box doc-info" markdown="1">
Ak chcete aplikáciu spustiť v produkčnom móde, nastavte environment premennú `NODE_ENV` na `production`.
</div>

V prípade, ak zavoláte `next()` spolu s errorom potom, ako ste už začali vypisovať response (napr. ak nastane error počas streamovania dát klientovi), vstavaný error handler ukončí spojenie s klientom a request spadne.

V prípade, ak máte zadefinovaný vlastný erorr handler a budete chcieť delegovať defaultný error handling mechanizmus na Express, v prípade ak už nejaké dáta boli odoslané klientovi, môžete vykonať nasledovné:

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>
