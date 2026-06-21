---
title: Überschreiben der Express-API
description: Erfahren Sie, wie Sie die Express.js API anpassen und erweitern können, indem Sie Methoden und Eigenschaften der Request- und Response-Objekte mittels Prototypen überschreiben.
---

Die Express API besteht aus verschiedenen Methoden und Eigenschaften auf den Anfrage- und Antwort-Objekten. Diese werden vom Prototyp geerbt. Es gibt zwei Erweiterungspunkte für die Express API:

1. Die globalen Prototypen unter `express.request` und `express.response`.
2. App-spezifische Prototypen bei `app.request` und `app.response`.

Das Ändern der globalen Prototypen wirkt sich auf alle geladenen Express-Apps im selben Prozess aus. Wenn gewünscht, können Änderungen app-spezifisch gemacht werden, indem nur app-spezifische Prototypen nach dem Erstellen einer neuen App geändert werden.

## Methoden

Sie können die Signatur und das Verhalten bestehender Methoden mit eigenen überschreiben, indem Sie eine benutzerdefinierte Funktion zuweisen.

Folgendes ist ein Beispiel für das Überschreiben des Verhaltens von [res.sendStatus](/4x/api#res.sendStatus).

```js
app.response.sendStatus = function (statusCode, type, message) {
  // code is intentionally kept simple for demonstration purpose
  return this.contentType(type).status(statusCode).send(message);
};
```

Die obige Implementierung ändert die ursprüngliche Signatur von `res.sendStatus`. Es akzeptiert nun einen Statuscode, Kodierungstyp und die Nachricht, die an den Client gesendet werden soll.

Die überschriebene Methode kann nun auf diese Weise verwendet werden:

```js
res.sendStatus(404, 'application/json', '{"error":"resource not found"}');
```

## Eigenschaften

Eigenschaften in der Express-API sind entweder:

1. Zugewiesene Eigenschaften (z.B. `req.baseUrl`, `req.originalUrl`)
2. Definiert als Getters (z. B.: `req.secure`, `req.ip`)

Da Eigenschaften in Kategorie 1 dynamisch auf den `request` und `response` Objekten im Kontext des aktuellen Request-Antwort-Zyklus zugewiesen werden ihr Verhalten kann nicht überschrieben werden.

Eigenschaften der Kategorie 2 können mit der Express API Extensions API überschrieben werden.

Der folgende Code schreibt neu wie der Wert von `req.ip` abgeleitet wird. Jetzt gibt es einfach den Wert des `Client-IP` Request-Headers zurück.

```js
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get() {
    return this.get('Client-IP');
  },
});
```

## Prototyp

Um die Express API zur Verfügung zu stellen, werden die Anfrage/Antwort-Objekte an Express weitergegeben (via `app(req, res)`, zum Beispiel, müssen von der gleichen Prototypenkette zu erben. Standardmäßig ist dies `http.IncomingRequest.prototype` für die Anfrage und `http.ServerResponse.prototype` für die Antwort.

Wenn nötig, wird empfohlen, dass dies nur auf der Anwendungsebene und nicht auf globaler Ebene geschieht. Achten Sie auch darauf, dass der verwendete Prototyp die Funktionalität so nah wie möglich an die Standard-Prototypen anpasst.

```js
// Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse
// for the given app reference
Object.setPrototypeOf(Object.getPrototypeOf(app.request), FakeRequest.prototype);
Object.setPrototypeOf(Object.getPrototypeOf(app.response), FakeResponse.prototype);
```
