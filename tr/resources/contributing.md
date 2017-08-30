---
layout: page
title: Contributing to Express
menu: resources
lang: tr
---
<div id="page-doc" markdown="1">
# Contributing to Express

Express and the other projects in the [expressjs organization on GitHub](https://github.com/expressjs) are projects of the [Node.js Foundation](https://nodejs.org/foundation/).
These projects are governed under the general policies and guidelines of the Node.js Foundation along with the additional guidelines below.

* [Technical committee](#technical-committee)
* [Community contributing guide](#community-contributing-guide)
* [Collaborator's guide](#collaborators-guide)
* [Security policies and procedures](#security-policies-and-procedures)

## Technical committee

The Express technical committee consists of active project members, and guides development and maintenance of the Express project.  For more information, see [Express Community - Technical committee](community.html#technical-committee).

## Community contributing guide

> NOTE: This is copied from the [Contributing Guide in the repo](https://github.com/expressjs/express/blob/master/Contributing.md).

The goal of this guide is to create a contribution process that:

* Encourages new contributions.
* Encourages contributors to remain involved.
* Avoids unnecessary processes and bureaucracy whenever possible.
* Creates a transparent decision making process which makes it clear how
contributors can be involved in decision making.

This document is based on much prior art in the Node.js community, io.js,
and the Node.js project.

Vocabulary:

* A **Contributor** is any individual creating or commenting on an issue or pull request.
* A **Committer** is a subset of contributors who have been given write access to the repository.
* A **TC (Technical Committee)** is a group of committers representing the required technical
expertise to resolve rare disputes.

### Logging issues

Log an issue for any question or problem you might have. When in doubt, log an issue,
any additional policies about what to include will be provided in the responses. The only
exception is security dislosures which should be sent privately.

Committers may direct you to another repository, ask for additional clarifications, and
add appropriate metadata before the issue is addressed.

Please be courteous, respectful, and every participant is expected to follow the
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
During review committers may also request that a specific contributor who is most versed in a
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

### Becoming a committer

All contributors who land a non-trivial contribution should be on-boarded in a timely manner,
and added as a committer, and be given write access to the repository.

Committers are expected to follow this policy and continue to send pull requests, go through
proper review, and have other committers merge their pull requests.

### TC process

The TC uses a "consensus seeking" process for issues that are escalated to the TC.
The group tries to find a resolution that has no open objections among TC members.
If a consensus cannot be reached that has no objections then a majority wins vote
is called. It is also expected that the majority of decisions made by the TC are via
a consensus seeking process and that voting is only used as a last-resort.

Resolution may involve returning the issue to committers with suggestions on how to
move forward towards a consensus. It is not expected that a meeting of the TC
will resolve all issues on its agenda during that meeting and may prefer to continue
the discussion happening among the committers.

Members can be added to the TC at any time. Any committer can nominate another committer
to the TC and the TC uses its standard consensus seeking process to evaluate whether or
not to add this new member. Members who do not participate consistently at the level of
a majority of the other members are expected to resign.

## Collaborator's guide

> NOTE: This is copied from the [Collaborator guide in the Express  repository](https://github.com/expressjs/express/blob/master/Collaborator-Guide.md).

### Website Issues

Open issues for the expressjs.com website in https://github.com/expressjs/expressjs.com.

### PRs and code contributions

* Tests must pass.
* Follow existing coding style.
* If you fix a bug, add a test.

### Branches

* Use the `master` branch for bug fixes or minor work that is intended for the current release stream
* Use the correspondingly named branch, e.g. `5.0`, for anything intended for a future release of Express

### Steps for contributing

* [Create an issue](https://github.com/expressjs/express/issues/new) for the bug you want to fix or the feature that you want to add.
* Create your own [fork](https://github.com/expressjs/express) on github, then checkout your fork.
* Write your code in your local copy. It's good practice to create a branch for each new issue you work on, although not compulsory.
* To run the test suite, first install the dependencies by running `npm install`, then run `npm test`.
* If the tests pass, you can commit your changes to your fork and then create a pull request from there. Make sure to reference your issue from the pull request comments by including the issue number e.g. #123.

### Issues which are questions

We will typically close any vague issues or questions that are specific to some app you are writing. Please double check the docs and other references before being trigger happy with posting a question issue.

Things that will help get your question issue looked at:

* Full and runnable JS code.
* Clear description of the problem or unexpected behavior.
* Clear description of the expected result.
* Steps you have taken to debug it yourself.

If you post a question and do not outline the above items or make it easy for us to understand and reproduce your issue, it will be closed.

## Security Policies and Procedures

> NOTE: This is copied from [Security Policies and Procedures in the Express  repository](https://github.com/expressjs/express/blob/master/Security.md).

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

Report security bugs by emailing the lead maintainer in the Readme.md file.

The lead maintainer will acknowledge your email within 48 hours, and will send a
more detailed response within 48 hours indicating the next steps in handling
your report. After the initial reply to your report, the security team will
endeavor to keep you informed of the progress towards a fix and full
announcement, and may ask for additional information or guidance.

Report security bugs in third-party modules to the person or team maintaining
the module. You can also report a vulnerability through the
[Node Security Project](https://nodesecurity.io/report).

### Disclosure Policy

When the security team receives a security bug report, they will assign it to a
primary handler. This person will coordinate the fix and release process,
involving the following steps:

  * Confirm the problem and determine the affected versions.
  * Audit code to find any potential similar problems.
  * Prepare fixes for all releases still under maintenance. These fixes will be
    released as fast as possible to npm.

### Comments on this Policy

If you have suggestions on how this process could be improved please submit a
pull request.
</div>
