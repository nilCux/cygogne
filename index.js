'use strict';

const CreateTaskHandler = require('handlers/taskHandlers/createTaskHandler');
const REQUEST_TEMPLATE = require('dto/*.js');

export function hello(event, context, callback) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello!' }),
  };

  callback(null, response);
}

export async function create(event) {
  try {
    // Assuming `event.body` contains the binary data
    let bytes = new Uint8Array(Buffer.from(event.body, 'base64'));  // if the data is base64-encoded
    // Deserialize to a Task
    let taskMessage = REQUEST_TEMPLATE.Task.deserializeBinary(bytes);
    // Now pass the taskMessage object to the handler
    await CreateTaskHandler.handle(taskMessage);

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: 'An error occurred',
    };
  }
}
