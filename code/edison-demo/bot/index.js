'use strict'

const five = require("johnny-five")
const Edison = require("edison-io")
const board = new five.Board({
  io: new Edison()
})

board.on("ready", function() {
  let keypad = new five.Sensor({
    pin: 'A0',
    freq: 200,
    threshold: 30
  })

  let led = new five.Led.RGB({
    isAnode: true,
    pins: [3, 5, 6]
  })

  let voteQueue = []

  keypad.on('change', function(){
    if(this.value < 424){
      return
    } else if (this.value < 750) {
      voteQueue.push('purple')
      led.color('#663399')
    } else {
      voteQueue.push('orange')
      led.color('orange')
    }

    console.log(voteQueue)

    if(voteQueue.length >= 5){
      // call lambda
    }
  })

})
