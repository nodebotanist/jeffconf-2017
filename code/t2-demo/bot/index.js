'use strict'

const five = require('johnny-five')
const Tessel = require('tessel-io')
const board = new five.Board({
  io: new Tessel()
})
const request = require('request')

board.on("ready", function() {
  const rgbLED = new five.Led.RGB({
    isAnode: true,
    pins: {
      red: 'a5',
      green: 'a6',
      blue: 'b5'
    }
  })

  const up = new five.Sensor.Digital('a3')
  const down = new five.Sensor.Digital('a2')
  const left = new five.Sensor.Digital('a7')
  const right = new five.Sensor.Digital('a4')

  const button = new five.Button('b2')

  let lightness = 50
  let hue = 0

  up.on('change', () => {
    hue += 5
    if(hue > 360){
      hue = 0
    }
  })

  down.on('change', () => {
    hue += 5
    if(hue < 0){
      hue = 360
    }
  })

  left.on('change', () => {
    lightness -= 1
    if(lightness < 0){
      lightness = 0
    }
  })

  right.on('change', () => {
    lightness += 1
    if(lightness > 100){
      lightness = 100
    }
  })

  let changeLED = () => {
    console.log('computing color...')
    request.post({
        url: 'https://ddhp947vn4.execute-api.eu-west-2.amazonaws.com/prod/lambda-dev-color',
        form: {hue: hue, lightness: lightness}
      },
      function(error, res, body){
        console.log(error, body)
      }
    )
    // rgbLED.color(newColor)
  }

  button.on('press', changeLED)
})
