---
layout: page
title: Express glossary
description: A comprehensive glossary of terms related to Express.js, Node.js, middleware, routing, and other key concepts to help you understand and use Express effectively.
menu: resources
lang: de
redirect_from: /resources/glossary.html
---

# Glossar

### Anwendung

Im Allgemeinen besteht eine Anwendung aus einem oder mehreren Programmen, über die Operationen für bestimmte Zwecke ausgeführt werden.  Im Zusammenhang mit Express ist eine Anwendung ein Programm, das die auf der Node.js-Plattform laufende Express-API nutzt.  Wird auch als [Anwendungsobjekt](/{{ page.lang }}/api.html#express) bezeichnet.

### API

Anwendungsprogrammierschnittstelle (Application Programming Interface). Abkürzung bei der ersten Verwendung ausschreiben.

### Express

Schnelles, offenes, unkompliziertes Web-Framework für Node.js-Anwendungen. Im Allgemeinen wird der Name "Express" eher verwendet als "Express.js", auch wenn "Express.js" ebenfalls verwendet werden kann.

### libuv

Eine plattformübergreifende Unterstützungsbibliothek, bei der die asynchrone Ein-/Ausgabe im Mittelpunkt steht. Sie wurde in erster Linie für die Verwendung in Node.js entwickelt.

### Middleware

Eine Funktion, die über die Weiterleitungsebene in Express vor dem letzten Anforderungshandler aufgerufen wird. Deshalb befindet sich diese Funktion in der Mitte zwischen einer unformatierten Anforderung und der endgültigen beabsichtigten Weiterleitung. Nachfolgend finden Sie einige Details zur Middlewareterminologie:

- `var foo = require('middleware')` bedeutet, dass ein Node.js-Modul _benötigt_ oder _verwendet_ wird. Dann gibt die Anweisung `var mw = foo()` in der Regel die Middleware zurück.
- `app.use(mw)` bedeutet, dass die _Middleware dem globalen Verarbeitungsstack hinzugefügt wird_.
- `app.get('/foo', mw, function (req, res) { ... })` bedeutet, dass die _Middleware dem "GET /foo"-Verarbeitungsstack hinzugefügt wird_.

### Node.js

Eine Softwareplattform, die für die Erstellung skalierbarer Netzanwendungen verwendet wird. Node.js verwendet JavaScript als Scripting-Sprache und erzielt den hohen Durchsatz durch nicht blockierende Ein-/Ausgabe und eine Ereignisschleife mit einem Thread. Siehe auch [nodejs.org](http://nodejs.org/). **Hinweis**: Der ursprüngliche Name lautet "Node.js".

### Open-Source

Bei Verwendung als Adjektiv muss dieser Begriff mit Bindestrichen gekoppelt werden: Beispiel: "Dies ist eine Open-Source-Software." Siehe auch [Open-Source-Software in Wikipedia](http://en.wikipedia.org/wiki/Open-source_software).

{% include admonitions/note.html content="Although it is common not to hyphenate this term, we are using the standard English rules for hyphenating a compound adjective." %}

### Anforderung

Eine HTTP-Antwort. Ein Server gibt eine HTTP-Antwortnachricht an den Client zurück.  Die Antwort enthält Informationen zum Beendigungsstatus in Bezug auf die Anforderung und kann im Nachrichtenhauptteil auch angeforderten Inhalt enthalten.

### Antwort

Eine HTTP-Anforderung. Ein Client übergibt eine HTTP-Anforderungsnachricht an einen Server, der wiederum eine Antwort zurückgibt. The response contains completion status information about the request and might also contain requested content in its message body.

### Weiterleitung (Route)

Teil einer URL, die eine Ressource angibt. Beispiel: In `http://foo.com/products/id` ist "/products/id" die Weiterleitung.

### Router

Siehe [Router](/{{ page.lang }}/4x/api.html#router) in der API-Referenz.
