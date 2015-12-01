---
layout: page
title: Expressのインストール
menu: starter
lang: ja
---

# インストール

すでに[Node.js](https://nodejs.org/)がインストールされているとして、アプリケーションのためのディレクトリを作成し、ワーキングディレクトリとします。

<pre><code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code></pre>

`npm init`を用いて`package.json`を生成します。
`package.json`についてのさらなる情報は[Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json)をご覧ください。

<pre><code class="language-sh" translate="no">
$ npm init
</code></pre>

このコマンドはアプリケーションの名前やバージョンといった、いくつかの入力を要求します。
今のところは、下記の項目以外は単にエンターキーを押してデフォルト値を使うことができます。

<pre><code class="language-sh" translate="no">
entry point: (index.js)
</code></pre>

`app.js`または、あなたがメインファイルにつけたい名前を入力します。
もし、それを`index.js`にしたいなら、エンターキーを押してデフォルトのファイル名を利用します。

アプリのディレクトリにExpressをインストールして、依存関係リストの保存をします。

<pre><code class="language-sh" translate="no">
$ npm install express --save
</code></pre>

一時的にExpressをインストールし、依存関係リストをを追加しない場合は`--save`オプションを省略します。

<pre><code class="language-sh" translate="no">
$ npm install express
</code></pre>

<div class="doc-box doc-info" markdown="1">
Nodeモジュールは`--save`オプションで追加される`package.json`ファイル内の`dependencies`リストとともにインストールされます。
アプリのディレクトリで`npm install`を使うと、依存関係リストにあるモジュールが自動的にインストールされます。
</div>
