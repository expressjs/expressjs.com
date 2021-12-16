---
layout: page
title: Express 애플리케이션 생성기
menu: starter
lang: ko
---

# Express 애플리케이션 생성기

애플리케이션의 골격을 신속하게 작성하려면 애플리케이션 생성기 도구인 `express`를 사용하십시오.

다음의 명령을 이용해 `express`를 설치하십시오.

```console
$ npm install express-generator -g
```

다음과 같이 `-h` 옵션을 이용해 명령의 옵션을 표시하십시오.

```console
$ express -h

  Usage: express [options][dir]

  Options:

    -h, --help          output usage information
        --version       output the version number
    -e, --ejs           add ejs engine support
        --hbs           add handlebars engine support
        --pug           add pug engine support
    -H, --hogan         add hogan.js engine support
        --no-view       generate without view engine
    -v, --view &lt;engine&gt; add view &lt;engine&gt; support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css &lt;engine&gt;  add stylesheet &lt;engine&gt; support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

예를 들면, 다음의 예에서는 _myapp_라는 이름의 Express 앱을 현재 작업 디렉토리에 작성합니다.

```console
$ express --view=pug myapp

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
   create : myapp/views/index.pug
   create : myapp/views/layout.pug
   create : myapp/views/error.pug
   create : myapp/bin
   create : myapp/bin/www
```

이후 다음과 같이 종속 항목을 설치하십시오.

```console
$ cd myapp
$ npm install
```

MacOS 또는 Linux에서는 다음 명령을 사용하여 앱을 실행하십시오.

```console
$ DEBUG=myapp:* npm start
```

Windows에서는 다음 명령을 사용하십시오.

```console
> set DEBUG=myapp:* & npm start
```

이후 브라우저에서 `http://localhost:3000/`을 로드하여 앱에 액세스하십시오.

생성된 앱은 다음과 같은 디렉토리 구조를 갖습니다.

```console
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
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```

<div class="doc-box doc-info" markdown="1">
생성기에 의해 작성된 앱 구조는 Express 앱을 구조화하는 여러 방법 중 하나에 불과합니다. 이러한 구조를 사용하거나 사용자의 요구사항에 가장 적합하도록 구조를 수정하십시오.
</div>
