---
layout: page
title: Express のインストール
menu: starter
lang: ja
---

# インストール

既に [Node.js](https://nodejs.org/) をインストールしてあることを想定して、ここではアプリケーションを作成するディレクトリーを作り、それを作業ディレクトリーにします。

```sh
$ mkdir myapp
$ cd myapp
```

`npm init` コマンドを使用して、アプリケーション用の `package.json` ファイルを作成します。
`package.json` の機能について詳しくは、[Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json) を参照してください。

```sh
$ npm init
```

次のコマンドは、アプリケーションの名前やバージョンなど多くの情報の指定を求めるプロンプトを表示します。
ここでは、単に RETURN キーを押し、以下を例外として大半の情報に関してデフォルトを受け入れます。

```sh
entry point: (index.js)
```

`app.js`、またはメインファイルに指定したい名前を入力します。`index.js` にする場合は、RETURN キーを押して、表示されたデフォルトのファイル名を受け入れます。

次に、Express を `app` ディレクトリーにインストールして、依存関係リストに保存します。次に例を示します。

```sh
$ npm install express --save
```

Express を一時的にインストールして、依存関係リストに追加しない場合は、`--save` オプションを省略します。

```sh
$ npm install express
```

<div class="doc-box doc-info" markdown="1">
`--save` オプションを指定してインストールされた Node モジュールは、`package.json` ファイル内の `dependencies` リストに追加されます。
その後、`npm install` を `app` ディレクトリーで実行すると、dependencies リスト内のモジュールが自動的にインストールされます。
</div>
