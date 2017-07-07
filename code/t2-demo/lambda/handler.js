'use strict';

const color = require('color')

module.exports.color = (event, context, callback) => {
  let ourColor = color('hsl('+ event.hue + ', 100%, ' + event.lightness +'%)')

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      color: ourColor.rgb().array(),
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
