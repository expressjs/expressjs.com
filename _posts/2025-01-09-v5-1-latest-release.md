---
title: "v5.1.0 Release takes v5 to latest"
tags: news, release 
author: Express Technical Committee
description: Express goes latest with the 5.1.0 release and announces an LTS schedule for v4 and v5 release lines.
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

Big thanks to <TODO: should we pull a list of contributors to thank here?>

### Migration Support

Due to the awesome work of [Sebastian](https://github.com/bjohansebas) and [Filip](https://github.com/kjugi) we have a
new [codemod package](https://github.com/expressjs/codemod) to help folks migrate from v4 to v5. You can find docs in
the readme and on the migration guide. 

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


| Major | CURRENT | ACTIVE | MAINTENANCE | EOL |
| ----- | ------- | ------ | ----------- | --- |
| 4.x   |         |        | 2025-04-01 | 2026-10-01 or later |
| 5.x   | 2024-09-11 | 2025-03-31 | 2026-04-01 | 2027-04-01 |
| 6.x   | TBD after 2025-10-01 | | | |

As you can see, this means that v5.1.0 being tagged `latest` indicates that we moved from `CURRENT` to `ACTIVE` which
starts the clock on EOL for v4 by moving it to `MAINTENANCE`. We recognize that v4 is a special case having been the
only major version for most of the history of Node.js itself. Because of this, we want to remain flexible and also
provide a bit longer support. We want to do what is best for the ecosystem, so consider these goals not commitments.

---

## Finally, what changed in v5.1.0

This release primarily focused on tech debt from supporting so many old Node.js versions and other things that stagnated
but were not landed before v5.0.0 went out.

* Transitioned all remaining dependencies to use `^` ranges instead of locked versions
* Add package.json funding field to highlight our OpenCollective 
* Added support for ETag option in `res.sendFile()`
* Added support for adding multiple links with the same rel with `res.links()`
* Performance: Use loop for acceptParams
* New Contributors: 
  * @bhavya3024 made their first contribution in https://github.com/expressjs/express/pull/6071
  * @jonkoops made their first contribution in https://github.com/expressjs/express/pull/6196
  * @Abdel-Monaam-Aouini made their first contribution in https://github.com/expressjs/express/pull/6211
  * @slagiewka made their first contribution in https://github.com/expressjs/express/pull/6236
  * @hamirmahal made their first contribution in https://github.com/expressjs/express/pull/6256
  * @pr4j3sh made their first contribution in https://github.com/expressjs/express/pull/6297
  * @Ayoub-Mabrouk made their first contribution in https://github.com/expressjs/express/pull/6097
  * @dpopp07 made their first contribution in https://github.com/expressjs/express/pull/6317
  * @agungjati made their first contribution in https://github.com/expressjs/express/pull/6122
  * @andvea made their first contribution in https://github.com/expressjs/express/pull/4885
* `body-parser@^2.1.0` then `body-parser@^2.2.0`
  * Remove legacy node.js support checks for Brotli & `AsyncLocalStorage`
  * Remove `unpipe` & `destroy`
  * `type-is@^2.0.0`
  * `iconv-lite@^0.6.3`
  * New Contributors: 
    * @Binilkks made their first contribution in https://github.com/expressjs/body-parser/pull/581
    * @aqeelat made their first contribution in https://github.com/expressjs/body-parser/pull/588
    * @wojtekmaj made their first contribution in https://github.com/expressjs/body-parser/pull/591
* `router@^2.1.0` then `router@^2.2.0`
  * Restore `debug`. Now with the `router` scope instead of `express`.
  * Remove legacy node.js support checks for `setImmediate`
  * Deprecate non-native promise support
  * Remove `after`, `safe-buffer`, `array-flatten`, `setprotoypeof`, `methods`, `utils-merge`
  * `finalhandler@^2.1.0`
  * `parseurl@^1.3.3`
  * `is-promise@^4.0.0`
  * New Contributors:
    * @bjohansebas made their first contribution in https://github.com/pillarjs/router/pull/152
    * @dpopp07 made their first contribution in https://github.com/pillarjs/router/pull/151
    * @raksbisht made their first contribution in https://github.com/pillarjs/router/pull/107
    * @Phillip9587 made their first contribution in https://github.com/pillarjs/router/pull/126
    * @jonkoops made their first contribution in https://github.com/pillarjs/router/pull/127
    * @ctcpip made their first contribution in https://github.com/pillarjs/router/pull/131
    * @raiandexter0607 made their first contribution in https://github.com/pillarjs/router/pull/135
    * @UlisesGascon made their first contribution in https://github.com/pillarjs/router/pull/139
* `finalhandler@2.1.0`
    * Remove legacy node.js support checks for `headersSent`, `setImmediate`, & http2 support
    * Remove `unpipe`
    * `encodeurl@^2.0.0`
    * New Contributors:
      * @Phillip9587 made their first contribution in https://github.com/pillarjs/finalhandler/pull/67
      * @bjohansebas made their first contribution in https://github.com/pillarjs/finalhandler/pull/83
* `serve-static@^2.2.0`
  * `send@^1.2.0`
  * New Contributors: 
    * @Ayoub-Mabrouk made their first contribution in https://github.com/expressjs/serve-static/pull/182
    * @bjohansebas made their first contribution in https://github.com/expressjs/serve-static/pull/186
    * @dpopp07 made their first contribution in https://github.com/expressjs/serve-static/pull/194
    * @ljeda made their first contribution in https://github.com/expressjs/serve-static/pull/190
    * @Phillip9587 made their first contribution in https://github.com/expressjs/serve-static/pull/191
* `qs@^6.14.0`
  * Added throwOnLimitExceeded option https://github.com/ljharb/qs/pull/517 & https://github.com/ljharb/qs/commit/b189ed49c8dfe5b41afe6cecabdaa562de56764b
* `type-is@^2.0.1`
  * New Contributors
    * @Ayoub-Mabrouk made their first contribution in https://github.com/jshttp/type-is/pull/61
    * @CommanderRoot made their first contribution in https://github.com/jshttp/type-is/pull/50
    * @UlisesGascon made their first contribution in https://github.com/jshttp/type-is/pull/64
* `debug@^4.4.0`
* Removed dependencies:
  * `setprototypeof`
  * `safe-buffer`
  * `methods`
  * `utils-merge`
  * `depd`

**Full Changelog**: https://github.com/expressjs/express/compare/5.0.1...v5.1.0

---

## Thanks and What's Next

Thanks so much to everyone involved in Express over the past year, the work all our contributors have put in is
incredible, and we couldn't do it without them. If you are not able to become a contributor yourself, please consider
asking your companies to support the project financially on [OpenCollective](https://opencollective.com/express).

Next up our focus is shifting to Performance. We will be kicking off [Performance Working Group](https://github.com/expressjs/discussions/pull/306)
to focus on measuring, tracking, and debugging framework performance issues. We hope the next minor releases will
benefit from this and fix longstanding performance bottlenecks. Additionally we will be starting to ramp up plans for v6
later this year, so look out for updates! See you in the issues!
