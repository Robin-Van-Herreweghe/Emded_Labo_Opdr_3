const { Gpio } = require('onoff')
const shell = require('shelljs')

class GPIO {
    constructor() {
        console.log('GPIO helper created!')
        this.relais = new Gpio(23, 'out')

        this.input = new Gpio(17,'in','both')
    }

    relaisOn() {
        this.relais.writeSync(0)
    }

    relaisOff() {
        this.relais.writeSync(1)
    }
}
    
exports.default = new GPIO() 