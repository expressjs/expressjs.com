When the `cookieParser(secret)` middleware is used, this object defaults to `{}`. Otherwise, it contains the signed cookies sent by the user-agent, unsigned and ready for use. Signed cookies reside in a different object to show developer intent; otherwise, a malicious attack could be placed on `req.cookie` values (which are easy to spoof). Note that signing a cookie does not make it "hidden" or encrypted; this simply prevents tampering (because the secret used to sign is private).

```
// Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
req.signedCookies.user
// => "tobi"
```

Please refer to [cookie-parser](https://github.com/expressjs/cookie-parser) for additional documentation or any issues and concerns.
