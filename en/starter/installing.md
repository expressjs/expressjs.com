---
layout: page
title: Installing Express
menu: starter
lang: en
redirect_from: "/starter/installing.html"
---

# Installing

Assuming you've already installed [Node.js](https://nodejs.org/), create a directory to hold your application, and make that your working directory.

```sh
$ mkdir myapp
$ cd myapp
```

Use the `npm init` command to create a `package.json` file for your application.
For more information on how `package.json` works, see [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json).

```sh
$ npm init
```

This command prompts you for a number of things, such as the name and version of your application.
For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

```sh
entry point: (index.js)
```

Enter `app.js`, or whatever you want the name of the main file to be. If you want it to be `index.js`, hit RETURN to accept the suggested default file name.

Now install Express in the `app` directory and save it in the dependencies list. For example:

```sh
$ npm install express --save
```

To install Express temporarily and not add it to the dependencies list, omit the `--save` option:

```sh
$ npm install express
```

<div class="doc-box doc-info" markdown="1">
Node modules installed with the `--save` option are added to the `dependencies` list in the `package.json` file.
Afterwards, running `npm install` in the `app` directory will automatically install modules in the dependencies list.
</div>
