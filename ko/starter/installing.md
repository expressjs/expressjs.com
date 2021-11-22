---
layout: page
title: Express 설치
menu: starter
lang: ko
---

# 설치

[Node.js](https://nodejs.org/)가 이미 설치되었다고 가정한 상태에서, 애플리케이션을 보관할 디렉토리를 작성하고 그 디렉토리를 작업 디렉토리로 설정하십시오.

<pre>
<code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code>
</pre>

`npm init` 명령을 이용하여 애플리케이션에 대한 `package.json` 파일을 작성하십시오.
`package.json`의 작동 원리에 대한 자세한 정보는 [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json)을 참조하십시오.

<pre>
<code class="language-sh" translate="no">
$ npm init
</code>
</pre>

이 명령을 실행하면 애플리케이션의 이름 및 버전과 같은 몇 가지 정보에 대해 프롬프트합니다.
지금은 다음의 항목을 제외한 대부분의 항목에서 ENTER 키를 눌러 기본값을 수락할 수 있습니다.

<pre>
<code class="language-sh" translate="no">
entry point: (index.js)
</code>
</pre>

기본 파일의 이름을 `app.js`로 입력하거나 자유롭게 입력하십시오. 기본 파일의 이름을 `index.js`로 입력하기 원하는 경우에는 ENTER 키를 눌러 제안된 기본 파일 이름을 수락하십시오.

이제 `myapp` 디렉토리에 Express를 설치한 후 종속 항목 목록에 저장하십시오. 예를 들면 다음과 같습니다.

<pre>
<code class="language-sh" translate="no">
$ npm install express
</code>
</pre>

Express를 임시로 설치하고 종속 항목 목록에 추가하지 않으려면:

<pre>
<code class="language-sh" translate="no">
$ npm install express --no-save
</code>
</pre>

