---
layout: page
title: Gestores de procesos para las aplicaciones Express
menu: advanced
lang: es
---

# Gestores de procesos para las aplicaciones Express

Cuando ejecuta aplicaciones Express en producción, es muy útil utilizar un *gestor de procesos* para realizar las siguientes tareas:

- Reiniciar la aplicación automáticamente si se bloquea.
- Obtener información útil sobre el rendimiento en tiempo de ejecución y el consumo de recursos.
- Modificar dinámicamente los valores para mejorar el rendimiento.
- Controlar la agrupación en clúster.

Un gestor de procesos es una especie de servidor de aplicaciones: un "contenedor" de aplicaciones que facilita el despliegue, proporciona una alta disponibilidad y permite gestionar la aplicación en el tiempo de ejecución.

Los gestores de procesos más conocidos para Express y otras aplicaciones Node.js son los siguientes:

- [StrongLoop Process Manager](#sl)
- [PM2](#pm2)
- [Forever](#forever)


El uso de estas tres herramientas puede ser muy útil, aunque StrongLoop Process Manager es la única que proporciona una solución completa de despliegue y tiempo de ejecución que gestiona el ciclo de vida completo de la aplicación Node.js, con herramientas para cada paso antes y después de la producción, en una interfaz unificada.

A continuación, se describe brevemente cada una de estas herramientas.
Para ver una comparación detallada, consulte [http://strong-pm.io/compare/](http://strong-pm.io/compare/).

## <a id="sl">StrongLoop Process Manager</a>

StrongLoop Process Manager (StrongLoop PM) es un gestor de procesos de producción para las aplicaciones Node.js. StrongLoop PM tiene incorporado un despliegue de equilibrio de carga, supervisión y varios hosts, así como una consola gráfica.
Puede utilizar StrongLoop PM para las siguientes tareas:

- Crear, empaquetar y desplegar la aplicación Node.js en un sistema local o remoto.
- Ver perfiles de CPU e instantáneas de almacenamiento dinámico para optimizar el rendimiento y diagnosticar fugas de memoria.
- Mantener activos siempre los clústeres y los procesos.
- Ver medidas de rendimiento sobre la aplicación.
- Gestionar fácilmente los despliegues de varios hosts con la integración de Nginx.
- Unificar varios StrongLoop PM en un tiempo de ejecución de microservicios distribuidos que se gestiona desde Arc.

Puede trabajar con StrongLoop PM utilizando una potente herramienta de interfaz de línea de mandatos denominada `slc` o una herramienta gráfica denominada Arc. Arc es de código abierto, con soporte profesional proporcionado por StrongLoop.

Para obtener más información, consulte [http://strong-pm.io/](http://strong-pm.io/).

Documentación completa:

- [Operating Node apps (documentación de StrongLoop)](http://docs.strongloop.com/display/SLC)
- [Using StrongLoop Process Manager](http://docs.strongloop.com/display/SLC/Using+Process+Manager).

### Instalación

```console
$ [sudo] npm install -g strongloop
```

### Uso básico

```console
$ cd my-app
$ slc start
```

Vea el estado del gestor de procesos y todas las aplicaciones desplegadas:

```console
$ slc ctl
Service ID: 1
Service Name: my-app
Environment variables:
  No environment variables defined
Instances:
    Version  Agent version  Cluster size
     4.1.13      1.5.14           4
Processes:
        ID      PID   WID  Listening Ports  Tracking objects?  CPU profiling?
    1.1.57692  57692   0
    1.1.57693  57693   1     0.0.0.0:3001
    1.1.57694  57694   2     0.0.0.0:3001
    1.1.57695  57695   3     0.0.0.0:3001
    1.1.57696  57696   4     0.0.0.0:3001
```

Liste todas las aplicaciones (servicios) que se están gestionando:

```console
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
```

Detenga una aplicación:

```console
$ slc ctl stop my-app
```

Reinicie una aplicación:

```console
$ slc ctl restart my-app
```

También puede realizar un "reinicio suave", que da a los procesos de trabajador un periodo de gracia para cerrar las conexiones existentes y, a continuación, reinicia la aplicación actual:

```console
$ slc ctl soft-restart my-app
```

Para eliminar una aplicación de la gestión:

```console
$ slc ctl remove my-app
```

## <a id="pm2">PM2</a>

PM2 es un gestor de procesos de producción para las aplicaciones Node.js que tiene un equilibrador de carga incorporado. PM2 permite mantener siempre activas las aplicaciones y volver a cargarlas sin ningún tiempo de inactividad, a la vez que facilita tareas comunes de administrador del sistema.  PM2 también permite gestionar el registro de aplicaciones, la supervisión y la agrupación en clúster.

Para obtener más información, consulte [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2).

### Instalación

```console
$ [sudo] npm install pm2 -g
```

### Uso básico

Cuando inicia una aplicación utilizando el mandato `pm2`, debe especificar la vía de acceso de la aplicación. No obstante, cuando detiene, reinicia o suprime una aplicación, sólo puede especificar el nombre o el ID de la aplicación.

```console
$ pm2 start npm --name my-app -- start
[PM2] restartProcessId process id 0
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-app   │ 0  │ fork │ 64029 │ online │ 1       │ 0s     │ 17.816 MB   │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use the `pm2 show <id|name>` command to get more details about an app.
```

Cuando inicia una aplicación utilizando el mandato `pm2`, la aplicación se envía inmediatamente al segundo plano. Puede controlar la aplicación en segundo plano desde la línea de mandatos utilizando varios mandatos `pm2`.

Cuando se inicia una aplicación utilizando el mandato `pm2`, se registra en la lista de procesos de PM2 con un ID. Por lo tanto, puede gestionar las aplicaciones con el mismo nombre de distintos directorios en el sistema utilizando su ID.

Tenga en cuenta que si se ejecuta más de una aplicación con el mismo nombre, los mandatos `pm2` se aplican en todas ellas. Por lo tanto, utilice ID en lugar de nombres para gestionar aplicaciones individuales.

Liste todos los procesos en ejecución:

```console
$ pm2 list
```

Detenga una aplicación:

```console
$ pm2 stop 0
```

Reinicie una aplicación:

```console
$ pm2 restart 0
```

Para ver información detallada sobre una aplicación:

```console
$ pm2 show 0
```

Para eliminar una aplicación del registro de PM2:

```console
$ pm2 delete 0
```


## <a id="forever">Forever</a>

Forever es una herramienta de interfaz de línea de mandatos simple que permite garantizar la ejecución continua (forever/siempre) de un determinado script. La sencilla interfaz de Forever hace que sea ideal para ejecutar los despliegues más pequeños de scripts y aplicaciones Node.js.

Para obtener más información, consulte [https://github.com/foreverjs/forever](https://github.com/foreverjs/forever).

### Instalación

```console
$ [sudo] npm install forever -g
```

### Uso básico

Para iniciar un script, utilice el mandato `forever start` y especifique la vía de acceso del script:

```console
$ forever start script.js
```

Este mandato ejecutará el script en modalidad daemon (en segundo plano).

Para ejecutar el script para que se adjunte al terminal, omita `start`:

```console
$ forever script.js
```

Se recomienda registrar la salida de la herramienta Forever y el script utilizando las opciones de registro `-l`, `-o` y `-e`, como se muestra en este ejemplo:

```console
$ forever start -l forever.log -o out.log -e err.log script.js
```

Para ver la lista de scripts que ha iniciado Forever:

```console
$ forever list
```

Para detener un script iniciado por Forever, utilice el mandato `forever stop` y especifique el índice de procesos (como se lista con el mandato `forever list`).

```console
$ forever stop 1
```

De manera alternativa, puede especificar la vía de acceso del archivo:

```console
$ forever stop script.js
```

Para detener todos los scripts que ha iniciado Forever:

```console
$ forever stopall
```

Forever tiene más opciones y también proporciona una API mediante programación.
