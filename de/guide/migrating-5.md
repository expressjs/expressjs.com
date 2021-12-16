---
layout: page
title: Migration auf Express 5
menu: guide
lang: de
---

# Wechsel zu Express 5

<h2 id="overview">Überblick</h2>

Express 5.0 befindet sich noch in der Alpha-Release-Phase. Hier finden Sie jedoch bereits eine Vorschau zu den Änderungen in diesem Release und zur Migration Ihrer Express 4-Anwendung auf Express 5.

Express 5 unterscheidet sich nicht allzu sehr von Express 4: Die Änderungen an der API sind nicht so signifikant wie von 3.0 zu 4.0. Auch wenn die Basis-API unverändert bleibt, wird es doch einige grundlegende Veränderungen geben. In anderen Worten: Ein vorhandenes Express 4-Programm funktioniert möglicherweise nicht mehr, wenn Sie es für Express 5 aktualisieren.

Zum Installieren der aktuellen Alpha-Version und zur Vorschau von Express 5 geben Sie den folgenden Befehl im Stammverzeichnis Ihrer Anwendung ein:

```console
$ npm install express@5.0.0-alpha.2 --save
```

Sie können Ihre automatisierten Tests ausführen, um zu sehen, was fehlschlägt, und Probleme gemäß den folgenden Updates beheben. Nachdem Sie alle Testfehler behoben haben, führen Sie Ihre Anwendung aus, um zu sehen, welche Fehler noch auftreten. Sie werden sofort feststellen, ob die Anwendung Methoden oder Eigenschaften verwendet, die nicht unterstützt werden.

<h2 id="changes">Änderungen in Express 5</h2>

