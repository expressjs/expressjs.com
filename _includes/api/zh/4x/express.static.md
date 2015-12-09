<h3 id='express.static' class='h2'>express.static(root, [options])</h3>


`express.static`是Express中唯一的内建中间件。它以[server-static](https://github.com/expressjs/serve-static)模块为基础开发，负责托管 Express 应用内的静态资源。
参数`root`为静态资源的所在的根目录。
参数`options`是可选的，支持以下的属性：

|属性|描述|类型|默认值|
|----|----|----|------|
|dotfiles|是否响应点文件。供选择的值有"allow"，"deny"和"ignore"|String|"ignore"|
|etag|使能或者关闭etag|Boolean|true|
|extensions|设置文件延期回退|Boolean|true|
|index|发送目录索引文件。设置false将不发送。|Mixed|"index.html"|
|lastModified|设置文件在系统中的最后修改时间到`Last-Modified`头部。可能的取值有`false`和`true`。|Boolean|true|
|maxAge|在Cache-Control头部中设置`max-age`属性，精度为毫秒(ms)或则一段[ms format](https://www.npmjs.org/package/ms)的字符串|Number|0|
|redirect|当请求的pathname是一个目录的时候，重定向到尾随"/"|Boolean|true|
|setHeaders|当响应静态文件请求时设置headers的方法|Funtion||


如果你想获得更多关于使用中间件的细节，你可以查阅[Serving static files in Express](/starter/static-files.html)。