'use strict'

const tessel = require('tessel')

function DotStarStrip(numPixels, port){
  if(!this instanceof DotStarStrip) return new DotStarStrip(numPixels, port)

  if(!numPixels) throw new Error('You need to pass a number of pixels into the DotStar constructor!')

  this.port = port ? tessel.port[port] : tessel.port.A
  this.numPixels = numPixels
  this.endFrameLength = 5 + numPixels / 16
  // 4 bytes for start frame, 4 for each pixel, 4 for end frame
  this.pixels = new Buffer(numPixels * 4 + 32 + this.endFrameLength)
  for(let i = 0; i < this.pixels.length; i++){
    this.pixels[i] = 0x00
  }
  console.log(this.pixels.length)
}

DotStarStrip.prototype.init = function(clockSpeed){
  clockSpeed = clockSpeed || 8000000
  this.spi = this.port.SPI({
    clockSpeed: clockSpeed
  })
  for(let i = 0; i < 4; i++){
    this.pixels[i] = 0x00
  }
}

DotStarStrip.prototype.clear = function(cb){
  for(let i=32; i < this.pixels.length - this.endFrameLength; i+=4){
    this.pixels[i] = 0xFF
    this.pixels[i+1] = 0x00
    this.pixels[i+2] = 0x00
    this.pixels[i+3] = 0x00
  }
  this.spi.transfer(this.pixels, function(err){
    if(err) throw new Error(err)
    if(cb) cb()
  })
}

DotStarStrip.prototype.setPixel = function(options, cb){
  cb = cb || function(){}
  //TODO: Validate options: need pixel, color array of rgb or red, green, blue
  let offset = 32 + 4 * options.pixel

  this.pixels[offset] = 0xFF
  this.pixels[offset + 1] = options.color[0]
  this.pixels[offset + 2] = options.color[1]
  this.pixels[offset + 3] = options.color[2]


  this.spi.transfer(this.pixels, cb)
}

DotStarStrip.prototype.test = function(cb){
  for(let i=4; i < this.pixels.length - this.endFrameLength; i+=4){
    this.pixels[i] = 0xe4
    this.pixels[i+1] = 0x99
    this.pixels[i+2] = 0x33
    this.pixels[i+3] = 0x66
  }
  this.spi.transfer(this.pixels, function(err){
    if(err) throw new Error(err)
    if(cb){ cb() }
  })
}

module.exports = DotStarStrip
