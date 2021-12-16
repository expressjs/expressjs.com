---
layout: page
title: 安裝 Express
menu: starter
lang: zh-tw
---

# 安裝

假設您已安裝 [Node.js](https://nodejs.org/)，請建立目錄來保留您的應用程式，並使它成為您的工作目錄。

```console
$ mkdir myapp
$ cd myapp
```

使用 `npm init` 指令，為您的應用程式建立 `package.json` 檔。如需 `package.json` 如何運作的相關資訊，請參閱 [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json)。

```console
$ npm init
```

這個指令會提示您提供一些事項，例如：您應用程式的名稱和版本。現在，您只需按下 RETURN 鍵，接受大部分的預設值，但下列除外：

```console
entry point: (index.js)
```

輸入 `app.js`，或您所要的主要檔名稱。如果您希望其名稱是 `index.js`，請按 RETURN 鍵，接受建議的預設檔名。

現在，將 Express 安裝在 `myapp` 目錄中，並儲存在相依關係清單中。例如：


```console
$ npm install express --save
```

如果只想暫時安裝 Express，而不新增至相依關係清單，請省略 `--save` 選項：

```console
$ npm install express
```

<div class="doc-box doc-info" markdown="1">
安裝 Node 模組時，如果指定了 `--save` 選項，則會將這些模組新增至 `package.json` 檔中的 `dependencies` 清單。之後，當您在 `app` 目錄中執行 `npm install` 時，就會自動安裝相依關係清單中的模組。
</div>
