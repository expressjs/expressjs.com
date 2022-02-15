---
layout: page
title: Osvedčené postupy pre Express v produkcii - výkonnosť a spoľahlivosť
menu: advanced
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Osvedčené postupy pre Express v produkcii: výkonnosť a spoľahlivosť

## Prehľad

Tento článok popisuje niektoré osvedčené postupy z pohľadu výkonnosti a spoľahlivosti Express aplikácií v produkcii.

Táto časť jasne spadá do tzv. "devops" sveta, dotýkajúca sa tradičného vývoja a prevádzky. Podľa toho sú tieto informácie rozdelené do dvoch častí:

* [Kroky, ktoré je potrebné vykonať vo vašom kóde](#code) (časť vývoja).
* [Kroky, ktoré je potrebné vykonať na vašom prostredí](#env) (časť prevádzky).

<a name="code"></a>

## Kroky, ktoré je potrebné vykonať vo vašom kóde

Dodržiavanie nasledujúcich postupov vo vašom kóde môže viesť k zlepšeniu výkonnosti vašej aplikácie:

* Používajte gzip kompresiu
* Nepoužívajte synchrónne funkcie
* Pre servovanie statických súborov používajte middleware
* Správne logujte
* Správne odchytávajte a spracovávajte výnimky

### Používajte gzip kompresiu

Použitie gzip kompresie môže veľmi znížiť veľkosť response body a tým zvýšíť rýchlosť webovej aplikácie. Pre zapnutie gzip kompresie vo vašej Express aplikácii používajte [compression](https://www.npmjs.com/package/compression) middleware. Napr.:

```js
const compression = require('compression')
const express = require('express')
const app = express()
app.use(compression())
```

Pre stránky s vysokou návštevnosťou sa odporúča implementovať kompresiu na úrovni reverse proxy (pozrite sa na [Použitie reverse proxy](#proxy)). V takom prípade nemusíte použiť compression middleware. Pre viac detailov ohľadom zapnutia gzip kompresie na Nginx serveri sa pozrite na [Module ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html) v Nginx dokumentácii.

### Nepoužívajte synchrónne funkcie

Synchrónne funkcie a metódy "držia" proces vykonania až do kým nebudú spracované. Jedno volanie synchrónnej funkcie môže trvať pár mikrosekúnd, či milisekúnd, avšak v prípade stránok s vysokou návštevnosťou, takéto volania znižujú výkonnosť aplikácie. Preto sa ich používaniu v produkcii vyhnite.

Hoci samotný Node i mnohé jeho moduly poskytujú synchrónne a asynchrónne verzie ich funkcií, v produkcii vždy používajte ich asynchrónne verzie. Jediná situácia, kedy by malo použitie synchrónnej funkcie opodstatnenie, je pri prvotnom spustení aplikácie.

Ak používate Node.js 4.0+ alebo io.js 2.1.0+, môžete použiť prepínač `--trace-sync-io`, ktorý vypíše warning a stack trace vždy, keď vaša aplikácia použije synchrónne API. V produkcii to samozrejme nepoužívajte, ale už pri developmente sa uistite, že vaša aplikácia je pripravená na produkciu. Pre viac informácií sa pozrite na [Weekly update for io.js 2.1.0](https://nodejs.org/en/blog/weekly-updates/weekly-update.2015-05-22/#2-1-0).

### Pre servovanie statických súborov používajte middleware

V developmente môžete pre servovanie statických súborov používať [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile). V produkcii to však nepoužívajte, pretože táto funkcia musí pri každom requeste čítať dáta z file systému, čo má za následok značné oneskorenie a celkovo nepriaznivo ovlyvňuje výkonnosť aplikácie. `res.sendFile()` funkcia _nie_ je implementovaná pomocou [sendfile](http://linux.die.net/man/2/sendfile) systémového volania, ktoré by ju robilo oveľa efektívnejšou.

Namiesto toho používajte [serve-static](https://www.npmjs.com/package/serve-static) middleware (prípadne podobný ekvivalent), ktorý je optimalizovaný pre servovanie statických súborov v Express aplikáciách.

Ešte lepšou možnosťou pre servovanie statických súborov je použitie reverse proxy; pre viac informácií sa pozrite na [Použitie reverse proxy](#proxy).

### Správne logujte

Vo všeobecnosti existujú dva dôvody k logovaniu vo vašej aplkácii a to debugovanie a logovanie aktivít vašej aplikácie. Použitie `console.log()` príp. `console.err()` k vypísaniu log správy je bežnou praxou počas developmentu. Avšak pozor, [tieto funkcie sú synchrónne](https://nodejs.org/api/console.html#console_console_1) v prípade, ak je výstupom terminál príp. súbor, takže nie sú vhodné pre produkčné prostredie, pokiaľ výstup nepresmerujete do iného programu.

#### Logovanie z dôvodu debugovania

Ak používate na debugovanie logovanie pomocou `console.log()`, používajte radšej špeciálny modul na debugovanie, ako napr. [debug](https://www.npmjs.com/package/debug). Tento modul vám umožňuje použivať environment premennú DEBUG, pomocou ktorej dokážete kontrolovať, ktoré debug výpisy budú vypísané pomocou `console.err()`, príp. žiadne. Ak chcete, aby vaša aplikácia bola čisto asynchrónna, budete stále potrebovať presmerovať výstup  `console.err()` do iného programu. Ale v skutočnosti asi nechcete debugovať v produkcii, však?

#### Logovanie aktivít aplikácie

Ak používate logovanie na sledovanie aktivít aplikácie (napr. sledovanie traffic-u, príp. API volaní), používajte namiesto `console.log()` logovacie knižnice, ako sú napr. [Winston](https://www.npmjs.com/package/winston) či [Bunyan](https://www.npmjs.com/package/bunyan). Ak vás zaujíma detailnejšie porovnanie týchto dvoch knižníc, prečítajte si tento blog post: [Comparing Winston and Bunyan Node.js Logging](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/).

<a name="exceptions"></a>

### Správne odchytávajte a spracovávajte výnimky

V prípade neodchytenia výnimky Node.js aplikácia spadne. Tzn, že v prípade nespracovania výnimky a nevykonania správnej akcie vaša Express aplikácia spadne. Ak budete pokračovať podľa rád v časti [Zabežpečte, aby sa vaša aplikácia automaticky reštartovala](#restart), tak sa vaša aplikácia z pádu zotaví. Express aplikácie potrebujú naštastie len krátky čas k naštartovaniu. Bez ohľadu nato, by ste sa mali pádom aplikácie v prvom rade vyhnúť a k tomu potrebujete správne odchytávať výnimky.

K uisteniu sa, že spracovávate všetky výnimky, používajte tieto techniky:

* [Používajte try-catch](#try-catch)
* [Používajte promises](#promises)

Predtým, ako sa hlbšie pustíme do týchto tém, mali by ste mať základné znalosti Node/Express error handlingu, akými sú používanie error-first callback-ov a šírenie errorov middlewarmi. Node používa pre návrat errorov z asynchrónnych funkcií konvenciu "error-first callbackov", kde prvým argumentom callback funkcie je error objekt, nasledovaný ostatnými návratovými hodnotami úspešného spracovanie funkcie. Ak nenastal žiaden error zabezpečte, aby prvým parametrom bol null. Definícia callback funkcie musí korešpondovať s error-first callback konvenciou a musí zmysluplne spracovať error. V Express aplikáciách je pre šírenie erroru middlewarmi osvedčenou a odporúčanou technikou použitie next() funkcie.

Pre viac informácií ohľadom základov error handlingu sa pozrite na:

* [Error Handling in Node.js](https://www.joyent.com/developers/node/design/errors)
* [Building Robust Node Applications: Error Handling](https://strongloop.com/strongblog/robust-node-applications-error-handling/) (StrongLoop blog)

#### Čo nerobiť

Jedna z vecí, ktorú by ste robiť _nemali_ je počúvať na `uncaughtException` event, ktorý je emitovaný v okamihu kedy výnimka "bublá" celou cestu späť do event loop-u. Pridanie event listenera `uncaughtException` zmení defaultné chovanie procesu, ktorý narazil na výnimku; proces bude pokračovať napriek výnimke. Toto sa môže zdať ako dobrým riešením, ako predísť pádu vašej aplikácie, avšak pokračovanie behu vašej aplikácie, v prípade neodchytenej výnimky je nebezpečnou praktikou a nepodporúča sa, pretože sa tým stav procesu stáva nespoľahlivým a nepredpovedateľným.

Navyše, použitie `uncaughtException` je oficiálne uznané ako [hrubé](https://nodejs.org/api/process.html#process_event_uncaughtexception) a existuje [návrh](https://github.com/nodejs/node-v0.x-archive/issues/2582) na jeho odstránenie z jadra. Takže počúvanie na  `uncaughtException` nie je dobrým nápadom. To je dôvod, prečo odporúčame veci ako viacero procesov a supervisorov: pád a reštartovanie je často najspolalivejším spôsobom zotavenia sa z erorru.

Taktiež neodporúčame používať [domain](https://nodejs.org/api/domain.html) modul. Všeobecne nerieši žiaden problém a je označený ako deprecated modul.

<a name="try-catch"></a>

#### Používajte try-catch

Try-catch je klasická konštrukcia v jazyku JavaScript, pomocou ktorej dokážete odchytiť výnimky v synchrónnom kóde. Použite try-catch, napr. na spracovanie chýb pri JSON parsingu, ako na ukážke nižšie.

Používajte nástroje [JSHint](http://jshint.com/) príp. [JSLint](http://www.jslint.com/), ktoré vám pomôžu nájsť implicitné výnimky, ako napr. [reference errors on undefined variables](http://www.jshint.com/docs/options/#undef).

Tu je príklad použitia try-catch k odchyteniu potenciálnej výnimky zapríčiňujúcej pád procesu.
Táto middleware funkcia príjma query parameter nazvaný "params" ktorý je JSON objekt.

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params
    try {
      const jsonObj = JSON.parse(jsonStr)
      res.send('Success')
    } catch (e) {
      res.status(400).send('Invalid JSON string')
    }
  })
})
```

Pozor, try-catch funguje len pre synchrónny kód. Vzhľadom nato, že Node platforma je primárne asynchrónna (obzvlášť v produkčnom prostredí), veľa výnimiek try-catch neodchytí.

<a name="promises"></a>

#### Používajte promises

Promises dokážu spracovať všetky typy výnimiek (explicitné aj implicitné) v asynchrónnych blokoch kódu používajuce `then()`, pridaním `.catch(next)` na koniec promise reťazca. Napr.:

```js
app.get('/', (req, res, next) => {
  // do some sync stuff
  queryDb()
    .then((data) => makeCsv(data)) // handle data
    .then((csv) => { /* handle csv */ })
    .catch(next)
})

app.use((err, req, res, next) => {
  // handle error
})
```

Takto sa všetky asynchrónne i synchrónne errory prešíria do error middleware-u.

Avšak, dve upozornenia:

1.  Všetky vaše asynchrónne kódy musia vracať promises (okrem emitorov). Ak niektorá z knižníc nevracia promises, konvertnite základný objekt použitím funkcie ako napr. [Bluebird.promisifyAll()](http://bluebirdjs.com/docs/api/promise.promisifyall.html).
2.  Event emitory (ako sú streams) môžu spôsobiť neodchytené výnimky. Preto sa uistite, že správne spracovávate error eventy.
Napr.:

```js
const wrap = fn => (...args) => fn(...args).catch(args[2])

app.get('/', wrap(async (req, res, next) => {
  const company = await getCompanyById(req.query.id)
  const stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
```

Pre viac informácií ohľadom error handling-u použitím promises si prečítajte:

* [Asynchronous Error Handling in Express with Promises, Generators and ES7](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)
* [Promises in Node.js with Q – An Alternative to Callbacks](https://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/)

<a name="env"></a>

## Kroky, ktoré je potrebné vykonať na vašom prostredí

Tu je niekoľko krokov, ktoré môžete vykonať na vašom environment-e pre zlepšenie výkonnosti vašej aplikácie:

* Nastavte NODE_ENV premennú na "production"
* Zabezpečte automatický reštart vašej aplikácie
* Zabezpečte, aby vaša aplikácia bežala v clusteri
* Cachujte request resulty
* Používajte load balancer
* Používajte reverse proxy

### Nastavte NODE_ENV premennú na "production"

NODE_ENV environment premenná špecifikuje, v ktorom environmente vaša aplikácia beží, zvyčajne (development alebo production). Jedna z najjednoduchších vecí, ktorú môžete vykonať k zlepšeniu výkonnosti vašej aplikácie je nastavenie premennej NODE_ENV na "production".

Nastavenie NODE_ENV na "production" zabezpečí, aby Express:

* Cachoval view templates.
* Cachoval CSS súbory generované z CSS extenzií.
* Generoval "menej ukecané" error messages.

[Testy ukazujú](http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/), že tym dokážete zlepšiť výkonnosť aplikácie až trojnásobne!

Ak potrebujete písať kód, ktorý je environment-specific, môžete hodnotu NODE_ENV premennej zistiť pomocou `process.env.NODE_ENV`. Pamätajte však nato, že zisťovanie hodnoty akejkoľvek environment premennej má čiastočný dopad na výkonnosť, preto by ste to mali robiť skôr sporadicky.

Počas vývoja nastavujete environment premenné zvyčajne pomocou shellu, napr. použitím `export` vo vašom `.bash_profile` súbore. Toto by ste však nemali robiť na produkčnom serveri; namiesto toho, použite init systém vášho operačného systému (systemd alebo Upstart). Nasledujúca sekcia poskytuje viac detailov ohľadom použitia init systému, pričom nastavenie NODE_ENV premennej je veľmi dôležité z pohľadu výkonnosti (a zároveň veľmi jednoduché), ako je načrtnuté tu:

Pomocou Upstart, použite kľúčové slovo `env` vo vašom job súbore. Napr.:

<pre>
<code class="language-sh" translate="no">
# /etc/init/env.conf
 env NODE_ENV=production
</code>
</pre>

Pre viac informácií si prečítajte [Upstart Intro, Cookbook and Best Practices](http://upstart.ubuntu.com/cookbook/#environment-variables).

Pomocou systemd, použite direktívu `Environment` vo vašom unit súbore. Napr.:

<pre>
<code class="language-sh" translate="no">
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
</code>
</pre>

Pre viac informácií si prečítajte [Using Environment Variables In systemd Units](https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html).

Ak používate StrongLoop Process Manager, môžete [nastaviť environment premennú taktiež keď nainštalujete StrongLoop PM ako službu](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-Setenvironmentvariables).

### Zabežpečte, aby sa vaša aplikácia automaticky reštartovala

V produkcii zvyčajne nechcete, aby vaša aplikácia bola offline, nikdy. To znamená, že musíte zabezpečiť, aby sa reštartovala v obidvoch prípadoch, či už je to pád aplikácie, alebo servera samotného. Hoci si určite želáte, aby sa ani jedna z týchto vecí nestala, musíte s tým počítať pomocou:

* Použitím správcu procesov k reštartovaniu aplikácie (a Node procesu) v prípade pádu.
* Použitím init systému poskytovaného vašim OS na reštartovanie správcu procesov v prípade pádu OS. Taktiež je možné použiť init systém bez správcu procesov.

Node aplikácie zhavarujú v prípade výskytu neodchytenej výnimky. Ako prvé by ste sa mali uistiť, že vaša aplikácia je dostatočne otestovaná a spracováva všetky výnimky (pre viac detailov si pozrite časť [Správne odchytávajte a spracovávajte výnimky](#exceptions)). Ako záchranu vytvorte/nastavte mechanizmus automatického reštartu.

#### Používajte správcu procesov

Počas vývoja štartujete vašu aplikáciu jednoducho z príkazového riadka pomocou `node server.js`,  príp. niečoho podobného. Tento spôsob je však v prípade produkcie cesta do pekla. Ak vaša aplikácia spadne, bude offline až dokým ju nereštartujete. Aby ste sa uistili, že sa vaša aplikácia v prípade pádu reštartuje, používajte správcu procesov. Správca procesov je "kontainer" pre aplikácie, ktorý vám pomáha pri deploymente, poskytuje vysokú dostupnosť a umožňuje správu aplikácie v runtime.

Správca procesov umožňuje okrem automatického reštartu vašej aplikácie taktiež:

* Získať pohľad o výkonnosti runtime a spotrebe resourcov.
* Dynamicky upravovať nastavenia pre zlepšenie výkonnosti.
* Kontrolu clusteringu (StrongLoop PM a pm2).

Spomedzi správcov procesov pre Node sú najpopulárnejši:

* [StrongLoop Process Manager](http://strong-pm.io/)
* [PM2](https://github.com/Unitech/pm2)
* [Forever](https://www.npmjs.com/package/forever)

Pre detailnejšie porovnanie vlastností si pozrite [http://strong-pm.io/compare/](http://strong-pm.io/compare/). Pre detailnejšie intro si pozrite [Process managers for Express apps](/{{ page.lang }}/advanced/pm.html).

Použitím hociktorého z týchto správcov procesov zabezpečíte, aby vaša aplikácia zostala "hore" i v prípade občasného pádu.

Avšak, StrongLoop PM má veľa ďalších features špeciálne určené pre produkčné prostredie. Môžete ich použiť na:

* Vytvorenie buildu vašej aplikácie lokálne a následný bezpečný deployment do produkcie.
* Automatický reštart vašej aplikácie v prípade pádu.
* Vzdialenú správu vášho clustera.
* Zobrazenie CPU profilov a heap snapshotov k optimalizácii výkonnosti a diagnostike memory leakov.
* Zabrazenie performance metrík vašej aplikácie.
* Jednoduchú škálovateľnosť na viacero hostov s intergrovanou kontrolou pre Nginx load balancer.

Ako je vysvetlené nižšie, pri inštalácii StrongLoop PM pomocou init systému, ako služby operačného systému, sa služba automaticky reštartuje po reštartovaní systému. Takto bude vaša aplikácia a cluster bežať navždy.

#### Používajte init systém

Ďalšiou vrstvou spoľahlivosti je zabezpečenie, aby sa vaša aplikácia reštartovala pri reštartovaní servera. Systémy môžu spadnúť z rôznych dôvodov. Aby bolo zaistené, aby sa vaša aplikácie reštartovala v prípade, ak dôjde k chybe servera, použite init systém zabudovaný do vášho operačného systému. Dva hlavné init systémy používané v súčasnosti sú [systemd](https://wiki.debian.org/systemd) a [Upstart](http://upstart.ubuntu.com/).

Existujú dva spôsoby použitia init systémov s vašou Express aplikáciou:

* Spustite vašu aplikáciu v správcovi procesov a nainštalujte správcu procesov ako službu s init systémom. Správca procesov zabezpečí reštart aplikácie pri jej páde a init systém reštartuje správcu procesov v prípade reštartu OS. Jedná sa o odporúčaný postup.
* Spustite vašu aplikáciu (a Node) priamo s init systémom. Tento postup je trocha jednoduchší, ale prídete tým o ďalšie výhody plynúce z použitia správcu procesov.

##### Systemd

Systemd je správca služieb používaný niektorými distribúciami Linuxu. Väčšina hlavných linuxových distribúcií prijala systemd ako svoj defaultný init systém.

Konfiguračný súbor pre systemd sa nazýva _unit file_, ktorého názov má príponu .service. Tu je príklad súboru pre priamu správu Node aplikácie (nahradte tučný text s hodnotami vášho systéme a aplikácie):

<pre>
<code class="language-sh" translate="no">
[Unit]
Description=Awesome Express App

[Service]
Type=simple
ExecStart=/usr/local/bin/node /projects/myapp/index.js
WorkingDirectory=/projects/myapp

User=nobody
Group=nogroup

# Environment variables:
Environment=NODE_ENV=production

# Allow many incoming connections
LimitNOFILE=infinity

# Allow core dumps for debugging
LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
</code>
</pre>
Pre viac informácií ohľadom systemd si prečítajte [systemd reference (man page)](http://www.freedesktop.org/software/systemd/man/systemd.unit.html).

##### StrongLoop PM ako systemd služba

StrongLoop PM možete jednoducho nainštalovať ako systemd službu. Následne, v prípade že nastane reštart servera, systemd automaticky reštartuje i StrongLoop PM, ktorý následne reštartuje i aplikácie ktoré spravuje.

Pre inštaláciu StrongLoop PM ako systemd služby spustite:

```console
$ sudo sl-pm-install --systemd
```

Potom spustite službu pomocou:

```console
$ sudo /usr/bin/systemctl start strong-pm
```

Pre viac informácií si prečítajte [Setting up a production host (StrongLoop documentation)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHEL7+,Ubuntu15.04or15.10).

##### Upstart

Upstart je systémový nástroj dostupný v mnohých linuxových distribúciách slúžiaci na  spúšťanie taskov a služieb počas štartu systému, ich zastavenie počas vypnutia a dohľadu nad nimi. Vašu Express aplikáciu, alebo správcu procesov môžete nakonfigurovať ako službu a potom Upstart zabezpečí jej reštart v prípade pádu.

Upstart služba je definovaná v konfiguračnom súbore (tiež nazývaný "job") s názvom súboru končiacim `.conf`. Nasledujúci príklad ukazuje, ako vytvoriť job súbor s názvom "myapp" pre aplikáciu s názvom "myapp" s hlavným súbor umiestneným v `/projects/myapp/index.js`.

Vytvorte súbor s názvom `myapp.conf` umiestnený v `/etc/init /` s nasledujúcim obsahom (nahraďte tučný text s hodnotami pre váš systém a aplikáciu):

<pre>
<code class="language-sh" translate="no">
# When to start the process
start on runlevel [2345]

# When to stop the process
stop on runlevel [016]

# Increase file descriptor limit to be able to handle more requests
limit nofile 50000 50000

# Use production mode
env NODE_ENV=production

# Run as www-data
setuid www-data
setgid www-data

# Run from inside the app dir
chdir /projects/myapp

# The process to start
exec /usr/local/bin/node /projects/myapp/index.js

# Restart the process if it is down
respawn

# Limit restart attempt to 10 times within 10 seconds
respawn limit 10 10
</code>
</pre>

Pozn.: Tento skript vyžaduje Upstart 1.4 príp. novší, podporovaný na Ubuntu 12.04-14.10.

Potom, ako je job nakonfigurovaný k spusteniu po štarte systému, bude vaša aplikácia spustená spolu s operačným systémom a automaticky reštartovaná v prípade pádu aplikácie alebo reštartu samotného systému.

Okrem automatického reštartovania aplikácie, Upstart umožňuje použíť tieto príkazy:

* `start myapp` – Start the app
* `restart myapp` – Restart the app
* `stop myapp` – Stop the app.

Pre viac informácií ohľadom Upstart si prečítajte tu: [Upstart Intro, Cookbook and Best Practises](http://upstart.ubuntu.com/cookbook).

##### StrongLoop PM ako Upstart služba

StrongLoop PM možete jednoducho nainštalovať ako Upstart službu. Následne, v prípade že nastane reštart servra, Upstart automaticky reštartuje i StrongLoop PM, ktorý následne reštartuje aj aplikácie ktoré spravuje.

Pre inštaláciu StrongLoop PM ako Upstart 1.4 služby:

```console
$ sudo sl-pm-install
```

Pre spustenie služby:

```console
$ sudo /sbin/initctl start strong-pm
```

Pozn.: Pre systémy bez podpory Upstart 1.4 sú príkazy mierne odlišné. Pre viac informácií sa pozrite na [Setting up a production host (StrongLoop documentation)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHELLinux5and6,Ubuntu10.04-.10,11.04-.10).

### Zabezpečte aby vaša aplikácia bežala v clusteri

V prípade multi-core systémov môžete zvýšiť výkonnosť Node aplikácie niekoľko násobne jej spustením clusterom procesov. V clusteri beží niekoľko inštancií aplikácie, ideálne jedna pre každé CPU jadro, čím sa rozloží záťaž a úlohy medzi jednotlívé inštancie.

![Balancovanie medzi inštanciami aplikácie použitím cluster API](/images/clustering.png)

Dôležité: Od momentu kedy inštancia aplikácie beží ako samostatný proces, nezdieľajú spoločnu pamäť. Tzn. objekty sú lokálne pre každú inštanciu aplikácie. Preto nedokážete spravovať stav v kóde aplikácie. Namiesto toho môžete k ukladaniu dát týkajúcich sa session a stavu použiť tzv. in-memory datastore ako [Redis](http://redis.io/). Toto varovanie platí v podstate pre všetky formy horizontálneho škálovania, či už clustering s viacerými procesmi alebo viacero fyzických servrov.

V clusterovaných aplikáciách, worker procesy môžu spadnúť individuálne bez toho, aby ovplyvnili zvyšok procesov. Okrem výhody z pohľadu výkonnosti, izolovanie chybovosti je ďalším dôvodom pre beh clustra procesov aplikácie. V prípade, že worker proces spadne zabezpečte, že vždy sa zalogujte event a vytvorí nový process (spawn) pomocou cluster.fork().

#### Použite Node cluster modulu

Clustering je možný pomocou Node [cluster modulu](https://nodejs.org/dist/latest-v4.x/docs/api/cluster.html). Ten dovoľuje master procesu vyrobiť (spawn) worker procesy a rozdistribuovať prichádzajúce spojenia medzi workerov. Avšak, lepšie než priame použitie tohto modulu je použiť jeden z mnohých existujúcich toolov, ktoré to robia automaticky, napr. [node-pm](https://www.npmjs.com/package/node-pm) alebo [cluster-service](https://www.npmjs.com/package/cluster-service).

#### Použitie StrongLoop PM

V prípade, že deploynete vašu aplikáciu do StrongLoop Process Manager (PM), získate tým výhody clusteringu _bez_ modifikácie kódu vašej aplikácie.

Keď StrongLoop Process Manager (PM) spúšta aplikáciu, aplikácia je spustená automaticky v clusteri s takým množstvom workerov, aý je počet jadier CPU systéme. Počet worker procesov v clustri môžete manuálne zmeniť použitím slc nástroja bez nutnosti stopnutia aplikácie.

Napr., predpokladajúc, že ste deployli vašu aplikáciu na prod.foo.com a StrongLoop PM počúva na porte 8701 (defaultný), tak nastavenie veľkosti clustera na osem vykonáte pomocou slc takto:

```console
$ slc ctl -C http://prod.foo.com:8701 set-size my-app 8
```

Pre viac informácií ohľadom clusteringu pomocou StrongLoop PM sa pozrite na časť [Clustering](https://docs.strongloop.com/display/SLC/Clustering) v StrongLoop dokumentácii.

### Cache-ovanie odpovedí requestov

Ďalšou stratégiou pre zlepšenie výkonosti v produkcii je cachovanie odpovedí na prichádzajúce requesty, čím zabezpečíte, že vaša aplikácia nemusí opakovane vykonávat tie isté operácie pre obslúženie rovnakých requestov.

Použitie caching servra, ako [Varnish] (https://www.varnish-cache.org/) alebo [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/) (pozrite si tiež [Nginx Caching](https://serversforhackers.com/nginx-caching/)) výrazne zvýši rýchlosť a výkon vášej aplikácie.

### Použitie load balancera

Bez ohľadu na to, ako je optimalizovaná aplikácia, jedna inštancia môže spracovať iba obmedzené množstvo záťaže a requestov. Jedným spôsobom škálovania aplikácie je spustenei jej viacerých inštancií a distribuovať zaťaženie pomocou load balancera. Zapojenie load balancera môže zlepšiť výkon a rýchlosť vašej aplikácie a umožní jej vačšie škálovanie, než by bolo možné v prípade jedinej inštancie.

Load balancer je zvyčajne reverzné proxy, ktoré organizuje prevádzku medzi viacerými inštanciami aplikácie a serverov. Load balancer môžete pre vašu aplikáciu setupnúť jednoducho použítím [Nginx](http://nginx.org/en/docs/http/load_balancing.html), alebo [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Load balancer zabezpečí správne spárovanie requestov súvisiacich s konkrétnym session ID a procesom, ktorý túto session spravuje. Tento prístup sa nazýva _session affinity_, alebo _sticky sessions_ a môže byť riešený návrhom popísaným vyššie, teda použitím dátového úložiska ako je Redis (v závislosti od aplikácie). Prečítajte si nasledujúcu diskusiu [Using multiple nodes](http://socket.io/docs/using-multiple-nodes/).

#### Použitie StrongLoop PM spolu s Nginx load balancerom

[StrongLoop Process Manager](http://strong-pm.io/) je integrovaný s Nginx Controller-om, čo uľahčuje konfiguráciu multi-host produkčného prostredia. Pre viac informácií sa pozrite na [Scaling to multiple servers](https://docs.strongloop.com/display/SLC/Scaling+to+multiple+servers) (StrongLoop dokumentácia).
<a name="proxy"></a>

### Použitie reverzného proxy

Reverzné proxy je umiestnené pred webovou aplikáciou a vykonáva podporné operácie k requestom smerovaných na aplikáciu. Medzi inným, dokáže handlovať stránky s errormi, kompresiu, caching, servovanie súborov a load balancing.

Odovzdanie úloh, ktoré nevyžadujú znalosť stavu aplikácie reverznému proxy, odbremení Express aplikáciu a umožní jej vykonávať špecializované úlohy. Z tohto dôvodu sa v produkcii odporúča fungovanie Express za reverzným proxy ako je [Nginx](https://www.nginx.com/) či [HAProxy](http://www.haproxy.org/).
