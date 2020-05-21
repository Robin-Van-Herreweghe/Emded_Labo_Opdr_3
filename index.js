var app = require('express')();
var http = require('http').createServer(app);
const io = require('socket.io')(http)
const MQTT = require('./MQTT').default
const GPIO = require('./gpio').default

app.Interval = setInterval(async function() {
    if (app.socket) {
        console.log('Reading inputs')
        app.socket.emit('inputs', GPIO.readInputs())
    } else {
        console.log('no socket')
    }
  }, 1000)

app.get('/', function(req, res){
  res.sendfile(__dirname+'/index.html');
});
app.get('/leds.html', function(req, res){
  res.sendfile(__dirname+'/leds.html');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', socket => {
  app.socket = socket
  socket.on('on', () => {
      console.log('Turning on relais...');
      GPIO.relaisOn();
  })
  socket.on('off', () => {
      console.log('Turning off relais...');
      GPIO.relaisOff();
  })
});