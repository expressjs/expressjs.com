Return the protocol string "http" or "https" when requested with TLS. If the "trust proxy" setting is enabled, the "X-Forwarded-Proto" header field will be trusted. If you're running behind a reverse proxy that supplies https for you, this may be enabled.
  
```
req.protocol
// => "http"
```
