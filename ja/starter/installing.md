---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Express のインストール
menu: starter
lang: ja
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# インストール

既に [Node.js](https://nodejs.org/) をインストールしてあることを想定して、ここではアプリケーションを保持するディレクトリーを作成して、それを作業ディレクトリーにします。

<pre>
<code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code>
</pre>

`npm init` コマンドを使用して、アプリケーション用の `package.json` ファイルを作成します。
`package.json` の機能について詳しくは、[Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json) を参照してください。

<pre>
<code class="language-sh" translate="no">
$ npm init
</code>
</pre>

次のコマンドは、アプリケーションの名前やバージョンなど多くの情報の指定を求めるプロンプトを表示します。
ここでは、単に RETURN キーを押し、以下を例外として大半の情報に関してデフォルトを受け入れます。

<pre>
<code class="language-sh" translate="no">
entry point: (index.js)
</code>
</pre>

`app.js`、またはメインファイルに指定したい名前を入力します。`index.js` にする場合は、RETURN キーを押して、示されたデフォルトのファイル名を受け入れます。

次に、Express を `app` ディレクトリーにインストールして、依存関係リストに保存します。次に例を示します。

<pre>
<code class="language-sh" translate="no">
$ npm install express --save
</code>
</pre>

Express を一時的にインストールして、依存関係リストに追加しない場合は、`--save` オプションを省略します。

<pre>
<code class="language-sh" translate="no">
$ npm install express
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
`--save` オプションを指定してインストールされた Node モジュールは、`package.json` ファイル内の `dependencies` リストに追加されます。
その後、`npm install` を `app` ディレクトリーで実行すると、dependencies リスト内のモジュールが自動的にインストールされます。
</div>
