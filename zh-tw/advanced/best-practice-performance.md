---
layout: page
title: 在正式作業中使用 Express 的效能最佳作法
menu: advanced
lang: zh-tw
---

# 正式作業最佳作法：效能和可靠性

## 概觀

本文討論部署至正式作業之 Express 應用程式的效能與可靠性最佳作法。

顯然地，這個主題屬於 "devops" 領域，涵蓋了傳統開發和作業兩者。因此，資訊分為兩大部分：

* [在程式碼中的作法](#code)（開發部分）。
* [在環境 / 設定中的作法](#env)（作業部分）。

<a name="code"></a>

## 在程式碼中的作法

以下是您可以在程式碼中執行的一些作法，藉以改良您應用程式的效能：

* 採用 gzip 壓縮
* 不使用同步函數
* 使用中介軟體來提供靜態檔案
* 正確執行記載
* 適當處理異常狀況

### 採用 gzip 壓縮

Gzip 壓縮可以大幅減少回應內文的大小，從而提高 Web 應用程式的速度。請使用 [compression](https://www.npmjs.com/package/compression) 中介軟體，在您的 Express 應用程式中進行 gzip 壓縮。例如：

```js
const compression = require('compression')
const express = require('express')
const app = express()
app.use(compression())
```

在正式作業中，如果網站的資料流量極高，落實執行壓縮最好的作法是在反向 Proxy 層次實作它（請參閱[使用反向 Proxy](#proxy)）。在該情況下，就不需使用壓縮中介軟體。如需在 Nginx 中啟用 gzip 壓縮的詳細資料，請參閱 Nginx 說明文件中的 [ngx_http_gzip_module 模組](http://nginx.org/en/docs/http/ngx_http_gzip_module.html)。

### 不使用同步函數

同步函數和方法直到傳回前，會阻礙執行程序的進行。單次呼叫同步函數，可能在數微秒或毫秒傳回，不過，在高資料流量的網站中，這些呼叫往往會累加，並降低應用程式效能。請避免在正式作業中使用它們。

雖然 Node 和許多模組會提供其函數的同步與非同步版本，在正式作業中，請一律使用非同步版本。唯一有理由使用同步函數的時機是在最初啟動之時。

如果您使用 Node.js 4.0+ 或 io.js 2.1.0+，每當您的應用程式使用同步 API 時，您可以使用 `--trace-sync-io` 指令行旗標，來列印警告和堆疊追蹤。當然，在正式作業中您其實不會想使用此旗標，但這可確保您的程式碼可準備用於正式作業中。如需相關資訊，請參閱 [io.js 2.1.0 每週更新](https://nodejs.org/en/blog/weekly-updates/weekly-update.2015-05-22/#2-1-0)。

### 使用中介軟體來提供靜態檔案

在開發中，您可以使用 [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile) 來提供靜態檔案。但是在正式作業中卻不能這樣做，因為此函數得讀取檔案系統，才能取得每一個檔案要求，如此會遇到明顯的延遲，並影響應用程式的整體效能。請注意，`res.sendFile()` *並非*透過更具效率的 [sendfile](http://linux.die.net/man/2/sendfile) 系統呼叫來實作。

請改用 [serve-static](https://www.npmjs.com/package/serve-static) 中介軟體（或同等項目），此中介軟體能有效提供 Express 應用程式的檔案。

甚至更好的作法是使用反向 Proxy 來提供靜態檔案；如需相關資訊，請參閱[使用反向 Proxy](#proxy)。

### 正確執行記載

一般而言，從您的應用程式進行記載的原因有二：為了除錯，以及為了記載應用程式活動（其實就是除錯之外的每一項）。使用 `console.log()` 或 `console.err()` 將日誌訊息列印至終端機，在開發中是常見作法。但是當目的地是終端機或檔案時，[這些函數是同步的](https://nodejs.org/api/console.html#console_console_1)，除非您將輸出引導至另一個程式，這些函數並不適用於正式作業。

#### 為了除錯

如果您為了除錯而記載，則不要使用 `console.log()`，請改用 [debug](https://www.npmjs.com/package/debug) 之類的特殊除錯模組。這個模組可讓您使用 DEBUG 環境變數，來控制哪些除錯訊息（若有的話）要送往 `console.err()`。為了讓應用程式完全維持非同步，您仍得將 `console.err()` 引導至另一個程式。但之後在正式作業中，實際上您並不會進行除錯，不是嗎？

#### 為了應用程式活動

如果您要記載應用程式活動（例如，追蹤資料流量或 API 呼叫），則不要使用 `console.log()`，請改用 [Winston](https://www.npmjs.com/package/winston) 或
[Bunyan](https://www.npmjs.com/package/bunyan) 之類的記載程式庫。如需這兩種程式庫的詳細比較，請參閱 StrongLoop 部落格文章 [Comparing Winston and Bunyan Node.js Logging](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/)。

<a name="exceptions"></a>

### 適當處理異常狀況

Node 應用程式一旦遇到未捕捉到的異常狀況，就會當機。如果不處理異常狀況，並採取適當的動作，您的 Express 應用程式會當機並且離線。如果您遵循下方[確定您的應用程式自動重新啟動](#restart)中的建議，應用程式就能從當機回復。幸好 Express 應用程式的啟動時間通常很短。然而，您會希望一開始就避免當機，如果要這樣做，您需要適當處理異常狀況。

為了確保您能處理所有的異常狀況，請使用下列技術：

* [使用 try-catch](#try-catch)
* [使用 promise](#promises)

在分別討論這兩個主題之前，您對 Node/Express 錯誤處理方式應有基本的瞭解：使用「錯誤優先回呼」，並將錯誤傳播至中介軟體。Node 從非同步函數傳回錯誤時，會採用「錯誤優先回呼」慣例，其中，回呼函數的第一個參數是錯誤物件，接著是後續參數中的結果資料。如果要指出無錯誤，會傳遞 null 作為第一個參數。回呼函數必須同樣遵循「錯誤優先回呼」慣例，才能實際處理錯誤。在 Express 中，最佳作法是使用 next() 函數，透過中介軟體鏈來傳播錯誤。

如需進一步瞭解錯誤處理的基本概念，請參閱：

* [Error Handling in Node.js](https://www.joyent.com/developers/node/design/errors)
* [Building Robust Node Applications: Error Handling](https://strongloop.com/strongblog/robust-node-applications-error-handling/) (StrongLoop blog)

#### 禁止事項

有一件事*不能*做，就是接聽 `uncaughtException` 事件，此事件是在回歸事件迴圈期間不斷引發異常狀況時產生的。新增 `uncaughtException` 的事件接聽器，會使遇到異常狀況的程序變更其預設行為；儘管發生異常狀況，該程序會繼續執行。阻止應用程式當機，似乎是個好辦法，但是在未捕捉到異常狀況之後，又繼續執行應用程式，卻是危險作法而不建議這麼做，因為程序的狀態會變得不可靠且無法預測。

此外，使用 `uncaughtException` 被公認為[拙劣作法](https://nodejs.org/api/process.html#process_event_uncaughtexception)，這裡有一份[提案](https://github.com/nodejs/node-v0.x-archive/issues/2582)，指出如何將它從核心移除。因此，接聽 `uncaughtException` 並不可取。這是我們建議採取多重程序和監督程式等事項的原因：當機再重新啟動，通常是從錯誤回復最可靠的作法。

我們也不建議使用 [domains](https://nodejs.org/api/domain.html)。它通常不能解決問題，並且是個已淘汰的模組。

<a name="try-catch"></a>

#### 使用 try-catch

try-catch 是一種 JavaScript 語言建構，可用來捕捉同步程式碼中的異常狀況。例如，如以下所示，利用 try-catch 來處理 JSON 剖析錯誤。

使用 [JSHint](http://jshint.com/) 或 [JSLint](http://www.jslint.com/) 之類的工具，有助您尋找隱含的異常狀況，例如[參照未定義變數中的錯誤](http://www.jshint.com/docs/options/#undef)。

下列範例顯示如何使用 try-catch 來處理潛在的程序當機異常狀況。此中介軟體函數接受名稱是 "params" 的查詢欄位參數，它是一個 JSON 物件。

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params
    try {
      const jsonObj = JSON.parse(jsonStr)
      res.send('Success')
    } catch (e) {
      res.status(400).send('Invalid JSON string')
    }
  })
})
```

不過，try-catch 只適用於同步程式碼。由於 Node 平台主要是非同步（尤其是在正式作業環境），try-catch 不會捕捉大量的異常狀況。

<a name="promises"></a>

#### 使用 promise

只要非同步程式碼區塊使用 `then()`，promise 就會處理其中的任何異常狀況（包括明確和隱含）。只需在 promise 鏈尾端新增 `.catch(next)` 即可。例如：

```js
app.get('/', (req, res, next) => {
  // do some sync stuff
  queryDb()
    .then((data) => makeCsv(data)) // handle data
    .then((csv) => { /* handle csv */ })
    .catch(next)
})

app.use((err, req, res, next) => {
  // handle error
})
```

現在，所有非同步與同步錯誤都會傳播到錯誤中介軟體。

不過，請注意下列兩項警告：

1.  您所有的非同步程式碼都必須傳回 promise（不包括發射程式）。如果特定程式庫沒有傳回 promise，請使用 [Bluebird.promisifyAll()](http://bluebirdjs.com/docs/api/promise.promisifyall.html) 等之類的 helper 函數來轉換基本物件。
2.  事件發射程式（例如：串流）仍可能造成未捕捉到的異常狀況。因此，請確定錯誤事件的處理適當；例如：

```js
const wrap = fn => (...args) => fn(...args).catch(args[2])

app.get('/', wrap(async (req, res, next) => {
  const company = await getCompanyById(req.query.id)
  const stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
```

如需使用 promise 來處理錯誤的相關資訊，請參閱：

* [Asynchronous Error Handling in Express with Promises, Generators and ES7](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)
* [Promises in Node.js with Q – An Alternative to Callbacks](https://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/)

<a name="env"></a>

## 在環境 / 設定中的作法

以下是您可以在系統環境中執行的一些作法，藉以改良您應用程式的效能：

* 將 NODE_ENV 設為 "production"
* 確定您的應用程式自動重新啟動
* 在叢集中執行應用程式
* 快取要求結果
* 使用負載平衡器
* 使用反向 Proxy

### 將 NODE_ENV 設為 "production"

NODE_ENV 環境變數用來指定應用程式的執行環境（通常是開發或正式作業）。若要改良效能，其中一個最簡單的作法是將 NODE_ENV 設為 "production"。

將 NODE_ENV 設為 "production"，可讓 Express：

* 快取視圖範本。
* 快取從 CSS 延伸項目產生的 CSS 檔案。
* 產生簡略的錯誤訊息。

[測試指出](http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/)單單這樣做，就能提高 3 倍的應用程式效能！

如果您需要撰寫環境特定的程式碼，您可以使用 `process.env.NODE_ENV` 來檢查 NODE_ENV 的值。請注意，檢查任何環境變數的值都會影響效能，因此請慎行。

在開發中，您通常是在互動式 Shell 中設定環境變數，例如，使用 `export` 或您的 `.bash_profile` 檔。但是在正式作業伺服器中，通常您應該不會這樣做；反而是使用您作業系統的 init 系統（systemd 或 Upstart）。下一節詳述一般性的 init 系統用法，但由於設定 NODE_ENV 對於效能來說很重要（而且輕而易舉），這裡仍特別強調。

採用 Upstart 時，請在您的工作檔中使用 `env` 關鍵字。例如：


<pre>
<code class="language-sh" translate="no">
# /etc/init/env.conf
 env NODE_ENV=production
</code>
</pre>

如需相關資訊，請參閱 [Upstart Intro, Cookbook and Best Practices](http://upstart.ubuntu.com/cookbook/#environment-variables)。

採用 systemd 時，請在單位檔案中使用 `Environment` 指引。例如：


<pre>
<code class="language-sh" translate="no">
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
</code>
</pre>

如需相關資訊，請參閱 [Using Environment Variables In systemd Units](https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html)。

如果您使用 StrongLoop Process Manager，您也可以[在將 StrongLoop PM 安裝成服務時，設定環境變數](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-Setenvironmentvariables)。

<a name="restart"></a>

### 確定您的應用程式自動重新啟動

在正式作業中，您始終不希望您的應用程式離線。也就是說，不論是應用程式當機，或是伺服器本身當機，您都需要確保它會重新啟動。儘管最好這些事件都不要發生，您仍必須務實看待這兩種可能的情況，其作法如下：

* 當應用程式（和 Node）當機時，使用程序管理程式重新啟動它。
* 當作業系統當機時，使用您作業系統提供的 init 系統，來重新啟動程序管理程式。也有可能可以使用 init 系統，而不使用程序管理程式。

Node 應用程式一旦遇到未捕捉到的異常狀況，就會當機。首要之務是確定您的應用程式已妥善測試，且已處理所有的異常狀況（請參閱[適當處理異常狀況](#exceptions)，以取得詳細資料）。但是萬全的作法是落實執行機制，以確保萬一您的應用程式當機，它會自動重新啟動。

#### 使用程序管理程式

在開發中，只需從指令行使用 `node server.js` 或類似指令，就會啟動應用程式。但在正式作業中這樣做，卻會成為禍因。如果應用程式當機，就會離線直到您重新啟動它為止。為了確保應用程式會在當機時重新啟動，請使用程序管理程式。程序管理程式是一個應用程式的「儲存器」，有助於部署、提供高可用性，並可讓您在執行時期管理應用程式。

除了在應用程式當機時重新啟動它，程序管理程式還可讓您：

* 洞察執行時期效能和資源的耗用情況。
* 動態修改設定，以改良效能。
* 控制叢集作業（StrongLoop PM 和 pm2）。

最普及的 Node 程序管理程式如下：

* [StrongLoop Process Manager](http://strong-pm.io/)
* [PM2](https://github.com/Unitech/pm2)
* [Forever](https://www.npmjs.com/package/forever)

有關這三種程序管理程式的特性比較，請參閱 [http://strong-pm.io/compare/](http://strong-pm.io/compare/)。如需這三種的詳細介紹，請參閱 [Express 應用程式的程序管理程式](/{{ page.lang }}/advanced/pm.html)。

即使您的應用程式不時發生當機，這些程序管理程式不論哪一個都足以讓您的應用程式維持作用中。

不過，StrongLoop PM 有許多特性明確以正式作業部署為目標。您可以使用它和相關的 StrongLoop 工具來：

* 在本端建置和包裝您的應用程式，然後安全地部署到正式作業系統。
* 在應用程式當機時（不論任何原因），自動重新啟動。
* 遠端管理叢集。
* 檢視 CPU 設定檔和資料堆 Snapshot，使效能達到最佳，並診斷記憶體洩漏情況。
* 檢視您應用程式的效能度量。
* 藉由 Nginx 負載平衡器的整合控制，輕鬆調整至多部主機。

如同以下說明，當您使用 init 系統將 StrongLoop PM 安裝成作業系統服務時，它會自動隨系統一起重新啟動。因此，它會讓您的應用程式程序和叢集永遠維持作用中。

#### 使用 init 系統

接下來的可靠性層級是確保您的應用程式會隨伺服器一起重新啟動。系統仍可能因各種不同的原因而關閉。為了確保您的應用程式會在伺服器當機時重新啟動，請使用您作業系統內建的 init 系統。現今兩個通行的主要 init 系統是 [systemd](https://wiki.debian.org/systemd) 和 [Upstart](http://upstart.ubuntu.com/)。

init 系統若要與 Express 應用程式搭配使用，其作法有二：

* 在程序管理程式中執行應用程式，並利用 init 系統將程序管理程式安裝成服務。當應用程式當機時，程序管理程式會重新啟動應用程式，且 init 系統會在作業系統重新啟動時，重新啟動程序管理程式。這是建議的作法。
* 直接使用 init 系統來執行應用程式（和 Node）。這樣做比較簡單，但卻少了使用程序管理程式時的其他好處。

##### Systemd

Systemd 是一個 Linux 系統和服務管理程式。大部分主要的 Linux 發行套件已採用 systemd 作為其預設 init 系統。

systemd 服務配置檔稱為*單位檔案*，其副名結尾是 .service。以下是範例單位檔案，用來直接管理 Node 應用程式（請以您的系統和應用程式值取代粗體字）：

<pre>
<code class="language-sh" translate="no">
[Unit]
Description=Awesome Express App

[Service]
Type=simple
ExecStart=/usr/local/bin/node /projects/myapp/index.js
WorkingDirectory=/projects/myapp

User=nobody
Group=nogroup

# Environment variables:
Environment=NODE_ENV=production

# Allow many incoming connections
LimitNOFILE=infinity

# Allow core dumps for debugging
LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
</code>
</pre>
如需 systemd 的相關資訊，請參閱 [systemd 參照（線上指令說明）](http://www.freedesktop.org/software/systemd/man/systemd.unit.html)。

##### 將 StrongLoop PM 當成 systemd 服務

將 StrongLoop Process Manager 安裝成 systemd 服務很簡單。完成之後，當伺服器重新啟動時，就會自動重新啟動 StrongLoop PM，之後它就會重新啟動其所管理的所有應用程式。

將 StrongLoop PM 安裝成 systemd 服務：

```console
$ sudo sl-pm-install --systemd
```

然後使用下列指令來啟動服務：

```console
$ sudo /usr/bin/systemctl start strong-pm
```

如需相關資訊，請參閱 [Setting up a production host（StrongLoop 說明文件）](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHEL7+,Ubuntu15.04or15.10)。

##### Upstart

Upstart 是一個可在許多 Linux 發行套件中使用的系統工具，它會在系統啟動期間啟動作業和服務、在關機期間停止它們，並且監督它們。您可以將 Express 應用程式或程序管理程式配置成服務，之後 Express 應用程式或程序管理程式一旦發生當機，Upstart 就會自動重新啟動它。

Upstart 服務定義在工作配置檔（亦稱為 "job"）中，其副名結尾是 `.conf`。下列範例顯示如何為名稱是 "myapp" 的應用程式，建立一項名稱是 "myapp" 的工作，且其主要檔案位於 `/projects/myapp/index.js`。

在 `/etc/init/` 建立名稱是 `myapp.conf` 的檔案，且其內容如下（請以您系統和應用程式的值取代粗體字）：

<pre>
<code class="language-sh" translate="no">
# When to start the process
start on runlevel [2345]

# When to stop the process
stop on runlevel [016]

# Increase file descriptor limit to be able to handle more requests
limit nofile 50000 50000

# Use production mode
env NODE_ENV=production

# Run as www-data
setuid www-data
setgid www-data

# Run from inside the app dir
chdir /projects/myapp

# The process to start
exec /usr/local/bin/node /projects/myapp/index.js

# Restart the process if it is down
respawn

# Limit restart attempt to 10 times within 10 seconds
respawn limit 10 10
</code>
</pre>

附註：這個 Script 需要 Upstart 1.4 或更新版本，且 Ubuntu 12.04-14.10 支援該 Upstart 版本。

由於工作是配置成在系統啟動時執行，您的應用程式會隨作業系統一起啟動，並在應用程式當機或系統關閉時自動重新啟動。

除了自動重新啟動應用程式，Upstart 可讓您使用下列指令：

* `start myapp` – 啟動應用程式
* `restart myapp` – 重新啟動應用程式
* `stop myapp` – 停止應用程式。

如需 Upstart 的相關資訊，請參閱 [Upstart Intro, Cookbook and Best Practises](http://upstart.ubuntu.com/cookbook)。

##### 將 StrongLoop PM 當成 Upstart 服務

將 StrongLoop Process Manager 安裝成 Upstart 服務很簡單。完成之後，當伺服器重新啟動時，就會自動重新啟動 StrongLoop PM，之後它就會重新啟動其所管理的所有應用程式。

將 StrongLoop PM 安裝成 Upstart 1.4 服務：

```console
$ sudo sl-pm-install
```

然後使用下列指令來執行服務：

```console
$ sudo /sbin/initctl start strong-pm
```

附註：在不支援 Upstart 1.4 的系統上，指令略有不同。如需相關資訊，請參閱 [Setting up a production host（StrongLoop 說明文件）](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHELLinux5and6,Ubuntu10.04-.10,11.04-.10)。

### 在叢集中執行應用程式

在多核心系統中，您可以啟動程序叢集，多次提高 Node 應用程式的效能。叢集會執行該應用程式的多個實例，理論上，每一個 CPU 核心上各有一個實例，因此負載和作業會分散在這些實例之間。

<!--![利用叢集 API 來平衡應用程式實例](/images/clustering.png)-->

重要事項：由於應用程式實例是以個別程序形式執行，因此不會共用相同的記憶體空間。也就是說，物件位於每一個應用程式實例本端。因此，您無法在應用程式碼中維護狀態。不過，您可以利用 [Redis](http://redis.io/) 等之類的記憶體內資料儲存庫，來儲存階段作業的相關資料和狀態。不論叢集是由多個程序或多部實體伺服器組成，這項警告其實適用於所有的水平調整形式。

在叢集化的應用程式中，工作者程序可個別當機，而不會影響其餘的程序。除了效能優點，執行應用程式程序叢集的另一個原因是，可將失效隔離。只要有工作者程序當機，一律要確定會記載事件，並利用 cluster.fork() 來衍生新程序。

#### 使用 Node 的叢集模組

利用 Node 的[叢集模組](https://nodejs.org/docs/latest/api/cluster.html)，即可達成叢集作業。這可讓主要程序衍生工作者程序，並將送入的連線分散在這些工作者之間。不過，與其直接使用這個模組，更好的作法是使用其中提供的一個工具，自動為您執行叢集作業；
例如 [node-pm](https://www.npmjs.com/package/node-pm) 或 [cluster-service](https://www.npmjs.com/package/cluster-service)。

#### 使用 StrongLoop PM

如果您將應用程式部署至 StrongLoop Process Manager (PM)，您可以善用叢集作業，且*不需*修改應用程式碼。

當 StrongLoop Process Manager (PM) 執行應用程式時，它會自動在叢集中執行它，且該叢集中的工作者數目等於系統上的 CPU 核心數。您可以使用 slc 指令行工具，直接手動變更工作者程序數目，而不需停止應用程式。

舉例來說，假設您將應用程式部署至 prod.foo.com，且 StrongLoop PM 是在埠 8701（預設值）接聽，請使用 slc 將叢集大小設為 8：

```console
$ slc ctl -C http://prod.foo.com:8701 set-size my-app 8
```

如需利用 StrongLoop PM 執行叢集作業的相關資訊，請參閱 StrongLoop 說明文件中的[叢集作業](https://docs.strongloop.com/display/SLC/Clustering)。

### 快取要求結果

在正式作業中改良效能的另一項策略是快取要求的結果，這樣您的應用程式就不會重複執行作業而反覆處理相同的要求。

使用 [Varnish](https://www.varnish-cache.org/) 或 [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/)（另請參閱 [Nginx 快取](https://serversforhackers.com/nginx-caching/)）等之類的快取伺服器，可大幅改良您應用程式的速度與效能。

### 使用負載平衡器

不論如何將應用程式最佳化，單一實例所能處理的負載量與資料流量有限。調整應用程式的其中一個作法是執行其多個實例，並透過負載平衡器來分散資料流量。設定負載平衡器可改良您應用程式的效能和速度，且透過其單一實例，使該應用程式得以多次調整。

負載平衡器通常是一個反向 Proxy，負責協調與多個應用程式實例和伺服器之間的資料流量。利用 [Nginx](http://nginx.org/en/docs/http/load_balancing.html) 或 [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts)，就能輕鬆設定您應用程式的負載平衡器。

如果進行負載平衡，您可能得確定與特定階段作業 ID 相關聯的要求，會連接至發出該要求的程序。這就是所謂的*階段作業親緣性*或*組合階段作業*，如果要解決此情況，可按照上述建議，使用 Redis 等之類的資料儲存庫來儲存階段作業資料（視您的應用程式而定）。相關討論請參閱[使用多個節點](http://socket.io/docs/using-multiple-nodes/)。

#### StrongLoop PM 與 Nginx 負載平衡器搭配使用

[StrongLoop Process Manager](http://strong-pm.io/) 整合了 Nginx Controller，因此配置多主機正式作業環境配置更簡單。如需相關資訊，請參閱 [Scaling to multiple servers](https://docs.strongloop.com/display/SLC/Scaling+to+multiple+servers)（StrongLoop 說明文件）。
<a name="proxy"></a>

### 使用反向 Proxy

反向 Proxy 位於 Web 應用程式前面，除了將要求引導至應用程式，也會對要求執行支援的作業。除此之外，它還可以處理錯誤頁面、壓縮、快取、提供的檔案，以及負載平衡。

將不需要瞭解應用程式狀態的作業移交給反向 Proxy，使 Express 更有餘裕執行特殊的應用程式作業。基於此因，在正式作業中，建議讓 Express 在 [Nginx](https://www.nginx.com/) 或 [HAProxy](http://www.haproxy.org/) 等之類的反向 Proxy 背後執行。
