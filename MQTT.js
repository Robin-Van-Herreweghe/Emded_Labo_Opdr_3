var app = require('express')();
var app = require('express')();
const GPIO = require('./gpio').default
var mqtt = require('mqtt')
 
var client  = mqtt.connect('mqtt://test.mosquitto.org')
 
client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello from Robinpi')
    }
  })
})

GPIO.input.watch(function(err, value) {
  if(value = 0){
  client.publish('presence', 'CHANGE_DETECTED: 0')
  }
  else{
    client.publish('presence', 'CHANGE_DETECTED: 1')
  }
  });  
 
client.on('message',function(topic, message, packet){
  if(message.toString() == "SET_OUTPUT")
  {
    if(GPIO.relais.readSync() == 1){
      GPIO.relaisOn();
        console.log("relais Robin aan via mqtt");
    }
    else if(GPIO.relais.readSync() == 0){
      GPIO.relaisOff();
      console.log("relais Robin uit via mqtt");
    }
  }
});