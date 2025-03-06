---
layout: page
title: Contributing to Express
description: Find out how to contribute to Express.js, including guidelines for reporting issues, submitting pull requests, becoming a collaborator, and understanding security policies.
menu: resources
lang: en
redirect_from: "/resources/community.html"
---

# Contributing to Express

### Looking to contribute to Expressjs.com? Click [here](#expressjs-website-contributing).

Express and the other projects in the [expressjs organization on GitHub](https://github.com/expressjs) are projects of the [OpenJs Foundation](https://openjsf.org/).
These projects are governed under the general policies and guidelines of the Node.js Foundation along with the additional guidelines below.

* [Technical committee](#technical-committee)
* [Community contributing guide](#community-contributing-guide)
* [Collaborator's guide](#collaborators-guide)
* [Security policies and procedures](#security-policies-and-procedures)

## Technical committee

The Express technical committee consists of active project members, and guides development and maintenance of the Express project. For more information, see [Express Community - Technical committee](community.html#technical-committee).

## Community contributing guide

<!-- SRC: expressjs/express Contributing.md -->

The goal of this document is to create a contribution process that:

* Encourages new contributions.
* Encourages contributors to remain involved.
* Avoids unnecessary processes and bureaucracy whenever possible.
* Creates a transparent decision making process that makes it clear how
contributors can be involved in decision making.

### Vocabulary

* A **Contributor** is any individual creating or commenting on an issue or pull request.
* A **Committer** is a subset of contributors who have been given write access to the repository.
* A **Project Captain** is the lead maintainer of a repository.
* A **TC (Technical Committee)** is a group of committers representing the required technical
expertise to resolve rare disputes.
* A **Triager** is a subset of contributors who have been given triage access to the repository.

### Logging Issues

Log an issue for any question or problem you might have. When in doubt, log an issue, and
any additional policies about what to include will be provided in the responses. The only
exception is security disclosures which should be sent privately.

Committers may direct you to another repository, ask for additional clarifications, and
add appropriate metadata before the issue is addressed.

Please be courteous and respectful. Every participant is expected to follow the
project's Code of Conduct.

### Contributions

Any change to resources in this repository must be through pull requests. This applies to all changes
to documentation, code, binary files, etc. Even long term committers and TC members must use
pull requests.

No pull request can be merged without being reviewed.

For non-trivial contributions, pull requests should sit for at least 36 hours to ensure that
contributors in other timezones have time to review. Consideration should also be given to
weekends and other holiday periods to ensure active committers all have reasonable time to
become involved in the discussion and review process if they wish.

The default for each contribution is that it is accepted once no committer has an objection.
During a review, committers may also request that a specific contributor who is most versed in a
particular area gives a "LGTM" before the PR can be merged. There is no additional "sign off"
process for contributions to land. Once all issues brought by committers are addressed it can
be landed by any committer.

In the case of an objection being raised in a pull request by another committer, all involved
committers should seek to arrive at a consensus by way of addressing concerns being expressed
by discussion, compromise on the proposed change, or withdrawal of the proposed change.

If a contribution is controversial and committers cannot agree about how to get it to land
or if it should land then it should be escalated to the TC. TC members should regularly
discuss pending contributions in order to find a resolution. It is expected that only a
small minority of issues be brought to the TC for resolution and that discussion and
compromise among committers be the default resolution mechanism.

### Becoming a Triager

Anyone can become a triager! Read more about the process of being a triager in
[the triage process document](https://github.com/expressjs/express/blob/master/Triager-Guide.md).

Currently, any existing [organization member](https://github.com/orgs/expressjs/people) can nominate
a new triager. If you are interested in becoming a triager, our best advice is to actively participate
in the community by helping triaging issues and pull requests. As well we recommend
to engage in other community activities like attending the TC meetings, and participating in the Slack
discussions.

You can also reach out to any of the [organization members](https://github.com/orgs/expressjs/people)
if you have questions or need guidance.

### Becoming a Committer

All contributors who land a non-trivial contribution should be on-boarded in a timely manner,
and added as a committer, and be given write access to the repository.

Committers are expected to follow this policy and continue to send pull requests, go through
proper review, and have other committers merge their pull requests.

### TC Process

The TC uses a "consensus seeking" process for issues that are escalated to the TC.
The group tries to find a resolution that has no open objections among TC members.
If a consensus cannot be reached that has no objections then a majority wins vote
is called. It is also expected that the majority of decisions made by the TC are via
a consensus seeking process and that voting is only used as a last-resort.

Resolution may involve returning the issue to project captains with suggestions on
how to move forward towards a consensus. It is not expected that a meeting of the TC
will resolve all issues on its agenda during that meeting and may prefer to continue
the discussion happening among the project captains.

Members can be added to the TC at any time. Any TC member can nominate another committer
to the TC and the TC uses its standard consensus seeking process to evaluate whether or
not to add this new member. The TC will consist of a minimum of 3 active members and a
maximum of 10. If the TC should drop below 5 members the active TC members should nominate
someone new. If a TC member is stepping down, they are encouraged (but not required) to
nominate someone to take their place.

TC members will be added as admin's on the Github orgs, npm orgs, and other resources as
necessary to be effective in the role.

To remain "active" a TC member should have participation within the last 12 months and miss
no more than six consecutive TC meetings. Our goal is to increase participation, not punish
people for any lack of participation, this guideline should be only be used as such
(replace an inactive member with a new active one, for example). Members who do not meet this
are expected to step down. If A TC member does not step down, an issue can be opened in the
discussions repo to move them to inactive status. TC members who step down or are removed due
to inactivity will be moved into inactive status.

Inactive status members can become active members by self nomination if the TC is not already
larger than the maximum of 10. They will also be given preference if, while at max size, an
active member steps down.

### Project Captains

The Express TC can designate captains for individual projects/repos in the
organizations. These captains are responsible for being the primary
day-to-day maintainers of the repo on a technical and community front.
Repo captains are empowered with repo ownership and package publication rights.
When there are conflicts, especially on topics that effect the Express project
at large, captains are responsible to raise it up to the TC and drive
those conflicts to resolution. Captains are also responsible for making sure
community members follow the community guidelines, maintaining the repo
and the published package, as well as in providing user support.

Like TC members, Repo captains are a subset of committers.

To become a captain for a project the candidate is expected to participate in that
project for at least 6 months as a committer prior to the request. They should have
helped with code contributions as well as triaging issues. They are also required to
have 2FA enabled on both their GitHub and npm accounts.

Any TC member or an existing captain on the **same** repo can nominate another committer 
to the captain role. To do so, they should submit a PR to this document, updating the 
**Active Project Captains** section (while maintaining the sort order) with the project 
name, the nominee's GitHub handle, and their npm username (if different).
- Repos can have as many captains as make sense for the scope of work.
- A TC member or an existing repo captain **on the same project** can nominate a new captain. 
  Repo captains from other projects should not nominate captains for a different project.

The PR will require at least 2 approvals from TC members and 2 weeks hold time to allow 
for comment and/or dissent.  When the PR is merged, a TC member will add them to the 
proper GitHub/npm groups.

#### Active Projects and Captains

- [`expressjs/badgeboard`](https://github.com/expressjs/badgeboard): @wesleytodd
- [`expressjs/basic-auth-connect`](https://github.com/expressjs/basic-auth-connect): @ulisesGascon
- [`expressjs/body-parser`](https://github.com/expressjs/body-parser): @wesleytodd, @jonchurch, @ulisesGascon
- [`expressjs/compression`](https://github.com/expressjs/compression): @ulisesGascon
- [`expressjs/connect-multiparty`](https://github.com/expressjs/connect-multiparty): @ulisesGascon
- [`expressjs/cookie-parser`](https://github.com/expressjs/cookie-parser): @wesleytodd, @UlisesGascon
- [`expressjs/cookie-session`](https://github.com/expressjs/cookie-session): @ulisesGascon
- [`expressjs/cors`](https://github.com/expressjs/cors): @jonchurch, @ulisesGascon
- [`expressjs/discussions`](https://github.com/expressjs/discussions): @wesleytodd
- [`expressjs/errorhandler`](https://github.com/expressjs/errorhandler): @ulisesGascon
- [`expressjs/express-paginate`](https://github.com/expressjs/express-paginate): @ulisesGascon
- [`expressjs/express`](https://github.com/expressjs/express): @wesleytodd, @ulisesGascon
- [`expressjs/expressjs.com`](https://github.com/expressjs/expressjs.com): @crandmck, @jonchurch, @bjohansebas
- [`expressjs/flash`](https://github.com/expressjs/flash): @ulisesGascon
- [`expressjs/generator`](https://github.com/expressjs/generator): @wesleytodd
- [`expressjs/method-override`](https://github.com/expressjs/method-override): @ulisesGascon
- [`expressjs/morgan`](https://github.com/expressjs/morgan): @jonchurch, @ulisesGascon
- [`expressjs/multer`](https://github.com/expressjs/multer): @LinusU, @ulisesGascon
- [`expressjs/response-time`](https://github.com/expressjs/response-time): @UlisesGascon
- [`expressjs/serve-favicon`](https://github.com/expressjs/serve-favicon): @ulisesGascon
- [`expressjs/serve-index`](https://github.com/expressjs/serve-index): @ulisesGascon
- [`expressjs/serve-static`](https://github.com/expressjs/serve-static): @ulisesGascon
- [`expressjs/session`](https://github.com/expressjs/session): @ulisesGascon
- [`expressjs/statusboard`](https://github.com/expressjs/statusboard): @wesleytodd
- [`expressjs/timeout`](https://github.com/expressjs/timeout): @ulisesGascon
- [`expressjs/vhost`](https://github.com/expressjs/vhost): @ulisesGascon
- [`jshttp/accepts`](https://github.com/jshttp/accepts): @blakeembrey
- [`jshttp/basic-auth`](https://github.com/jshttp/basic-auth): @blakeembrey
- [`jshttp/compressible`](https://github.com/jshttp/compressible): @blakeembrey
- [`jshttp/content-disposition`](https://github.com/jshttp/content-disposition): @blakeembrey
- [`jshttp/content-type`](https://github.com/jshttp/content-type): @blakeembrey
- [`jshttp/cookie`](https://github.com/jshttp/cookie): @blakeembrey
- [`jshttp/etag`](https://github.com/jshttp/etag): @blakeembrey
- [`jshttp/forwarded`](https://github.com/jshttp/forwarded): @blakeembrey
- [`jshttp/fresh`](https://github.com/jshttp/fresh): @blakeembrey
- [`jshttp/http-assert`](https://github.com/jshttp/http-assert): @wesleytodd, @jonchurch, @ulisesGascon
- [`jshttp/http-errors`](https://github.com/jshttp/http-errors): @wesleytodd, @jonchurch, @ulisesGascon
- [`jshttp/media-typer`](https://github.com/jshttp/media-typer): @blakeembrey
- [`jshttp/methods`](https://github.com/jshttp/methods): @blakeembrey
- [`jshttp/mime-db`](https://github.com/jshttp/mime-db): @blakeembrey, @UlisesGascon
- [`jshttp/mime-types`](https://github.com/jshttp/mime-types): @blakeembrey, @UlisesGascon
- [`jshttp/negotiator`](https://github.com/jshttp/negotiator): @blakeembrey
- [`jshttp/on-finished`](https://github.com/jshttp/on-finished): @wesleytodd, @ulisesGascon
- [`jshttp/on-headers`](https://github.com/jshttp/on-headers): @blakeembrey
- [`jshttp/proxy-addr`](https://github.com/jshttp/proxy-addr): @wesleytodd, @ulisesGascon
- [`jshttp/range-parser`](https://github.com/jshttp/range-parser): @blakeembrey
- [`jshttp/statuses`](https://github.com/jshttp/statuses): @blakeembrey
- [`jshttp/type-is`](https://github.com/jshttp/type-is): @blakeembrey
- [`jshttp/vary`](https://github.com/jshttp/vary): @blakeembrey
- [`pillarjs/cookies`](https://github.com/pillarjs/cookies): @blakeembrey
- [`pillarjs/csrf`](https://github.com/pillarjs/csrf): @ulisesGascon
- [`pillarjs/encodeurl`](https://github.com/pillarjs/encodeurl): @blakeembrey
- [`pillarjs/finalhandler`](https://github.com/pillarjs/finalhandler): @wesleytodd, @ulisesGascon
- [`pillarjs/hbs`](https://github.com/pillarjs/hbs): @ulisesGascon
- [`pillarjs/multiparty`](https://github.com/pillarjs/multiparty): @blakeembrey
- [`pillarjs/parseurl`](https://github.com/pillarjs/parseurl): @blakeembrey
- [`pillarjs/path-to-regexp`](https://github.com/pillarjs/path-to-regexp): @blakeembrey
- [`pillarjs/request`](https://github.com/pillarjs/request): @wesleytodd
- [`pillarjs/resolve-path`](https://github.com/pillarjs/resolve-path): @blakeembrey
- [`pillarjs/router`](https://github.com/pillarjs/router): @wesleytodd, @ulisesGascon
- [`pillarjs/send`](https://github.com/pillarjs/send): @blakeembrey
- [`pillarjs/understanding-csrf`](https://github.com/pillarjs/understanding-csrf): @ulisesGascon

#### Current Initiative Captains

- Triage team [ref](https://github.com/expressjs/discussions/issues/227): @UlisesGascon

### Developer's Certificate of Origin 1.1

```text
By making a contribution to this project, I certify that:

 (a) The contribution was created in whole or in part by me and I
     have the right to submit it under the open source license
     indicated in the file; or

 (b) The contribution is based upon previous work that, to the best
     of my knowledge, is covered under an appropriate open source
     license and I have the right under that license to submit that
     work with modifications, whether created in whole or in part
     by me, under the same open source license (unless I am
     permitted to submit under a different license), as indicated
     in the file; or

 (c) The contribution was provided directly to me by some other
     person who certified (a), (b) or (c) and I have not modified
     it.

 (d) I understand and agree that this project and the contribution
     are public and that a record of the contribution (including all
     personal information I submit with it, including my sign-off) is
     maintained indefinitely and may be redistributed consistent with
     this project or the open source license(s) involved.
```

## Collaborator's guide

<!-- SRC: expressjs/express Collaborator-Guide.md -->

### Website Issues

Open issues for the expressjs.com website in https://github.com/expressjs/expressjs.com.

### PRs and Code contributions

* Tests must pass.
* Follow the [JavaScript Standard Style](https://standardjs.com/) and `npm run lint`.
* If you fix a bug, add a test.

### Branches

Use the `master` branch for bug fixes or minor work that is intended for the
current release stream.

Use the correspondingly named branch, e.g. `5.0`, for anything intended for
a future release of Express.

### Steps for contributing

1. [Create an issue](https://github.com/expressjs/express/issues/new) for the
   bug you want to fix or the feature that you want to add.
2. Create your own [fork](https://github.com/expressjs/express) on GitHub, then
   checkout your fork.
3. Write your code in your local copy. It's good practice to create a branch for
   each new issue you work on, although not compulsory.
4. To run the test suite, first install the dependencies by running `npm install`,
   then run `npm test`.
5. Ensure your code is linted by running `npm run lint` -- fix any issue you
   see listed.
6. If the tests pass, you can commit your changes to your fork and then create
   a pull request from there. Make sure to reference your issue from the pull
   request comments by including the issue number e.g. `#123`.

### Issues which are questions

We will typically close any vague issues or questions that are specific to some
app you are writing. Please double check the docs and other references before
being trigger happy with posting a question issue.

Things that will help get your question issue looked at:

* Full and runnable JS code.
* Clear description of the problem or unexpected behavior.
* Clear description of the expected result.
* Steps you have taken to debug it yourself.

If you post a question and do not outline the above items or make it easy for
us to understand and reproduce your issue, it will be closed.

## Security Policies and Procedures

<!-- SRC: expressjs/express Security.md -->

This document outlines security procedures and general policies for the Express
project.

  * [Reporting a Bug](#reporting-a-bug)
  * [Disclosure Policy](#disclosure-policy)
  * [Comments on this Policy](#comments-on-this-policy)

### Reporting a Bug

The Express team and community take all security bugs in Express seriously.
Thank you for improving the security of Express. We appreciate your efforts and
responsible disclosure and will make every effort to acknowledge your
contributions.

Report security bugs by emailing `express-security@lists.openjsf.org`.

To ensure the timely response to your report, please ensure that the entirety
of the report is contained within the email body and not solely behind a web
link or an attachment.

The lead maintainer will acknowledge your email within 48 hours, and will send a
more detailed response within 48 hours indicating the next steps in handling
your report. After the initial reply to your report, the security team will
endeavor to keep you informed of the progress towards a fix and full
announcement, and may ask for additional information or guidance.

Report security bugs in third-party modules to the person or team maintaining
the module.

### Pre-release Versions

Alpha and Beta releases are unstable and **not suitable for production use**.
Vulnerabilities found in pre-releases should be reported according to the [Reporting a Bug](#reporting-a-bug) section.
Due to the unstable nature of the branch it is not guaranteed that any fixes will be released in the next pre-release.

### Disclosure Policy

When the security team receives a security bug report, they will assign it to a
primary handler. This person will coordinate the fix and release process,
involving the following steps:

  * Confirm the problem and determine the affected versions.
  * Audit code to find any potential similar problems.
  * Prepare fixes for all releases still under maintenance. These fixes will be
    released as fast as possible to npm.

### The Express Threat Model

We are currently working on a new version of the security model, the most updated version can be found [here](https://github.com/expressjs/security-wg/blob/main/docs/ThreatModel.md)

### Comments on this Policy

If you have suggestions on how this process could be improved please submit a
pull request.

----
# Contributing to Expressjs.com {#expressjs-website-contributing}

<!-- LOCAL: expressjs/expressjs.com ../../CONTRIBUTING.md -->
### The Official Documentation of the Express JS Framework

This is the contribution documentation for the [Expressjs.com](https://github.com/expressjs/expressjs.com) website.



#### Need some ideas? These are some typical issues.

1.  **Website issues**: 
If you see anything on the site that could use a tune-up, think about how to fix it.

    - Display or screen sizing problems
    - Mobile responsiveness issues
    - Missing or broken accessibility features 
    - Website outages
    - Broken links
    - Page structure or user interface enhancements


2. **Content Issues**: 
Fix anything related to site content or typos.
    - Spelling errors
    - Incorrect/outdated Express JS documentation
    - Missing content


3. **Translation Issues**: Fix any translation errors or contribute new content.
    - Fix spelling errors 
    - Fix incorrect/poorly translated words
    - Translate new content
> **IMPORTANT:** 
> All translation submissions are currently paused. See this [notice](#notice-we-have-paused-all-translation-contributions) for more information.

   - Check out the [Contributing translations](#contributing-translations) section below for a contributing guide.

#### Want to work on a backlog issue?

We often have bugs or enhancements that need work. You can find these under our repo's [Issues tab](https://github.com/expressjs/expressjs.com/issues). Check out the tags to find something that's a good match for you.

#### Have an idea? Found a bug?

If you've found a bug or a typo, or if you have an idea for an enhancement, you can:
- Submit a [new issue](https://github.com/expressjs/expressjs.com/issues/new/choose) on our repo. Do this for larger proposals, or if you'd like to discuss or get feedback first. 
- Make a [Github pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). If you have already done work and it's ready to go, feel free to send it our way.

## Getting Started

The steps below will guide you through the Expressjs.com contribution process.

#### Step 1: (OPTIONAL) Open a New Issue
So you've found a problem that you want to fix, or have a site enhancement you want to make. 
1. If you want to get feedback or discuss, open a discussion [issue](https://github.com/expressjs/expressjs.com/issues/new/choose) prior to starting work. This is not required, but encouraged for larger proposals. 
    - While we highly encourage this step, it is only for submissions proposing significant change. It  helps us to clarify and focus the work, and ensure it aligns with overall project priorities.
    - For submissions proposing minor improvements or corrections, this is not needed. You can skip this step.
    - When opening an issue please give it a title and fill in the description section. The more details you provide, the more feedback we can give.

2. After receiving your issue the Express JS documentation team will respond with feedback. We read every submission and always try to respond quickly with feedback. 
    - For submissions proposing significant change, we encourage you to follow the review process before starting work. 

#### Step 2: Get the Application Code Base

Clone the repo and get the code:

    git clone https://github.com/expressjs/expressjs.com.git

After you've got the code you're ready to start making your changes! 

But just in case you need a little extra explanation, this section below outlines the main sections of the code base, where most changes are likely to be made.  

**Markdown Page Files**: 
- These files render to html and make up the individual pages of the site. Most of the site's documentation text content is written in `md` files.
- Change these to make changes to individual pages' content/text or markup. 
- Each language has its own complete set of pages, located under their respective language directories - all the Spanish markdown content is found in the `es` directory, for example. 

**Includes Partials and Layout Templates**
- `_includes` are partials that are imported and reused across multiple pages.
  - These are used to import text content for reuse across pages, such as the API documentation, e.g., `_includes > api > en > 5x`, which is included in every language.
  - These are used to include the page components that make up site-wide user interface and periphery structure, e.g., Header, Footer, etc.
- `_layouts` are the templates used to wrap the site's individual pages. 
  - These are used to display the structure of the site's periphery, such as the header and footer, and for injecting and displaying individual markdown pages inside the `content` tag.

**Blog Markdown Files**
- These files make up the individual blog posts. If you want to contribute a blog post please
follow the specific instructions for [How to write a blog post.](https://expressjs.com/en/blog/write-post.html)
- Located under the `_posts` directory. 

**CSS or Javascript**
- All css and js files are kept in `css` and `js` folders on the project root.

The Express JS website is build using [Jeykyll](https://jekyllrb.com/) and is hosted on [Github Pages](https://pages.github.com/).

#### Step 3: Running the Application


Now you'll need a way to see your changes, which means you'll need a running version of the application. You have two options. 
1. __Run Locally__: This gets the local version of the application up and running on your machine. Follow our [Local Setup Guide](https://github.com/expressjs/expressjs.com?tab=readme-ov-file#local-setup) to use this option.  
    - This is the recommended option for moderate to complex work. 
2. __Run using Deploy Preview__: Use this option if you don't want to bother with a local installation. Part of our continuous integration pipeline includes [Netlify Deploy Preview](https://docs.netlify.com/site-deploys/deploy-previews/). 
    1. To use this you'll need to get your changes online - after you've made your first commit on your feature branch, make a *draft* pull request. 
    2. After the build steps are complete, you'll have access to a __Deploy Preview__ tab that will run your changes on the web, rebuilding after each commit is pushed. 
    3. After you are completely done your work and it's ready for review, remove the draft status on your pull request and submit your work.
  
## Contributing translations

#### Notice: We have paused all translation contributions. 
> **IMPORTANT:** 
> We are currently working toward a more streamlined translations workflow. As long as this notice is posted, we will _not_ be accepting any translation submissions. 

We highly encourage community translations! We no longer have professional translations, and we believe in the power of our community to provide accurate and helpful translations.

The documentation is translated into these languages:
- English (`en`)
- Spanish (`es`)
- French (`fr`)
- Italian (`it`)
- Indonesian (`id`)
- Japanese (`ja`)
- Korean (`ko`)
- Brazilian Portuguese (`pt-br`)
- Russian (`ru`)
- Slovak (`sk`)
- Thai (`th`)
- Turkish (`tr`)
- Ukrainian (`uk`)
- Uzbek (`uz`)
- Simplified Chinese (`zh-cn`)
- Traditional Chinese (`zh-tw`)

### Adding New Full Site Translations

If you find a translation is missing from the list you can create a new one.

To translate Expressjs.com into a new language, follow these steps:

1. Clone the [`expressjs.com`](https://github.com/expressjs/expressjs.com) repository.
2. Create a directory for the language of your choice using its [ISO 639-1 code](https://www.loc.gov/standards/iso639-2/php/code_list.php) as its name.
3. Copy `index.md`, `api.md`, `starter/`, `guide/`, `advanced/`, `resources/`, `4x/`, and `3x/`, to the language directory.
4. Remove the link to 2.x docs from the "API Reference" menu.
5. Update the `lang` variable in the copied markdown files.
6. Update the `title` variable in the copied markdown files.
7. Create the header, footer, notice, and announcement file for the language in the `_includes/` directory, in the respective directories, and make necessary edits to the contents.
8. Create the announcement file for the language in the `_includes/` directory.
9. Make sure to append `/{{ page.lang }}` to all the links within the site.
10. Update the [CONTRIBUTING.md](https://github.com/expressjs/expressjs.com/blob/gh-pages/CONTRIBUTING.md#contributing-translations)  and the `.github/workflows/translation.yml` files with the new language. 

### Adding Page and Section Translations

Many site translations are still missing pages. To find which ones we need help with, you can [filter for merged PRs](https://github.com/expressjs/expressjs.com/pulls?q=is%3Apr+is%3Aclosed+label%3Arequires-translation-es) that include the tag for your language, such as `requires-translation-es` for requires Spanish translation.   

If you contribute a page or section translation, please reference the original PR. This helps the person merging your translation to remove the tag from the original PR.
