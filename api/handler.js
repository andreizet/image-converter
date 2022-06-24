'use strict';
const Jimp = require("jimp");
const fs = require("fs");

module.exports.converter = async (event) => {
  const returnError = (message) => {
    return {
      statusCode: 400,
      body: JSON.stringify(
      {
        message: message,
      },
    ),
    }
  };
  if (!event.body) {
    return returnError('No POST parameters found');
  }
  const body = JSON.parse(event.body);
  if (!body.image) {
    return returnError('No image found in POST parameters');
  }
  let base = body.image;

  const initialImageName = '/tmp/image.png';
  const resizedImageName = '/tmp/resized.png';

  base = base.replace('data:image/png;base64,', '');
  fs.writeFileSync(initialImageName, base, {encoding: 'base64'});

  const finalImage = await Jimp.read(initialImageName)
    .then(jimp => {
      return jimp
        .resize(256, 256)
        .write(resizedImageName);
    })
    .catch(err => {
      console.error(err);
    });

  let toReturn = await finalImage.getBase64Async(Jimp.MIME_PNG);

  fs.unlinkSync(initialImageName);
  fs.unlinkSync(resizedImageName);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: toReturn,
      },
    ),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
