---
layout: page
title: Express 설치하기
menu: starter
lang: ko
---

# 설치

먼저, 당신의 애플리케이션을 보관할 폴더를 만들지 않았다면 작업 공간이 될 폴더를 만드세요.
First, create a directory to hold your application, if you haven't already done so, and make that your working directory.

~~~sh
$ mkdir myapp
$ cd myapp
~~~

`package.json` 파일이 존재하지 않는다면 원하는 폴더에서 `npm init` 명령어를 이 파일을 만드세요.

~~~sh
$ npm init
~~~

Express를 앱 디렉토리에 설치하여 의존성 목록에 저장하세요:

~~~sh
$ npm install express --save
~~~

Express를 임시로 설치하고 싶다면, `-save` 옵션을 빼면 됩니다:

~~~sh
$ npm install express
~~~

<div class="doc-box doc-info" markdown="1">
Node 모듈들은 `--save` 옵션을 통해 `package.json` 파일 내부 `dependencies` 목록에 추가됩니다.
그리고 앱 디렉토리에서 `npm install` 명령어를 이용하여 의존성 목록에 있는 모듈들을 자동으로 설치할 수 있습니다. 
</div>
