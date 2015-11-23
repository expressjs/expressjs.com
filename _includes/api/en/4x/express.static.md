<h3 id='express.static' class='h2'>express.static(root, [options])</h3>

`express.static` is the only built-in middleware in Express. It is based on [serve-static](https://github.com/expressjs/serve-static), and is responsible for serving the static assets of an Express application.

The `root` argument refers to the root directory from which the static assets are to be served.

The optional `options` object can have the following properties.

| Property      | Description                                                           |   Type      | Default         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | Option for serving dotfiles. Possible values are "allow", "deny", and "ignore" | String | "ignore" |
| `etag`        | Enable or disable etag generation  | Boolean | `true` |
| `extensions`  | Sets file extension fallbacks. | Boolean | `false` |
| `index`       | Sends directory index file. Set `false` to disable directory indexing. | Mixed | "index.html" |
 `lastModified` | Set the `Last-Modified` header to the last modified date of the file on the OS. Possible values are `true` or `false`. | Boolean | `true` |
| `maxAge`      | Set the max-age property of the Cache-Control header in milliseconds or a string in [ms format](https://www.npmjs.org/package/ms) | Number | 0 |
| `redirect`    | Redirect to trailing "/" when the pathname is a directory. | Boolean | `true` |
| `setHeaders`  | Function for setting HTTP headers to serve with the file. | Function |  |

For details on using the middleware, refer [Serving static files in Express](/starter/static-files.html).
