---
layout: page
title: Expressのインストール
menu: starter
lang: ja
---

# インストール

まず、あなたはまだ行っていない場合は、あなたのアプリケーションを格納するディレクトリを作成し、作業ディレクトリことを確認してください。

~~~sh
$ mkdir myapp
$ cd myapp
~~~

それはコマンドinit``NPMと、すでに存在していない場合、興味のあるディレクトリにある` package.json`ファイルを作成します。

~~~sh
$ npm init
~~~

アプリのディレクトリにExpressをインストールして、依存関係のリストに保存します。

~~~sh
$ npm install express --save
~~~

一時的にExpressをインストールして、依存関係のリストに追加していないために、`--save`オプションを省略：

~~~sh
$ npm install express
~~~

<div class="doc-box doc-info" markdown="1">
`--save`オプションでインストールノードモジュールは、`package.json`ファイルに`dependencies`リストに追加されます。
その後、自動的に依存関係リスト内のモジュールをインストールするアプリのディレクトリに`のnpm install`を使用。
</div>
