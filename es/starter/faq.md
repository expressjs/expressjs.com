---
layout: página
title: Preguntas más frecuentes sobre Express
description: Encuentre respuestas a preguntas frecuentes sobre Express.js, incluyendo temas sobre estructura de aplicaciones, modelos, autenticación, motores de plantillas, manejo de errores, y más.
menu: iniciador
lang: es
redirect_from: /starter/faq.html
---

# Preguntas más frecuentes

## ¿Cómo debo estructurar mi aplicación?

No hay una respuesta definitiva a esta pregunta. La respuesta depende de la escala de la aplicación y del equipo implicado. Para ser lo más flexible posible, Express no realiza suposiciones en cuanto a la estructura.

Las rutas y otra lógica específica de la aplicación puede residir en tantos archivos como desee, con la estructura de directorios que prefiera. Vea los siguientes ejemplos como inspiración:

- [Listas de rutas](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
- [Correlación de rutas](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [Controladores de estilo MVC](https://github.com/expressjs/express/tree/master/examples/mvc)

Asimismo, hay extensiones de terceros para Express, que simplifican algunos de estos patrones:

- [express-resource](https://github.com/expressjs/express-resource)

## ¿Cómo debo definir los modelos?

Express no tiene ninguna noción de base de datos. Este concepto se deja para los módulos de Node de terceros, lo que permite interactuar con prácticamente cualquier base de datos.

Consulte [LoopBack](http://loopback.io) para ver una infraestructura basada en Express centrada en modelos.

## ¿Cómo puedo autenticar los usuarios?

La autenticación es otra área rígida en la que no entra Express. Puede utilizar el esquema de autenticación que desee.
Para ver un esquema simple de nombre de usuario/contraseña, consulte [este ejemplo](https://github.com/expressjs/express/tree/master/examples/auth).

## ¿A qué motor de plantilla da soporte Express?

Express da soporte a cualquier motor de plantilla que cumpla la firma `(path, locals, callback)`.
Para normalizar las interfaces de motor de plantilla y el almacenamiento en memoria caché, consulte el proyecto [consolidate.js](https://github.com/visionmedia/consolidate.js) para ver el soporte. Otros motores de plantilla que no aparezcan en la lista también pueden dar soporte a la firma de Express.

Para obtener más información, consulte [Usar motores de plantilla con Express](/{{page.lang}}/guide/using-template-engines.html).

## ¿Cómo puedo manejar las respuestas 404?

En Express, las respuestas 404 no son el resultado de un error, por lo que el middleware de manejador de errores no las capturará. Este comportamiento se debe a que una respuesta 404 simplemente indica la ausencia de trabajo adicional pendiente; es decir, Express ha ejecutado todas las rutas y funciones de middleware, y ha comprobado que ninguna de ellas responde. Lo único que debe hacer es añadir una función de middleware al final de la pila (debajo de las demás funciones) para manejar una respuesta 404:

```js
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})
```

Añadir rutas dinámicamente en tiempo de ejecución en una instancia de `express.Router()`
para que las rutas no sean reemplazadas por una función de middleware.

## ¿Cómo configuro un manejador de errores?

El middleware de manejo de errores se define de la misma forma que otro middleware, excepto con cuatro argumentos en lugar de tres; específicamente con la firma `(err, req, res, next)`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Para obtener más información, consulte [Manejo de errores](/{{ page.lang }}/guide/error-handling.html).

## ¿Cómo represento el HTML sin formato?

De ninguna manera. No es necesario "representar" HTML con la función `res.render()`.
Si tiene un archivo específico, utilice la función `res.sendFile()`.
Para el servicio de muchos activos desde un directorio, utilice la función de middleware `express.static()`.

## ¿Qué versión de Node.js requiere Express?

- [Express 4.x](/{{ page.lang }}/4x/api.html) requiere 0.10 o superior de Node.js.
- [Express 5.x](/{{ page.lang }}/5x/api.html) requiere Node.js 18 o superior.

### [Anterior: Más ejemplos ](/{{ page.lang }}/starter/examples.html)
