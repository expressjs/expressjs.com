---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Performance - Osvedčené postupy pre Express v produkcii
menu: advanced
lang: sk
redirect_from: "/advanced/best-practice-performance.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Osvedčené postupy pre Express v produkcii: výkonnosť and spoľahlivosť

## Prehľad

Tento článok popisuje niektoré osvedčené postupy z pohľadu výkonnosti a spoľahlivosti Express aplikácií v produkcii.

Táto časť jasne spadá do tzv. "devops" sveta, dotýkajúca sa tradičného vývoja i prevádzky. Podĺa toho sú tieto informácie rozdelené do dvoch častí:

* [Veci, ktoré je potrebné vykonať vo vašom kóde](#code) (časť vývoja).
* [Veci, ktoré je potrebné nastaviť na vašom environment-e](#env) (časť prevádzky).

<a name="code"></a>

## Veci, ktoré je potrebné vykonať vo vašom kóde

Tu je niekoľko vecí, ktoré môžete vykonať vo vašom kóde k zlepšeniu výkonnosti vašej aplikácie:

* Používajte gzip kompresiu
* Nepoužívajte synchrónne funkcie
* Pre servovanie statických súborov používajte middleware
* Správne logujte
* Správne odchytávajte a spracovávajte výnimky

### Používajte gzip kompresiu

Použitie gzip kompresie môže veľmi znížiť veľkosť response body a tým zvýšíť rýchlosť webovej aplikácie. Pre zapnutie gzip kompresie vo vašej Express aplikácii používajte [compression](https://www.npmjs.com/package/compression) middleware. Napr.:

<pre><code class="language-javascript" translate="no">
var compression = require('compression');
var express = require('express');
var app = express();
app.use(compression());
</code></pre>

Pre stránky s vysokou návštevnosťou sa odporúča implementovať kompresiu na úrovni reverse proxy (pozrite [Použitie reverse proxy](#proxy)). V takom prípade nemusíte použiť compression middleware. Pre viac detailov ohľadom zapnutia gzip kompresie na Nginx serveri sa pozrite na [Module ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html) v Nginx dokumentácii.

### Nepoužívajte synchrónne funkcie

Synchrónne funkcie a metódy "držia" proces vykonania až do kým nebudú spracované. Jedno volanie synchrónnej funkcie môže trvať pár mikrosekúnd, či milisekúnd, avšak v prípade stránok s vysokou návštevnosťou, takéto volania znižujú výkonnosť aplikácie. Preto sa ich používaniu v produkcii vyhnite.

Hoci samotný Node i mnohé jeho moduly poskytujú synchrónne a asynchrónne verzie ich funkcií, v produkcii vždy používajte ich asynchrónne verzie. Jediná situácia, kedy by malo použitie synchrónnej funkcie opodstatnenie je pri prvotnom spustení aplikácie.

Ak používate Node.js 4.0+ alebo io.js 2.1.0+, môžete použiť prepínač `--trace-sync-io`, ktorý vypíše warning a stack trace vždy, keď vaša aplikácia použije synchrónne API. V produkcii to samozrejme nepoužívajte, ale už pri developmente sa uistite, že vaša aplikácia je pripravená pre produkciu. Pre viac informácií sa pozrite na [Weekly update for io.js 2.1.0](https://nodejs.org/en/blog/weekly-updates/weekly-update.2015-05-22/#2-1-0).

### Pre servovanie statických súborov používajte middleware

V developmente môžete pre servovanie statických súborov používať [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile). V produkcii to však nepoužívajte, pretože táto funkcia musí pri každom requeste čítať z file systému, čo má za následok značné oneskorenie a celkovo nepriaznivo ovlyvňuje výkonnosť aplikácie. `res.sendFile()` funkcia _nie_ je implementovaná pomocou [sendfile](http://linux.die.net/man/2/sendfile) systémového volania, ktoré by ju robilo oveľa efektívnejšou.

Namiesto toho používajte [serve-static](https://www.npmjs.com/package/serve-static) middleware (prípadne podobný ekvivalent), ktorý je optimalizovaný pre servovanie statických súborov v Express aplikáciách.

Ešte lepšou možnosťou pre servovanie statických súborov je použitie reverse proxy; pre viac informácií sa pozrite na [Použitie reverse proxy](#proxy).

### Správne logujte

Vo všeobecnosti existujú dva dôvody k logovaniu vo vašej aplkácii a to debugovanie a logovanie aktivít vašej aplikácie. Použitie `console.log()` príp. `console.err()` k vypísaniu log správy je bežnou praxou počas developmentu. Avšak pozor, [tieto funkcie sú synchrónne](https://nodejs.org/api/console.html#console_console_1) v prípade, ak je výstupom terminál príp. súbor, takže nie sú vhodné pre produkčné prostredie, pokiaľ výstup nepresmerujete do iného programu.

#### Logovanie z dôvodu debugovania

Ak používate logovanie kvôli debugovaniu, tak namiesto `console.log()` používajte špeciálny modul na debugovanie, ako napr. [debug](https://www.npmjs.com/package/debug). Tento modul vám umožňuje použivať environment premennú DEBUG, pomocou ktorej dokážete kontrolovať, ktoré debug výpisy budú vypísané pomocou `console.err()`, príp. žiadne. Ak chcete, aby vaša aplikácia bola čisto asynchrónna, budete stále potrebovať presmerovať výstup  `console.err()` do iného programu. Ale v skutočnosti asi nechcete debugovať v produkcii, však?

#### Logovanie aktivít aplikácie

Ak používate logovanie na sledovanie aktivít aplikácie (napr. sledovanie traffic-u, príp. API volaní), tak  namiesto `console.log()` používajte logovacie knižnice, ako sú napr. [Winston](https://www.npmjs.com/package/winston) či [Bunyan](https://www.npmjs.com/package/bunyan). Ak vás zaujíma detailnejšie porovnanie týchto dvoch knižníc, prečítajte si tento blog post: [Comparing Winston and Bunyan Node.js Logging](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/).

<a name="exceptions"></a>

### Správne odchytávajte a spracovávajte výnimky

V prípade neodchytenia výnimky Node.js aplikácie spadnú. Tzn, že v prípade nespracovania výnimky a nevykonania správnej akcie vaša Express aplikácia spadne. Ak budete pokračovať podľa rád v časti [Zabežpečte aby vaša aplikácia bola automaticku reštartovaná](#restart), tak sa vaša aplikácia z pádu zotaví. Express applikácie potrebujú naštastie len krátky čas k naštartovaniu. Avšak, bez ohľadu nato, by ste sa mali pádom aplikácie v prvom rade vyhnúť a k tomu potrebujete správne odchytávať výnimky.

K uisteniu sa, že spracovávate všetky výnimky, používajte tieto techniky:

* [Používajte try-catch](#try-catch)
* [Používajte promises](#promises)

Predtým, ako sa hlbšie pustíme do týchto tém, mali by ste mať základné znalosti Node/Express error handlingu, akými sú používanie error-first callback-ov a šírenie errorov middlewarmi. Node používa pre návrat errorov z asynchrónnych funkcií konvenciu "error-first callbackov", kde prvým argymentom callback funkcie je error objekt, nasledovaný ostatnými návratovými hodnotami úspešného spracovanie funkcie. Ak nenastal žiaden error, zabezpečte aby prvým parametrom bol null. Definícia callback funkcie musí korešpondovať s error-first callback konvenciou a musí zmysluplne spracovať error. V Express aplikáciách je pre šírenie erroru middlewarmi osvedčenou a odporúčanou technikou použitie next() funkcie.

Pre viac informácií ohľadom základov error handlingu sa pozrite na:

* [Error Handling in Node.js](https://www.joyent.com/developers/node/design/errors)
* [Building Robust Node Applications: Error Handling](https://strongloop.com/strongblog/robust-node-applications-error-handling/) (StrongLoop blog)

#### Čo nerobiť

Jedna z vecí, ktorú by ste robiť _nemali_ je počúvať na `uncaughtException` event, ktorý je emitovaný v okamihu kedy výnimka "bublá" celou cestu späť do event loop-u. Pridanie event listenera `uncaughtException` zmení defaultné chovanie procesu ktorý narazil na výnimku; proces bude pokračovať napriek výnimke. Toto sa môže zdať ako dobrým riešením, ako predísť pádu vašej aplikácie, avšak pokračovaním behu vašej aplikácie, v prípade neodchytenej výnimky, je nebezpečnou praktikou a nepodporúča sa, pretože sa tým stav procesu stáva nespoľahlivým a nepredpovedateľným.

Navyše, použitie `uncaughtException` je oficiálne uznané ako [hrubé](https://nodejs.org/api/process.html#process_event_uncaughtexception) a existuje [návrh](https://github.com/nodejs/node-v0.x-archive/issues/2582) na jeho odstŕanenie z jadra. Takže počúvanie na  `uncaughtException` nie je dobrým nápadom. To je dôvod, prečo odporúčame veci ako viacero procesov a supervisorov: pád a reštartovanie je často najspolalivejším spôsobom zotavenia sa z erorru.

Taktiež neodporúčame používať [domain](https://nodejs.org/api/domain.html) modul. Všeobecne nerieši žiaden problém a je označený ako deprecated modul.

<a name="try-catch"></a>

#### Používajte try-catch

Try-catch je klasická konštrukcia v jazyku JavaScript, pomocou ktorej dokážete odchytiť výnimky v synchrónnom kóde. Použite try-catch, napr. na spracovanie chýb pri JSON parsingu, ako na ukážke nižšie.

Používajte nástroje [JSHint](http://jshint.com/) príp. [JSLint](http://www.jslint.com/), ktoré vám pomôžu nájsť implicitné výnimky, ako napr. [reference errors on undefined variables](http://www.jshint.com/docs/options/#undef).

Tu je príklad použitia try-catch k odchyteniu potenciálnej výnimky zapríčiňujúcej pád procesu.
Táto middleware funkcia príjma query parameter nazvaný "params" ktorý je JSON objekt.

<pre><code class="language-javascript" translate="no">
app.get('/search', function (req, res) {
  // Simulating async operation
  setImmediate(function () {
    var jsonStr = req.query.params;
    try {
      var jsonObj = JSON.parse(jsonStr);
      res.send('Success');
    } catch (e) {
      res.status(400).send('Invalid JSON string');
    }
  })
});
</code></pre>

Avšak, try-catch funguje len pre synchrónny kód. Vzhľadom nato, že Node platforma je primárne asynchrońna (obzvlášť v produkčnom prostredí), veľa výnimiek try-catch neodchytí.

<a name="promises"></a>

#### Používajte promises

Promises dokážu spracovať všetky typy výnimiek (explicitné aj implicitné) v asynchrónnych blokoch kódu používajuce `then()`, pridaním `.catch(next)` na koniec promise reťazca. Napr.:

<pre><code class="language-javascript" translate="no">
app.get('/', function (req, res, next) {
  // do some sync stuff
  queryDb()
    .then(function (data) {
      // handle data
      return makeCsv(data)
    })
    .then(function (csv) {
      // handle csv
    })
    .catch(next)
})

app.use(function (err, req, res, next) {
  // handle error
})
</code></pre>

Takto sa všetky asynchrónne i synchrónne errory prešíria do error middleware-u.

Avšak, dve upozornenia:

1.  Všetky vaše asynchrónne kódy musia vracať promises (okrem emitorov). Ak niektorá z knižníc nevracia promises, konvertnite základný objekt použitím funkcie ako napr. [Bluebird.promisifyAll()](http://bluebirdjs.com/docs/api/promise.promisifyall.html).
2.  Event emitory (ako sú streams) môžu spôsobiť neodchytené výnimky. Preto sa uistite, že správne spracováte error eventy; napr.:

<pre><code class="language-javascript" translate="no">
app.get('/', wrap(async (req, res, next) => {
  let company = await getCompanyById(req.query.id)
  let stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
</code></pre>

Pre viac informácií ohľadom error handling-u použitím promises si prečítajte:

* [Asynchronous Error Handling in Express with Promises, Generators and ES7](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)
* [Promises in Node.js with Q – An Alternative to Callbacks](https://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/)

<a name="env"></a>

## Things to do in your environment / setup

Here are some things you can do in your system environment to improve your app's performance:

* Set NODE_ENV to "production"
* Ensure your app automatically restarts
* Run your app in a cluster
* Cache request results
* Use a load balancer
* Use a reverse proxy

### Set NODE_ENV to "production"

The NODE_ENV environment variable specifies the environment in which an application is running (usually, development or production). One of the simplest things you can do to improve performance is to set NODE_ENV to "production."

Setting NODE_ENV to "production" makes Express:

* Cache view templates.
* Cache CSS files generated from CSS extensions.
* Generate less verbose error messages.

[Tests indicate](http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/) that just doing this can improve app performance by a factor of three!

If you need to write environment-specific code, you can check the value of NODE_ENV with `process.env.NODE_ENV`. Be aware that checking the value of any environment variable incurs a performance penalty, and so should be done sparingly.

In development, you typically set environment variables in your interactive shell, for example by using `export` or your `.bash_profile` file. But in general you shouldn't do that on a production server; instead, use your OS's init system (systemd or Upstart). The next section provides more details about using your init system in general, but setting NODE_ENV is so important for performance (and easy to do), that it's highlighted here.

With Upstart, use the `env` keyword in your job file. For example:

<pre><code class="language-sh" translate="no">
# /etc/init/env.conf
 env NODE_ENV=production
</code></pre>

For more information, see the [Upstart Intro, Cookbook and Best Practices](http://upstart.ubuntu.com/cookbook/#environment-variables).

With systemd, use the `Environment` directive in your unit file. For example:

<pre><code class="language-sh" translate="no">
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
</code></pre>

For more information, see [Using Environment Variables In systemd Units](https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html).

If you are using StrongLoop Process Manager, you can also [set the environment variable when you install StrongLoop PM as a service](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-Setenvironmentvariables).

### Ensure your app automatically restarts

In production, you don't want your application to be offline, ever. This means you need to make sure it restarts both if the app crashes and if the server itself crashes. Although you hope that neither of those events occurs, realistically you must account for both eventualities by:

* Using a process manager to restart the app (and Node) when it crashes.
* Using the init system provided by your OS to restart the process manager when the OS crashes. It's also possible to use the init system without a process manager.

Node applications crash if they encounter an uncaught exception. The foremost thing you need to do is to ensure your app is well-tested and handles all exceptions (see [handle exceptions properly](#exceptions) for details). But as a fail-safe, put a mechanism in place to ensure that if and when your app crashes, it will automatically restart.

#### Use a process manager

In development, you started your app simply from the command line with `node server.js` or something similar. But doing this in production is a recipe for disaster. If the app crashes, it will be offline until you restart it. To ensure your app restarts if it crashes, use a process manager. A process manager is a "container" for applications that facilitates deployment, provides high availability, and enables you to manage the application at runtime.

In addition to restarting your app when it crashes, a process manager can enable you to:

* Gain insights into runtime performance and resource consumption.
* Modify settings dynamically to improve performance.
* Control clustering (StrongLoop PM and pm2).

The most popular process managers for Node are as follows:

* [StrongLoop Process Manager](http://strong-pm.io/)
* [PM2](https://github.com/Unitech/pm2)
* [Forever](https://www.npmjs.com/package/forever)

For a feature-by-feature comparison of the three process managers, see [http://strong-pm.io/compare/](http://strong-pm.io/compare/). For a more detailed introduction to all three, see [Process managers for Express apps](/{{ page.lang }}/advanced/pm.html).

Using any of these process managers will suffice to keep your application up, even if it does crash from time to time.

However, StrongLoop PM has lots of features that specifically target production deployment. You can use it and the related StrongLoop tools to:

* Build and package your app locally, then deploy it securely to your production system.
* Automatically restart your app if it crashes for any reason.
* Manage your clusters remotely.
* View CPU profiles and heap snapshots to optimize performance and diagnose memory leaks.
* View performance metrics for your application.
* Easily scale to multiple hosts with integrated control for Nginx load balancer.

As explained below, when you install StrongLoop PM as an operating system service using your init system, it will automatically restart when the system restarts. Thus, it will keep your application processes and clusters alive forever.

#### Use an init system

The next layer of reliability is to ensure that your app restarts when the server restarts. Systems can still go down for a variety of reasons. To ensure that your app restarts if the server crashes, use the init system built into your OS. The two main init systems in use today are [systemd](https://wiki.debian.org/systemd) and [Upstart](http://upstart.ubuntu.com/).

There are two ways to use init systems with your Express app:

* Run your app in a process manager, and install the process manager as a service with the init system. The process manager will restart your app when the app crashes, and the init system will restart the process manager when the OS restarts. This is the recommended approach.
* Run your app (and Node) directly with the init system. This is somewhat simpler, but you don't get the additional advantages of using a process manager.

##### Systemd

Systemd is a Linux system and service manager. Most major Linux distributions have adopted systemd as their default init system.

A systemd service configuration file is called a _unit file_, with a filename ending in .service. Here's an example unit file to manage a Node app directly (replace the bold text with values for your system and app):

<pre><code class="language-sh" translate="no">
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
</code></pre>
For more information on systemd, see the [systemd reference (man page)](http://www.freedesktop.org/software/systemd/man/systemd.unit.html).

##### StrongLoop PM as a systemd service

You can easily install StrongLoop Process Manager as a systemd service. After you do, when the server restarts, it will automatically restart StrongLoop PM, which will then restart all the apps it is managing.

To install StrongLoop PM as a systemd service:

<pre><code class="language-sh" translate="no">
$ sudo sl-pm-install --systemd
</code></pre>

Then start the service with:

<pre><code class="language-sh" translate="no">
$ sudo /usr/bin/systemctl start strong-pm
</code></pre>

For more information, see [Setting up a production host (StrongLoop documentation)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHEL7+,Ubuntu15.04or15.10).

##### Upstart

Upstart is a system tool available on many Linux distributions for starting tasks and services during system startup, stopping them during shutdown, and supervising them. You can configure your Express app or process manager as a service and then Upstart will automatically restart it when it crashes.

An Upstart service is defined in a job configuration file (also called a "job") with filename ending in `.conf`. The following example shows how to create a job called "myapp" for an app named "myapp" with the main file located at `/projects/myapp/index.js`.

Create a file named `myapp.conf` at `/etc/init/` with the following content (replace the bold text with values for your system and app):

<pre><code class="language-sh" translate="no">
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
</code></pre>

NOTE: This script requires Upstart 1.4 or newer, supported on Ubuntu 12.04-14.10.

Since the job is configured to run when the system starts, your app will be started along with the operating system, and automatically restarted if the app crashes or the system goes down.

Apart from automatically restarting the app, Upstart enables you to use these commands:

* `start myapp` – Start the app
* `restart myapp` – Restart the app
* `stop myapp` – Stop the app.

For more information on Upstart, see [Upstart Intro, Cookbook and Best Practises](http://upstart.ubuntu.com/cookbook).

##### StrongLoop PM as an Upstart service

You can easily install StrongLoop Process Manager as an Upstart service. After you do, when the server restarts, it will automatically restart StrongLoop PM, which will then restart all the apps it is managing.

To install StrongLoop PM as an Upstart 1.4 service:

<pre><code class="language-sh" translate="no">
$ sudo sl-pm-install
</code></pre>

Then run the service with:

<pre><code class="language-sh" translate="no">
$ sudo /sbin/initctl start strong-pm
</code></pre>

NOTE: On systems that don't support Upstart 1.4, the commands are slightly different. See [Setting up a production host (StrongLoop documentation)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHELLinux5and6,Ubuntu10.04-.10,11.04-.10) for more information.

### Run your app in a cluster

In a multi-core system, you can increase the performance of a Node app by many times by launching a cluster of processes. A cluster runs multiple instances of the app, ideally one instance on each CPU core, thereby distributing the load and tasks among the instances.

![Balancing between application instances using the cluster API](/images/clustering.png)

IMPORTANT: Since the app instances run as separate processes, they do not share the same memory space. That is, objects are local to each instance of the app. Therefore, you cannot maintain state in the application code. However, you can use an in-memory datastore like [Redis](http://redis.io/) to store session-related data and state. This caveat applies to essentially all forms of horizontal scaling, whether clustering with multiple processes or multiple physical servers.

In clustered apps, worker processes can crash individually without affecting the rest of the processes. Apart from performance advantages, failure isolation is another reason to run a cluster of app processes. Whenever a worker process crashes, always make sure to log the event and spawn a new process using cluster.fork().

#### Using Node's cluster module

Clustering is made possible with Node's [cluster module](https://nodejs.org/dist/latest-v4.x/docs/api/cluster.html). This enables a master process to spawn worker processes and distribute incoming connections among the workers. However, rather than using this module directly, it's far better to use one of the many tools out there that does it for you automatically; for example [node-pm](https://www.npmjs.com/package/node-pm) or [cluster-service](https://www.npmjs.com/package/cluster-service).

#### Using StrongLoop PM

If you deploy your application to StrongLoop Process Manager (PM), then you can take advantage of clustering _without_ modifying your application code.

When StrongLoop Process Manager (PM) runs an application, it automatically runs it in a cluster with a number of workers equal to the number of CPU cores on the system. You can manually change the number of worker processes in the cluster using the slc command line tool without stopping the app.

For example, assuming you've deployed your app to prod.foo.com and StrongLoop PM is listening on port 8701 (the default), then to set the cluster size to eight using slc:

<pre><code class="language-sh" translate="no">
$ slc ctl -C http://prod.foo.com:8701 set-size my-app 8
</code></pre>

For more information on clustering with StrongLoop PM, see [Clustering](https://docs.strongloop.com/display/SLC/Clustering) in StrongLoop documentation.

### Cache request results

Another strategy to improve the performance in production is to cache the result of requests, so that your app does not repeat the operation to serve the same request repeatedly.

Use a caching server like [Varnish](https://www.varnish-cache.org/) or [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/) (see also [Nginx Caching](https://serversforhackers.com/nginx-caching/)) to greatly improve the speed and performance of your app.

### Use a load balancer

No matter how optimized an app is, a single instance can handle only a limited amount of load and traffic. One way to scale an app is to run multiple instances of it and distribute the traffic via a load balancer. Setting up a load balancer can improve your app's performance and speed, and enable it to scale more than is possible with a single instance.

A load balancer is usually a reverse proxy that orchestrates traffic to and from multiple application instances and servers. You can easily set up a load balancer for your app by using [Nginx](http://nginx.org/en/docs/http/load_balancing.html) or [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

With load balancing, you might have to ensure that requests that are associated with a particular session ID connect to the process that originated them. This is known as _session affinity_, or _sticky sessions_, and may be addressed by the suggestion above to use a data store such as Redis for session data (depending on your application). For a discussion, see [Using multiple nodes](http://socket.io/docs/using-multiple-nodes/).

#### Using StrongLoop PM with an Nginx load balancer

[StrongLoop Process Manager](http://strong-pm.io/) integrates with an Nginx Controller, making it easy to configure multi-host production environment configurations. For more information, see [Scaling to multiple servers](https://docs.strongloop.com/display/SLC/Scaling+to+multiple+servers) (StrongLoop documentation).
<a name="proxy"></a>

### Use a reverse proxy

A reverse proxy sits in front of a web app and performs supporting operations on the requests, apart from directing requests to the app. It can handle error pages, compression, caching, serving files, and load balancing among other things.

Handing over tasks that do not require knowledge of application state to a reverse proxy frees up Express to perform specialized application tasks. For this reason, it is recommended to run Express behind a reverse proxy like [Nginx](https://www.nginx.com/) or [HAProxy](http://www.haproxy.org/) in production.
