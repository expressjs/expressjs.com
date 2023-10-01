---
layout: page
title: Express application generator
menu: starter
lang: ne
---

# एक्सप्रेस आवेदन जेनरेटर

एप्लिकेसन जेनेरेटर उपकरण प्रयोग गर्नुहोस्, `एक्सप्रेस-जेनेरेटर`, छिट्टै एप्लिकेसन कंकाल सिर्जना गर्न।

तपाईंले `npx` आदेश (Node.js 8.2.0 मा उपलब्ध) प्रयोग गरी एप्लिकेसन जनरेटर चलाउन सक्नुहुन्छ।

```कन्सोल
$ npx एक्सप्रेस-जेनरेटर
```

अघिल्लो नोड संस्करणहरूको लागि, एप्लिकेसन जेनरेटरलाई ग्लोबल एनपीएम प्याकेजको रूपमा स्थापना गर्नुहोस् र त्यसपछि यसलाई सुरू गर्नुहोस्:

```कन्सोल
$ npm स्थापना -g एक्सप्रेस-जेनरेटर
$ एक्सप्रेस
```

`-h` विकल्पसँग आदेश विकल्पहरू प्रदर्शन गर्नुहोस्:

```console
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
        --version       output the version number
    -e, --ejs           add ejs engine support
        --hbs           add handlebars engine support
        --pug           add pug engine support
    -H, --hogan         add hogan.js engine support
        --no-view       generate without view engine
    -v, --view <engine> add view <engine> support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

उदाहरणका लागि, निम्नले _myapp_ नामको एक्सप्रेस एप सिर्जना गर्छ। एप हालको काम गर्ने डाइरेक्टरीमा रहेको _myapp_ नामक फोल्डरमा बनाइनेछ र दृश्य इन्जिनलाई <a href="https://pugjs.org/" target="_blank" title="Pug documentation">Pug मा सेट गरिनेछ। </a>:

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

त्यसपछि निर्भरताहरू स्थापना गर्नुहोस्:

```console
$ cd myapp
$ npm init
```

MacOS वा Linux मा, यो आदेशको साथ एप चलाउनुहोस्:

```console
$ DEBUG=myapp:* npm start
```

Windows Command Prompt मा, यो आदेश प्रयोग गर्नुहोस्:

```console
> set DEBUG=myapp:* & npm start

```

Windows PowerShell मा, यो आदेश प्रयोग गर्नुहोस्:

```console
PS> $env:DEBUG='myapp:*'; npm start
```

त्यसपछि एप पहुँच गर्न आफ्नो ब्राउजरमा `http://localhost:3000/` लोड गर्नुहोस्।

उत्पन्न एपमा निम्न निर्देशिका संरचना छ:

```कन्सोल
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
जेनेरेटर द्वारा बनाईएको अनुप्रयोग संरचना एक्सप्रेस अनुप्रयोगहरू संरचना गर्न धेरै तरिकाहरू मध्ये एक मात्र हो। यो संरचना प्रयोग गर्न नहिचकिचाउनुहोस् वा यसलाई परिमार्जन गर्नुहोस् तपाईंको आवश्यकताहरू अनुरूप गर्न।
</div>

### [अघिल्लो: हेलो वर्ल्ड ](/{{ page.lang }}/starter/hello-world.html)&nbsp;&nbsp;&nbsp;&nbsp;[अर्को: आधारभूत मार्ग](/{{ page.lang }} /starter/basic-routing.html)
