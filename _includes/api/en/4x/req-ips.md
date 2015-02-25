<h3 id='req.ips'>req.ips</h3>

When the `trust proxy` setting is `true`, this property contains an array of
IP addresses specified in the "X-Forwarded-For" request header.  Otherwise, it contains an empty array.

For example, if "X-Forwarded-For" is "client, proxy1, proxy2", `req.ips` would be 
`["client", "proxy1", "proxy2"]`, where "proxy2" is the furthest downstream.

For more information on the `trust proxy` setting, see [app.set](#app.set).
