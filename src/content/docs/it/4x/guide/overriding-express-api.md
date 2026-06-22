---
title: Sovrascrivendo l'API Express
description: Scopri come personalizzare ed estendere l'API di Express.js sovrascrivendo i metodi e le proprietà su richiesta e gli oggetti di risposta utilizzando prototipi.
---

L'API Express è composta da vari metodi e proprietà su richiesta e oggetti di risposta. Questi sono ereditati dal prototipo. Ci sono due punti di estensione per l'API Express:

1. I prototipi globali in `express.request` e `express.response`.
2. prototipi specifici per app su `app.request` e `app.response`.

La modifica dei prototipi globali influenzerà tutte le applicazioni Express caricate nello stesso processo. Se lo si desidera, le modifiche possono essere rese specifiche alle app modificando solo i prototipi specifici delle app dopo aver creato una nuova app.

## Metodi

È possibile sovrascrivere la firma e il comportamento dei metodi esistenti con il proprio, assegnando una funzione personalizzata.

Following is an example of overriding the behavior of [res.sendStatus](/api/response/#ressendstatus).

```js
app.response.sendStatus = function (statusCode, type, message) {
  // code is intentionally kept simple for demonstration purpose
  return this.contentType(type).status(statusCode).send(message);
};
```

L'implementazione di cui sopra cambia completamente la firma originale di `res.sendStatus`. Ora accetta un codice di stato, il tipo di codifica e il messaggio da inviare al client.

Il metodo overridden può ora essere utilizzato in questo modo:

```js
res.sendStatus(404, 'application/json', '{"error":"resource not found"}');
```

## Proprietà

Le proprietà nell'API Express sono:

1. Proprietà assegnate (es: `req.baseUrl`, `req.originalUrl`)
2. Definito come getters (es: `req.secure`, `req.ip`)

Poiché le proprietà sotto la categoria 1 sono assegnate dinamicamente sugli oggetti `request` e `response` nel contesto dell'attuale ciclo di richiesta-risposta, il loro comportamento non può essere superato.

Le proprietà sotto la categoria 2 possono essere sovrascritte utilizzando le API di estensione Express.

Il seguente codice riscrive come deve essere derivato il valore di `req.ip`. Ora restituisce semplicemente il valore dell'intestazione della richiesta `Client-IP`.

```js
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get() {
    return this.get('Client-IP');
  },
});
```

## Protototipo

Al fine di fornire l'API Express, gli oggetti richiesta/risposta passati a Express (tramite `app(req, res)`, per esempio) bisogno di ereditare dalla stessa catena prototipo. Per impostazione predefinita, questo è `http.IncomingRequest.prototype` per la richiesta e `http.ServerResponse.prototype` per la risposta.

Se non necessario, si raccomanda che ciò avvenga solo a livello di applicazione e non a livello globale. Inoltre, fare in modo che il prototipo che viene utilizzato corrisponda la funzionalità il più vicino possibile ai prototipi predefiniti.

```js
// Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse
// for the given app reference
Object.setPrototypeOf(Object.getPrototypeOf(app.request), FakeRequest.prototype);
Object.setPrototypeOf(Object.getPrototypeOf(app.response), FakeResponse.prototype);
```
