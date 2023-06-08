'use strict';

const container = require('./di/container');
const REQUESTS = require('./dto/requests_pb');

function hello(event, context, callback) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello!' }),
  };

  callback(null, response);
}

async function create(event) {
  try {
    console.log(event.body)
    // Assuming `event.body` contains the binary data
    let bytes = new Uint8Array(Buffer.from(event.body, 'base64'));  // if the data is base64-encoded
    // Deserialize to a Task
    let taskMessage = REQUESTS.Task.deserializeBinary(bytes);
    // Now pass the taskMessage object to the handler
    await container.resolve('createTaskHandler').handle(taskMessage);

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: 'An error occurred',
    };
  }
}

module.exports = { create }