Nachfolgend finden Sie eine Liste mit Änderungen (Stand: Alpha-2-Release), die sich auf Sie als Express-Benutzer auswirken werden. Siehe hierzu auch die [Pull-Anforderung](https://github.com/expressjs/express/pull/2237) mit einer Liste aller geplanten Features und Funktionen.

**Entfernte Methoden und Eigenschaften**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Pluralisierte Methodennamen</a></li>
  <li><a href="#leading">Führender Doppelpunkt im Namensargument für app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**Geändert**

<ul class="doclist">
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**Verbesserungen**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>Entfernte Methoden und Eigenschaften</h3>

Wenn Sie eine dieser Methoden oder Eigenschaften in Ihrer Anwendung verwenden, stürzt die Anwendung ab. Sie müssen also Ihre Anwendung ändern, wenn Sie auf Version 5 umgestellt haben.

<h4 id="app.del">app.del()</h4>

Express 5 unterstützt die Funktion `app.del()` nicht mehr. Wenn Sie diese Funktion verwenden, wird ein Fehler ausgelöst. Für die Registrierung von HTTP DELETE-Weiterleitungen verwenden Sie stattdessen die Funktion `app.delete()`.

Anfänglich wurde `del` statt `delete` verwendet, weil `delete` in JavaScript ein reserviertes Schlüsselwort ist. Ab ECMAScript 6 jedoch können `delete` und andere reservierte Schlüsselwörter legal als Eigenschaftsnamen verwendet werden. Lesen hier auch die Diskussion, die zur Einstellung der Unterstützung der Funktion `app.del` geführt hat.

<h4 id="app.param">app.param(fn)</h4>

Die Signatur `app.param(fn)` wurde für die Änderung der Verhaltensweise der Funktion `app.param(name, fn)` verwendet. Seit v4.11.0 wurde sie nicht mehr verwendet.  In Express 5 wird sie überhaupt nicht mehr unterstützt.

<h4 id="plural">Pluralisierte Methodennamen</h4>

Die folgenden Methodennamen wurden pluralisiert. In Express 4 wurde bei Verwendung der alten Methoden eine Warnung zur Einstellung der Unterstützung ausgegeben. Express 5 unterstützt diese Methoden nicht mehr.

`req.acceptsCharset()` wird durch `req.acceptsCharsets()` ersetzt.

`req.acceptsEncoding()` wird durch `req.acceptsEncodings()` ersetzt.

`req.acceptsLanguage()` wird durch `req.acceptsLanguages()` ersetzt.

<h4 id="leading">Führender Doppelpunkt (:) im Namen für app.param(name, fn)</h4>

Ein führendes Doppelpunktzeichen (:) im Namen für die Funktion `app.param(name, fn)` ist ein Überbleibsel aus Express 3. Aus Gründen der Abwärtskompatibilität wurde dieser Name in Express 4 mit einem Hinweis zu veralteten Versionen weiter unterstützt. In Express 5 wird dieser Name stillschwiegend ignoriert und der Namensparameter ohne einen vorangestellten Doppelpunkt verwendet.

Dies dürfte keine Auswirkungen auf Ihren Code haben, wenn Sie die Express 4-Dokumentation zu [app.param](/{{ page.lang }}/4x/api.html#app.param) befolgen, da dort der führende Doppelpunkt nicht erwähnt wird.

<h4 id="req.param">req.param(name)</h4>

Dieses potenziell verwirrende und durchaus riskante Verfahren des Abrufens von Formulardaten wurde entfernt. Sie müssen nun ganz speziell nach dem übergebenen Parameternamen im Objekt `req.params`, `req.body` oder `req.query` suchen.

<h4 id="res.json">res.json(obj, status)</h4>

Express 5 unterstützt die Signatur `res.json(obj, status)` nicht mehr. Stattdessen müssen Sie den Status festlegen und diesen dann mit `res.json()`-Methoden wie  dieser verketten: `res.status(status).json(obj)`.

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 unterstützt die Signatur `res.jsonp(obj, status)` nicht mehr. Stattdessen müssen Sie den Status festlegen und diesen dann mit `res.jsonp()`-Methoden wie  dieser verketten: `res.status(status).jsonp(obj)`.

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5 unterstützt die Signatur `res.send(obj, status)` nicht mehr. Stattdessen müssen Sie den Status festlegen und diesen dann mit `res.send()`-Methoden wie  dieser verketten: `res.status(status).send(obj)`.

<h4 id="res.send.status">res.send(status)</h4>

Express 5 unterstützt die Signatur <code>res.send(<em>status</em>)</code>, nicht mehr, wobei *`status`* für eine Zahl steht. Verwenden Sie stattdessen die Funktion `res.sendStatus(statusCode)`, mit der der Statuscode für den HTTP-Antwort-Header festgelegt und die Textversion des Codes gesendet wird: "Not Found" (Nicht gefunden), "Internal Server Error" (Interner Serverfehler) usw. Wenn Sie eine Zahl senden und hierfür die Funktion `res.send()` verwenden müssen, müssen Sie die Zahl in Anführungszeichen setzen, um diese in eine Zeichenfolge zu konvertieren. Dadurch interpretiert Express diese Zahl nicht als Versuch, die nicht mehr unterstützte alte Signatur zu verwenden.

<h4 id="res.sendfile">res.sendfile()</h4>

Die Funktion `res.sendfile()` wurde durch eine Version in Camel-Schreibweise von `res.sendFile()` in Express 5 ersetzt.

<h3>Geändert</h3>

<h4 id="app.router">app.router</h4>

Das Objekt `app.router`, das in Express 4 entfernt wurde, ist in Express 5 wieder verfügbar. In der neuen Version fungiert dieses Objekt nur als Referenz zum Express-Basisrouter – im Gegensatz zu Express 3, wo die Anwendung dieses Objekt explizit laden musste.

<h4 id="req.host">req.host</h4>

In Express 4 übergab die Funktion `req.host` nicht ordnungsgemäß eine eventuell vorhandene Portnummer. In Express 5 wird die Portnummer beibehalten.

<h4 id="req.query">req.query</h4>

In Express 4.7 und ab Express 5 kann die Abfrageparser-Option `false` akzeptieren, um das Parsing von Abfragezeichenfolgen zu deaktivieren, wenn Sie Ihre eigene Funktion für die Parsinglogik bei Abfragezeichenfolgen verwenden wollen.

<h3>Verbesserungen</h3>

<h4 id="res.render">res.render()</h4>

Diese Methode erzwingt nun asynchrones Verhalten für alle View-Engines, sodass durch View-Engines mit synchroner Implementierung verursachte Fehler vermieden werden, durch die die empfohlene Schnittstelle nicht verwendet werden konnte.
