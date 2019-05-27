<h3 id='req.signedCookies'>req.signedCookies</h3>

This object requires the `cookieParser(secret)` middleware for use.
It contains signed cookies sent by the user-agent, unsigned and ready for use.
Signed cookies reside in a different object to show developer intent; otherwise,
a malicious attack could be placed on `req.cookie` values (which are easy to spoof).
Note that signing a cookie does not make it "hidden" or encrypted; this simply
prevents tampering (because the secret used to sign is private). If no signed
cookies are sent, it defaults to `{}`.

```js
// Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
console.dir(req.signedCookies.user)
// => 'tobi'
```
