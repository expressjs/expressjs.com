---
layout: página
title: Depuración de Express
description: Aprenda cómo habilitar y utilizar los registros de depuración en aplicaciones Express.js configurando la variable de entorno DEBUG para solucionar problemas mejorados.
menu: guía
lang: es
redirect_from: /es/guide/debugging.html
---

# Depuración de Express

Para ver todos los registros internos utilizados en Express, establezca la variable de entorno `DEBUG` en `express:*` cuando inicie la aplicación.

```bash
$ DEBUG=express:* nodo index.js
```

En Windows, utilice el mandato correspondiente.

```bash
> $env:DEBUG = "express:*"; node index.js
```

La ejecución de este mandato en la aplicación predeterminada generada por el [generador de Express](/{{ page.lang }}/starter/generator.html) imprime la siguiente salida:

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

Cuando se realiza una solicitud a la aplicación, verá los registros especificados en el código de Express:

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

Para ver sólo los registros de la implementación de direccionador, establezca el valor de `DEBUG` en `express:router`. De la misma forma, para ver sólo los registros de la implementación de aplicación, establezca el valor de `DEBUG` en `express:application`, etc.

## Aplicaciones generadas por `express`

Una aplicación generada por el mandato `express` utiliza el módulo `debug`, y el ámbito de su espacio de nombres de depuración se establece en el nombre de la aplicación.

Por ejemplo, si ha generado la aplicación con `$ express sample-app`, puede habilitar las sentencias de depuración con el siguiente mandato:

```bash
$ DEBUG=sample-app:* nodo ./bin/www
```

Puede especificar más de un espacio de nombres de depuración asignando una lista separada por comas de nombres:

```bash
$ DEBUG=http,mail,express:* nodo index.js
```

## Opciones avanzadas

Cuando se ejecuta a través de Node.js, puede establecer algunas variables de entorno que cambiarán el comportamiento del registro de depuración:

| Nombre              | Propósito                                                                             |
| ------------------- | ------------------------------------------------------------------------------------- |
| `DEBUG`             | Habilita o deshabilita espacios de nombres específicos de depuración. |
| `DEBUG_COLORS`      | Usar o no colores en la salida de depuración.                         |
| `DEBUG_DEPTH`       | Profundidad de inspección de objetos.                                 |
| `DEBUG_FD`          | Descriptor de archivo en el que escribir salida de depuración.        |
| `DEBUG_SHOW_HIDDEN` | Muestra propiedades ocultas en los objetos esperados.                 |

{% include admonitions/note. tml content="Las variables de entorno que empiezan con `DEBUG_` terminan siendo
convertidas en un objeto de opciones que se usa con formateadores%o`/`%O`.
Vea la documentación de Node.js para [`util.inspect()\`](https://nodejs.org/api/util.html#util_util_inspect_object_options)
para la lista completa." %}
