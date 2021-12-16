---
layout: page
title: Express 應用程式的程序管理程式
menu: advanced
lang: zh-tw
---

# Express 應用程式的程序管理程式

當您在正式作業中執行 Express 應用程式時，使用*程序管理程式*有助您達成下列作業：

- 在應用程式當機時，自動重新啟動它。
- 洞察執行時期效能和資源的耗用情況。
- 動態修改設定，以改良效能。
- 控制叢集作業。

程序管理程式有點像應用程式伺服器；它是一個應用程式的「儲存器」，有助於部署、提供高可用性，並可讓您在執行時期管理應用程式。

對 Express 和其他 Node.js 應用程式來說，最普及的程序管理程式如下：

- [StrongLoop Process Manager](#sl)
- [PM2](#pm2)
- [Forever](#forever)


這三種工具都非常好用，但是 StrongLoop Process Manager 是唯一可以全面提供執行時期和部署解決方案的工具，單以一個統一的介面，就能針對正式作業前後的每一個步驟提供相關工具，來處理整個 Node.js 應用程式的生命週期。

以下是這每一個工具的簡要概觀。如需詳細比較，請參閱 [http://strong-pm.io/compare/](http://strong-pm.io/compare/)。

## <a id="sl">StrongLoop Process Manager</a>

StrongLoop Process Manager (StrongLoop PM) 是 Node.js 應用程式的正式作業程序管理程式。StrongLoop PM 具有內建的負載平衡、
監視和多主機部署，以及一個圖形主控台。您可以利用 StrongLoop PM 來執行下列作業：

- 建置和包裝 Node.js 應用程式，並部署至本端或遠端系統。
- 檢視 CPU 設定檔和資料堆 Snapshot，使效能達到最佳，並診斷記憶體洩漏情況。
- 讓程序和叢集永遠維持作用中。
- 檢視您應用程式上的效能度量。
- 透過 Nginx 整合，輕鬆管理多主機部署。
- 將多個 StrongLoop PM 統整成一個分散式微服務執行時期，以便從 Arc 來管理。

您可以利用 `slc` 這個功能強大的指令行介面或名為 Arc 的圖形工具，來處理 StrongLoop PM。Arc 是開放程式碼，StrongLoop 會提供專業人員支援。

如需相關資訊，請參閱 [http://strong-pm.io/](http://strong-pm.io/)。

完整說明文件：

- [Operating Node apps（StrongLoop 說明文件）](http://docs.strongloop.com/display/SLC)
- [Using StrongLoop Process Manager](http://docs.strongloop.com/display/SLC/Using+Process+Manager).

### 安裝

```console
$ [sudo] npm install -g strongloop
```

### 基本用法

```console
$ cd my-app
$ slc start
```

檢視 Process Manager 和所有已部署應用程式的狀態：

```console
$ slc ctl
Service ID: 1
Service Name: my-app
Environment variables:
  No environment variables defined
Instances:
    Version  Agent version  Cluster size
     4.1.13      1.5.14           4
Processes:
        ID      PID   WID  Listening Ports  Tracking objects?  CPU profiling?
    1.1.57692  57692   0
    1.1.57693  57693   1     0.0.0.0:3001
    1.1.57694  57694   2     0.0.0.0:3001
    1.1.57695  57695   3     0.0.0.0:3001
    1.1.57696  57696   4     0.0.0.0:3001
```

列出所有受管理的應用程式（服務）：

```console
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
```

停止應用程式：

```console
$ slc ctl stop my-app
```

重新啟動應用程式：

```console
$ slc ctl restart my-app
```

您也可以「軟重新啟動」，這會提供工作者程序一個寬限期，使其有時間關閉現有的連線，再重新啟動現行應用程式：

```console
$ slc ctl soft-restart my-app
```

從管理中移除應用程式：

```console
$ slc ctl remove my-app
```

## <a id="pm2">PM2</a>

PM2 是 Node.js 應用程式的正式作業程序管理程式，具有一個內建的負載平衡器。PM2 容許您讓應用程式永遠維持作用中，並在重新載入時不需關閉，且能協助進行一般的系統管理作業。PM2 也可讓您管理應用程式記載、監視和叢集作業。

如需相關資訊，請參閱 [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2)。

### 安裝

```console
$ [sudo] npm install pm2 -g
```

### 基本用法

當您使用 `pm2` 指令啟動應用程式時，必須指定應用程式的路徑。不過，當您停止、重新啟動或刪除應用程式時，只需指定應用程式的名稱或 ID 即可。

```console
$ pm2 start npm --name my-app -- start
[PM2] restartProcessId process id 0
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-app   │ 0  │ fork │ 64029 │ online │ 1       │ 0s     │ 17.816 MB   │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use the `pm2 show <id|name>` command to get more details about an app.
```

當您使用 `pm2` 指令啟動應用程式時，會立即將應用程式傳送至背景。您可以從指令行使用各種 `pm2` 指令來控制背景的應用程式。

使用 `pm2` 指令啟動應用程式之後，會使用 ID 將它登錄在 PM2 的程序清單中。因此，您可以使用其 ID 來管理系統不同目錄中同名的應用程式。

請注意，如果有多個同名的應用程式正在執行，全會受到 `pm2` 指令的影響。因此請使用 ID 而非名稱，來管理個別的應用程式。

列出所有正在執行的程序：

```console
$ pm2 list
```

停止應用程式：

```console
$ pm2 stop 0
```

重新啟動應用程式：

```console
$ pm2 restart 0
```

檢視應用程式的詳細資訊：

```console
$ pm2 show 0
```

將應用程式從 PM2 登錄移除：

```console
$ pm2 delete 0
```


## <a id="forever">Forever</a>

Forever 是一個簡式指令行介面工具，可確保給定的 Script 持續（永遠）執行。Forever 的簡式介面很適合用來執行小型的 Node.js 應用程式和 Script 部署。

如需相關資訊，請參閱 [https://github.com/foreverjs/forever](https://github.com/foreverjs/forever)。

### 安裝

```console
$ [sudo] npm install forever -g
```

### 基本用法

如果要啟動 Script，請使用 `forever start` 指令，並指定 Script 路徑：

```console
$ forever start script.js
```

這個指令會以常駐程式模式（在背景中）執行 Script。

如果要執行 Script，使其附加至終端機，請省略 `start`：

```console
$ forever script.js
```

建議您使用記載選項 `-l`、`-o` 和 `-e`，記載 Forever 工具和 Script 的輸出，如下列範例所示：

```console
$ forever start -l forever.log -o out.log -e err.log script.js
```

檢視 Forever 已啟動的 Script 清單：

```console
$ forever list
```

如果要停止 Forever 已啟動的 Script，請使用 `forever stop` 指令，並指定程序索引（如 `forever list` 指令所列）。

```console
$ forever stop 1
```

或者，指定檔案的路徑：

```console
$ forever stop script.js
```

停止 Forever 已啟動的所有 Script：

```console
$ forever stopall
```

Forever 還有諸多選項，也會提供一個程式化 API。
