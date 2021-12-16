---
layout: page
title: Depuración de Express
menu: guide
lang: es
---

# Depuración de Express

Express utiliza el módulo [debug](https://www.npmjs.com/package/debug) internamente para registrar información sobre las coincidencias de rutas, las funciones de middleware que se están utilizando, la modalidad de aplicación y el flujo del ciclo de solicitud/respuestas.

<div class="doc-box doc-info" markdown="1">
`debug` es como una versión aumentada de `console.log`, aunque a diferencia de `console.log`, no tiene que comentar los registros `debug` en el código de producción. El registro está desactivado de forma predeterminada y puede activarse condicionalmente utilizando la variable de entorno `DEBUG`.
</div>

Para ver todos los registros internos utilizados en Express, establezca la variable de entorno `DEBUG` en `express:*` cuando inicie la aplicación.

```console
$ DEBUG=express:* node index.js
```

En Windows, utilice el mandato correspondiente.

```console
> set DEBUG=express:* & node index.js
```

La ejecución de este mandato en la aplicación predeterminada generada por el [generador de Express](/{{ page.lang }}/starter/generator.html) imprime la siguiente salida:

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

Cuando se realiza una solicitud a la aplicación, verá los registros especificados en el código de Express:

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

Para ver sólo los registros de la implementación de direccionador, establezca el valor de `DEBUG` en `express:router`. De la misma forma, para ver sólo los registros de la implementación de aplicación, establezca el valor de `DEBUG` en `express:application`, etc.

## Aplicaciones generadas por `express`

Una aplicación generada por el mandato `express` también utiliza el módulo `debug`, y el ámbito de su espacio de nombres de depuración se establece en el nombre de la aplicación.

Por ejemplo, si ha generado la aplicación con `$ express sample-app`, puede habilitar las sentencias de depuración con el siguiente mandato:

```console
$ DEBUG=sample-app:* node ./bin/www
```

Puede especificar más de un espacio de nombres de depuración asignando una lista separada por comas de nombres:

```console
$ DEBUG=http,mail,express:* node index.js
```

Para obtener más información sobre `debug`, consulte [debug](https://www.npmjs.com/package/debug).
