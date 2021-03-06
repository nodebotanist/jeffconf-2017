'use strict'

const five = require('johnny-five')
const Tessel = require('tessel-io')
const board = new five.Board({
  io: new Tessel()
})
const request = require('request')

board.on("ready", function() {
  const rgbLED = new five.Led.RGB({
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
    request({
        method: 'POST',
        url: 'https://ddhp947vn4.execute-api.eu-west-2.amazonaws.com/prod/lambda-dev-color',
        json: true,
        body: {'hue': hue, 'lightness': lightness}
      },
      function(error, res, body){
        console.log(error, body)
        var color = JSON.parse(body.body).color
        console.log(Math.round(color[0]) & 0xff, Math.round(color[1]) & 0xff, Math.round(color[2]) & 0xff)
        rgbLED.color([Math.round(color[0]) & 0xff -1, Math.round(color[1]) & 0xff -1, Math.round(color[2]) & 0xff -1])
      }
    )
    // rgbLED.color(newColor)
  }

  button.on('press', changeLED)
})
