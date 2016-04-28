---
layout: page
title: Express application generator
menu: starter
lang: en
redirect_from: "/starter/generator.html"
---

# Express application generator

Use the application generator tool, `express-generator`, to quickly create an application skeleton.

Install `express-generator` with the following command:

```sh
$ npm install express-generator -g
```

Display the command options with the `-h` option:

```sh
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css &lt;engine&gt;  add stylesheet &lt;engine&gt; support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

For example, the following creates an Express app named _myapp_ in the current working directory:

```sh
$ express myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.jade
   create : myapp/views/layout.jade
   create : myapp/views/error.jade
   create : myapp/bin
   create : myapp/bin/www
```

Then install dependencies:

```sh
$ cd myapp
$ npm install
```

On MacOS or Linux, run the app with this command:

```sh
$ DEBUG=myapp:* npm start
```

On Windows, use this command:

```sh
> set DEBUG=myapp:* & npm start
```

Then load `http://localhost:3000/` in your browser to access the app.

The generated app has the following directory structure:

```sh
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files
```

<div class="doc-box doc-info" markdown="1">
The app structure created by the generator is just one of many ways to structure Express apps. Feel free to use this structure or modify it to best suit your needs.
</div>
