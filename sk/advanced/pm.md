---
layout: page
title: Použitie správcov procesov pre Express aplikácie
menu: advanced
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Použitie správcov procesov pre Express aplikácie

Ak vaša Express aplikácia pobeží v produkcii, môže byť k dosiahnutiu nasledujúcich úloh vhodné použiť _správcu processov (process manager)_:

- Reštart aplikácie v prípade pádu.
- Získanie prehľadu o spotrebe zdrojov a výkonnosti aplikácie.
- Dynamická zmena nastavení k zlepšeniu výkonnosti.
- Kontrola nad clustering-om.

Správca procesov je čiastočne akoby aplikačný server: je to "kontainer" pre aplikácie uľahčujúci ich deployment,
poskytujúci vysokú dostupnosť a umožňujúci správu aplikácie v runtime.

Najpopulárnejšie s pomedzi správcov procesov pre Express i ostatné Node.js aplikácie patria:

- [StrongLoop Process Manager](#sl)
- [PM2](#pm2)
- [Forever](#forever)


Použitie ktoréhokoľvek z hore spomenutých nástrojov môže byť veľmi nápomocné, avšak StrongLoop Process Manager je jediným nástrojom poskytujúcim obsiahle runtime a deployment riešenie adresujúce celý životný cyklus Node.js aplikácie pomocou nástrojov pre každý krok pred a po nasadení do produkcie a to v jednotnom rozhraní.

Tu je jednoduchý náhľad na každý z týchto nástrojov. Pre detailnejšie porovnanie sa pozrite na [http://strong-pm.io/compare/](http://strong-pm.io/compare/).

## <a id="sl">StrongLoop Process Manager</a>

StrongLoop Process Manager (StrongLoop PM) je produkčný správca procesov pre Node.js aplikácie. StrongLoop PM má vstavaný load balancing, monitoring, multi-host deployment a grafickú konzolu.
StrongLoop PM môžete využiť na tieto úlohy:

- Build, package, a deploy vašej Node.js aplikácie na lokálny alebo remote systém.
- Zobrazenie CPU profilov and heap snapshotov pre optimalizáciu výkonnosti a diagnostiku memory leakov.
- Udržovanie procesov a clusterov vždy nažive.
- Zobrazenie výkonnostných metrík vašej aplikácie.
- Jednoduchá správa multi-host deploymentov s Nginx integráciou.
- Unifikácia viacerých StrongLoop PM do distribuovaného runtime-u mikro servisov spravovateľných pomocou Arc.

So StrongLoop PM dokážete pracovať pomocou výkonného command-line interface nástroja nazývaného `slc`, prípadne grafického nástroja nazývaného  Arc. Arc je open source s profesonálnou podporou od StrongLoop-u.

Pre viac informácií si pozrite [http://strong-pm.io/](http://strong-pm.io/).

Celá dokumentácia:

- [Operating Node apps (StrongLoop documentation)](http://docs.strongloop.com/display/SLC)
- [Using StrongLoop Process Manager](http://docs.strongloop.com/display/SLC/Using+Process+Manager).

### Inštalácia

```console
$ [sudo] npm install -g strongloop
```

### Základné použitie

```console
$ cd my-app
$ slc start
```

Zobrazenie stavu správcu procesov a všetkých deploynutých aplikácií:

```console
$ slc ctl
Service ID: 1
Service Name: my-app
Environment variables:
  No environment variables defined
Instances:
    Version  Agent version  Cluster size
     4.1.13      1.5.14           4
Processes:
        ID      PID   WID  Listening Ports  Tracking objects?  CPU profiling?
    1.1.57692  57692   0
    1.1.57693  57693   1     0.0.0.0:3001
    1.1.57694  57694   2     0.0.0.0:3001
    1.1.57695  57695   3     0.0.0.0:3001
    1.1.57696  57696   4     0.0.0.0:3001
```

Vypísanie zoznamu všetkých aplikácií (servisov) pod správou:

```console
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
```

Stopnutie aplikácie:

```console
$ slc ctl stop my-app
```

Reštart aplikácie:

```console
$ slc ctl restart my-app
```

Môžete taktiež vykonať "mäkký reštart", ktorý dá worker procesom dostatok času na uzatvorenie existujúcich pripojení a následne reštartuje aplikáciu:

```console
$ slc ctl soft-restart my-app
```

Odstránenie aplikácie zo správy:

```console
$ slc ctl remove my-app
```

## <a id="pm2">PM2</a>

PM2 je produkčný správca procesov pre Node.js aplikácie so vstavaným load balancerom. PM2 dokáže udržať aplikáciu nažive a vykonať jej prípadný reload bez výpadku a umožní vykonávať bežné system admin úlohy.  PM2 taktiež umožňuje spravovať logovanie, monitoring a clustering aplikácií.

Pre viac informácií sa pozrite na [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2).

### Inštalácia

```console
$ [sudo] npm install pm2 -g
```

### Základné použitie

Pre naštartovanie aplikácie pomocou `pm2` príkazu musíte špecifikovať cestu k aplikácii. Avšak pre stop, reštart, alebo odstránenie aplikácie zo správy, postačuje špecifikovať len jej názov alebo ID.

```console
$ pm2 start npm --name my-app -- start
[PM2] restartProcessId process id 0
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-app   │ 0  │ fork │ 64029 │ online │ 1       │ 0s     │ 17.816 MB   │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use the `pm2 show <id|name>` command to get more details about an app.
```

Po naštartovaní aplikácie pomocou `pm2` príkazu sa aplikácia automaticky spustí na backgrounde (pozadí). Background aplikáciu môžete ovládať z príkazového riadka pomocou rozličných `pm2` príkazov.

Potom, ako je aplikácia naštartovaná pomocou `pm2` príkazu, je zaregistrovaná do zoznamu PM2 procesov pod konkrétnym ID. Preto dokážete spravovať aplikácie s rovnakým názvom z rôznych priečinkov, použitím ich ID.

Pozn., ak Vám beží viac ako jedna aplikácia s rovnakým názvom, vykonanie `pm2` príkazu ich ovplyvní všetky. Preto pre správu konkrétnej aplikácie používajte namiesto názvu radšej jej ID.

Vypísanie zoznamu všetkých bežiacich procesov:

```console
$ pm2 list
```

Stopnutie aplikácie:

```console
$ pm2 stop 0
```

Reštart aplikácie:

```console
$ pm2 restart 0
```

Pre zobrazenie detailných informácií o aplikácii:

```console
$ pm2 show 0
```

Odstránenie aplikácie z PM2 registra:

```console
$ pm2 delete 0
```


## <a id="forever">Forever</a>

Forever je jednoduchý command-line nástroj slúžiaci na udržanie vášho skriptu nažive. Jednoduché rozhranie nástroja Forever ho robí ideálnym pre správu menších deploymentov Node.js aplikácií a skriptov.

Pre viac informácií sa pozrite na [https://github.com/foreverjs/forever](https://github.com/foreverjs/forever).

### Inštalácia

```console
$ [sudo] npm install forever -g
```

### Základné použitie

Pre naštartovanie použite príkaz `forever start` a špecifikujte cestu k skriptu:

```console
$ forever start script.js
```

Tento príkaz spustí skript v tzv. daemon móde (na pozadí).

Pre priame spistenie skriptu v termináli vynechajte `start`:

```console
$ forever script.js
```

Je dobrým zvykom logovať výstup z nástroja Forever a skriptu pomocou prepínača `-l`, `-o` a `-e`,  ako je uvedené v príklade nižšie:

```console
$ forever start -l forever.log -o out.log -e err.log script.js
```

Pre zobrazenie zoznamu skriptov, ktoré boli naštartované pomocou Forever použite:

```console
$ forever list
```

Pre stopnutie skriptu naštartovaného pomocou Forever použite príkaz `forever stop` a špecifikujte index procesu (podľa výpisu z `forever list` príkazu).

```console
$ forever stop 1
```

Taktiež to môžete vykonať pomocou špecifikovania cesty k skriptu:

```console
$ forever stop script.js
```

Pre stopnutie všetkých skriptov, ktoré boli naštartované pomocou Forever príkazu použite:

```console
$ forever stopall
```

Nástroj Forever má veľa možností a taktiež poskytuje programové API.
