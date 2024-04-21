---
layout: page
title: Mejores prácticas de rendimiento cuando se utiliza Express en producción
menu: advanced
lang: es
---

# Mejores prácticas de producción: rendimiento y fiabilidad

## Visión general

En este artículo se describen las mejores prácticas de rendimiento y fiabilidad para las aplicaciones Express desplegadas en producción.

Este tema entra claramente dentro del área de "DevOps", que abarca operaciones y desarrollos tradicionales. Por lo tanto, la información se divide en dos partes:

-   Cosas que hacer en el código (la parte de desarrollo):
    -   [Utilizar la compresión de gzip](#utilizar-la-compresión-de-gzip)
    -   [No utilizar funciones síncronas](#no-utilizar-funciones-síncronas)
    -   [Realizar un registro correcto](#realizar-un-registro-correcto)
    -   [Manejar las excepciones correctamente](#manejar-las-excepciones-correctamente)
-   Cosas que hacer en el entorno / configuración (la parte de operaciones):

    -   [Establecer NODE_ENV en "production"](#establecer-node_env-en-production)
    -   [Asegurarse de que la aplicación se reinicia automáticamente](#asegurarse-de-que-la-aplicación-se-reinicia-automáticamente)
    -   [Ejecutar la aplicación en un clúster](#ejecutar-la-aplicación-en-un-clúster)
    -   [Almacenar en la caché los resultados de la solicitud](#almacenar-en-la-caché-los-resultados-de-la-solicitud)
    -   [Utilizar un equilibrador de carga](#utilizar-un-equilibrador-de-carga)
    -   [Utilizar un proxy inverso](#utilizar-un-proxy-inverso)

<a name="code"></a>

## Cosas que hacer en el código

Estas son algunas de las cosas que puede hacer en el código para mejorar el rendimiento de la aplicación:

-   [Utilizar la compresión de gzip](#utilizar-la-compresión-de-gzip)
-   [No utilizar funciones síncronas](#no-utilizar-funciones-síncronas)
-   [Realizar un registro correcto](#realizar-un-registro-correcto)
-   [Manejar las excepciones correctamente](#manejar-las-excepciones-correctamente)

### Utilizar la compresión de gzip

La compresión de gzip puede disminuir significativamente el tamaño del cuerpo de respuesta y, por lo tanto, aumentar la velocidad de una aplicación web. Utilice el middleware de [compresión](https://www.npmjs.com/package/compression) para la compresión de gzip en la aplicación Express. Por ejemplo:

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

Si utiliza Node.js 4.0+ o io.js 2.1.0+, puede utilizar el distintivo de línea de mandatos `--trace-sync-io` para imprimir un aviso y un seguimiento de la pila siempre que la aplicación utilice una API síncrona. Desde luego, no deseará utilizarlo en producción, sólo para garantizar que el código está listo para producción. Consulte [Weekly update for io.js 2.1.0](https://nodejs.org/en/blog/weekly-updates/weekly-update.2015-05-22/#2-1-0) para obtener más información.

### Realizar un registro correcto

En general, hay dos motivos para realizar un registro desde la aplicación: a efectos de depuración o para registrar la actividad de la aplicación (básicamente, todo lo demás). El uso de `console.log()` o `console.err()` para imprimir mensajes de registro en el terminal es una práctica común en el desarrollo. No obstante, [estas funciones son síncronas](https://nodejs.org/api/console.html#console_console_1) cuando el destino es un terminal o un archivo, por lo que no son adecuadas para producción, a menos que canalice la salida a otro programa.

#### A efectos de depuración

Si realiza el registro a efectos de depuración, en lugar de utilizar `console.log()`, utilice un módulo de depuración especial como [debug](https://www.npmjs.com/package/debug). Este módulo permite utilizar la variable de entorno DEBUG para controlar qué mensajes de depuración se envían a `console.err()`, si se envía alguno. Para mantener la aplicación básicamente asíncrona, deberá canalizar `console.err()` a otro programa. Pero en este caso, realmente no va a depurar en producción, ¿no?

#### Para la actividad de la aplicación

Si está registrando la actividad de la aplicación (por ejemplo, realizando un seguimiento del tráfico o las llamadas de API), en lugar de utilizar `console.log()`, utilice una biblioteca de registro como [Winston](https://www.npmjs.com/package/winston) o [Bunyan](https://www.npmjs.com/package/bunyan). Para ver una comparación detallada de estas dos bibliotecas, consulte el post del blog StrongLoop [Comparing Winston and Bunyan Node.js Logging](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/).

<a name="exceptions"></a>

### Manejar las excepciones correctamente

Las aplicaciones Node se bloquean cuando encuentran una excepción no capturada. Si no maneja las excepciones ni realiza las acciones necesarias, la aplicación Express se bloqueará y quedará fuera de línea. Si sigue el consejo de [Asegurarse de que la aplicación se reinicia automáticamente](#restart) más abajo, la aplicación se recuperará de un bloqueo. Afortunadamente, las aplicaciones Express normalmente necesitan un breve tiempo de arranque. No obstante, desea evitar el bloqueo en primer lugar y, para ello, deberá manejar correctamente las excepciones.

Para asegurarse de manejar todas las excepciones, siga estas técnicas:

-   [Utilizar try-catch](#try-catch)
-   [Utilizar promesas](#utilizar-promesas)

Antes de profundizar en estos temas, deberá tener unos conocimientos básicos del manejo de errores de Node/Express: el uso de devoluciones de llamada error-first y la propagación de errores en el middleware. Node utiliza un convenio de "devolución de llamada error-first" para devolver los errores de las funciones asíncronas, donde el primer parámetro en la función de devolución de llamada es el objeto de error, seguido de los datos de resultados en los parámetros posteriores. Para indicar que no hay ningún error, pase null como el primer parámetro. La función de devolución de llamada debe seguir por lo tanto el convenio de devolución de llamada error-first para manejar correctamente el error. En Express, la práctica recomendada es utilizar la función next() para propagar los errores a través de la cadena de middleware.

Para obtener más información sobre los aspectos básicos del manejo de errores, consulte:

-   [Error Handling in Node.js](https://www.tritondatacenter.com/node-js/production/design/errors)
-   [Building Robust Node Applications: Error Handling](https://strongloop.com/strongblog/robust-node-applications-error-handling/) (blog StrongLoop)

#### Qué no debe hacer

Algo que _no_ debe hacer es escuchar el suceso `uncaughtException`, que se emite cuando una excepción se reproduce hacia atrás en el bucle de sucesos. La adición de un escucha de sucesos para `uncaughtException` cambiará el comportamiento predeterminado del proceso que se encuentra con la excepción; el proceso continuará ejecutándose a pesar de la excepción. Esto puede parecer una buena forma de evitar el bloqueo de la aplicación, pero continuar ejecutando la aplicación después de una excepción no capturada es una práctica peligrosa y no se recomienda, ya que el estado del proceso se vuelve imprevisible y poco fiable.

Asimismo, el uso de `uncaughtException` se reconoce oficialmente como un mecanismo [arduo](https://nodejs.org/api/process.html#process_event_uncaughtexception) y hay una [propuesta](https://github.com/nodejs/node-v0.x-archive/issues/2582) para eliminarlo del núcleo. Por lo tanto, la escucha `uncaughtException` no es una buena idea. Es por esto por lo que se recomiendan varios procesos y supervisores; el bloqueo y el reinicio es a menudo la forma más fiable de recuperarse de un error.

Tampoco se recomienda el uso de [dominios](https://nodejs.org/api/domain.html). Generalmente no soluciona el problema y es un módulo en desuso.

<a name="try-catch"></a>

#### Utilizar try-catch

Try-catch es una construcción de lenguaje JavaScript que puede utilizar para capturar excepciones en código síncrono. Por ejemplo, utilice try-catch para manejar los errores de análisis de JSON, como se muestra a continuación.

Utilice una herramienta como [JSHint](http://jshint.com/) o [JSLint](http://www.jslint.com/) para buscar excepciones implícitas como [errores de referencia o variables sin definir](http://www.jshint.com/docs/options/#undef).

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

<a name="promises"></a>

#### Utilizar promesas

Las promesas manejarán todas las excepciones (explícitas e implícitas) en los bloques de códigos asíncronos que utilicen `then()`. Sólo tiene que añadir `.catch(next)` al final de las cadenas de promesas. Por ejemplo:

```js
app.get('/', (req, res, next) => {
  // do some sync stuff
  queryDb()
    .then((data) => makeCsv(data)) // handle data
    .then((csv) => { /* handle csv */ })
    .catch(next)
})

app.use((err, req, res, next) => {
  // handle error
})
```

Ahora todos los errores, asíncronos y síncronos, se propagarán al middleware de errores.

No obstante, hay dos advertencias:

1.  Todo el código asíncrono debe devolver promesas (excepto los emisores). Si una determinada biblioteca no devuelve promesas, convierta el objeto base utilizando una función de ayuda como [Bluebird.promisifyAll()](http://bluebirdjs.com/docs/api/promise.promisifyall.html).
2.  Los emisores de sucesos (como las secuencias) todavía pueden provocar excepciones no capturadas. Por lo tanto, asegúrese de que está manejando el suceso de error correctamente; por ejemplo:

```js
const wrap = fn => (...args) => fn(...args).catch(args[2])

app.get('/', wrap(async (req, res, next) => {
  const company = await getCompanyById(req.query.id)
  const stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
```

La función `wrap()` es un envoltorio que toma las promesas rechazadas y llama a `next()` con el error como primer argumento. Para más detalles, vea [Asynchronous Error Handling in Express with Promises, Generators and ES7](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/).

Para más información acerca del manejo de errores utilizando promesas, vea [Promises in Node.js with Q – An Alternative to Callbacks](https://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/).

## Cosas que hacer en el entorno / configuración

Estas son algunas de las cosas que puede hacer en el entorno del sistema para mejorar el rendimiento de la aplicación:

-   [Establecer NODE_ENV en "production"](#establecer-node_env-en-production)
-   [Asegurarse de que la aplicación se reinicia automáticamente](#asegurarse-de-que-la-aplicación-se-reinicia-automáticamente)
-   [Ejecutar la aplicación en un clúster](#ejecutar-la-aplicación-en-un-clúster)
-   [Almacenar en la caché los resultados de la solicitud](#almacenar-en-la-caché-los-resultados-de-la-solicitud)
-   [Utilizar un equilibrador de carga](#utilizar-un-equilibrador-de-carga)
-   [Utilizar un proxy inverso](#utilizar-un-proxy-inverso)

### Establecer NODE_ENV en "production"

La variable de entorno NODE_ENV especifica el entorno en el que se ejecuta una aplicación (normalmente, desarrollo o producción). Una de las cosas más sencillas que puede hacer para mejorar el rendimiento es establecer NODE_ENV en "production".

Si establece NODE_ENV en "production", Express:

-   Almacena en la caché las plantillas de vistas.
-   Almacena en la caché los archivos CSS generados en las extensiones CSS.
-   Genera menos mensajes de error detallados.

Las [pruebas indican](http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/) que sólo esta acción puede mejorar hasta tres veces el rendimiento de la aplicación.

Si necesita escribir código específico del entorno, puede comprobar el valor de NODE_ENV con `process.env.NODE_ENV`. Tenga en cuenta que comprobar el valor de una variable de entorno supone una reducción de rendimiento, por lo que debe hacerse moderadamente.

En el desarrollo, normalmente establece las variables de entorno en el shell interactivo, por ejemplo, utilizando `export` o su archivo `.bash_profile`. Sin embargo, en general, no debe hacerlo en un servidor de producción; en su lugar, utilice el sistema init de su sistema operativo (systemd o Upstart). En la siguiente sección se proporcionan más detalles sobre el uso del sistema init en general, pero el establecimiento de NODE_ENV es tan importante (y fácil de hacer) para el rendimiento, que se resalta aquí.

Con Upstart, utilice la palabra clave `env` en el archivo de trabajo. Por ejemplo:

<pre>
<code class="language-sh" translate="no">
# /etc/init/env.conf
 env NODE_ENV=production
</code>
</pre>

Para obtener más información, consulte [Upstart Intro, Cookbook and Best Practices](http://upstart.ubuntu.com/cookbook/#environment-variables).

Con systemd, utilice la directiva `Environment` en el archivo unit. Por ejemplo:

<pre>
<code class="language-sh" translate="no">
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
</code>
</pre>

Para obtener más información, consulte [Using Environment Variables In systemd Units](https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html).

Si está utilizando StrongLoop Process Manager, también puede [establecer la variable de entorno cuando instala StrongLoop PM como un servicio](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-Setenvironmentvariables).

### Asegurarse de que la aplicación se reinicia automáticamente

En la producción, no desea que la aplicación esté nunca fuera de línea. Esto significa que debe asegurarse de que se reinicia si la aplicación o el servidor se bloquean. Aunque espera que no se produzca ninguno de estos sucesos, si somos realistas, debe tener en cuenta ambas eventualidades de la siguiente manera:

-   Utilizando un gestor de procesos para reiniciar la aplicación (y Node) cuando se bloquea.
-   Utilizando el sistema init que proporciona su sistema operativo para reiniciar el gestor de procesos cuando se bloquea el sistema operativo. También puede utilizar el sistema init sin un gestor de procesos.

Las aplicaciones Node se bloquean si encuentran una excepción no capturada. Lo primero que debe hacer es asegurarse de que se realizan las pruebas correctas en la aplicación y que se manejan todas las excepciones (consulte [Manejar correctamente las excepciones](#exceptions) para obtener detalles). No obstante, para estar libre de errores, aplique un mecanismo para garantizar que cuando se bloquee la aplicación, se reinicie automáticamente.

#### Utilizar un gestor de procesos

En el desarrollo, la aplicación se inicia simplemente desde la línea de mandatos con `node server.js` o algo similar. Pero hacer esto en la producción es sinónimo de desastre. Si la aplicación se bloquea, estará fuera de línea hasta que la reinicie. Para garantizar el reinicio de la aplicación si se bloquea, utilice un gestor de procesos. Un gestor de procesos es un "contenedor" de aplicaciones que facilita el despliegue, proporciona una alta disponibilidad y permite gestionar la aplicación en el tiempo de ejecución.

Además de reiniciar la aplicación cuando se bloquea, un gestor de procesos permite:

-   Obtener información útil sobre el rendimiento en tiempo de ejecución y el consumo de recursos.
-   Modificar dinámicamente los valores para mejorar el rendimiento.
-   Controlar la agrupación en clúster (StrongLoop PM y pm2).

Los gestores de procesos más conocidos para Node son los siguientes:

-   [StrongLoop Process Manager](http://strong-pm.io/)
-   [PM2](https://github.com/Unitech/pm2)
-   [Forever](https://www.npmjs.com/package/forever)

Para ver una comparación característica a característica de los tres gestores de procesos, consulte [http://strong-pm.io/compare/](http://strong-pm.io/compare/). 

El uso de cualquiera de estos gestores de procesos bastará para mantener activa la aplicación, aunque se bloquee cada cierto tiempo.

No obstante, StrongLoop PM tiene muchas características especialmente indicadas para el despliegue de producción. Puede utilizarlo y las herramientas relacionadas de StrongLoop para:

-   Crear y empaquetar la aplicación localmente y, a continuación, desplegarla de forma segura en el sistema de producción.
-   Reiniciar automáticamente la aplicación si se bloque por cualquier motivo.
-   Gestionar los clústeres de forma remota.
-   Ver perfiles de CPU e instantáneas de almacenamiento dinámico para optimizar el rendimiento y diagnosticar fugas de memoria.
-   Ver medidas de rendimiento para la aplicación.
-   Escalar fácilmente a varios hosts con control integrado para el equilibrador de carga Nginx.

Como se explica a continuación, cuando instala StrongLoop PM como un servicio de sistema operativo utilizando el sistema init, se reinicia automáticamente cuando se reinicia el sistema. De esta forma, mantiene activos siempre los clústeres y los procesos de aplicaciones.

#### Utilizar un sistema init

La siguiente capa de fiabilidad es garantizar que la aplicación se reinicie cuando se reinicie el servidor. Los sistemas pueden bloquearse por una amplia variedad de motivos. Para garantizar que la aplicación se reinicie si se bloquea el servidor, utilice el sistema init incorporado en su sistema operativo. Los dos principales sistemas init que se utilizan hoy día son [systemd](https://wiki.debian.org/systemd) y [Upstart](http://upstart.ubuntu.com/).

Hay dos formas de utilizar los sistemas init con la aplicación Express:

-   Ejecutar la aplicación en un gestor de procesos e instalar el gestor de procesos como un servicio con el sistema init. El gestor de procesos reiniciará la aplicación cuando esta se bloquee y el sistema init reiniciará el gestor de procesos cuando se reinicie el sistema operativo. Este es el enfoque recomendado.
-   Ejecutar la aplicación (y Node) directamente con el sistema init. Esta opción parece más simple, pero no tiene las ventajas adicionales de utilizar el gestor de procesos.

##### Systemd

Systemd es un administrador de servicios y sistemas Linux. La mayoría de las principales distribuciones Linux han adoptado systemd como su sistema init predeterminado.

Un archivo de configuración de servicio de systemd se denomina un _archivo unit_, con un nombre de archivo terminado en .service. A continuación, se muestra un archivo unit de ejemplo para gestionar directamente una aplicación Node (sustituya el texto en negrita por los valores de su sistema y su aplicación):

<pre>
<code class="language-sh" translate="no">
[Unit]
Description=Awesome Express App

[Service]
Type=simple
ExecStart=/usr/local/bin/node /projects/myapp/index.js
WorkingDirectory=/projects/myapp

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
</code>
</pre>

Para obtener más información sobre systemd, consulte [systemd reference (man page)](http://www.freedesktop.org/software/systemd/man/systemd.unit.html).

##### StrongLoop PM como un servicio systemd

Puede instalar fácilmente StrongLoop Process Manager como un servicio systemd. A continuación, cuando se reinicie el servidor, se reiniciará automáticamente StrongLoop PM, que a su vez reiniciará todas las aplicaciones que esté gestionando.

Para instalar StrongLoop PM como un servicio systemd:

```console
$ sudo sl-pm-install --systemd
```

A continuación, inicie el servicio con:

```console
$ sudo /usr/bin/systemctl start strong-pm
```

Para obtener más información, consulte [Setting up a production host (documentación de StrongLoop)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHEL7+,Ubuntu15.04or15.10).

##### Upstart

Upstart es una herramienta del sistema disponible en muchas distribuciones Linux para iniciar tareas y servicios durante el arranque del sistema, detenerlos durante la conclusión y supervisarlos. Puede configurar la aplicación Express o el gestor de procesos como un servicio y, a continuación, Upstart lo reiniciará automáticamente cuando se bloquee.

Un servicio de Upstart se define en un archivo de configuración de trabajo (también denominado un "trabajo") con un nombre de archivo terminado en `.conf`. El siguiente ejemplo muestra cómo crear un trabajo denominado "myapp" para una aplicación denominada "myapp" con el archivo principal ubicado en `/projects/myapp/index.js`.

Cree un archivo denominado `myapp.conf` en `/etc/init/` con el siguiente contenido (sustituya el texto en negrita por los valores de su sistema y su aplicación):

<pre>
<code class="language-sh" translate="no">
# When to start the process
start on runlevel [2345]

# When to stop the process
stop on runlevel [016]

# Increase file descriptor limit to be able to handle more requests
limit nofile 50000 50000

# Use production mode
env NODE_ENV=production

# Run as www-data
setuid www-data
setgid www-data

# Run from inside the app dir
chdir /projects/myapp

# The process to start
exec /usr/local/bin/node /projects/myapp/index.js

# Restart the process if it is down
respawn

# Limit restart attempt to 10 times within 10 seconds
respawn limit 10 10
</code>
</pre>

NOTA: este script requiere Upstart 1.4 o posterior, soportado en Ubuntu 12.04-14.10.

Como el trabajo se configura para ejecutarse cuando se inicia el sistema, la aplicación se iniciará junto con el sistema operativo, y se reiniciará automáticamente si la aplicación se bloquea o el sistema se cuelga.

Aparte reiniciar automáticamente la aplicación, Upstart permite utilizar estos mandatos:

-   `start myapp` – Iniciar la aplicación
-   `restart myapp` – Reiniciar la aplicación
-   `stop myapp` – Detener la aplicación

Para obtener más información sobre Upstart, consulte [Upstart Intro, Cookbook and Best Practises](http://upstart.ubuntu.com/cookbook).

##### StrongLoop PM como un servicio Upstart

Puede instalar fácilmente StrongLoop Process Manager como un servicio Upstart. A continuación, cuando se reinicie el servidor, se reiniciará automáticamente StrongLoop PM, que a su vez reiniciará todas las aplicaciones que esté gestionando.

Para instalar StrongLoop PM como un servicio Upstart 1.4:

```console
$ sudo sl-pm-install
```

A continuación, ejecute el servicio con:

```console
$ sudo /sbin/initctl start strong-pm
```

NOTA: en los sistemas que no dan soporte a Upstart 1.4, los mandatos son ligeramente diferentes. Consulte [Setting up a production host (documentación de StrongLoop)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHELLinux5and6,Ubuntu10.04-.10,11.04-.10) para obtener más información.

### Ejecutar la aplicación en un clúster

En un sistema multinúcleo, puede multiplicar el rendimiento de una aplicación Node iniciando un clúster de procesos. Un clúster ejecuta varias instancias de la aplicación, idealmente una instancia en cada núcleo de CPU, lo que permite distribuir la carga y las tareas entre las instancias.

<!--![Equilibrio entre las instancias de aplicación utilizando la API de clúster](/images/clustering.png)-->

IMPORTANTE: como las instancias de aplicación se ejecutan como procesos independientes, no comparten el mismo espacio de memoria. Es decir, los objetos son locales para cada instancia de la aplicación. Por lo tanto, no puede mantener el estado en el código de aplicación. No obstante, puede utilizar un almacén de datos en memoria como [Redis](http://redis.io/) para almacenar los datos y los estados relacionados con la sesión. Esta advertencia se aplica básicamente a todas las formas de escalado horizontal, ya sean clústeres con varios procesos o varios servidores físicos.

En las aplicaciones en clúster, los procesos de trabajador pueden bloquearse individualmente sin afectar al resto de los procesos. Aparte de las ventajas de rendimiento, el aislamiento de errores es otro motivo para ejecutar un clúster de procesos de aplicación. Siempre que se bloquee un proceso de trabajador, asegúrese de registrar el suceso y generar un nuevo proceso utilizando cluster.fork().

#### Mediante el módulo de clúster de Node

La agrupación en clústeres es posible gracias al [módulo de clúster](https://nodejs.org/docs/latest/api/cluster.html) de Node. Esto permite al proceso maestro generar procesos de trabajador y distribuir las conexiones entrantes entre los trabajadores. No obstante, en lugar de utilizar este módulo directamente, es mucho mejor utilizar una de las muchas herramientas que lo hacen automáticamente, por ejemplo, [node-pm](https://www.npmjs.com/package/node-pm) o [cluster-service](https://www.npmjs.com/package/cluster-service).

#### Mediante StrongLoop PM

Si despliega la aplicación en StrongLoop Process Manager (PM), puede aprovechar la agrupación en clúster _sin_ modificar el código de aplicación.

Cuando StrongLoop Process Manager (PM) ejecuta una aplicación, la ejecuta automáticamente en un clúster con un número de trabajadores igual al número de núcleos de CPU en el sistema. Puede cambiar manualmente el número de procesos de trabajador en el clúster utilizando la herramienta de línea de mandatos slc sin detener la aplicación.

Por ejemplo, suponiendo que ha desplegado la aplicación en prod.foo.com y que StrongLoop PM escucha en el puerto 8701 (el valor predeterminado), para establecer el tamaño de clúster en ocho utilizando slc:

```console
$ slc ctl -C http://prod.foo.com:8701 set-size my-app 8
```

Para obtener más información sobre la agrupación en clúster con StrongLoop PM, consulte [Clustering](https://docs.strongloop.com/display/SLC/Clustering) en la documentación de StrongLoop.

### Almacenar en la caché los resultados de la solicitud

Otra estrategia para mejorar el rendimiento en la producción es almacenar en la caché el resultado de las solicitudes, para que la aplicación no repita la operación de dar servicio a la misma solicitud repetidamente.

Utilice un servidor de almacenamiento en memoria caché como [Varnish](https://www.varnish-cache.org/) o [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/) (consulte también [Nginx Caching](https://serversforhackers.com/nginx-caching/)) para mejorar significativamente la velocidad y el rendimiento de la aplicación.

### Utilizar un equilibrador de carga

Independientemente de lo optimizada que esté una aplicación, una única instancia sólo puede manejar una cantidad limitada de carga y tráfico. Una forma de escalar una aplicación es ejecutar varias instancias de la misma y distribuir el tráfico utilizando un equilibrador de carga. La configuración de un equilibrador de carga puede mejorar el rendimiento y la velocidad de la aplicación, lo que permite escalarla más que con una única instancia.

Un equilibrador de carga normalmente es un proxy inverso que orquesta el tráfico hacia y desde los servidores y las instancias de aplicación. Puede configurar fácilmente un equilibrador de carga para la aplicación utilizando [Nginx](http://nginx.org/en/docs/http/load_balancing.html) o [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Con el equilibrio de carga, deberá asegurarse de que las solicitudes asociadas con un determinado ID de sesión se conecten al proceso que las ha originado. Esto se conoce como _afinidad de sesiones_ o _sesiones adhesivas_, y puede solucionarse con la recomendación anterior de utilizar un almacén de datos como, por ejemplo, Redis para los datos de sesión (dependiendo de la aplicación). Para obtener más información, consulte [Using multiple nodes](https://socket.io/docs/v4/using-multiple-nodes/).

#### Mediante StrongLoop PM con un equilibrador de carga Nginx

[StrongLoop Process Manager](http://strong-pm.io/) se integra con un Nginx Controller, lo que simplifica las configuraciones de entornos de producción de varios hosts. Para obtener más información, consulte [Scaling to multiple servers](https://docs.strongloop.com/display/SLC/Scaling+to+multiple+servers) (documentación de StrongLoop).
<a name="proxy"></a>

### Utilizar un proxy inverso

Un proxy inverso se coloca delante de una aplicación web y realiza operaciones de soporte en las solicitudes, aparte de dirigir las solicitudes a la aplicación. Puede manejar las páginas de errores, la compresión, el almacenamiento en memoria caché, el servicio de archivos y el equilibrio de carga, entre otros.

La entrega de tareas que no necesitan saber el estado de la aplicación a un proxy inverso permite a Express realizar tareas de aplicación especializadas. Por este motivo, se recomienda ejecutar Express detrás de un proxy inverso como [Nginx](https://www.nginx.com/) o [HAProxy](http://www.haproxy.org/) en la producción.
