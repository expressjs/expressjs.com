---
layout: page
title: Express のインストール
menu: starter
lang: ja
---

# インストール

既に [Node.js](https://nodejs.org/) をインストールしてあることを想定して、ここではアプリケーションを作成するディレクトリーを作り、それを作業ディレクトリーにします。

```console
$ mkdir myapp
$ cd myapp
```

`npm init` コマンドを使用して、アプリケーション用の `package.json` ファイルを作成します。
`package.json` の機能について詳しくは、[Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json) を参照してください。

```console
$ npm init
```

次のコマンドは、アプリケーションの名前やバージョンなど、いくつかのことを要求します。
ここでは、以下の例外を除いて、RETURN キーを押して単にそれらのデフォルトのほとんどを受け入れることができます。

```console
entry point: (index.js)
```

`app.js` と入力するか、メインファイルの名前にしたいものを何か入力してください。もしそれを `index.js` にしたいのなら、RETURN キーを押して提案されたデフォルトのファイル名を受け入れてください。

Expressを `myapp` ディレクトリにインストールし、それを依存関係リストに保存してください。例えば：

```console
$ npm install express
```

Express を一時的にインストールし、それを依存関係リストに追加しないようにするには、次のようにします。

```console
$ npm install express --no-save
```

<div class="doc-box doc-info" markdown="1">
npm 5.0 以降のデフォルトでは、npm install はモジュールを `package.json` ファイルの `dependencies` リストに追加します。以前のバージョンの npm では、`--save` オプションを明示的に指定しなければなりません。その後、app ディレクトリで `npm install` を実行すると、依存関係リストにモジュールが自動的にインストールされます。
</div>

###  [Next: Hello World ](/{{ page.lang }}/starter/hello-world.html)
