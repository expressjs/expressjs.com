---
layout: page
title: Debugging bei Express
description: Learn how to enable and use debugging logs in Express.js applications by setting the DEBUG environment variable for enhanced troubleshooting.
menu: guide
lang: de
---

# Debugging bei Express

Wenn Sie alle in Express verwendeten internen Protokolle anzeigen wollen, legen Sie beim Starten Ihrer Anwendung die Umgebungsvariable `DEBUG` auf `express:*` fest.

```bash
$ DEBUG=express:* node index.js
```

Verwenden Sie unter Windows den entsprechenden Befehl.

```bash
> set DEBUG=express:* & node index.js
```

Die Ausführung dieses Befehls für die durch [express generator](/{{ page.lang }}/starter/generator.html) generierte Standardanwendung resultiert in folgender Ausgabe:

```bash
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

```bash
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

Beispiel: Wenn Sie die Anwendung mit `$ express sample-app` generiert haben, können Sie die Debuganweisungen mit dem folgenden Befehl aktivieren:

```bash
$ DEBUG=sample-app:* node ./bin/www
```

Sie können mehrere Debug-Namespaces in einer durch Kommas getrennten Namensliste angeben:

```bash
$ DEBUG=http,mail,express:* node index.js
```
