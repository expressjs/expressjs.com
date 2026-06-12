---
title: 'Mejores prácticas de producción: rendimiento y fiabilidad'
description: Descubra las mejores prácticas de rendimiento y fiabilidad para aplicaciones Express en producción, cubriendo optimizaciones de código y configuraciones de entorno para un rendimiento óptimo.
---

Este artículo analiza el rendimiento y la fiabilidad de las mejores prácticas para aplicaciones Express implementadas en producción.

Este tema entra claramente en el mundo de los "devops", que abarca tanto el desarrollo tradicional como las operaciones. En consecuencia, la información se divide en dos partes:

- Cosas que hacer en tu código (la parte del desarrollador):
  - [Usar compresión gzip](#use-gzip-compression)
  - [No usar funciones sincrónicas](#dont-use-synchronous-functions)
  - [Registrar correctamente] (#do-logging-correctly)
  - [Manejar excepciones correctamente](#handle-exceptions-properly)
- Cosas que hacer en tu entorno / configuración (parte de la opción):
  - [Establecer NODE_ENV a "producción"](#set-node_env-to-production)
  - [Asegúrate de que tu aplicación se reinicie automáticamente](#ensure-your-app-automatically-restarts)
  - [Ejecutar tu aplicación en un clúster](#run-your-app-in-a-cluster)
  - [Cache request results](#cache-request-results)
  - [Usa un balanceador de carga](#use-a-load-balancer)
  - [Usa un proxy inverso](#use-a-reverse-proxy)

## Cosas que hacer en tu código

Aquí hay algunas cosas que puedes hacer en tu código para mejorar el rendimiento de tu aplicación:

- [Usar compresión gzip](#use-gzip-compression)
- [No usar funciones sincrónicas](#dont-use-synchronous-functions)
- [Registrar correctamente] (#do-logging-correctly)
- [Manejar excepciones correctamente](#handle-exceptions-properly)

### Usar compresión gzip

La compresión Gzip puede disminuir en gran medida el tamaño del cuerpo de respuesta y por lo tanto aumentar la velocidad de una aplicación web. Utilice el Middleware [compression](https://www.npmjs.com/package/compression) para compresión gzip en su aplicación Express. Por ejemplo:

```js
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression());
```

Para un sitio web de alto tráfico en producción, la mejor manera de poner compresión en su lugar es implementarla en un nivel proxy inverso (ver [Usar un proxy inverso](#use-a-reverse-proxy)). En ese caso, no necesita usar middleware de compresión. Para más detalles sobre habilitar compresión gzip en Nginx, vea [Módulo ngx_http_gzip_module](https://nginx.org/en/docs/http/ngx_http_gzip_module.html) en la documentación de Nginx.

### No utilizar funciones sincrónicas

Las funciones y métodos sincrónicos emiten el proceso de ejecución hasta que regresen. Una sola llamada a una función sincrónica puede regresar en unos pocos microsegundos o milisegundos, Sin embargo, en sitios web de alto tráfico, estas llamadas añaden y reducen el rendimiento de la aplicación. Evite su uso en la producción.

Aunque Node y muchos módulos proporcionan versiones sincrónicas y asíncronas de sus funciones, siempre utiliza la versión asíncrona en producción. La única vez que una función sincrónica puede ser justificada es al inicio inicial.

Puedes usar la bandera de línea de comandos `--trace-sync-io` para imprimir una advertencia y un stack trace cada vez que tu aplicación usa una API sincrónica. Por supuesto, no querrías usar esto en la producción, sino más bien asegurar que tu código esté listo para la producción. Vea la [documentación de opciones de línea de comandos de nodo](https://nodejs.org/api/cli.html#trace-sync-io) para más información.

### Hacer el registro correctamente

En general, hay dos razones para registrarse desde tu aplicación: para depurar y para registrar la actividad de la aplicación (esencialmente, todo lo demás). Usar `console.log()` o `console.error()` para imprimir mensajes de registro en la terminal es práctica común en desarrollo. Pero [estas funciones son sincrónicas](https://nodejs.org/api/console.html) cuando el destino es un terminal o un archivo, por lo que no son aptos para la producción, a menos que usted pipe la salida a otro programa.

#### Para depuración

Si está registrando para fines de depuración, entonces en lugar de usar `console.log()`, utilice un módulo especial de depuración como [debug](https://www.npmjs.com/package/debug). Este módulo le permite usar la variable de entorno DEBUG para controlar qué mensajes de depuración se envían a `console.error()`, si los hay. Para mantener tu aplicación puramente asincrónica, todavía quieres pipe `console.error()` a otro programa. Pero entonces, no vas a depurar en la producción, ¿verdad?

#### Para actividad de la aplicación

Si estás registrando actividad de la aplicación (por ejemplo, rastreando tráfico o llamadas de API), en lugar de usar `console. og()`, utiliza una biblioteca de registro como [Pino](https://www.npmjs.com/package/pino), que es la opción más rápida y eficiente disponible.

### Manejar excepciones correctamente

Las aplicaciones del nodo fallan cuando se encuentran con una excepción no capturada. No manejar excepciones y tomar las acciones apropiadas hará que su aplicación Express se bloquee y se desconecte. Si sigues los consejos de [Asegúrate de que tu aplicación se reinicie automáticamente](#ensure-your-app-automatically-restarts) a continuación, tu aplicación se recuperará de un cuelgue. Afortunadamente, las aplicaciones Express típicamente tienen un corto tiempo de inicio. Sin embargo, usted quiere evitar el bloqueo en primer lugar, y para hacerlo, necesita manejar las excepciones adecuadamente.

Para asegurar que maneja todas las excepciones, utilice las siguientes técnicas:

- [Usar try-catch](#use-try-catch)
- [Usar promesas](#use-promises)

Antes de sumergirte en estos temas, deberías tener una comprensión básica del manejo de errores de Node/Express: usando callbacks de primer error, y propagando errores en middleware. Node utiliza una convención de "error de primer callback" para devolver errores de funciones asíncronas, donde el primer parámetro de la función callback es el objeto de error, seguido de los datos de resultado en los parámetros posteriores. Para indicar ningún error, pase nulo como el primer parámetro. La función callback debe seguir la convención de devolución de llamada de primer error para manejar el error de forma significativa. Y en Express, la mejor práctica es usar la función next() para propagar errores a través de la cadena middleware.

Para más información sobre los fundamentos del manejo de errores, vea:

- [Manejo de Error en Node.js](https://www.tritondatacenter.com/node-js/production/design/errors)

#### Usar try-catch

Try-catch es una construcción de lenguaje JavaScript que se puede utilizar para capturar excepciones en código sincrónico. Use try-catch, por ejemplo, para manejar errores de análisis JSON como se muestra a continuación.

He aquí un ejemplo del uso de try-catch para manejar una posible excepción de bloqueo de procesos.
Esta función middleware acepta un parámetro de campo de consulta llamado "params" que es un objeto JSON.

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params;
    try {
      const jsonObj = JSON.parse(jsonStr);
      res.send('Success');
    } catch (e) {
      res.status(400).send('Invalid JSON string');
    }
  });
});
```

Sin embargo, try-catch funciona sólo para código sincrónico. Debido a que la plataforma de Node es principalmente asíncrona (especialmente en un entorno de producción), la captura de pruebas no capturará muchas excepciones.

#### Utilizar promesas

Cuando se arroja un error en una función `async` o se espera una promesa rechazada dentro de una función `async`, esos errores se pasarán al gestor de errores como si llamara a `next(err)`

```js
app.get('/', async (req, res, next) => {
  const data = await userData(); // If this promise fails, it will automatically call `next(err)` to handle the error.

  res.send(data);
});

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).send({ error: err.message });
});
```

También, puede utilizar funciones asíncronas para su middleware, y el router manejará errores si la promesa falla, por ejemplo:

```js
app.use(async (req, res, next) => {
  req.locals.user = await getUser(req);

  next(); // This will be called if the promise does not throw an error.
});
```

La mejor práctica es manejar los errores lo más cerca posible del sitio. Así que mientras esto se maneja ahora en el router, es mejor capturar el error en el middleware y manejarlo sin depender de middleware separado para manejar errores.

#### Qué no hacer

Una cosa que debes _no_ hacer es escuchar el evento `uncaughtException`, emitido cuando una excepción emite todo el camino de regreso al bucle del evento. Añadir un detector de eventos para `uncaughtException` cambiará el comportamiento predeterminado del proceso que se encuentra con una excepción; el proceso continuará funcionando a pesar de la excepción. Esto puede sonar como una buena manera de evitar que tu aplicación falle, pero seguir ejecutando la aplicación después de una excepción no capturada es una práctica peligrosa y no se recomienda, porque el estado del proceso se vuelve poco fiable e impredecible.

Además, usar `uncaughtException` es oficialmente reconocido como [crude](https://nodejs.org/api/process.html#event-uncaughtexception). Así que escuchar `uncaughtException` es sólo una mala idea. Por eso recomendamos cosas como múltiples procesos y supervisores: fallar y reiniciar es a menudo la manera más confiable de recuperarse de un error.

Tampoco recomendamos usar [domains](https://nodejs.org/api/domain.html). Generalmente no resuelve el problema y es un módulo obsoleto.

## Cosas que hacer en tu entorno / configuración

Aquí hay algunas cosas que puedes hacer en el entorno de tu sistema para mejorar el rendimiento de tu aplicación:

- [Establecer NODE_ENV a "producción"](#set-node_env-to-production)
- [Asegúrate de que tu aplicación se reinicie automáticamente](#ensure-your-app-automatically-restarts)
- [Ejecutar tu aplicación en un clúster](#run-your-app-in-a-cluster)
- [Cache request results](#cache-request-results)
- [Usa un balanceador de carga](#use-a-load-balancer)
- [Usa un proxy inverso](#use-a-reverse-proxy)

### Establecer NODE_ENV a "producción"

La variable de entorno NODE_ENV especifica el entorno en el que se está ejecutando una aplicación (normalmente, desarrollo o producción). Una de las cosas más sencillas que puedes hacer para mejorar el rendimiento es establecer NODE_ENV en `production`.

Establecer NODE_ENV a "producción" hace Expresión:

- Plantillas de vista de caché.
- Caché de archivos CSS generados a partir de extensiones CSS.
- Generar mensajes de error menos detallados.

¡[Las pruebas indican](https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/) que hacer esto puede mejorar el rendimiento de la aplicación en un factor de tres!

Si necesita escribir código específico del entorno, puede comprobar el valor de NODE_ENV con `process.env.NODE_ENV`. Tenga en cuenta que comprobar el valor de cualquier variable de entorno incurre en una penalidad de rendimiento, y por lo tanto debe hacerse de forma esparcida.

En desarrollo, normalmente estableces variables de entorno en tu shell interactivo, por ejemplo usando `export` o tu archivo `.bash_profile`. Pero en general, no debería hacer esto en un servidor de producción; en cambio, utilice el sistema de inicio de su sistema operativo (systemd). La siguiente sección proporciona más detalles sobre el uso de tu sistema de inicio en general pero configurar `NODE_ENV` es tan importante para el rendimiento (y fácil de hacer), que está resaltado aquí.

Con el sistema, utilice la directiva 'Entorno de Entorno' en su archivo de unidad. Por ejemplo:

```sh

Environment=NODE_ENV=production
```

Para obtener más información, consulte [Usar variables de entorno en unidades del sistema](https://www.flatcar.org/docs/latest/setup/systemd/environment-variables/).

### Asegúrate de que tu aplicación se reinicie automáticamente

En la producción, usted no quiere que su aplicación esté fuera de línea, nunca. Esto significa que necesita asegurarse de que se reinicie si la aplicación se bloquea y si el servidor mismo falla. Aunque usted espera que ninguno de estos eventos ocurra, realísticamente usted debe dar cuenta de ambos eventos por:

- Usar un gestor de procesos para reiniciar la aplicación (y Node) cuando se bloquea.
- Usando el sistema de inicio proporcionado por su sistema operativo para reiniciar el gestor de procesos cuando el sistema operativo se bloquea. También es posible usar el sistema init sin un gestor de procesos.

Las aplicaciones de nodos se estrellan si se encuentran con una excepción no capturada. Lo más importante que tienes que hacer es asegurar que tu aplicación está bien probada y gestiona todas las excepciones (ver [excepciones de manejo correctamente](#handle-exceptions-properly) para más detalles). Pero como seguro de fallos, ponga en marcha un mecanismo para asegurar que si tu aplicación se bloquea y cuando se bloquee, se reiniciará automáticamente.

#### Usar un gestor de procesos

En desarrollo, ha iniciado su aplicación simplemente desde la línea de comandos con `node server.js` o algo similar. Pero hacer esto en la producción es una receta para el desastre. Si la aplicación falla, estará desconectada hasta que la reinicie. Para asegurar que su aplicación se reinicie si se bloquea, utilice un gestor de procesos. Un gestor de procesos es un "contenedor" para aplicaciones que facilita el despliegue, proporciona alta disponibilidad y le permite gestionar la aplicación en tiempo de ejecución.

Además de reiniciar su aplicación cuando falla, un gestor de procesos puede habilitarlo:

- Obtener información sobre el rendimiento y el consumo de recursos en tiempo de ejecución.
- Modificar ajustes dinámicamente para mejorar el rendimiento.
- Clasificación de controles (pm2).

Históricamente, era popular usar un gestor de procesos Node.js como [PM2](https://github.com/Unitech/pm2). Vea su documentación si desea hacer esto. Sin embargo, recomendamos usar su sistema de inicio para la gestión de procesos.

#### Usar un sistema de inicio

La siguiente capa de fiabilidad es asegurar que la aplicación se reinicie cuando el servidor se reinicie. Los sistemas pueden seguir bajando por diversas razones. Para asegurarse de que su aplicación se reinicie si el servidor se bloquea, utilice el sistema init incorporado en su sistema operativo. El sistema principal de inicio en uso hoy es [systemd](https://wiki.debian.org/systemd).

Hay dos formas de usar sistemas de inicio con su aplicación Express:

- Ejecute su aplicación en un gestor de procesos, e instale el gestor de procesos como un servicio con el sistema init. El gestor de procesos reiniciará la aplicación cuando la aplicación se bloquee, y el sistema de inicio reiniciará el gestor de procesos cuando el sistema operativo se reinicie. Este es el enfoque recomendado.
- Ejecute su aplicación (y Node) directamente con el sistema init. Esto es algo más simple, pero no obtiene las ventajas adicionales de usar un gestor de procesos.

##### Systemd

Systemd es un gestor de servicios y sistemas Linux. La mayoría de las distribuciones de Linux más importantes han adoptado el sistema de inicio como su sistema predeterminado.

Un archivo de configuración de servicio systemd se llama _unit file_, con un nombre de archivo que termina en `.service`. Aquí hay un archivo de unidad de ejemplo para administrar directamente una aplicación de Node. Reemplaza los valores encerrados en `<angle brackets>` para tu sistema y aplicación:

```sh
[Unit]
Description=<Awesome Express App>

[Service]
Type=simple
ExecStart=/usr/local/bin/node </projects/myapp/index.js>
WorkingDirectory=</projects/myapp>

User=nobody
Group=nogroup


Environment=NODE_ENV=production


LimitNOFILE=infinity


LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
```

Para más información sobre el sistema, vea la [referencia del sistema (página de manu)] (https://www.freedesktop.org/software/systemd/man/latest/index.html).

### Ejecutar tu aplicación en un clúster

En un sistema multinúcleo, puede aumentar el rendimiento de una aplicación Node muchas veces lanzando un clúster de procesos. Un clúster ejecuta múltiples instancias de la aplicación, idealmente una instancia en cada núcleo de CPU, distribuyendo así la carga y las tareas entre las instancias.

![Balanceo entre las instancias de la aplicación usando la API del clúster](/images/clustering.png)

IMPORTANTE: Dado que las instancias de la aplicación se ejecutan como procesos separados, no comparten el mismo espacio de memoria. Es decir, los objetos son locales a cada instancia de la aplicación. Por lo tanto, no puede mantener el estado en el código de la aplicación. Sin embargo, puede utilizar un datastore en memoria como [Redis](http://redis.io/) para almacenar datos y estado relacionados con la sesión. Esta advertencia se aplica esencialmente a todas las formas de escalado horizontal, ya sea en racimo con múltiples procesos o múltiples servidores físicos.

En las aplicaciones agrupadas, los procesos del worker pueden fallar individualmente sin afectar al resto de los procesos. Aparte de las ventajas de rendimiento, el aislamiento de fallos es otra razón para ejecutar un cluster de procesos de aplicaciones. Cada vez que un proceso worker se bloquea, siempre asegúrese de registrar el evento y generar un nuevo proceso usando cluster.fork().

#### Usando el módulo de cluster del nodo

Clustering es posible con el [módulo de cluster]de Node (https://nodejs.org/api/cluster.html). Esto permite que un proceso maestro genere procesos de trabajador y distribuya conexiones entrantes entre los trabajadores.

#### Usando PM2

Si implementa su aplicación con PM2, puede aprovechar el clustering _without_ modificando su código de aplicación. Deberías asegurarte de que tu [aplicación está sin estado](https://pm2.keymetrics.io/docs/usage/specifics/#stateless-apps) primero, lo que significa que no hay datos locales almacenados en el proceso (como sesiones, conexiones websocket y similares).

Cuando ejecutas una aplicación con PM2, puedes habilitar el **modo clúster** para ejecutarla en un clúster con varias instancias de tu elección, como el número de CPUs disponibles en la máquina. Puede cambiar manualmente el número de procesos en el clúster usando la herramienta de línea de comandos `pm2` sin detener la aplicación.

Para activar el modo cluster, inicia tu aplicación así:

```bash

$ pm2 start npm --name my-app -i 4 -- start

$ pm2 start npm --name my-app -i max -- start
```

Esto también se puede configurar dentro de un archivo de proceso PM2 (`ecosystem.config. s` o similar) estableciendo `exec_mode` a `cluster` y `instancias` al número de workers a comenzar.

Una vez ejecutada, la aplicación puede escalarse así:

```bash

$ pm2 scale my-app +3

$ pm2 scale my-app 2
```

Para más información sobre el clustering con PM2, vea [Modo Cluster](https://pm2.keymetrics.io/docs/usage/cluster-mode/) en la documentación de PM2.

### Resultados de la solicitud de caché

Otra estrategia para mejorar el rendimiento en la producción es almacenar en caché el resultado de las solicitudes, para que tu aplicación no repita la operación para servir la misma petición repetidamente.

Usa un servidor de caché como [Varnish](https://www.varnish-cache.org/) o [Nginx](https://blog.nginx.org/blog/nginx-caching-guide) (ver también [Caching Nginx](https://serversforhackers.com/nginx-caching/)) para mejorar enormemente la velocidad y el rendimiento de tu aplicación.

### Usar un balanceador de carga

No importa cuán optimizada sea una aplicación, una sola instancia puede manejar sólo una cantidad limitada de carga y tráfico. Una forma de escalar una aplicación es ejecutar múltiples instancias de ella y distribuir el tráfico a través de un equilibrador de carga. Configurar un balanceador de carga puede mejorar el rendimiento y la velocidad de tu aplicación, y permitirla escalar más de lo posible con una sola instancia.

Un balanceador de carga es generalmente un proxy inverso que orchestriza tráfico hacia y desde múltiples instancias y servidores de la aplicación. Puedes configurar fácilmente un equilibrador de carga para tu aplicación usando [Nginx](https://nginx.org/en/docs/http/load_balancing.html) o [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Con el saldo de carga, puede que tenga que asegurarse de que las peticiones que están asociadas con un ID de sesión particular se conectan al proceso que las originó. Esto se conoce como _session affinity_, o _sticky sessions_, y puede ser abordado por la sugerencia anterior de utilizar un almacén de datos como Redis para datos de sesión (dependiendo de su aplicación). Para una discusión, vea [Usando múltiples nodos](https://socket.io/docs/v4/using-multiple-nodes/).

### Usar un proxy inverso

Un proxy inverso se sienta frente a una aplicación web y realiza operaciones de soporte en las peticiones, además de dirigir peticiones a la aplicación. Puede manejar páginas de errores, compresión, caché, servir archivos y equilibrar la carga entre otras cosas.

La entrega de tareas que no requieren conocimiento del estado de la aplicación a un proxy inverso libera Express para realizar tareas especializadas de la aplicación. Por esta razón, se recomienda ejecutar Express detrás de un proxy inverso como [Nginx](https://www.nginx.org/) o [HAProxy](https://www.haproxy.org/) en producción.
