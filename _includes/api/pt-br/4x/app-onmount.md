<h3 id='app.onmount'>app.on('mount', callback(parent))</h3>

O evento `mount` é acionado em uma sub aplicação, quando é montado em uma aplicação pai. A aplicação pai é passado para a função de *callback*.

~~~js
var admin = express();

admin.on('mount', function (parent) {
  console.log('Admin Mounted');
  console.log(parent); // refere-se a aplicação pai
});

admin.get('/', function (req, res) {
  res.send('Admin Homepage');
});

app.use('/admin', admin);
~~~
