'use strict'

const container = require('./di/container')
const REQUESTS = require('./dto/requests_pb')
const Joi = require('joi')

const resuestBodyScheme = Joi.object({
  tool_id: Joi.string().min(1).max(30).required(),
  model_id: Joi.string().min(1).max(30).required(),
  positive_prompt: Joi.string().min(0).max(1000).required(),
  size_id: Joi.number().integer().min(0).max(2000).optional(),
  negative_prompt: Joi.string().min(0).max(1000).optional(),
})

async function createText2Image(event) {
  try {
    // // Assuming `event.body` contains the binary data
    // let bytes = new Uint8Array(Buffer.from(event.body, 'base64'))  // if the data is base64-encoded
    // // Deserialize to a Task
    // let taskMessage = REQUESTS.Task.deserializeBinary(bytes)
    // // Now pass the taskMessage object to the handler
    // return await container.resolve('createTaskHandler').handle(taskMessage)

  const { error, value } = resuestBodyScheme.validate(JSON.parse(event.body))

  if (error!=undefined) {
    return "Request format: "+error
  }
    const taskMessage = {}
    taskMessage.model_id = parseInt(value.model_id)
    taskMessage.positive_prompt = value.positive_prompt

    return await container.resolve('createT2ITaskHandler').handle(taskMessage)
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: 'An error occurred',
    }
  }
}

module.exports = { createText2Image }
