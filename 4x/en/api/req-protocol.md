This property is the protocol string "http" or "https" when requested with TLS.
If the "trust proxy" setting is enabled, the application will trus the "X-Forwarded-Proto" header field.
HTTPS can be enabled if the application is running behind a reverse proxy that provides HTTPS.
<!-- Confirm that this interpretation is correct -->
  
```js
req.protocol
// => "http"
```
