<h3 id='app.onmount'>app.on('mount', callback(parent))</h3>

The `mount` event is fired on a sub-app, when it is mounted on a parent app. The parent app is passed to the callback function.

~~~js
var admin = express();

admin.on('mount', function (parent) {
  console.log('Admin Mounted');
  console.log(parent); // refers to the parent app
});

admin.get('/', function (req, res) {
  res.send('Admin Homepage');
});

app.use('/admin', admin);
~~~
