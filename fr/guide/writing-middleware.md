---
layout: page
title: Ecriture de middleware utilisable dans les applications Express
description: Learn how to write custom middleware functions for Express.js applications, including examples and best practices for enhancing request and response handling.
menu: guide
lang: fr
redirect_from: /guide/writing-middleware.html
---

# Ecriture de middleware utilisable dans les applications Express

<h2>Présentation</h2>

Les fonctions de _middleware_ sont des fonctions qui peuvent accéder à l'[objet Request](/{{ page.lang }}/4x/api.html#req)  (`req`), l'[objet response](/{{ page.lang }}/4x/api.html#res) (`res`) et à la fonction middleware suivant dans le cycle demande-réponse de l'application. La fonction middleware suivant est couramment désignée par une variable nommée `next`.

Les fonctions middleware effectuent les tâches suivantes :

- Exécuter tout type de code.
- Apporter des modifications aux objets de demande et de réponse.
- Terminer le cycle de demande-réponse.
- Appeler le middleware suivant dans la pile.

Si la fonction middleware en cours ne termine pas le cycle de demande-réponse, elle doit appeler la fonction `next()` pour transmettre le contrôle à la fonction middleware suivant. Sinon, la demande restera bloquée.

L'exemple suivant montre les éléments d'un appel de fonction middleware:

<table id="mw-fig">
<tbody><tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" alt="Elements of a middleware function call" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">Méthode HTTP à laquelle la fonction middleware s'applique.</div></tbody>

<div class="callout" id="callout2">Chemin (route) auquel la fonction middleware s'applique.</div>

<div class="callout" id="callout3">Fonction de middleware.</div>

<div class="callout" id="callout4">Argument de rappel à la fonction middleware, appelée "next" par convention.</div>

<div class="callout" id="callout5">Argument de <a href="../4x/api.html#res">réponse</a> HTTP à la fonction middleware, appelé "res" par convention.</div>

<div class="callout" id="callout6">Argument de <a href="../4x/api.html#req">demande</a> HTTP à la fonction middleware, appelé "req" par convention.</div>
</td></tr>
</table>

Starting with Express 5, middleware functions that return a Promise will call `next(value)` when they reject or throw an error. `next` will be called with either the rejected value or the thrown Error.

<h2>Example</h2>

Voici un exemple d'une application Express "Hello World" simple, pour laquelle vous allez définir deux fonctions middleware :
The remainder of this article will define and add three middleware functions to the application:
one called `myLogger` that prints a simple log message, one called `requestTime` that
displays the timestamp of the HTTP request, and one called `validateCookies` that validates incoming cookies.

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

<h3>Middleware function myLogger</h3>
Voici un exemple simple de fonction middleware appelée "myLogger". Cette fonction imprime simplement "LOGGED" lorsqu'une demande traverse l'application. La fonction middleware est affectée à une variable nommée `myLogger`.

```js
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

<div class="doc-box doc-notice" markdown="1">
Notice the call above to `next()`. Notez l'appel ci-dessus de la fonction `next()`,  qui appelle la fonction middleware suivant dans l'application.
La fonction `next()` ne fait pas partie du Node.js ou de l'API Express, mais c'est le troisième argument qui est transmis à la fonction middleware. La fonction `next()` peut porter n'importe quel nom, mais par convention elle est toujours appelée "next".
Pour éviter toute confusion, il est préférable de respecter cette convention.
</div>

Pour charger la fonction middleware, appelez `app.use()` en spécifiant la fonction middleware.
Par exemple, le code suivant charge la fonction middleware `myLogger` avant la route au chemin racine (/).

```js
const express = require('express')
const app = express()

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

Chaque fois que l'application reçoit une demande, elle imprime le message "LOGGED" sur le terminal.

L'ordre de chargement des middleware est important : les fonctions middleware chargées en premier sont également exécutées en premier.

Si `myLogger` est chargé après la route au chemin racine, la demande ne l'atteindra jamais et l'application n'imprimera pas "LOGGED", car le gestionnaire de route du chemin racine interrompra le cycle de demande-réponse.

La fonction middleware `myLogger` imprime simplement un message, puis traite la demande à la fonction middleware suivant dans la pile en appelant la fonction `next()`.

<h3>Middleware function requestTime</h3>

L'exemple suivant ajoute une propriété appelée `requestTime` à l'objet Request. Nous nommerons cette fonction middleware "requestTime".

```js
const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
```

L'application utilise désormais la fonction middleware `requestTime`. De plus, la fonction callback de la route du chemin racine utilise la propriété que la fonction middleware ajoute à `req` (l'objet Request).

```js
const express = require('express')
const app = express()

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>'
  responseText += `<small>Requested at: ${req.requestTime}</small>`
  res.send(responseText)
})

app.listen(3000)
```

Si vous effectuez une demande à la racine de l'application, cette dernière affiche maintenant l'horodatage de la demande dans le navigateur.

<h3>Middleware function validateCookies</h3>

Finally, we'll create a middleware function that validates incoming cookies and sends a 400 response if cookies are invalid.

Here's an example function that validates cookies with an external async service.

```js
async function cookieValidator (cookies) {
  try {
    await externallyValidateCookie(cookies.testCookie)
  } catch {
    throw new Error('Invalid cookies')
  }
}
```

Here, we use the [`cookie-parser`](/resources/middleware/cookie-parser.html) middleware to parse incoming cookies off the `req` object and pass them to our `cookieValidator` function. The `validateCookies` middleware returns a Promise that upon rejection will automatically trigger our error handler.

```js
const express = require('express')
const cookieParser = require('cookie-parser')
const cookieValidator = require('./cookieValidator')

const app = express()

async function validateCookies (req, res, next) {
  await cookieValidator(req.cookies)
  next()
}

app.use(cookieParser())

app.use(validateCookies)

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

app.listen(3000)
```

<div class="doc-box doc-notice" markdown="1">
Note how `next()` is called after `await cookieValidator(req.cookies)`. This ensures that if `cookieValidator` resolves, the next middleware in the stack will get called. If you pass anything to the `next()` function (except the string `'route'` or `'router'`), Express regards the current request as being an error and will skip any remaining non-error handling routing and middleware functions.
</div>

Puisque vous avez accès à l'objet Request, à l'objet Response, à la fonction middleware suivant dans la pile et à l'API Node.js complète, le champ des possibles avec les fonctions middleware est infini.

Pour plus d'informations sur les middleware Express, voir [Utilisation de middleware Express](/{{ page.lang }}/guide/using-middleware.html).

<h2>Configurable middleware</h2>

If you need your middleware to be configurable, export a function which accepts an options object or other parameters, which, then returns the middleware implementation based on the input parameters.

File: `my-middleware.js`

```js
module.exports = function (options) {
  return function (req, res, next) {
    // Implement the middleware function based on the options object
    next()
  }
}
```

The middleware can now be used as shown below.

```js
const mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```

Refer to [cookie-session](https://github.com/expressjs/cookie-session) and [compression](https://github.com/expressjs/compression) for examples of configurable middleware.
