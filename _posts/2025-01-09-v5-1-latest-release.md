---
title: "Express@5.1.0: Now the Default on npm with LTS Timeline"
tags: news, release 
author: Express Technical Committee
description: Express 5.1.0 is now the default on npm, and we're introducing an official LTS schedule for the v4 and v5 release lines.
---

Express v5.0.0 was released on September 9th last year, but we didn't make it the `latest` release on npm. Many asked us
why and when it would be, and frankly we were not ready at the time to take that jump. If you have not followed the news
from the project this past year, we have been [hard at work reviving the project](https://expressjs.com/2025/01/09/rewind-2024-triumphs-and-2025-vision.html)
and when we pushed the initial v5 release there were many loose ends still hanging. So first lets quickly go over some
of those loose ends.

### Documentation updates

We had not updated the docs, provided migration guides, or even fully reviewed some of the stagnated v4/5 docs in a long
time. Since then we have had tons of great contributors help get things into better shape. As with any volunteer based
Open Source project, we love contributions to help us improve so as you upgrade please continue to open PRs to fix
anything we missed.

You can find our [v5 docs](https://expressjs.com/en/5x/api.html) and our [migration guide](https://expressjs.com/en/guide/migrating-5.html) on the website.

### Migration Support

We know that migrating between versions can be challenging, especially when it involves significant changes in a widely used framework like Express. That's why we have worked on a solution to simplify part of the process and reduce the impact on developers.  

Thanks to the incredible efforts of [Sebastian](https://github.com/bjohansebas) and [Filip](https://github.com/kjugi), we have developed a new [codemod package](https://www.npmjs.com/package/@expressjs/codemod) specifically designed to facilitate the transition from Express v4 to v5, as well as future major versions. This package automates many of the necessary code changes, minimizing manual effort and making the upgrade as smooth and efficient as possible.  

However, we understand that not all changes can be automated. Some breaking changes, such as the [new Path Route Matching syntax](https://expressjs.com/en/guide/migrating-5.html#path-syntax), require manual modifications by developers.  

For more details on the migration process and how to use the codemod package, check the [repository’s README](https://github.com/expressjs/codemod#readme) and the [migration guide](https://expressjs.com/en/guide/migrating-5.html).

### Ecosystem compatibility

The Express ecosystem is one of its strongest assets. It goes back to the early days of Node.js and is the backbone
that keeps express popular. When it goes [10 years without a major release](https://expressjs.com/2024/10/15/v5-release.html)
everything from middleware to documentation needed updates. We wanted to make sure folks had
some time to get all of that updated before we had everyone moving over. Particularly we care about our very large
beginner user base who may not know the blog post they are reading is not compatible with what they get from
`npm i express`.

We recognize that some friction is inevitable during major upgrades, but thanks to work from ecosystem partners
like [Kamil](https://github.com/kamilmysliwiec) from NestJS [working to update `express` before we went `latest`](https://github.com/expressjs/express/issues/5944#issuecomment-2523074127)
we will hopefully be ahead of the curve. And as I said above, we always welcome help to make this transition easier for
those who follow after you, PRs are the best support you can give.

### Long Term Support

We had been discussing how to support v4 now that v5 was out, but we had not defined a clear guideline or expectation,
and we had (still don't have) end user docs on our plans here. While we still have progress to make here, we have a
[proposed LTS strategy ](https://github.com/expressjs/discussions/pull/352) which will be the basis for our forthcoming
docs. Input is very welcome on this so we can make sure it is clearly communicated and acceptable to the community.

Additionally since then [we have announced a partnership with HeroDevs](https://expressjs.com/2024/10/01/HeroDevs-partnership-announcement.html) to help companies who are less capable of
updating. More information on how this will work when v4 EOL will come when we get closer to that time.

---

## Support Phases and Going latest

What does it mean to "go latest"? If you are unfamiliar with how npm `dist-tags` work, the `latest` tag is what users
will get when they run `npm install express`. This is important because it means it is the "default installed version"
and will trigger the transition of nearly 17 million weekly downloads from our current latest v4.21.2 to v5. As we start
this transition we want users, companies, and other organizations to know exactly what it means for support. To help
with this we have developed an LTS strategy which defines our 3 support phases and set's target dates for when v4 will
enter EOL.

Express major versions will go through three supported phases:

  - `CURRENT`: A new major version is designated as `CURRENT` upon release. It is available but not the `latest` version
    on npm for a minimum of 3 months.
  - `ACTIVE`: After the minimum 3 month period and the TC agrees it is stable and secure, the `ACTIVE` version is
    tagged `latest` on npm for a minimum of 12 months.
  - `MAINTENANCE`: When a new major version becomes `ACTIVE`, the previous major version enters `MAINTENANCE` for 12 months.

### CURRENT

- New majors will go through a short period of hardening to ensure stability, security, and ecosystem libraries/resources
  compatibility.
- We will strive to ensure no breaking changes are included, but reserve the right to make security or high priority
  fixes of breaking nature within this period.
- `CURRENT` lines will receive all types of active work including: bug fixes, security patches, new features, and
  deprecation notices.
- Users are recommended to use  `CURRENT` lines and to upgrade as quickly as their risk profile allows

### ACTIVE

- `ACTIVE` lines will receive all types of active work including: bug fixes, security patches, new features, and
  deprecation notices.
- For users, `ACTIVE` lines are considered the most stable and well supported version at any given time.

### MAINTENANCE

- `MAINTENANCE` lines will only receive security patches or high priority bug fixes.
- Users are highly encouraged to upgrade to a `CURRENT` or `ACTIVE` release.

### Proposed Schedule

For the existing release lines, we will set the following phase dates:

<div markdown="1" style="overflow-x: auto; max-width: 100%;">

| Major | CURRENT | ACTIVE | MAINTENANCE | EOL |
| ----- | ------- | ------ | ----------- | --- |
| 4.x   |         |        | 2025-04-01 | 2026-10-01 or later |
| 5.x   | 2024-09-11 | 2025-03-31 | 2026-04-01 | 2027-04-01 |
| 6.x   | TBD after 2025-10-01 | | | |

</div>
As you can see, this means that v5.1.0 being tagged `latest` indicates that we moved from `CURRENT` to `ACTIVE` which
starts the clock on EOL for v4 by moving it to `MAINTENANCE`. We recognize that v4 is a special case having been the
only major version for most of the history of Node.js itself. Because of this, we want to remain flexible and also
provide a bit longer support. We want to do what is best for the ecosystem, so consider these goals not commitments.

---

## Finally, what changed in v5.1.0

This release primarily focused on tech debt from supporting so many old Node.js versions and other things that stagnated but were not landed before v5.0.0 went out.

### Express 5.1.0 Main Changes

* Transitioned all remaining dependencies to use `^` ranges instead of locked versions
* Add package.json funding field to highlight our OpenCollective 
* Added support for ETag option in `res.sendFile()`
* Added support for adding multiple links with the same rel with `res.links()`
* Performance: Use loop for acceptParams

[Changelog v5.1.0](https://github.com/expressjs/express/compare/5.0.1...v5.1.0)


### Dependencies updated

We also invested time to prepare several releases in the packages that Express depend on. Most of this packages are used by other libraries and framework as individual libraries.

* [body-parser@2.2.0](https://github.com/expressjs/body-parser/releases/tag/v2.2.0)
  * Remove legacy node.js support checks for Brotli & `AsyncLocalStorage`
  * Remove `unpipe` & `destroy`
* [router@2.2.0](https://github.com/pillarjs/router/releases/tag/v2.2.0)
  * Restore `debug`. Now with the `router` scope instead of `express`.
  * Remove legacy node.js support checks for `setImmediate`
  * Deprecate non-native promise support
  * Remove `after`, `safe-buffer`, `array-flatten`, `setprotoypeof`, `methods`, `utils-merge`
* [finalhandler@2.1.0](https://github.com/pillarjs/finalhandler/releases/tag/v2.1.0)
    * Remove legacy node.js support checks for `headersSent`, `setImmediate`, & http2 support
    * Remove `unpipe`
* [serve-static@2.2.0](https://github.com/expressjs/serve-static/releases/tag/v2.2.0)

---

## Thanks and What's Next

Thanks so much to everyone involved in Express over the past year, the work all our contributors have put in is
incredible, and we couldn't do it without them. If you are not able to become a contributor yourself, please consider
asking your companies to support the project financially on [OpenCollective](https://opencollective.com/express).

As we look ahead, we’re excited to keep building momentum. If you haven’t read it yet, our [Rewind 2024 + 2025 Vision blog post](https://expressjs.com/2025/01/09/rewind-2024-triumphs-and-2025-vision.html) lays out where we’ve been and where we're headed. This includes performances scoped packages, better automation, security hardening, and more.

One major initiative is our new [Performance Working Group](https://github.com/expressjs/discussions/pull/306), focused on identifying and fixing long-standing bottlenecks in Express. We're grateful to be kicking this off with support from the [Sovereign Tech Fund (STF)](https://openjsf.org/sovereign-tech-fund/), who are helping us invest in long-term sustainability and performance of core infrastructure. Additionally, we will be working to [improve our Typescript DX](https://github.com/expressjs/discussions/issues/192) and taking next steps to [improve the website](https://github.com/expressjs/expressjs.com/issues/1787).

And yes, v6 discussions are already starting to heat up. Keep an eye out for updates, and as always, see you in the issues!

Big thanks to [@wesleytodd](https://github.com/wesleytodd), [@blakeembrey](https://github.com/blakeembrey), [@bjohansebas](https://github.com/bjohansebas), [@UlisesGascon](https://github.com/UlisesGascon), [@Phillip9587](https://github.com/Phillip9587), [@carpasse](https://github.com/carpasse), [@jonchurch](https://github.com/jonchurch), [@ctcpip](https://github.com/ctcpip), [@inigomarquinez](https://github.com/inigomarquinez), [@carlosstenzel](https://github.com/carlosstenzel), [@crandmck](https://github.com/crandmck), [@chrisdel101](https://github.com/chrisdel101), [@dpopp07](https://github.com/dpopp07), [@Ayoub-Mabrouk](https://github.com/Ayoub-Mabrouk), [@jonkoops](https://github.com/jonkoops), [@IamLizu](https://github.com/IamLizu), [@marco-ippolito](https://github.com/marco-ippolito), [@ipreencekmr](https://github.com/ipreencekmr), [@ShubhamOulkar](https://github.com/ShubhamOulkar), [@raksbisht](https://github.com/raksbisht), [@jeffreybaird](https://github.com/jeffreybaird), [@dougwilson](https://github.com/dougwilson), [@mertcanaltin](https://github.com/mertcanaltin), [@GeorgeShvab](https://github.com/GeorgeShvab), [@RobinTail](https://github.com/RobinTail), [@EvanHahn](https://github.com/EvanHahn), [@rhodgkins](https://github.com/rhodgkins), [@cengizcmataraci](https://github.com/cengizcmataraci), [@Shantanugupta43](https://github.com/Shantanugupta43), [@italojs](https://github.com/italojs), [@ljharb](https://github.com/ljharb), [@MaoShizhong](https://github.com/MaoShizhong), [@aroyan](https://github.com/aroyan), [@Binilkks](https://github.com/Binilkks), [@danielgindi](https://github.com/danielgindi), [@papandreou](https://github.com/papandreou), [@jsoref](https://github.com/jsoref), [@bigbigDreamer](https://github.com/bigbigDreamer), [@broofa](https://github.com/broofa), [@CommanderRoot](https://github.com/CommanderRoot), [@andvea](https://github.com/andvea), [@juanarbol](https://github.com/juanarbol), [@agungjati](https://github.com/agungjati), [@alexandercerutti](https://github.com/alexandercerutti), [@pr4j3sh](https://github.com/pr4j3sh), [@hamirmahal](https://github.com/hamirmahal), [@slagiewka](https://github.com/slagiewka), [@Abdel-Monaam-Aouini](https://github.com/Abdel-Monaam-Aouini), [@sazk07](https://github.com/sazk07), [@bhavya3024](https://github.com/bhavya3024), [@joshbuker](https://github.com/joshbuker), [@almic](https://github.com/almic), [@FDrag0n](https://github.com/FDrag0n), [@Dmitry-Kondar](https://github.com/Dmitry-Kondar), [@attrid](https://github.com/attrid), [@kristof-low](https://github.com/kristof-low), [@gireeshpunathil](https://github.com/gireeshpunathil), [@UzairJ99](https://github.com/UzairJ99), [@choi2021](https://github.com/choi2021), [@hayden36](https://github.com/hayden36), [@joharkhan99](https://github.com/joharkhan99), [@peterh-capella](https://github.com/peterh-capella), [@johnburnett](https://github.com/johnburnett), [@nicolasgandrade](https://github.com/nicolasgandrade), [@axhuwastaken](https://github.com/axhuwastaken), [@abhijeetpandit7](https://github.com/abhijeetpandit7), [@peterdanwan](https://github.com/peterdanwan), [@rehmansheikh222](https://github.com/rehmansheikh222), [@corydalis10](https://github.com/corydalis10), [@mgsantos177](https://github.com/mgsantos177), [@wilyJ80](https://github.com/wilyJ80), [@LuiGeeDev](https://github.com/LuiGeeDev), [@juliogarciape](https://github.com/juliogarciape), [@aelmardhi](https://github.com/aelmardhi), [@Ahmed1monm](https://github.com/Ahmed1monm), [@erensarac](https://github.com/erensarac), [@tomasz13nocon](https://github.com/tomasz13nocon), [@tianbuyung](https://github.com/tianbuyung), [@GreyTearsDev](https://github.com/GreyTearsDev), [@aastha-cse](https://github.com/aastha-cse), [@krzysdz](https://github.com/krzysdz), [@Miguelrom](https://github.com/Miguelrom), [@bnoordhuis](https://github.com/bnoordhuis), [@MehfoozurRehman](https://github.com/MehfoozurRehman), [@EasonLin0716](https://github.com/EasonLin0716), [@grjan7](https://github.com/grjan7), [@mishrasur7](https://github.com/mishrasur7), [@gregfenton](https://github.com/gregfenton), [@zareefhasan](https://github.com/zareefhasan), [@Tejas150](https://github.com/Tejas150), [@jpricardo](https://github.com/jpricardo), [@nikeee](https://github.com/nikeee), [@dotnetCarpenter](https://github.com/dotnetCarpenter), [@engpetermwangi](https://github.com/engpetermwangi), [@msimerson](https://github.com/msimerson), [@fetsorn](https://github.com/fetsorn), [@manoharreddyporeddy](https://github.com/manoharreddyporeddy), [@lancatlin](https://github.com/lancatlin), [@mifi](https://github.com/mifi), [@meowingwhitey](https://github.com/meowingwhitey), [@sheplu](https://github.com/sheplu), [@krsriq](https://github.com/krsriq), [@ravibisht](https://github.com/ravibisht), [@wojtekmaj](https://github.com/wojtekmaj), [@aqeelat](https://github.com/aqeelat), [@melikhov-dev](https://github.com/melikhov-dev), [@alexstrat](https://github.com/alexstrat), [@isnifer](https://github.com/isnifer), [@TorstenDittmann](https://github.com/TorstenDittmann), [@Uzlopak](https://github.com/Uzlopak), [@gurgunday](https://github.com/gurgunday), [@kurtextrem](https://github.com/kurtextrem), [@hdtmccallie](https://github.com/hdtmccallie), [@proudparrot2](https://github.com/proudparrot2), [@bewinsnw](https://github.com/bewinsnw), [@jonboulle](https://github.com/jonboulle), [@alexander-akait](https://github.com/alexander-akait), [@alxndrsn](https://github.com/alxndrsn), [@DimitriPapadopoulos](https://github.com/DimitriPapadopoulos), [@greggman](https://github.com/greggman), [@jkbach](https://github.com/jkbach), [@julien-c](https://github.com/julien-c), [@risu729](https://github.com/risu729), [@JohnSimumatik](https://github.com/JohnSimumatik), [@dhouck](https://github.com/dhouck), [@pedro-php](https://github.com/pedro-php), [@aminerol](https://github.com/aminerol), [@robertsky](https://github.com/robertsky), [@ipetrouchtchak-fi](https://github.com/ipetrouchtchak-fi), [@tinhochu](https://github.com/tinhochu), [@Lord-Kamina](https://github.com/Lord-Kamina), [@joshkel](https://github.com/joshkel), [@raiandexter0607](https://github.com/raiandexter0607), [@NateEag](https://github.com/NateEag), [@rmhaiderali](https://github.com/rmhaiderali), [@ljeda](https://github.com/ljeda)