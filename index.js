var app = require('express')();
var http = require('http').createServer(app);
const MQTT = require('./MQTT').default
const GPIO = require('./gpio').default


app.Interval = setInterval(async function() {
  data2 = GPIO.readInputs
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
 