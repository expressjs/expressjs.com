<h3 id='app.routes'>app.routes</h3>

The `app.routes` object houses all of the routes defined mapped
by the associated HTTP verb. This object may be used for introspection capabilities,
for example Express uses this internally not only for routing but to provide default
<string>OPTIONS</string> behaviour unless `app.options()` is used. Your application
or framework may also remove routes by simply by removing them from this object.

The output of `console.log(app.routes)`:

```
{ get:
   [ { path: '/',
       method: 'get',
       callbacks: [Object],
       keys: [],
       regexp: /^\/\/?$/i },
     { path: '/user/:id',
       method: 'get',
       callbacks: [Object],
       keys: [{ name: 'id', optional: false }],
       regexp: /^\/user\/(?:([^\/]+?))\/?$/i } ],
  delete:
   [ { path: '/user/:id',
       method: 'delete',
       callbacks: [Object],
       keys: [Object],
       regexp: /^\/user\/(?:([^\/]+?))\/?$/i } ] }
```
