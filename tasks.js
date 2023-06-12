'use strict'

const container = require('./di/container')
const REQUESTS = require('./dto/requests_pb')

async function createText2Image(event) {
  try {
    // // Assuming `event.body` contains the binary data
    // let bytes = new Uint8Array(Buffer.from(event.body, 'base64'))  // if the data is base64-encoded
    // // Deserialize to a Task
    // let taskMessage = REQUESTS.Task.deserializeBinary(bytes)
    // // Now pass the taskMessage object to the handler
    // return await container.resolve('createTaskHandler').handle(taskMessage)
    return await container.resolve('createTaskHandler').handle(taskMessage)
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: 'An error occurred',
    }
  }
}

module.exports = { create }
