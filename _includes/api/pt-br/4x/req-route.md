<h3 id='req.route'>req.route</h3>

A string correspondente a rota atual: Por exemplo:

~~~js
app.get('/user/:id?', function userIdHandler(req, res) {
  console.log(req.route);
  res.send('GET');
})
~~~

Saída de exemplo do fragmento anterior:

~~~js
{ path: '/user/:id?',
  stack:
   [ { handle: [Function: userIdHandler],
       name: 'userIdHandler',
       params: undefined,
       path: undefined,
       keys: [],
       regexp: /^\/?$/i,
       method: 'get' } ],
  methods: { get: true } }
~~~
