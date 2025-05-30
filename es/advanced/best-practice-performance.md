---
layout: page
title: Mejores prácticas de rendimiento cuando se utiliza Express en producción
description: Discover performance and reliability best practices for Express apps in production, covering code optimizations and environment setups for optimal performance.
menu: advanced
lang: es
redirect_from: "  "
---

# Production best practices: performance and reliability

En este artículo se describen las mejores prácticas de rendimiento y fiabilidad para las aplicaciones Express desplegadas en producción.

Este tema entra claramente dentro del área de "DevOps", que abarca operaciones y desarrollos tradicionales. Por lo tanto, la información se divide en dos partes:

- Cosas que hacer en el código (la parte de desarrollo):
  - [Utilizar la compresión de gzip](#utilizar-la-compresión-de-gzip)
  - [No utilizar funciones síncronas](#no-utilizar-funciones-síncronas)
  - [Realizar un registro correcto](#realizar-un-registro-correcto)
  - [Manejar las excepciones correctamente](#manejar-las-excepciones-correctamente)
- Cosas que hacer en el entorno / configuración (la parte de operaciones):
  - [Establecer NODE_ENV en "production"](#establecer-node_env-en-production)
  - [Asegurarse de que la aplicación se reinicia automáticamente](#asegurarse-de-que-la-aplicación-se-reinicia-automáticamente)
  - [Ejecutar la aplicación en un clúster](#ejecutar-la-aplicación-en-un-clúster)
  - [Almacenar en la caché los resultados de la solicitud](#almacenar-en-la-caché-los-resultados-de-la-solicitud)
  - [Utilizar un equilibrador de carga](#utilizar-un-equilibrador-de-carga)
  - [Utilizar un proxy inverso](#utilizar-un-proxy-inverso)

## Cosas que hacer en el código

Estas son algunas de las cosas que puede hacer en el código para mejorar el rendimiento de la aplicación:

- [Utilizar la compresión de gzip](#utilizar-la-compresión-de-gzip)
- [No utilizar funciones síncronas](#no-utilizar-funciones-síncronas)
- [Realizar un registro correcto](#realizar-un-registro-correcto)
- [Manejar las excepciones correctamente](#manejar-las-excepciones-correctamente)

### Utilizar la compresión de gzip

La compresión de gzip puede disminuir significativamente el tamaño del cuerpo de respuesta y, por lo tanto, aumentar la velocidad de una aplicación web. Utilice el middleware de [compresión](https://www.npmjs.com/package/compression) para la compresión de gzip en la aplicación Express. For example:

```js
const compression = require('compression')
const express = require('express')
const app = express()

app.use(compression())
```

Para un sitio web con un tráfico elevado en producción, la mejor forma de aplicar la compresión es implementarla como un nivel de proxy inverso (consulte [Utilizar un proxy inverso](#proxy)). En este caso, no es necesario utilizar el middleware de compresión. Para obtener detalles sobre cómo habilitar la compresión de gzip en Nginx, consulte [Module ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html) en la documentación de Nginx.

### No utilizar funciones síncronas

Las funciones síncronas y los métodos impiden el avance del proceso de ejecución hasta que vuelven. Una llamada individual a una función síncrona puede volver en pocos microsegundos o milisegundos, aunque en sitios web de tráfico elevado, estas llamadas se suman y reducen el rendimiento de la aplicación. Evite su uso en producción.

Aunque Node y muchos módulos proporcionan versiones síncronas y asíncronas de las funciones, utilice siempre la versión asíncrona en producción. La única vez que está justificado utilizar una función síncrona es en el arranque inicial.

You can use the `--trace-sync-io` command-line flag to print a warning and a stack trace whenever your application uses a synchronous API. Desde luego, no deseará utilizarlo en producción, sólo para garantizar que el código está listo para producción. Consulte [Weekly update for io.js 2.1.0](https://nodejs.org/en/blog/weekly-updates/weekly-update.2015-05-22/#2-1-0) para obtener más información.

### Realizar un registro correcto

En general, hay dos motivos para realizar un registro desde la aplicación: a efectos de depuración o para registrar la actividad de la aplicación (básicamente, todo lo demás). El uso de `console.log()` o `console.err()` para imprimir mensajes de registro en el terminal es una práctica común en el desarrollo. But [these functions are synchronous](https://nodejs.org/api/console.html#console) when the destination is a terminal or a file, so they are not suitable for production, unless you pipe the output to another program.

#### For debugging

Si realiza el registro a efectos de depuración, en lugar de utilizar `console.log()`, utilice un módulo de depuración especial como [debug](https://www.npmjs.com/package/debug). Este módulo permite utilizar la variable de entorno DEBUG para controlar qué mensajes de depuración se envían a `console.err()`, si se envía alguno. Para mantener la aplicación básicamente asíncrona, deberá canalizar `console.err()` a otro programa. Pero en este caso, realmente no va a depurar en producción, ¿no?

#### Para la actividad de la aplicación

If you're logging app activity (for example, tracking traffic or API calls), instead of using `console.log()`, use a logging library like [Pino](https://www.npmjs.com/package/pino), which is the fastest and most efficient option available.

### Manejar las excepciones correctamente

Las aplicaciones Node se bloquean cuando encuentran una excepción no capturada. Si no maneja las excepciones ni realiza las acciones necesarias, la aplicación Express se bloqueará y quedará fuera de línea. Si sigue el consejo de [Asegurarse de que la aplicación se reinicia automáticamente](#restart) más abajo, la aplicación se recuperará de un bloqueo. Afortunadamente, las aplicaciones Express normalmente necesitan un breve tiempo de arranque. No obstante, desea evitar el bloqueo en primer lugar y, para ello, deberá manejar correctamente las excepciones.

Para asegurarse de manejar todas las excepciones, siga estas técnicas:

- [Utilizar try-catch](#try-catch)
- [Utilizar promesas](#utilizar-promesas)

Antes de profundizar en estos temas, deberá tener unos conocimientos básicos del manejo de errores de Node/Express: el uso de devoluciones de llamada error-first y la propagación de errores en el middleware. Node utiliza un convenio de "devolución de llamada error-first" para devolver los errores de las funciones asíncronas, donde el primer parámetro en la función de devolución de llamada es el objeto de error, seguido de los datos de resultados en los parámetros posteriores. Para indicar que no hay ningún error, pase null como el primer parámetro. La función de devolución de llamada debe seguir por lo tanto el convenio de devolución de llamada error-first para manejar correctamente el error. En Express, la práctica recomendada es utilizar la función next() para propagar los errores a través de la cadena de middleware.

Para obtener más información sobre los aspectos básicos del manejo de errores, consulte:

- [Error Handling in Node.js](https://www.tritondatacenter.com/node-js/production/design/errors)

#### Utilizar try-catch

Try-catch es una construcción de lenguaje JavaScript que puede utilizar para capturar excepciones en código síncrono. Por ejemplo, utilice try-catch para manejar los errores de análisis de JSON, como se muestra a continuación.

A continuación, se muestra un ejemplo de uso de try-catch para manejar una posible excepción de bloqueo de proceso.
Esta función de middleware acepta un parámetro de campo de consulta denominado "params" que es un objeto JSON.

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params
    try {
      const jsonObj = JSON.parse(jsonStr)
      res.send('Success')
    } catch (e) {
      res.status(400).send('Invalid JSON string')
    }
  })
})
```

No obstante, try-catch sólo funciona para el código síncrono. Como la plataforma de Node es principalmente asíncrona (particularmente en un entorno de producción), try-catch no capturará muchas excepciones.

#### Use promises

When an error is thrown in an `async` function or a rejected promise is awaited inside an `async` function, those errors will be passed to the error handler as if calling `next(err)`

```js
app.get('/', async (req, res, next) => {
  const data = await userData() // If this promise fails, it will automatically call `next(err)` to handle the error.

  res.send(data)
})

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).send({ error: err.message })
})
```

Also, you can use asynchronous functions for your middleware, and the router will handle errors if the promise fails, for example:

```js
app.use(async (req, res, next) => {
  req.locals.user = await getUser(req)

  next() // This will be called if the promise does not throw an error.
})
```

Best practice is to handle errors as close to the site as possible. So while this is now handled in the router, it’s best to catch the error in the middleware and handle it without relying on separate error-handling middleware.

#### Qué no debe hacer

Algo que _no_ debe hacer es escuchar el suceso `uncaughtException`, que se emite cuando una excepción se reproduce hacia atrás en el bucle de sucesos. La adición de un escucha de sucesos para `uncaughtException` cambiará el comportamiento predeterminado del proceso que se encuentra con la excepción; el proceso continuará ejecutándose a pesar de la excepción. Esto puede parecer una buena forma de evitar el bloqueo de la aplicación, pero continuar ejecutando la aplicación después de una excepción no capturada es una práctica peligrosa y no se recomienda, ya que el estado del proceso se vuelve imprevisible y poco fiable.

Asimismo, el uso de `uncaughtException` se reconoce oficialmente como un mecanismo [arduo](https://nodejs.org/api/process.html#process_event_uncaughtexception) y hay una [propuesta](https://github.com/nodejs/node-v0.x-archive/issues/2582) para eliminarlo del núcleo. Por lo tanto, la escucha `uncaughtException` no es una buena idea. Es por esto por lo que se recomiendan varios procesos y supervisores; el bloqueo y el reinicio es a menudo la forma más fiable de recuperarse de un error.

Tampoco se recomienda el uso de [dominios](https://nodejs.org/api/domain.html). Generalmente no soluciona el problema y es un módulo en desuso.

## Things to do in your environment / setup

{#in-environment}

Estas son algunas de las cosas que puede hacer en el entorno del sistema para mejorar el rendimiento de la aplicación:

- [Establecer NODE_ENV en "production"](#establecer-node_env-en-production)
- [Asegurarse de que la aplicación se reinicia automáticamente](#asegurarse-de-que-la-aplicación-se-reinicia-automáticamente)
- [Ejecutar la aplicación en un clúster](#ejecutar-la-aplicación-en-un-clúster)
- [Almacenar en la caché los resultados de la solicitud](#almacenar-en-la-caché-los-resultados-de-la-solicitud)
- [Utilizar un equilibrador de carga](#utilizar-un-equilibrador-de-carga)
- [Utilizar un proxy inverso](#utilizar-un-proxy-inverso)

### Establecer NODE_ENV en "production"

La variable de entorno NODE_ENV especifica el entorno en el que se ejecuta una aplicación (normalmente, desarrollo o producción). One of the simplest things you can do to improve performance is to set NODE_ENV to `production`.

Si establece NODE_ENV en "production", Express:

- Almacena en la caché las plantillas de vistas.
- Almacena en la caché los archivos CSS generados en las extensiones CSS.
- Genera menos mensajes de error detallados.

[Tests indicate](https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/) that just doing this can improve app performance by a factor of three!

If you need to write environment-specific code, you can check the value of NODE_ENV with `process.env.NODE_ENV`. Tenga en cuenta que comprobar el valor de una variable de entorno supone una reducción de rendimiento, por lo que debe hacerse moderadamente.

En el desarrollo, normalmente establece las variables de entorno en el shell interactivo, por ejemplo, utilizando `export` o su archivo `.bash_profile`. But in general, you shouldn't do that on a production server; instead, use your OS's init system (systemd). En la siguiente sección se proporcionan más detalles sobre el uso del sistema init en general, pero el establecimiento de NODE_ENV es tan importante (y fácil de hacer) para el rendimiento, que se resalta aquí.

Con systemd, utilice la directiva `Environment` en el archivo unit. For example:

```sh
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
```

For more information, see [Using Environment Variables In systemd Units](https://www.flatcar.org/docs/latest/setup/systemd/environment-variables/).

### Asegurarse de que la aplicación se reinicia automáticamente

En la producción, no desea que la aplicación esté nunca fuera de línea. Esto significa que debe asegurarse de que se reinicia si la aplicación o el servidor se bloquean. Aunque espera que no se produzca ninguno de estos sucesos, si somos realistas, debe tener en cuenta ambas eventualidades de la siguiente manera:

- Utilizando un gestor de procesos para reiniciar la aplicación (y Node) cuando se bloquea.
- Utilizando el sistema init que proporciona su sistema operativo para reiniciar el gestor de procesos cuando se bloquea el sistema operativo. También puede utilizar el sistema init sin un gestor de procesos.

Las aplicaciones Node se bloquean si encuentran una excepción no capturada. Lo primero que debe hacer es asegurarse de que se realizan las pruebas correctas en la aplicación y que se manejan todas las excepciones (consulte [Manejar correctamente las excepciones](#exceptions) para obtener detalles). No obstante, para estar libre de errores, aplique un mecanismo para garantizar que cuando se bloquee la aplicación, se reinicie automáticamente.

#### Utilizar un gestor de procesos

En el desarrollo, la aplicación se inicia simplemente desde la línea de mandatos con `node server.js` o algo similar. Pero hacer esto en la producción es sinónimo de desastre. Si la aplicación se bloquea, estará fuera de línea hasta que la reinicie. Para garantizar el reinicio de la aplicación si se bloquea, utilice un gestor de procesos. Un gestor de procesos es un "contenedor" de aplicaciones que facilita el despliegue, proporciona una alta disponibilidad y permite gestionar la aplicación en el tiempo de ejecución.

Además de reiniciar la aplicación cuando se bloquea, un gestor de procesos permite:

- Obtener información útil sobre el rendimiento en tiempo de ejecución y el consumo de recursos.
- Modificar dinámicamente los valores para mejorar el rendimiento.
- Control clustering (pm2).

Historically, it was popular to use a Node.js process manager like [PM2](https://github.com/Unitech/pm2). See their documentation if you wish to do this. However, we recommend using your init system for process management.

#### Utilizar un sistema init

La siguiente capa de fiabilidad es garantizar que la aplicación se reinicie cuando se reinicie el servidor. Los sistemas pueden bloquearse por una amplia variedad de motivos. Para garantizar que la aplicación se reinicie si se bloquea el servidor, utilice el sistema init incorporado en su sistema operativo. The main init system in use today is [systemd](https://wiki.debian.org/systemd).

Hay dos formas de utilizar los sistemas init con la aplicación Express:

- Ejecutar la aplicación en un gestor de procesos e instalar el gestor de procesos como un servicio con el sistema init. El gestor de procesos reiniciará la aplicación cuando esta se bloquee y el sistema init reiniciará el gestor de procesos cuando se reinicie el sistema operativo. This is the recommended approach.
- Ejecutar la aplicación (y Node) directamente con el sistema init. Esta opción parece más simple, pero no tiene las ventajas adicionales de utilizar el gestor de procesos.

##### Systemd

Systemd es un administrador de servicios y sistemas Linux. La mayoría de las principales distribuciones Linux han adoptado systemd como su sistema init predeterminado.

Un archivo de configuración de servicio de systemd se denomina un _archivo unit_, con un nombre de archivo terminado en .service. A continuación, se muestra un archivo unit de ejemplo para gestionar directamente una aplicación Node (sustituya el texto en negrita por los valores de su sistema y su aplicación): Replace the values enclosed in `<angle brackets>` for your system and app:

```sh
[Unit]
Description=<Awesome Express App>

[Service]
Type=simple
ExecStart=/usr/local/bin/node </projects/myapp/index.js>
WorkingDirectory=</projects/myapp>

User=nobody
Group=nogroup

# Environment variables:
Environment=NODE_ENV=production

# Allow many incoming connections
LimitNOFILE=infinity

# Allow core dumps for debugging
LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
```

Para obtener más información sobre systemd, consulte [systemd reference (man page)](http://www.freedesktop.org/software/systemd/man/systemd.unit.html).

### Ejecutar la aplicación en un clúster

En un sistema multinúcleo, puede multiplicar el rendimiento de una aplicación Node iniciando un clúster de procesos. Un clúster ejecuta varias instancias de la aplicación, idealmente una instancia en cada núcleo de CPU, lo que permite distribuir la carga y las tareas entre las instancias.

![Balancing between application instances using the cluster API](/images/clustering.png)

IMPORTANTE: como las instancias de aplicación se ejecutan como procesos independientes, no comparten el mismo espacio de memoria. Es decir, los objetos son locales para cada instancia de la aplicación. Por lo tanto, no puede mantener el estado en el código de aplicación. No obstante, puede utilizar un almacén de datos en memoria como [Redis](http://redis.io/) para almacenar los datos y los estados relacionados con la sesión. Esta advertencia se aplica básicamente a todas las formas de escalado horizontal, ya sean clústeres con varios procesos o varios servidores físicos.

En las aplicaciones en clúster, los procesos de trabajador pueden bloquearse individualmente sin afectar al resto de los procesos. Aparte de las ventajas de rendimiento, el aislamiento de errores es otro motivo para ejecutar un clúster de procesos de aplicación. Siempre que se bloquee un proceso de trabajador, asegúrese de registrar el suceso y generar un nuevo proceso utilizando cluster.fork().

#### Mediante el módulo de clúster de Node

Clustering is made possible with Node's [cluster module](https://nodejs.org/api/cluster.html). Esto permite al proceso maestro generar procesos de trabajador y distribuir las conexiones entrantes entre los trabajadores.

#### Using PM2

If you deploy your application with PM2, then you can take advantage of clustering _without_ modifying your application code. You should ensure your [application is stateless](https://pm2.keymetrics.io/docs/usage/specifics/#stateless-apps) first, meaning no local data is stored in the process (such as sessions, websocket connections and the like).

When running an application with PM2, you can enable **cluster mode** to run it in a cluster with a number of instances of your choosing, such as the matching the number of available CPUs on the machine. You can manually change the number of processes in the cluster using the `pm2` command line tool without stopping the app.

To enable cluster mode, start your application like so:

```bash
# Start 4 worker processes
$ pm2 start npm --name my-app -i 4 -- start
# Auto-detect number of available CPUs and start that many worker processes
$ pm2 start npm --name my-app -i max -- start
```

This can also be configured within a PM2 process file (`ecosystem.config.js` or similar) by setting `exec_mode` to `cluster` and `instances` to the number of workers to start.

Once running, the application can be scaled like so:

```bash
# Add 3 more workers
$ pm2 scale my-app +3
# Scale to a specific number of workers
$ pm2 scale my-app 2
```

For more information on clustering with PM2, see [Cluster Mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/) in the PM2 documentation.

### Almacenar en la caché los resultados de la solicitud

Otra estrategia para mejorar el rendimiento en la producción es almacenar en la caché el resultado de las solicitudes, para que la aplicación no repita la operación de dar servicio a la misma solicitud repetidamente.

Use a caching server like [Varnish](https://www.varnish-cache.org/) or [Nginx](https://blog.nginx.org/blog/nginx-caching-guide) (see also [Nginx Caching](https://serversforhackers.com/nginx-caching/)) to greatly improve the speed and performance of your app.

### Utilizar un equilibrador de carga

Independientemente de lo optimizada que esté una aplicación, una única instancia sólo puede manejar una cantidad limitada de carga y tráfico. Una forma de escalar una aplicación es ejecutar varias instancias de la misma y distribuir el tráfico utilizando un equilibrador de carga. La configuración de un equilibrador de carga puede mejorar el rendimiento y la velocidad de la aplicación, lo que permite escalarla más que con una única instancia.

Un equilibrador de carga normalmente es un proxy inverso que orquesta el tráfico hacia y desde los servidores y las instancias de aplicación. You can easily set up a load balancer for your app by using [Nginx](https://nginx.org/en/docs/http/load_balancing.html) or [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Con el equilibrio de carga, deberá asegurarse de que las solicitudes asociadas con un determinado ID de sesión se conecten al proceso que las ha originado. Esto se conoce como _afinidad de sesiones_ o _sesiones adhesivas_, y puede solucionarse con la recomendación anterior de utilizar un almacén de datos como, por ejemplo, Redis para los datos de sesión (dependiendo de la aplicación). Para obtener más información, consulte [Using multiple nodes](https://socket.io/docs/v4/using-multiple-nodes/).

### Utilizar un proxy inverso

Un proxy inverso se coloca delante de una aplicación web y realiza operaciones de soporte en las solicitudes, aparte de dirigir las solicitudes a la aplicación. Puede manejar las páginas de errores, la compresión, el almacenamiento en memoria caché, el servicio de archivos y el equilibrio de carga, entre otros.

La entrega de tareas que no necesitan saber el estado de la aplicación a un proxy inverso permite a Express realizar tareas de aplicación especializadas. For this reason, it is recommended to run Express behind a reverse proxy like [Nginx](https://www.nginx.org/) or [HAProxy](https://www.haproxy.org/) in production.
