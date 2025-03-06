---
layout: page
title: Instalación de Express
menu: starter
lang: es
description: Learn how to install Express.js in your Node.js environment, including
  setting up your project directory and managing dependencies with npm.
---

# Instalación

Suponiendo que ya ha instalado [Node.js](https://nodejs.org/), cree un directorio para que contenga la aplicación y conviértalo en el directorio de trabajo.

```bash
$ mkdir myapp
$ cd myapp
```

Utilice el mandato `npm init` para crear un archivo `package.json` para la aplicación.
Para obtener más información sobre cómo funciona `package.json`, consulte [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json).

```bash
$ npm init
```

Este mandato solicita varios elementos como, por ejemplo, el nombre y la versión de la aplicación.
Por ahora, sólo tiene que pulsar INTRO para aceptar los valores predeterminados para la mayoría de ellos, con la siguiente excepción:

```bash
entry point: (index.js)
```

Especifique `app.js` o el nombre que desee para el archivo principal. Si desea que sea `index.js`, pulse INTRO para aceptar el nombre de archivo predeterminado recomendado.

A continuación, instale Express en el directorio `myapp` y guárdelo en la lista de dependencias. Por ejemplo:

```bash
$ npm install express --save
```

Para instalar Express temporalmente y no añadirlo a la lista de dependencias, omita la opción `--save`:

```bash
$ npm install express
```

<div class="doc-box doc-info" markdown="1">
Los módulos de Node que se instalan con la opción `--save` se añaden a la lista `dependencies` en el archivo `package.json`.
Posteriormente, si ejecuta `npm install` en el directorio `app`, los módulos se instalarán automáticamente en la lista de dependencias.
</div>
