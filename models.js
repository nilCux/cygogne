'use strict';

const container = require('./di/container');

async function getALL(event, context) {
  try {

    return await container.resolve('getAllModelsHandler').handle();

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: 'An error occurred',
    };
  }
}

async function getOne(event, context) {
  try {
    const id = event.pathParameters.id;

    return await container.resolve('getOneModelHandler').handle(id)
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: 'An error occurred',
    };
  }
}

module.exports = { getOne, getALL }
