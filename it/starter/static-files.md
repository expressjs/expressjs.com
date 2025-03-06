---
layout: page
title: Gestione dei file statici in Express
menu: starter
lang: it
description: Understand how to serve static files like images, CSS, and JavaScript
  in Express.js applications using the built-in 'static' middleware.
---

# Gestione dei file statici in Express

Per gestire i file statici, quali immagini, file CSS e file JavaScript, utilizzare la funzione middleware integrata `express.static` in Express.

Fornire il nome della directory che contiene gli asset statici alla funzione middleware `express.static` per iniziare a gestire i file direttamente. Ad esempio, utilizzare il seguente codice per gestire le immagini, i file CSS e i file JavaScript nella directory denominata `public`:

```js
app.use(express.static('public'))
```

Ora, è possibile caricare i file che si trovano nella directory `public`:

```text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
Express ricerca i file relativi alla directory statica, pertanto il nome della directory statica non è parte dell'URL.
</div>

Per utilizzare più directory di asset statiche, richiamare la funzione middleware `express.static` più volte:

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express ricerca i file nell'ordine in cui sono state impostate le directory statiche con la funzione middleware `express.static`.

Per creare un prefisso per il percorso virtuale (in cui il percorso non esiste effettivamente nel file system) per i file gestiti dalla funzione `express.static`, [specificare un percorso di caricamento](/{{ page.lang }}/4x/api.html#app.use) per la directory statica, come mostrato di seguito:

```js
app.use('/static', express.static('public'))
```

Ora, è possibile caricare i file che si trovano nella directory `public` dal prefisso del percorso `/static`.

```text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

Tuttavia, il percorso fornito per la funzione `express.static` è relativo alla directory dalla quale è possibile avviare il processo `node`. Se si esegue l'applicazione express da un'altra directory, è preferibile utilizzare il percorso assoluto della directory che si desidera gestire:

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```
