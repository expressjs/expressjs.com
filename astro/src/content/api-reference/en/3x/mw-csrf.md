<h3 id='csrf'>csrf()</h3>

CSRF protection middleware.

By default this middleware generates a token named "_csrf"
which should be added to requests which mutate
state, within a hidden form field, query-string etc. This
token is validated against `req.csrfToken()`.

The default `value` function checks `req.body` generated
by the `bodyParser()` middleware, `req.query` generated
by `query()`, and the "X-CSRF-Token" header field.

This middleware requires session support, thus should be added
somewhere below `session()`.
