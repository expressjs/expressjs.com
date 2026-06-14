---
title: FAQ
description: Encuentre respuestas a preguntas frecuentes sobre Express.js, incluyendo temas sobre estructura de aplicaciones, modelos, autenticación, motores de plantillas, manejo de errores, y más.
---

## ¿Cómo debo estructurar mi aplicación?

No hay una respuesta definitiva a esta pregunta. La respuesta depende
de la escala de tu aplicación y del equipo implicado. To be as
flexible as possible, Express makes no assumptions in terms of structure.

Las rutas y otra lógica específica de la aplicación pueden vivir tantos archivos
como desee, en cualquier estructura de directorio que prefiera. View the following
examples for inspiration:

- [Rutas listadas](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
- [Mapa de ruta](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

Además, existen extensiones de terceros para Express, que simplifican algunos de estos patrones:

- [Rutas de recursos](https://github.com/expressjs/express-resource)

## ¿Cómo defino los modelos?

Express no tiene noción de una base de datos. Este concepto es
dejado a los módulos de Nodo de terceros, permitiéndote una interfaz
con casi cualquier base de datos.

Vea [LoopBack](http://loopback.io) para un framework basado en Expresiones centrado en modelos.

## ¿Cómo puedo autenticar usuarios?

Authentication is another opinionated area that Express does not
venture into. Puede utilizar cualquier esquema de autenticación que desee.
Para un esquema simple de nombre de usuario / contraseña, vea [este ejemplo](https://github.com/expressjs/express/tree/master/examples/auth).

## ¿Qué motores de plantillas soporta Express?

Express soporta cualquier motor de plantillas que cumpla con la firma `(ruta, locales, callback)`.
Para normalizar las interfaces del motor de plantillas y la caché, consulte el proyecto
[consolidate.js](https://github.com/visionmedia/consolidate.js)
para obtener soporte. Los motores de plantillas no listados pueden seguir soportando la firma Express.

Para obtener más información, consulte [Usar motores de plantilla con Express](/guide/using-template-engines).

## ¿Cómo puedo manejar las respuestas 404?

In Express, 404 responses are not the result of an error, so
the error-handler middleware will not capture them. Este comportamiento es
porque una respuesta 404 simplemente indica la ausencia de trabajo adicional por hacer;
en otras palabras, Express ha ejecutado todas las funciones y rutas de middleware,
y ha encontrado que ninguno de ellos respondió. Todo lo que necesitas hacer
es añadir una función de middleware en la parte inferior de la pila (debajo de todas las demás funciones)
para manejar una respuesta 404:

```js
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
```

Añadir rutas dinámicamente en tiempo de ejecución en una instancia de `express.Router()`
para que las rutas no sean reemplazadas por una función de middleware.

## ¿Cómo configuro un gestor de errores?

Usted define middleware que maneja errores de la misma manera que otros middleware,
excepto con cuatro argumentos en lugar de tres; específicamente con la firma `(err, req, res, next)`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

Para más información, vea [Gestión de errores] (/en/guide/error-handling).

## ¿Cómo renderizo HTML plano?

¡No lo tienes! No hay necesidad de "render" HTML con la función `res.render()`.
Si tienes un archivo específico, usa la función `res.sendFile()`.
Si está sirviendo muchos activos de un directorio, utilice la función de middleware `express.static()`
.

## ¿Qué versión de Node.js requiere Express?

- [Express 4.x](/4x/api) requiere 0.10 o superior de Node.js.
- [Express 5.x](/api) requiere Node.js 18 o superior.
