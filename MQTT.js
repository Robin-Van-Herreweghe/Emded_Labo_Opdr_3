var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
const GPIO = require('./gpio').default
var app = require('express')();
var data;
var data2;
client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello from Robin')
      data = GPIO.readInputs();
    }
  })
})

app.Interval = setInterval(async function() {
    data2 = GPIO.readInputs
    if(data == data2)
        data = data2;
    else {
        client.publish('presence', 'CHANGE_DETECTED')
        console.log("input changed")
    }
    }, 1000)




client.on('message',function(topic, message, packet){
    console.log(message.toString())
    if(message.toString() == "SET_OUTPUT")
    {
      if(GPIO.relais.readSync == 0)
          GPIO.relaisOn();
      else if(GPIO.relais.readSync == 1)
          GPIO.relaisOff();
    }
});
  
  
/*client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.connect())
  if(message.toString() == "SET_OUTPUT")
  {
    if(GPIO.relais == 0)
        GPIO.relaisOn();
    else(GPIO.relais == 1)
        GPIO.relaisOff();
  }
  client.end()

}) */
