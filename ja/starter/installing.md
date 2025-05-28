---
layout: page
title: Express のインストール
description: Learn how to install Express.js in your Node.js environment, including setting up your project directory and managing dependencies with npm.
menu: starter
lang: ja
redirect_from: "  "
---

# インストール

既に [Node.js](https://nodejs.org/) をインストールしてあることを想定して、ここではアプリケーションを作成するディレクトリーを作り、それを作業ディレクトリーにします。

- [Express 4.x](/{{ page.lang }}/4x/api.html) requires Node.js 0.10 or higher.
- [Express 5.x](/{{ page.lang }}/5x/api.html) requires Node.js 18 or higher.

```bash
$ mkdir myapp
$ cd myapp
```

`npm init` コマンドを使用して、アプリケーション用の `package.json` ファイルを作成します。
`package.json` の機能について詳しくは、[Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json) を参照してください。
For more information on how `package.json` works, see [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json).

```bash
$ npm init
```

This command prompts you for a number of things, such as the name and version of your application.
For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

```
entry point: (index.js)
```

`app.js` と入力するか、メインファイルの名前にしたいものを何か入力してください。もしそれを `index.js` にしたいのなら、RETURN キーを押して提案されたデフォルトのファイル名を受け入れてください。 If you want it to be `index.js`, hit RETURN to accept the suggested default file name.

Expressを `myapp` ディレクトリにインストールし、それを依存関係リストに保存してください。例えば： For example:

```bash
$ npm install express
```

Express を一時的にインストールし、それを依存関係リストに追加しないようにするには、次のようにします。

```bash
$ npm install express --no-save
```

<div class="doc-box doc-info" markdown="1">

npm 5.0 以降のデフォルトでは、npm install はモジュールを `package.json` ファイルの `dependencies` リストに追加します。以前のバージョンの npm では、`--save` オプションを明示的に指定しなければなりません。その後、app ディレクトリで `npm install` を実行すると、依存関係リストにモジュールが自動的にインストールされます。
 Then, afterwards, running `npm install` in the app directory will automatically install modules in the dependencies list.
</div>

### [Next: Hello World ](/{{ page.lang }}/starter/hello-world.html)