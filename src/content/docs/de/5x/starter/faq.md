---
title: FAQ
description: Finden Sie Antworten auf häufig gestellte Fragen zu Express.js, darunter Themen wie Anwendungsstruktur, Modelle, Authentifizierung, Template-Engines, Fehlerbehandlung und mehr.
---

## Wie kann ich meine Anwendung strukturieren?

Auf diese Frage gibt es keine endgültige Antwort. Die Antwort hängt von
vom Umfang Ihrer Anwendung und dem beteiligten Team ab. Um so flexibel wie möglich
zu sein, macht Express keine Annahmen in Bezug auf die Struktur.

Routen und andere anwendungsspezifische Logik können in beliebig vielen Dateien
in beliebiger Verzeichnisstruktur gespeichert werden. Folgende
Beispiele für Inspirationen anzeigen:

- [Route Listings](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
- [Routenplane](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

Außerdem gibt es Erweiterungen von Drittanbietern für Express, die einige dieser Muster vereinfachen:

- [Ressourcenreiches Routen](https://github.com/expressjs/express-resource)

## Wie definiere ich Modelle?

Express hat keine Vorstellung von Datenbanken. Dieses Konzept ist
bis zu Drittanbieter-Knotenmodulen übrig und erlaubt Ihnen eine
Schnittstelle mit fast jeder Datenbank.

Siehe [LoopBack](http://loopback.io) für ein Express-basiertes Framework, das um Modelle zentriert ist.

## Wie kann ich Benutzer authentifizieren?

Authentifizierung ist ein anderer Bereich, in dem sich Express nicht
wagt. Sie können ein beliebiges Authentifizierungsschema verwenden.
Für ein einfaches Benutzername/Passwort-Schema, siehe [dieses Beispiel](https://github.com/expressjs/express/tree/master/examples/auth).

## Welche Template-Engines unterstützt Express?

Express unterstützt jede Template-Engine, die mit der Signatur `(Pfad, locals, callback)` übereinstimmt.
Um die Schnittstellen der Template-Engine und das Caching zu normalisieren, lesen Sie bitte
[consolidate.js](https://github.com/visionmedia/consolidate.js)
Projekt für Unterstützung. Nicht aufgelistete Template-Engines könnten die Express-Signatur trotzdem unterstützen.

Weitere Informationen finden Sie unter [Template-Engines mit Express](/guide/using-template-engines).

## Wie gehe ich mit 404 Antworten um?

In Express sind 404 Antworten nicht das Ergebnis eines Fehlers, daher wird die Middleware von
nicht erfasst. Dieses Verhalten ist
, da eine 404-Antwort einfach das Fehlen zusätzlicher Arbeit anzeigt;
in anderen Worten, Express hat alle Middleware-Funktionen und -Routen ausgeführt,
und festgestellt, dass keiner von ihnen reagiert hat. Alles, was Sie
tun müssen, ist eine Middleware-Funktion am unteren Ende des Stacks (unter allen anderen Funktionen)
hinzuzufügen, um eine 404-Antwort zu handhaben:

```js
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
```

Fügen Sie Routen dynamisch zur Laufzeit einer Instanz von `express.Router()`
hinzu, so dass die Routen nicht durch eine Middleware-Funktion ersetzt werden.

## Wie kann ich einen Fehler einrichten?

Du definierst die Middleware wie andere Middleware,
außer mit vier anstatt drei, spezifisch mit der Signatur `(err, req, res, next)`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

Weitere Informationen finden Sie unter [Fehlerbehandlung](/guide/error-handling).

## Wie kann ich plain HTML rendern?

Du bist es nicht! Es gibt keine Notwendigkeit HTML mit der Funktion `res.render()` zu "render".
Wenn du eine bestimmte Datei hast, nutze die Funktion `res.sendFile()`.
Wenn du viele Assets aus einem Verzeichnis lieferst, verwende die `express.static()`
Middleware-Funktion.

## Welche Version von Node.js benötigt Express?

- [Express 4.x](/4x/api) benötigt Node.js 0.10 oder höher.
- [Express 5.x](/api) benötigt Node.js 18 oder höher.
