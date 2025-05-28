---
layout: page
title: 安裝 Express
description: Learn how to install Express.js in your Node.js environment, including setting up your project directory and managing dependencies with npm.
menu: starter
lang: zh-tw
redirect_from: "  "
---

# 安裝

假設您已安裝 [Node.js](https://nodejs.org/)，請建立目錄來保留您的應用程式，並使它成為您的工作目錄。

- [Express 4.x](/{{ page.lang }}/4x/api.html) requires Node.js 0.10 or higher.
- [Express 5.x](/{{ page.lang }}/5x/api.html) requires Node.js 18 or higher.

```bash
$ mkdir myapp
$ cd myapp
```

Use the `npm init` command to create a `package.json` file for your application.
使用 `npm init` 指令，為您的應用程式建立 `package.json` 檔。如需 `package.json` 如何運作的相關資訊，請參閱 [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json)。

```bash
$ npm init
```

This command prompts you for a number of things, such as the name and version of your application.
For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

```
entry point: (index.js)
```

輸入 `app.js`，或您所要的主要檔名稱。如果您希望其名稱是 `index.js`，請按 RETURN 鍵，接受建議的預設檔名。 If you want it to be `index.js`, hit RETURN to accept the suggested default file name.

現在，將 Express 安裝在 `myapp` 目錄中，並儲存在相依關係清單中。例如： For example:

```bash
$ npm install express
```

如果只想暫時安裝 Express，而不新增至相依關係清單，請省略 `--save` 選項：

```bash
$ npm install express --no-save
```

<div class="doc-box doc-info" markdown="1">

安裝 Node 模組時，如果指定了 `--save` 選項，則會將這些模組新增至 `package.json` 檔中的 `dependencies` 清單。之後，當您在 `app` 目錄中執行 `npm install` 時，就會自動安裝相依關係清單中的模組。
 Then, afterwards, running `npm install` in the app directory will automatically install modules in the dependencies list.
</div>

### [Next: Hello World ](/{{ page.lang }}/starter/hello-world.html)