The protocol string "http" for a standard HTTP request or "https" fora request with TLS.
If the "trust proxy" setting is enabled, the application will trust the "X-Forwarded-Proto" header field.
HTTPS can be enabled if the application is running behind a reverse proxy that provides HTTPS.
<!-- Confirm that this interpretation is correct -->
  
```js
req.protocol
// => "http"
```
