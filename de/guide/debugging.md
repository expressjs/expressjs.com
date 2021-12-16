---
layout: page
title: Debugging bei Express
menu: guide
lang: de
---

# Debugging bei Express

Express verwendet das Modul [debug](https://www.npmjs.com/package/debug) intern, um Informationen zu Weiterleitungsübereinstimmungen, verwendete Middlewarefunktionen, Anwendungsmodi und den Verlauf des Anforderung/Antwort-Zyklus zu protokollieren.

<div class="doc-box doc-info" markdown="1">
`debug` ist praktisch eine erweiterte Version von `console.log`. Im Gegensatz zu `console.log` müssen jedoch
keine `debug`-Protokolle im Produktionscode auskommentiert werden. Die Protokollierung wird standardmäßig inaktiviert und kann über die Umgebungsvariable `DEBUG` bedingt aktiviert werden.
</div>

Wenn Sie alle in Express verwendeten internen Protokolle anzeigen wollen, legen Sie beim Starten Ihrer Anwendung die Umgebungsvariable `DEBUG` auf `express:*` fest.

```console
$ DEBUG=express:* node index.js
```

Verwenden Sie unter Windows den entsprechenden Befehl.

```console
> set DEBUG=express:* & node index.js
```

Die Ausführung dieses Befehls für die durch [express generator](/{{ page.lang }}/starter/generator.html) generierte Standardanwendung resultiert in folgender Ausgabe:

```console
$ DEBUG=express:* node ./bin/www
  express:router:route new / +0ms
  express:router:layer new / +1ms
  express:router:route get / +1ms
  express:router:layer new / +0ms
  express:router:route new / +1ms
  express:router:layer new / +0ms
  express:router:route get / +0ms
  express:router:layer new / +0ms
  express:application compile etag weak +1ms
  express:application compile query parser extended +0ms
  express:application compile trust proxy false +0ms
  express:application booting in development mode +1ms
  express:router use / query +0ms
  express:router:layer new / +0ms
  express:router use / expressInit +0ms
  express:router:layer new / +0ms
  express:router use / favicon +1ms
  express:router:layer new / +0ms
  express:router use / logger +0ms
  express:router:layer new / +0ms
  express:router use / jsonParser +0ms
  express:router:layer new / +1ms
  express:router use / urlencodedParser +0ms
  express:router:layer new / +0ms
  express:router use / cookieParser +0ms
  express:router:layer new / +0ms
  express:router use / stylus +90ms
  express:router:layer new / +0ms
  express:router use / serveStatic +0ms
  express:router:layer new / +0ms
  express:router use / router +0ms
  express:router:layer new / +1ms
  express:router use /users router +0ms
  express:router:layer new /users +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
```

Bei einer Anforderung an die Anwendung sind die Protokolle im Express-Code angegeben:

```console
  express:router dispatching GET / +4h
  express:router query  : / +2ms
  express:router expressInit  : / +0ms
  express:router favicon  : / +0ms
  express:router logger  : / +1ms
  express:router jsonParser  : / +0ms
  express:router urlencodedParser  : / +1ms
  express:router cookieParser  : / +0ms
  express:router stylus  : / +0ms
  express:router serveStatic  : / +2ms
  express:router router  : / +2ms
  express:router dispatching GET / +1ms
  express:view lookup "index.pug" +338ms
  express:view stat "/projects/example/views/index.pug" +0ms
  express:view render "/projects/example/views/index.pug" +1ms
```

Wenn Sie nur die Protokolle von der Routerimplementierung sehen wollen, legen Sie den Wert für `DEBUG` auf `express:router` fest. Gleichermaßen gilt: Wenn Sie nur die Protokolle von der Anwendungsimplementierung sehen wollen, legen Sie den Wert für `DEBUG` auf `express:application` fest, usw.

## Von `express` generierte Anwendungen

Eine über den Befehl `express` generierte Anwendung verwendet ebenfalls das Modul `debug`. Der Debug-Namespace wird auf den Namen der Anwendung erweitert.

Beispiel: Wenn Sie die Anwendung mit `$ express sample-app` generiert haben, können Sie die Debuganweisungen mit dem folgenden Befehl aktivieren:

```console
$ DEBUG=sample-app:* node ./bin/www
```

Sie können mehrere Debug-Namespaces in einer durch Kommas getrennten Namensliste angeben:

```console
$ DEBUG=http,mail,express:* node index.js
```

Weitere Informationen zu `debug` finden Sie unter [debug](https://www.npmjs.com/package/debug).
