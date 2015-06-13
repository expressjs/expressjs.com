---
layout: page
title: Installing Express
menu: starter
lang: en
---

# Installing

First, create a directory to hold your application, if you haven't already done so, and make that your working directory.

~~~sh
$ mkdir myapp
$ cd myapp
~~~

Create a `package.json` file in the directory of interest, if it does not exist already, with the `npm init` command.

~~~sh
$ npm init
~~~

Install Express in the app directory and save it in the dependencies list:

~~~sh
$ npm install express --save
~~~

To install Express temporarily, and not add it to the dependencies list, omit the `--save` option:

~~~sh
$ npm install express
~~~

<div class="doc-box doc-info" markdown="1">
Node modules installed with the `--save` option are added to the `dependencies` list in the `package.json` file.
Then using `npm install` in the app directory will automatically install modules in the dependencies list.
</div>
